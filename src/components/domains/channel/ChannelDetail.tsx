import { Button, Flex, Spinner, Text } from "@chakra-ui/react";
import {
  Api,
  Channel,
  ChannelMessage,
  ID,
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
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

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

  const connect = (channelId: ID) => {
    setIsConnected(false);
    const accessToken = Api.instance.defaults.headers.common[
      "Authorization"
    ] as string;
    if (!accessToken) return;
    client.current = new StompJs.Client({
      brokerURL: `${process.env.NODE_ENV === "development" ? "http" : "https"}://${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/ws`,
      connectHeaders: {
        Authorization: accessToken,
      },
      reconnectDelay: 5000,
      onConnect: () => {
        setIsConnected(true);
        subscribeMessage(accessToken, channelId);
      },
      onWebSocketError: (error) => {
        disconnect();
        setIsError(true);
        console.log("error occurred with: ", error);
      },
      onStompError: (frame) => {
        disconnect();
        setIsError(true);
        console.log(`Broker reported error: ${frame.headers.message}`);
        console.log(`Additional details: ${frame}`);
      },
    });
    client.current.activate();
  };
  const disconnect = () => {
    setIsConnected(false);
    client.current?.deactivate();
  };
  const subscribeMessage = (accessToken: string, channelId: ID) => {
    client.current?.subscribe(
      `/sub/channels/${channelId}`,
      (message) => {
        const res = JSON.parse(message.body) as ChannelMessage;
        setMessages((cur) => [...cur, res]);
      },
      {
        Authorization: accessToken,
      },
    );
  };
  const publishMessage = (content: string) => {
    const accessToken = Api.instance.defaults.headers.common[
      "Authorization"
    ] as string;
    if (!accessToken) {
      setIsConnected(false);
      return;
    }
    client.current?.publish({
      destination: `/pub/channels/${channel.id}/messages`,
      headers: {
        Authorization: accessToken,
      },
      body: JSON.stringify({ type: "TALK", content }),
    });
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
      {isConnected ? (
        <>
          <Flex align={"center"} justify={"space-between"}>
            <Text color={"lightGreen"} fontWeight={"bold"}>
              {`${channel.name} (${channel.participants.length})`}
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
                      disconnect();
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
          <WriteChannelMessageForm
            channelId={channel.id}
            onSend={(content) => {
              publishMessage(content);
            }}
          />
        </>
      ) : (
        <Flex
          direction={"column"}
          justify={"center"}
          align={"center"}
          h={500}
          gap={4}
          fontWeight={"bold"}
        >
          {isError ? (
            <>
              <Text>채널에 연결할 수 없습니다.</Text>
              <Text>관리자에게 문의해 주시기 바랍니다.</Text>
            </>
          ) : (
            <>
              <Spinner size={"lg"} />
              <Text>채널에 연결중...</Text>
            </>
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default ChannelDetail;
