import { Flex } from "@chakra-ui/react";
import React from "react";
import { DefaultLayoutFooter } from "./DefaultLayoutFooter";
import { DefaultLayoutHeader } from "./DefaultLayoutHeader";

interface DefaultLayoutProps {
  children?: React.ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <Flex
      w={"100%"}
      maxW={"1000px"}
      margin={"auto"}
      direction={"column"}
      position={"relative"}
    >
      <DefaultLayoutHeader />
      {children}
      <DefaultLayoutFooter />
    </Flex>
  );
};

export default DefaultLayout;
