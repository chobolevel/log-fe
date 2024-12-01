import { ChannelMessage } from "@/apis";
import { Flex } from "@chakra-ui/react";
import { ChannelMessageListItem } from "@/components";
import { useEffect, useRef } from "react";

interface ChannelMessageListProps {
  channelMessages: ChannelMessage[];
}

export const ChannelMessageList = ({
  channelMessages,
}: ChannelMessageListProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [channelMessages]);
  return (
    <Flex direction={"column"} gap={4} maxH={300} overflowY={"auto"} p={4}>
      {channelMessages.map((channelMessage, idx) => {
        return (
          <ChannelMessageListItem channelMessage={channelMessage} key={idx} />
        );
      })}
      <Flex ref={ref}></Flex>
    </Flex>
  );
};

export default ChannelMessageList;
