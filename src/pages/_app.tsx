import {
  Authenticator,
  ChakraProvider,
  LayoutProvider,
  ModalProvider,
  ReactQueryProvider,
} from "@/components";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Flex, Spinner } from "@chakra-ui/react";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
    };
    const handleComplete = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);
  return (
    <ReactQueryProvider>
      <ChakraProvider>
        <Authenticator />
        <ModalProvider />
        <LayoutProvider>
          {loading ? (
            <Flex
              w={"100vw"}
              h={"100vh"}
              justify={"center"}
              align={"center"}
              bgColor={"blue.950"}
            >
              <Spinner size={"xl"} />
            </Flex>
          ) : (
            <Component {...pageProps} />
          )}
        </LayoutProvider>
      </ChakraProvider>
    </ReactQueryProvider>
  );
}
