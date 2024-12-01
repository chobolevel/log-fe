import { Channel } from "@/apis";
import { Flex } from "@chakra-ui/react";
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
      onClick={() => {
        push(toUrl(PageRoutes.DetailChannelById, { id: channel.id }));
      }}
    >{`${channel.name}(${channel.participants_count})`}</Flex>
  );
};

export default ChannelListItem;
