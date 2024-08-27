import { Avatar, Flex, Text } from "@chakra-ui/react";
import { useSafePush } from "@/hooks";
import { toUrl } from "@/utils";
import { PageRoutes } from "@/constants";
import { CSSProperties } from "react";
import { useGetMe, useLogout } from "@/apis";

const linkStyle: CSSProperties = {
  fontSize: "lg",
  fontWeight: "bold",
  cursor: "pointer",
};

const DefaultLayoutHeader = () => {
  const { push } = useSafePush();
  const logout = useLogout();

  const { data: me } = useGetMe();
  return (
    <Flex
      as={"header"}
      h={100}
      justify={"space-between"}
      align={"center"}
      px={2}
    >
      <Flex>
        <Text
          style={linkStyle}
          onClick={() => {
            push(toUrl(PageRoutes.Home));
          }}
        >
          CHOLO
        </Text>
      </Flex>
      <Flex align={"center"} gap={4}>
        {me ? (
          <>
            <Avatar
              size={"sm"}
              cursor={"pointer"}
              src={me.profile_image?.origin_url}
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
      </Flex>
    </Flex>
  );
};

export default DefaultLayoutHeader;
