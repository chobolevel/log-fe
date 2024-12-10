import { Avatar, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { FaHashtag, FaHome } from "react-icons/fa";
import { MdAccountCircle, MdArticle } from "react-icons/md";
import { HiPencilAlt } from "react-icons/hi";
import { useSafePush } from "@/hooks";
import { toUrl } from "@/utils";
import { images, Nav, PageRoutes } from "@/constants";
import { CSSProperties } from "react";
import { useGetMe } from "@/apis";
import { match } from "path-to-regexp";

const MobileLayoutNav = () => {
  const { push, router } = useSafePush();

  const bgColor = useColorModeValue("lightModeBack", "darkModeBack");
  const { data: me } = useGetMe();

  const navs: Nav[] = [
    {
      icon: <MdArticle size={20} />,
      label: "Archive",
      pathname: PageRoutes.Posts,
      matchers: [
        match(PageRoutes.Posts),
        match(PageRoutes.PostDetailById),
        match(PageRoutes.WritePost),
        match(PageRoutes.EditPost),
      ],
    },
    {
      icon: <FaHashtag size={20} />,
      label: "Tag",
      pathname: PageRoutes.Tags,
      matchers: [match(PageRoutes.Tags)],
    },
    {
      icon: <FaHome size={20} />,
      label: "Home",
      pathname: PageRoutes.Home,
      matchers: [match(PageRoutes.Home)],
    },
    {
      icon: <HiPencilAlt size={20} />,
      label: "Guest",
      pathname: PageRoutes.GuestBooks,
      matchers: [match(PageRoutes.GuestBooks)],
    },
    {
      icon: me ? (
        me.profile_image ? (
          <Avatar src={me.profile_image.origin_url} size={"xs"} />
        ) : (
          <Avatar src={images.unknown.src} size={"xs"} />
        )
      ) : (
        <MdAccountCircle size={20} />
      ),
      label: "Profile",
      pathname: PageRoutes.Profile,
      matchers: [match(PageRoutes.Profile)],
    },
  ];
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
      direction={"column"}
      fontSize={"xs"}
      fontWeight={"bold"}
      zIndex={100}
    >
      <Flex w={"100%"} h={"60px"} align={"center"} justify={"space-between"}>
        {navs.map((nav, idx) => {
          const isActive = nav.matchers.some((matcher) =>
            matcher(router.pathname),
          );
          return (
            <Flex
              key={idx}
              style={navItemStyle}
              onClick={() => {
                push(toUrl(nav.pathname));
              }}
              color={isActive ? "lightGreen" : "none"}
            >
              {nav.icon}
              <Text>{nav.label}</Text>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default MobileLayoutNav;
