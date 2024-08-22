import {useGetMe} from "@/apis";
import {
  isAccessible,
  isExistPage,
  isOnlyAdmin,
  PageRoutes,
} from "@/constants";
import {useSafePush} from "@/hooks";
import {useModalStore} from "@/stores";
import {useEffect} from "react";

const Authenticator = () => {
  const {router, push} = useSafePush();
  const {data, isFetching} = useGetMe();
  const {openModal} = useModalStore(["openModal"]);

  useEffect(() => {
    // if (isOnlyAdmin(router.pathname)) {
    //   if (data?.user_type !== "ADMIN") {
    //     push({
    //       pathname: PageRoutes.Home,
    //     });
    //   }
    // }
    if (
      !isExistPage(router.pathname) ||
      isAccessible(router.pathname) ||
      isFetching
    )
      return;
    if (!data) {
      push({
        pathname: PageRoutes.SignIn,
        query: {redirect: router.asPath},
      })?.then(() => {
        // openModal(UnauthorizedModal, {});
      });
    }
  }, [data, isFetching, openModal, push, router.asPath, router.pathname]);

  return <></>;
};

export default Authenticator;
