import {useBreakpointValue} from "@chakra-ui/react";

const useIsMobile = () => {
  return useBreakpointValue({base: true, lg: false});
};

export default useIsMobile;
