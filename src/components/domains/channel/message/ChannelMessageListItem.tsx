import { Channel, ChannelMessage, useGetMe, useInviteChannel } from "@/apis";
import { Avatar, Flex, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { DateUtils } from "@/utils";
import { images } from "@/constants";

interface ChannelMessageListItemProps {
  channel: Channel;
  channelMessage: ChannelMessage;
}

const EnterChannelMessageListItem = ({
  channelMessage,
}: ChannelMessageListItemProps) => {
  return (
    <Flex
      p={2}
      direction={"column"}
      align={"center"}
      justify={"center"}
      borderRadius={10}
      border={"1px solid gray"}
    >
      <Text fontSize={"sm"}>{channelMessage.content}</Text>
    </Flex>
  );
};

const TalkChannelMessageListItem = ({
  channelMessage,
}: ChannelMessageListItemProps) => {
  const { data: me } = useGetMe();

  const isMine = useMemo(
    () => me?.id === channelMessage.writer.id,
    [me, channelMessage],
  );
  const writer = useMemo(() => channelMessage.writer, [channelMessage]);
  const writtenAt = useMemo(
    () =>
      DateUtils.format(
        new Date(channelMessage.created_at),
        "YYYY-MM-DD HH:mm:ss",
      ),
    [channelMessage],
  );
  return (
    <Flex direction={"column"} align={isMine ? "end" : "start"} gap={2}>
      {!isMine && (
        <Flex align={"center"} gap={1}>
          <Avatar
            size={"sm"}
            src={
              writer.profile_image
                ? writer.profile_image.origin_url
                : images.unknown.src
            }
          />
          <Text fontWeight={"bold"}>{channelMessage.writer.nickname}</Text>
        </Flex>
      )}

      <Text
        py={1}
        px={2}
        bgColor={isMine ? "lightGreen" : "transparent"}
        borderRadius={10}
        border={"2px solid"}
        borderColor={"lightGreen"}
      >
        {channelMessage.content}
      </Text>
      <Text fontSize={"sm"}>{writtenAt}</Text>
    </Flex>
  );
};

const ExitChannelMessageListItem = ({
  channel,
  channelMessage,
}: ChannelMessageListItemProps) => {
  const { mutate: inviteChannel } = useInviteChannel();
  return (
    <Flex
      p={2}
      direction={"column"}
      align={"center"}
      justify={"center"}
      borderRadius={10}
      border={"1px solid gray"}
      gap={1}
    >
      <Text fontSize={"sm"}>{channelMessage.content}</Text>
      <Text
        fontSize={"sm"}
        textDecoration={"underline"}
        cursor={"pointer"}
        onClick={() => {
          inviteChannel({
            channel_id: channel.id,
            user_ids: [channelMessage.writer.id],
          });
        }}
      >
        채널에 초대하기
      </Text>
    </Flex>
  );
};

const ChannelMessageListItem = ({
  channel,
  channelMessage,
}: ChannelMessageListItemProps) => {
  const ReactiveChannelMessageListItem = useMemo(() => {
    switch (channelMessage.type) {
      case "ENTER":
        return EnterChannelMessageListItem;
      case "TALK":
        return TalkChannelMessageListItem;
      case "EXIT":
        return ExitChannelMessageListItem;
    }
  }, [channelMessage]);
  return (
    <ReactiveChannelMessageListItem
      channel={channel}
      channelMessage={channelMessage}
    />
  );
};

export default ChannelMessageListItem;
