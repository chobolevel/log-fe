import { Flex, Link, Text } from "@chakra-ui/react";
import { IoIosMail } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import { CSSProperties } from "react";

const iconBoxStyle: CSSProperties = {
  width: 30,
  height: 30,
  overflow: "hidden",
  cursor: "pointer",
};

const DefaultLayoutFooter = () => {
  return (
    <Flex as={"footer"} direction={"column"} align={"center"} gap={4}>
      <Flex gap={4}>
        <Link style={iconBoxStyle} href={"mailto:rodaka123@naver.com"}>
          <IoIosMail size={30} />
        </Link>
        <Link
          style={iconBoxStyle}
          href={
            "https://www.instagram.com/kkkij_0_0?igsh=NXpqaHNweThkZHJ5&utm_source=qr"
          }
          target={"_blank"}
        >
          <AiFillInstagram size={30} />
        </Link>
        <Link
          style={iconBoxStyle}
          href={"https://github.com/chobolevel"}
          target={"_blank"}
        >
          <FaGithub size={28} />
        </Link>
      </Flex>
      <Flex gap={4}>
        <Text>Copyright 2024 chobolevel All rights reserved.</Text>
      </Flex>
    </Flex>
  );
};

export default DefaultLayoutFooter;
