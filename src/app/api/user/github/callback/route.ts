import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

interface GitHubTokenResponse {
  access_token?: string;
  error?: string;
}

interface GitHubUser {
  id: number;
  login: string;
  email: string | null;
}

interface GitHubEmail {
  email: string;
  primary: boolean;
  verified: boolean;
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const tokenData = (await tokenRes.json()) as GitHubTokenResponse;

  if (!tokenData.access_token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const authHeader = { Authorization: `Bearer ${tokenData.access_token}` };

  const userRes = await fetch("https://api.github.com/user", {
    headers: authHeader,
  });
  const user = (await userRes.json()) as GitHubUser;

  let email = user.email;

  if (!email) {
    const emailsRes = await fetch("https://api.github.com/user/emails", {
      headers: authHeader,
    });
    const emails = (await emailsRes.json()) as GitHubEmail[];
    email = emails.find((e) => e.primary && e.verified)?.email ?? null;
  }

  if (!email) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const backendRes = await fetch(`${BASE_URL}/api/v1/users/social-login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      social_id: String(user.id),
      nickname: user.login,
      login_type: "GITHUB",
    }),
  });

  if (!backendRes.ok) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const redirectRes = NextResponse.redirect(new URL("/", request.url));

  const setCookie = backendRes.headers.get("set-cookie");
  if (setCookie) {
    redirectRes.headers.set("set-cookie", setCookie);
  }

  return redirectRes;
}
