import { Channel, ChannelMessage } from "@/apis";
import { Flex, useColorModeValue } from "@chakra-ui/react";
import { ChannelMessageListItem } from "@/components";
import { useEffect, useRef } from "react";

interface ChannelMessageListProps {
  channel: Channel;
  channelMessages: ChannelMessage[];
}

export const ChannelMessageList = ({
  channel,
  channelMessages,
}: ChannelMessageListProps) => {
  const bgColor = useColorModeValue("#eee", "#333");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [channelMessages]);
  return (
    <Flex
      direction={"column"}
      gap={4}
      h={500}
      overflowY={"auto"}
      p={4}
      bgColor={bgColor}
    >
      {channelMessages.map((channelMessage, idx) => {
        return (
          <ChannelMessageListItem
            channel={channel}
            channelMessage={channelMessage}
            key={idx}
          />
        );
      })}
      <Flex ref={ref}></Flex>
    </Flex>
  );
};

export default ChannelMessageList;
