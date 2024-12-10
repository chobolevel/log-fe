import { match, MatchFunction } from "path-to-regexp"; // API 주소 정의

// API 주소 정의
// https://api.oh-my-diving.com/swagger-ui/index.html
export enum ApiRoutes {
  // auth
  AuthLogin = "/api/v1/login",
  AuthReissue = "/api/v1/reissue",
  // user
  CreateUser = "/api/v1/users",
  Users = "/api/v1/users",
  Me = "/api/v1/users/me",
  UpdateUser = "/api/v1/users/:id?",
  UpdateUserImage = "/api/v1/users/images",
  ChangeUserPassword = "/api/v1/users/change-password",
  DeleteUserImage = "/api/v1/users/images/:id?",
  // tag
  Tags = "/api/v1/tags/:id?",
  // post
  CreatePost = "/api/v1/posts",
  Posts = "/api/v1/posts/:id?",
  UpdatePost = "/api/v1/posts/:id?",
  DeletePost = "/api/v1/posts/:id?",
  // post comment
  PostComments = "/api/v1/posts/comments/:id?",
  DeletePostComment = "/api/v1/posts/comments/:id?/delete",
  // guest book
  CreateGuestBook = "/api/v1/guest-books",
  GuestBooks = "/api/v1/guest-books/:id?",
  UpdateGuestBook = "/api/v1/guest-books/:id?",
  // presigned-url
  CreatePresignedUrl = "/api/v1/upload/presigned-url",
  // channels
  Channels = "/api/v1/channels/:id?",
  InviteChannel = "/api/v1/channels/:id?/invite",
  ExitChannel = "/api/v1/channels/:id?/exit",
  // channel messages
  ChannelMessages = "/api/v1/channels/:channelId?/messages/:channelMessageId?",
}

// 페이지 주소 정의
export enum PageRoutes {
  // home
  Home = "/",
  // auth
  SignIn = "/sign/in",
  SignUp = "/sign/up",
  // user
  Profile = "/profile",
  ChangePassword = "/change-password",
  // post
  WritePost = "/posts/write",
  Posts = "/posts",
  PostDetailById = "/posts/:id?",
  EditPost = "/posts/:id?/edit",
  // guest book
  GuestBooks = "/guest-books",
  // tag
  Tags = "/tags",
  // channels
  Channels = "/channels",
  WriteChannel = "/channels/write",
  DetailChannelById = "/channels/:id?",
}

// 로그인 없이 접근 불가능한 페이지
export const restrictedRoutes = [
  PageRoutes.Profile,
  PageRoutes.ChangePassword,
  PageRoutes.WritePost,
  PageRoutes.EditPost,
  PageRoutes.Channels,
  PageRoutes.WriteChannel,
  PageRoutes.DetailChannelById,
];

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
  icon?: React.ReactNode;
  label: string;
  pathname: PageRoutes;
  query?: Record<string, number | string>;
  matchers: MatchFunction[];
}
