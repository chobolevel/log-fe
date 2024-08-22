import {match, MatchFunction} from "path-to-regexp";

// API 주소 정의
// https://api.oh-my-diving.com/swagger-ui/index.html
export enum ApiRoutes {
  AuthReissueUsers = "/api/v1/reissue",
  Users = "/api/v1/users"
}

// 페이지 주소 정의
export enum PageRoutes {
  SignIn = "/sign/in",
  SignUp = "/sign/up"
}

// 로그인 없이 접근 불가능한 페이지
export const restrictedRoutes = [];

export const onlyAdminAllowedRoutes = [];

/**
 * 존재하는 페이지인지 확인
 * @param pathname 페이지 주소
 * @returns boolean
 */
export const isExistPage = (pathname: string) => {
  return Object.values(PageRoutes).some((route) => match(route)(pathname));
};

/**
 * 로그인 없이 접근 가능한 페이지인지 확인
 * @param pathname 페이지 주소
 * @returns boolean
 */
export const isAccessible = (pathname: string) => {
  return !restrictedRoutes.some((route) => match(route)(pathname));
};

export const isOnlyAdmin = (pathname: string) => {
  return onlyAdminAllowedRoutes.some((route) => match(route)(pathname));
};

// 네비게이션 메뉴 정의
export interface Nav {
  label: string;
  pathname: PageRoutes;
  query?: Record<string, number | string>;
  matchers: MatchFunction[];
}

export const navs: Nav[] = [];

export const myPageNavs: Nav[] = [];

export const isInMyPage = (pathname: string) => {
  return myPageNavs.some((nav) =>
    nav.matchers.some((matcher) => matcher(pathname)),
  );
};
