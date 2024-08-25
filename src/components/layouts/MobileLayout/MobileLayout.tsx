import {Flex} from "@chakra-ui/react";
import React from "react";
import {MobileLayoutHeader} from "./MobileLayoutHeader";
import { MobileLayoutFooter } from "./MobileLayoutFooter"

interface DefaultLayoutProps {
  children?: React.ReactNode;
}

const MobileLayout = ({children}: DefaultLayoutProps) => {
  return (
    <Flex w={"100%"} direction={"column"}>
      <MobileLayoutHeader />
      {children}
      <MobileLayoutFooter />
    </Flex>
  );
};

export default MobileLayout;
