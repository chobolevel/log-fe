import { Channel } from "@/apis";
import { Flex } from "@chakra-ui/react";
import { ChannelListItem } from "@/components";

interface ChannelListProps {
  channels: Channel[];
}

const ChannelList = ({ channels }: ChannelListProps) => {
  return (
    <Flex direction={"column"} gap={4}>
      {channels.map((channel, idx) => {
        return <ChannelListItem key={idx} channel={channel} />;
      })}
    </Flex>
  );
};

export default ChannelList;
