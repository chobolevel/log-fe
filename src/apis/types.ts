import {Optional} from "@/types";
import {
  UseInfiniteQueryOptions,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import {AxiosError} from "axios";

export type ID = number;

export interface Scheme {
  id: ID;
  created_at: number;
  updated_at: number;
}

export type UserType = "USER" | "ADMIN";

export type LoginType = "GOOGLE" | "KAKAO" | "NAVER" | "GENERAL";

export type ImageType = "PROFILE"

export interface ImageScheme extends Scheme {
  key: string;
  order: number;
  origin_url: string;
  image_type: ImageType;
  width: number;
  height: number;
}

interface PresignedParams {
  extension: string;
}

export interface Presigned {
  cf_host: string;
  filename: string;
  key: string;
  presigend_url: string;
}


export interface ApiResponse<T> {
  data: T;
  message: string;
}

export interface ApiError extends Error {
  errors: {
    errorCode: string;
    errorMessage: string;
  };
}

export enum ServerErrorCodes {
  "ACCESS_DENIED" = "ACCESS_DENIED",
}

export type PageQueryParams = {
  skipCount?: number;
  limitCount?: number;
};

export interface PageQueryResponse<T> {
  data: T;
  limit_count: number;
  skip_count: number;
  total_count: number;
}

export type UrlBuilder<T> = string | ((data: T) => string);

export type QueryKey<T = void> = [UrlBuilder<T>, Optional<object>];

export type QueryOptions<T> = UseQueryOptions<
  T,
  AxiosError<ApiError>,
  T,
  QueryKey
>;

export type PageQueryOptions<T, S = PageQueryResponse<T>> = UseQueryOptions<
  S,
  AxiosError<ApiError>,
  S,
  QueryKey
>;

export type InfiniteQueryOptions<
  T,
  S = PageQueryResponse<T>,
> = UseInfiniteQueryOptions<S, AxiosError<ApiError>, S, S, QueryKey>;

export type MutationOptions<T, S> = UseMutationOptions<
  ApiResponse<T>,
  AxiosError<ApiError>,
  S
>;
