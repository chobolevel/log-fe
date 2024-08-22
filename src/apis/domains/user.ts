import {useFetch} from "@/apis";
import {toUrl} from "@/utils";
import {ApiRoutes} from "@/constants";

export const useGetMe = () => {
  return useFetch(toUrl(ApiRoutes.Users))
}