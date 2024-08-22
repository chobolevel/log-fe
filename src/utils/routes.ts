import {ApiRoutes, PageRoutes} from "@/constants";
import {Optional} from "@/types";
import {Url} from "next/dist/shared/lib/router/router";
import {compile} from "path-to-regexp";

export const toUrl = (path: PageRoutes | ApiRoutes, params?: object) =>
  compile(path, {encode: encodeURIComponent})(params);

export class NextURL {
  private url: Url;

  constructor(url: Url) {
    this.url = url;
  }

  get pathname() {
    if (typeof this.url === "string") {
      return this.url.split("?")[0];
    }
    return this.url.pathname;
  }

  get query() {
    if (typeof this.url === "string") {
      const queryString = this.url.split("?")[1];
      return Object.fromEntries(new URLSearchParams(queryString).entries());
    }
    return this.url.query;
  }

  toString() {
    if (typeof this.url === "string") return this.url;
    return (
      this.url.pathname +
      (this.url.query
        ? `?${new URLSearchParams(this.url.query as { [key: string]: string })}`
        : "")
    );
  }
}

export class QueryParser {
  static toNumber = <T extends Optional<number>>(
    query: string | string[] | undefined,
    defaultValue?: T
  ): T extends number ? number : undefined => {
    const num = Number(query);
    if (isNaN(num)) {
      return defaultValue as T extends number ? number : undefined;
    }
    return num as T extends number ? number : undefined;
  };
  static toString = <T extends string>(
    query: string | string[] | undefined,
    defaultValue?: string
  ): T extends string ? string : undefined => {
    if (!query) {
      return defaultValue as T extends string ? string : undefined;
    }
    return query.toString() as T extends string ? string : undefined;
  };
  static toNumberArray = <T extends Optional<number[]>>(
    query: string | string[] | undefined,
    defaultValue?: T
  ): T extends number[] ? number[] : undefined => {
    if (!query) {
      return defaultValue as T extends number[] ? number[] : undefined;
    }
    if (Array.isArray(query)) {
      return query.map((q) => Number(q)) as T extends number[]
        ? number[]
        : undefined;
    }
    return [Number(query)] as T extends number[] ? number[] : undefined;
  };
}
