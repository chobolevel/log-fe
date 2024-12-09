import { Flex } from "@chakra-ui/react";
import React from "react";
import { MobileLayoutHeader } from "./MobileLayoutHeader";
import { MobileLayoutNav } from "./MobileLayoutNav";
import { MobileLayoutFooter } from "./MobileLayoutFooter";

interface DefaultLayoutProps {
  children?: React.ReactNode;
}

const MobileLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <Flex w={"100%"} direction={"column"} position={"relative"}>
      <MobileLayoutHeader />
      {children}
      <MobileLayoutNav />
      <MobileLayoutFooter />
    </Flex>
  );
};

export default MobileLayout;
