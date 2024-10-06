import {
  Avatar,
  Button,
  Flex,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useSafePush } from "@/hooks";
import { toUrl } from "@/utils";
import { images, PageRoutes } from "@/constants";
import { CSSProperties, useMemo } from "react";
import { useGetMe, useLogout } from "@/apis";
import { IoIosArrowBack } from "react-icons/io";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const linkStyle: CSSProperties = {
  fontSize: "lg",
  fontWeight: "bold",
  cursor: "pointer",
};

const DefaultLayoutHeader = () => {
  const { push } = useSafePush();
  const logout = useLogout();
  const { toggleColorMode } = useColorMode();
  const colorModeToggleIcon = useColorModeValue(
    <MdDarkMode size={20} />,
    <MdLightMode size={20} />,
  );
  const bgColor = useColorModeValue("lightModeBack", "darkModeBack");

  const { data: me } = useGetMe();

  const profileImage = useMemo(() => {
    if (me && me.profile_image) {
      return me.profile_image.origin_url;
    } else {
      return images.unknown.src;
    }
  }, [me]);
  return (
    <Flex
      as={"header"}
      h={100}
      justify={"space-between"}
      align={"center"}
      px={2}
      position={"sticky"}
      top={0}
      bgColor={bgColor}
      zIndex={100}
    >
      <Flex gap={4} align={"center"}>
        <IoIosArrowBack
          size={30}
          cursor={"pointer"}
          onClick={() => {
            history.back();
          }}
        />
        <Text
          style={linkStyle}
          onClick={() => {
            push(toUrl(PageRoutes.Home));
          }}
          fontSize={"xl"}
        >
          CHOLO
        </Text>
        <Button onClick={toggleColorMode}>{colorModeToggleIcon}</Button>
      </Flex>
      <Flex align={"center"} gap={4}>
        {me ? (
          <>
            <Avatar
              size={"sm"}
              cursor={"pointer"}
              src={profileImage}
              onClick={() => {
                push(toUrl(PageRoutes.Profile));
              }}
            />
            <Text
              style={linkStyle}
              onClick={() => {
                push(toUrl(PageRoutes.WritePost));
              }}
            >
              POSTING
            </Text>
            <Text
              style={linkStyle}
              onClick={() => {
                logout();
              }}
            >
              LOGOUT
            </Text>
          </>
        ) : (
          <Text
            style={linkStyle}
            onClick={() => {
              push(toUrl(PageRoutes.SignIn));
            }}
          >
            LOGIN
          </Text>
        )}
        <Text
          style={linkStyle}
          onClick={() => {
            push(toUrl(PageRoutes.Posts));
          }}
        >
          ARCHIVE
        </Text>
        <Text
          style={linkStyle}
          onClick={() => {
            push(toUrl(PageRoutes.Tags));
          }}
        >
          TAGS
        </Text>
        <Text
          style={linkStyle}
          onClick={() => {
            push(toUrl(PageRoutes.GuestBooks));
          }}
        >
          GUEST BOOK
        </Text>
      </Flex>
    </Flex>
  );
};

export default DefaultLayoutHeader;
