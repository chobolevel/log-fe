import {useGetMe} from "@/apis";
import {useModalStore} from "@/stores";
import {NextURL} from "@/utils";
import {useRouter} from "next/router";
import {useCallback, useEffect, useRef} from "react";

type PushParams = Parameters<ReturnType<typeof useRouter>["push"]>;

const useSafePush = () => {
  const router = useRouter();
  const {data, isFetching} = useGetMe();
  const isChanging = useRef(false);
  const {openModal} = useModalStore(["openModal"]);

  const push = useCallback(
    (...params: PushParams) => {
      // if (isFetching) return;

      // 만약 라우팅중이라면 아무것도 하지 않습니다.
      if (isChanging.current) return;
      isChanging.current = true;

      const nextURL = new NextURL(params[0]);

      // 만약 라우팅이 허용되지 않은 페이지로 이동하려고 한다면
      // if (!isAccessible(nextURL?.pathname ?? router.pathname) && !data) {
      //   return router
      //     .push({
      //       pathname: PageRoutes.AuthSignin,
      //       query: { redirect: router.asPath },
      //     })
      //     .then(() => {
      //       openModal(UnauthorizedModal, {});
      //     });
      // }
      return router.push(...params);
    },
    [data, isFetching, openModal, router],
  );

  const handleRouteChange = useCallback(() => {
    isChanging.current = false;
  }, []);

  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [handleRouteChange, router]);

  return {router, push};
};

export default useSafePush;
