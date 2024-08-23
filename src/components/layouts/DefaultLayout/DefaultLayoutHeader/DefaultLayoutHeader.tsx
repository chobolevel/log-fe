import { Flex, Text } from "@chakra-ui/react";
import { useSafePush } from "@/hooks";
import { toUrl } from "@/utils";
import { PageRoutes } from "@/constants";
import { CSSProperties } from "react";

const linkStyle: CSSProperties = {
  fontSize: "lg",
  fontWeight: "bold",
  cursor: "pointer",
};

const DefaultLayoutHeader = () => {
  const { push } = useSafePush();
  return (
    <Flex as={"header"} h={100} justify={"space-between"} align={"center"}>
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
      <Flex align={"center"} gap={2}>
        <Text
          style={linkStyle}
          onClick={() => {
            push(toUrl(PageRoutes.SignIn));
          }}
        >
          LOGIN
        </Text>
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
