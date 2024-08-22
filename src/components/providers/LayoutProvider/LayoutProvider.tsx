import {useLayout} from "@/hooks";
import {useBreakpointValue} from "@chakra-ui/react";

interface LayoutProviderProps {
  children: React.ReactNode;
}

const LayoutProvider = ({children}: LayoutProviderProps) => {
  const {Provider} = useLayout();

  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  })!;

  return (
    <Provider value={{layout: isMobile ? "mobile" : "desktop"}}>
      {children}
    </Provider>
  );
};

export default LayoutProvider;
