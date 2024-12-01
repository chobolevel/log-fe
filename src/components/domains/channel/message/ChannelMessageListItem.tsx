import { ChannelMessage, useGetMe } from "@/apis";
import { Flex, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { DateUtils } from "@/utils";

interface ChannelMessageListItemProps {
  channelMessage: ChannelMessage;
}

const ChannelMessageListItem = ({
  channelMessage,
}: ChannelMessageListItemProps) => {
  const { data: me } = useGetMe();

  const isMine = useMemo(
    () => me?.id === channelMessage.writer.id,
    [me, channelMessage],
  );
  const writtenAt = useMemo(
    () =>
      DateUtils.format(new Date(channelMessage.created_at), "YY-MM-DD [HH:MM]"),
    [channelMessage],
  );
  return (
    <Flex direction={"column"} align={isMine ? "end" : "start"} gap={2}>
      <Text>{channelMessage.writer.nickname}</Text>
      <Text p={2} bgColor={"lightGreen"}>
        {channelMessage.content}
      </Text>
      <Text fontSize={"sm"}>{writtenAt}</Text>
    </Flex>
  );
};

export default ChannelMessageListItem;
