import {Flex} from "@chakra-ui/react";
import React from "react";

interface DefaultLayoutProps {
  children?: React.ReactNode;
}

const MobileLayout = ({children}: DefaultLayoutProps) => {
  return (
    <Flex>mobile layout</Flex>
  );
};

export default MobileLayout;
