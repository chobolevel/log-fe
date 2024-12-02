import { Channel } from "@/apis";
import { Flex, Text } from "@chakra-ui/react";
import { useSafePush } from "@/hooks";
import { toUrl } from "@/utils";
import { PageRoutes } from "@/constants";

interface ChannelListItemProps {
  channel: Channel;
}

const ChannelListItem = ({ channel }: ChannelListItemProps) => {
  const { push } = useSafePush();

  return (
    <Flex
      p={4}
      direction={"column"}
      onClick={() => {
        push(toUrl(PageRoutes.DetailChannelById, { id: channel.id }));
      }}
      gap={2}
      borderRadius={10}
      border={"2px solid"}
      borderColor={"lightGreen"}
      cursor={"pointer"}
      _hover={{
        backgroundColor: "lightGreen",
        color: "#fff",
      }}
      transition={"all 0.1s ease-in-out"}
    >
      <Text
        fontSize={"lg"}
        fontWeight={"bold"}
      >{`${channel.name}(${channel.participants.length})`}</Text>
      <Text>
        {`${channel.participants
          .map((participant) => participant.nickname)
          .join(", ")}의 채널`}
      </Text>
    </Flex>
  );
};

export default ChannelListItem;
