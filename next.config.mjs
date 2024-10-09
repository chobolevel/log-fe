import next_pwa from "next-pwa";

const withPwa = next_pwa({
  dest: "public",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 개발 환경에서만 활성화 사용
  // reactStrictMode: true,
  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d33kynn6xn9e5g.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "s3.ap-northeast-2.amazonaws.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/s3/:path*",
        destination: "https://d33kynn6xn9e5g.cloudfront.net/:path*",
      },
      {
        source: "/urns/:path*",
        destination: "https://hits.sh/api/urns/:path*",
      },
      {
        source: "/hits/:path*",
        destination: "https://hits.sh/:path*",
      },
    ];
  },
};

export default withPwa(nextConfig);
