import {
  ChakraProvider as _ChakraProvider,
  ColorModeScript,
  createStandaloneToast,
} from "@chakra-ui/react";
import theme from "./theme";

interface ChakraProviderProps {
  children: React.ReactNode;
}

const { ToastContainer } = createStandaloneToast();

const ChakraProvider = ({ children }: ChakraProviderProps) => {
  return (
    // https://github.com/chakra-ui/chakra-ui-docs/issues/1586
    <_ChakraProvider theme={theme} cssVarsRoot="body">
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ToastContainer />
      {children}
    </_ChakraProvider>
  );
};

export default ChakraProvider;
