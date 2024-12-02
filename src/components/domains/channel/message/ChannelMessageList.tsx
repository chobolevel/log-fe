import { Channel, ChannelMessage } from "@/apis";
import { Button, Flex, useColorModeValue } from "@chakra-ui/react";
import { ChannelMessageListItem } from "@/components";
import { useEffect, useRef, useState } from "react";

interface ChannelMessageListProps {
  onLoad: () => void;
  channel: Channel;
  channelMessages: ChannelMessage[];
  channelMessagesTotalCount: number;
}

export const ChannelMessageList = ({
  onLoad,
  channel,
  channelMessages,
  channelMessagesTotalCount,
}: ChannelMessageListProps) => {
  const [prevScrollHeight, setPrevScrollHeight] = useState<number>(0);
  const bgColor = useColorModeValue("#eee", "#333");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.scrollTop === 1) {
      ref.current.scrollTo({
        top: ref.current.scrollHeight - prevScrollHeight,
      });
      setPrevScrollHeight(ref.current.scrollHeight);
    } else if (ref.current) {
      ref.current.scrollTo({ top: ref.current.scrollHeight });
      setPrevScrollHeight(ref.current.scrollHeight);
    }
  }, [channelMessages]);
  return (
    <Flex
      direction={"column"}
      gap={4}
      h={500}
      overflowY={"auto"}
      p={4}
      bgColor={bgColor}
      ref={ref}
      scrollBehavior={"smooth"}
    >
      <Button
        p={2}
        onClick={() => {
          ref.current?.scrollTo({ top: 1 });
          onLoad();
        }}
        isDisabled={channelMessagesTotalCount === channelMessages.length}
      >
        더보기
      </Button>
      {channelMessages.map((channelMessage, idx) => {
        return (
          <ChannelMessageListItem
            channel={channel}
            channelMessage={channelMessage}
            key={idx}
          />
        );
      })}
    </Flex>
  );
};

export default ChannelMessageList;
