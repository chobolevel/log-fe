import { Flex, Link, Text } from "@chakra-ui/react";
import { IoIosMail } from "react-icons/io";
import { AiFillInstagram } from "react-icons/ai";
import { FaGithub } from "react-icons/fa";
import { CSSProperties, useMemo } from "react";

const iconBoxStyle: CSSProperties = {
  width: 30,
  height: 30,
  overflow: "hidden",
  cursor: "pointer",
};

const MobileLayoutFooter = () => {
  const year = useMemo(() => new Date().getFullYear(), []);
  return (
    <Flex
      as={"footer"}
      direction={"column"}
      align={"center"}
      gap={4}
      pt={10}
      pb={40}
    >
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
          href={"https://github.com/chobolevel/log"}
          target={"_blank"}
        >
          <FaGithub size={28} />
        </Link>
      </Flex>
      <Flex gap={4} justify={"center"} align={"center"}>
        <Text fontWeight={"bold"} textAlign={"center"}>
          {`Copyright ${year} chobolevel All rights reserved.`}
        </Text>
      </Flex>
    </Flex>
  );
};

export default MobileLayoutFooter;
