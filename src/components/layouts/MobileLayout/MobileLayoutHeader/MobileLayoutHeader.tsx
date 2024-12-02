import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { CSSProperties } from "react";
import { useSafePush } from "@/hooks";
import { toUrl } from "@/utils";
import { PageRoutes } from "@/constants";
import { TiThMenu } from "react-icons/ti";
import { useGetMe, useLogout } from "@/apis";
import { IoIosArrowBack } from "react-icons/io";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const linkStyle: CSSProperties = {
  fontSize: "lg",
  fontWeight: "bold",
  cursor: "pointer",
};

const MobileLayoutHeader = () => {
  const { push } = useSafePush();
  const { toggleColorMode } = useColorMode();
  const colorModeToggleIcon = useColorModeValue(
    <MdDarkMode size={20} />,
    <MdLightMode size={20} />,
  );
  const bgColor = useColorModeValue("lightModeBack", "darkModeBack");

  const { data: me } = useGetMe();
  const logout = useLogout();

  return (
    <Flex
      as={"header"}
      h={100}
      justify={"space-between"}
      align={"center"}
      px={4}
      borderBottom={"1px solid"}
      borderColor={"#ccc"}
      position={"sticky"}
      top={0}
      bgColor={bgColor}
      zIndex={100}
    >
      <Flex gap={2} align={"center"}>
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
        <Button size={"sm"} onClick={toggleColorMode}>
          {colorModeToggleIcon}
        </Button>
      </Flex>
      <Flex gap={2}>
        <Menu>
          <MenuButton>
            <TiThMenu size={24} />
          </MenuButton>
          <MenuList>
            {me ? (
              <>
                <MenuItem
                  fontWeight={"bold"}
                  onClick={() => {
                    push(toUrl(PageRoutes.Profile));
                  }}
                >
                  PROFILE
                </MenuItem>
                <MenuItem
                  fontWeight={"bold"}
                  onClick={() => {
                    logout();
                  }}
                >
                  LOGOUT
                </MenuItem>
                <MenuItem
                  fontWeight={"bold"}
                  onClick={() => {
                    push(toUrl(PageRoutes.Channels));
                  }}
                >
                  CHANNELS
                </MenuItem>
                <MenuItem
                  fontWeight={"bold"}
                  onClick={() => {
                    push(toUrl(PageRoutes.WritePost));
                  }}
                >
                  POSTING
                </MenuItem>
              </>
            ) : (
              <MenuItem
                fontWeight={"bold"}
                onClick={() => {
                  push(toUrl(PageRoutes.SignIn));
                }}
              >
                LOGIN
              </MenuItem>
            )}
            <MenuItem
              fontWeight={"bold"}
              onClick={() => {
                push(toUrl(PageRoutes.Posts));
              }}
            >
              ARCHIVE
            </MenuItem>
            <MenuItem
              fontWeight={"bold"}
              onClick={() => {
                push(toUrl(PageRoutes.Tags));
              }}
            >
              TAGS
            </MenuItem>
            <MenuItem
              fontWeight={"bold"}
              onClick={() => {
                push(toUrl(PageRoutes.GuestBooks));
              }}
            >
              GUEST BOOK
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>
  );
};

export default MobileLayoutHeader;
