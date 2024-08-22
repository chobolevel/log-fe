import {
  Authenticator,
  ChakraProvider,
  LayoutProvider,
  ModalProvider,
  ReactQueryProvider,
} from "@/components";
import type {AppProps} from "next/app";

export default function App({Component, pageProps}: AppProps) {

  return (
    <ReactQueryProvider>
      <ChakraProvider>
        <Authenticator/>
        <ModalProvider/>
        <LayoutProvider>
          <Component {...pageProps} />
        </LayoutProvider>
      </ChakraProvider>
    </ReactQueryProvider>
  );
}
