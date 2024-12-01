import Head from "next/head";
import {
  ChannelMessageList,
  ResponsiveLayout,
  WriteChannelMessageForm,
} from "@/components";
import { useSafePush } from "@/hooks";
import * as StompJs from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import {
  ChannelMessage,
  useCreateChannelMessage,
  useGetChannelMessages,
} from "@/apis/domains/channelMessage";
import { Flex, Text } from "@chakra-ui/react";
import { useGetChannel, useGetMe } from "@/apis";

const HOME_TITLE = "채널 - 초로";
const HOME_DESC =
  "초보 개발자 강인재(chobolevel)의 블로그에서 다양한 채널에서 사용자와 소통해보세요!";
const CATEGORIES = [
  "개발",
  "블로그",
  "초로",
  "초보 개발자의 블로그",
  "cholo",
  "chobolevel",
];

const ChannelDetailPage = () => {
  const { router } = useSafePush();
  const [messages, setMessages] = useState<ChannelMessage[]>([]);

  const { mutate: createChannelMessage } = useCreateChannelMessage();
  const { data: channel } = useGetChannel(
    {
      id: Number(router.query.id ?? 0),
    },
    !!router.query.id,
  );
  const { data: me } = useGetMe();
  const { data: channelMessages } = useGetChannelMessages(
    {
      channel_id: Number(router.query.id ?? 0),
    },
    !!router.query.id,
  );

  // stomp 기능 로직
  const client = useRef<StompJs.Client>();

  const connect = (channelId: number) => {
    console.log("connecting...");
    client.current = new StompJs.Client({
      brokerURL: "ws://localhost:9565/ws",
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
    if (channel) {
      connect(channel.id);
    }
    return () => {
      disconnect();
    };
  }, [channel]);
  useEffect(() => {
    if (channelMessages) {
      setMessages(channelMessages.data);
    }
  }, [channelMessages]);
  return (
    <>
      <Head>
        <title>{HOME_TITLE}</title>

        {/*view port*/}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/*meta*/}
        <link rel="icon" href="/favicon.ico" />
        <meta name="title" content={HOME_TITLE} />
        <meta name="description" content={HOME_DESC} />
        <meta property="image" content="/images/main-logo.png" />
        <meta name="publisher" content={"chobolevel"} />
        <meta name="author" content={"chobolevel"} />
        <meta name="classification" content={CATEGORIES.join(", ")} />
        <meta name="subject" content={CATEGORIES.join(", ")} />

        {/*링크*/}
        <link
          rel="canonical"
          href={`https://chobolevel.site${router.asPath}`}
        />
        <link rel="icon" href="https://chobolevel.site/images/main-logo.png" />

        {/*공유하기*/}
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:site_name" content={"초로"} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={HOME_TITLE} />
        <meta property="og:description" content={HOME_DESC} />
        <meta property="og:image" content="/images/main-logo.png" />
        <meta
          property="og:url"
          content={`https://chobolevel.site${router.asPath}`}
        />
      </Head>
      <ResponsiveLayout>
        <Flex p={4} direction={"column"} gap={4}>
          <Text color={"lightGreen"} fontWeight={"bold"}>
            채널
          </Text>
          {channel && (
            <>
              <ChannelMessageList channelMessages={messages} />
              <WriteChannelMessageForm channelId={channel.id} />
            </>
          )}
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default ChannelDetailPage;
