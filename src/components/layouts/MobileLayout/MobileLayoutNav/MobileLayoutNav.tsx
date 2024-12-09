import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { FaHashtag, FaHome } from "react-icons/fa";
import { MdAccountCircle, MdArticle } from "react-icons/md";
import { HiPencilAlt } from "react-icons/hi";
import { useSafePush } from "@/hooks";
import { toUrl } from "@/utils";
import { PageRoutes } from "@/constants";
import { CSSProperties } from "react";

const MobileLayoutNav = () => {
  const { push } = useSafePush();

  const bgColor = useColorModeValue("lightModeBack", "darkModeBack");

  const navItemStyle = {
    width: "50px",
    height: "50px",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  } as CSSProperties;
  return (
    <Flex
      position={"fixed"}
      bottom={0}
      left={0}
      w={"100%"}
      h={"80px"}
      px={4}
      bgColor={bgColor}
      borderTop={"1px solid"}
      borderColor={"#ccc"}
      align={"center"}
      justify={"space-between"}
      fontSize={"xs"}
      fontWeight={"bold"}
      zIndex={100}
    >
      <Flex
        style={navItemStyle}
        onClick={() => {
          push(toUrl(PageRoutes.Posts));
        }}
      >
        <MdArticle size={20} />
        <Text>Archive</Text>
      </Flex>
      <Flex
        style={navItemStyle}
        onClick={() => {
          push(toUrl(PageRoutes.Tags));
        }}
      >
        <FaHashtag size={20} />
        <Text>Tag</Text>
      </Flex>
      <Flex
        style={navItemStyle}
        onClick={() => {
          push(toUrl(PageRoutes.Home));
        }}
      >
        <FaHome size={20} />
        <Text>Home</Text>
      </Flex>
      <Flex
        style={navItemStyle}
        onClick={() => {
          push(toUrl(PageRoutes.GuestBooks));
        }}
      >
        <HiPencilAlt size={20} />
        <Text>Guest</Text>
      </Flex>
      <Flex
        style={navItemStyle}
        onClick={() => {
          push(toUrl(PageRoutes.Profile));
        }}
      >
        <MdAccountCircle size={20} />
        <Text>Profile</Text>
      </Flex>
    </Flex>
  );
};

export default MobileLayoutNav;
