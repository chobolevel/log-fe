import { Button, Flex, Text } from "@chakra-ui/react";
import {
  Channel,
  ChannelMessage,
  useExitChannel,
  useGetChannelMessages,
} from "@/apis";
import {
  ChannelMessageList,
  InviteChannelModal,
  WriteChannelMessageForm,
} from "@/components";
import * as StompJs from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import { useModalStore } from "@/stores";
import { toUrl } from "@/utils";
import { useSafePush } from "@/hooks";
import { PageRoutes } from "@/constants";

interface ChannelDetailProps {
  channel: Channel;
}

const ChannelDetail = ({ channel }: ChannelDetailProps) => {
  const { push } = useSafePush();
  const [limitCount, setLimitCount] = useState<number>(10);
  const { openConfirm, openModal } = useModalStore([
    "openConfirm",
    "openModal",
  ]);
  const [messages, setMessages] = useState<ChannelMessage[]>([]);

  const { data: channelMessages } = useGetChannelMessages(
    {
      channel_id: channel.id,
      limitCount,
    },
    !!channel.id,
  );
  const { mutate: exitChannel } = useExitChannel();

  // stomp 기능 로직
  const client = useRef<StompJs.Client>();

  const connect = (channelId: number) => {
    console.log("connecting...");
    client.current = new StompJs.Client({
      brokerURL: `ws://${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/ws`,
      connectHeaders: {},
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("connected!!!");
        client.current?.subscribe(`/sub/channels/${channelId}`, (message) => {
          const res = JSON.parse(message.body) as ChannelMessage;
          setMessages((cur) => [...cur, res]);
        });
      },
      onWebSocketError: (error) => {
        console.log("error occurred with: ", error);
      },
      onStompError: (frame) => {
        console.dir(`Broker reported error: ${frame.headers.message}`);
        console.dir(`Additional details: ${frame}`);
      },
    });
    client.current.activate();
  };
  const disconnect = () => {
    client.current?.deactivate();
  };

  useEffect(() => {
    connect(channel.id);
    return () => {
      disconnect();
    };
  }, []);
  useEffect(() => {
    if (channelMessages) {
      setMessages(channelMessages.data);
    }
  }, [channelMessages]);
  return (
    <Flex direction={"column"} gap={6}>
      <Flex align={"center"} justify={"space-between"}>
        <Text color={"lightGreen"} fontWeight={"bold"}>
          {`${channel.name} 채널 (${channel.participants.length})`}
        </Text>
        <Flex align={"center"} gap={2}>
          <Button
            colorScheme={"green"}
            onClick={() => {
              openModal(InviteChannelModal, { channel });
            }}
          >
            초대
          </Button>
          <Button
            colorScheme={"red"}
            variant={"outline"}
            onClick={() => {
              openConfirm({
                title: "채널 나가기",
                content: "정말 채널을 나가시겠습니까?",
                onConfirm: () => {
                  exitChannel(
                    { channel_id: channel.id },
                    {
                      onSuccess: () => {
                        push(toUrl(PageRoutes.Channels));
                      },
                    },
                  );
                },
              });
            }}
          >
            나가기
          </Button>
        </Flex>
      </Flex>
      <ChannelMessageList
        onLoad={() => {
          setLimitCount((cur) => cur + 10);
        }}
        channel={channel}
        channelMessages={messages}
        channelMessagesTotalCount={channelMessages?.total_count ?? 0}
      />
      <WriteChannelMessageForm channelId={channel.id} />
    </Flex>
  );
};

export default ChannelDetail;
