import Head from "next/head";
import { useSafePush } from "@/hooks";
import { ChannelList, Pagination, ResponsiveLayout } from "@/components";

import { Button, Flex, Spinner, Text } from "@chakra-ui/react";
import { useGetChannels, useGetMe } from "@/apis";
import { toUrl } from "@/utils";
import { PageRoutes } from "@/constants";
import { LuRefreshCcw } from "react-icons/lu";
import { useState } from "react";

const HOME_TITLE = "채널 목록 - 초로";
const HOME_DESC =
  "초보 개발자 강인재(chobolevel)가 운영하는 개인 블로그 초로의 다양한 채널에서 사용자와 소통해보세요!";
const CATEGORIES = [
  "개발",
  "블로그",
  "초로",
  "초보 개발자의 로그",
  "cholo",
  "chobolevel",
];
const LIMIT_COUNT = 5;

const ChannelsPage = () => {
  const { push, router } = useSafePush();
  const [page, setPage] = useState<number>(1);

  const { data: me } = useGetMe();
  const {
    data: channels,
    isFetching,
    refetch,
  } = useGetChannels(
    {
      skipCount: (page - 1) * LIMIT_COUNT,
      limitCount: LIMIT_COUNT,
      orderTypes: ["CREATED_AT_DESC"],
    },
    !!me,
  );
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
          href={`https://chobolevel.co.kr${router.asPath}`}
        />
        <link rel="icon" href="https://chobolevel.co.kr/images/main-logo.png" />

        {/*공유하기*/}
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:site_name" content={"초로"} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={HOME_TITLE} />
        <meta property="og:description" content={HOME_DESC} />
        <meta property="og:image" content="/images/main-logo.png" />
        <meta
          property="og:url"
          content={`https://chobolevel.co.kr${router.asPath}`}
        />
      </Head>
      <ResponsiveLayout>
        <Flex p={4} direction={"column"} gap={4}>
          <Flex align={"center"} justify={"space-between"}>
            <Text color={"lightGreen"} fontWeight={"bold"}>
              참여중인 채널
            </Text>
            <Flex gap={2}>
              <Button
                onClick={() => {
                  refetch();
                }}
              >
                <LuRefreshCcw size={20} />
              </Button>
              <Button
                colorScheme={"green"}
                onClick={() => {
                  push(toUrl(PageRoutes.WriteChannel));
                }}
              >
                채널 생성
              </Button>
            </Flex>
          </Flex>

          {channels ? (
            isFetching ? (
              <Flex
                direction={"column"}
                justify={"center"}
                align={"center"}
                h={200}
              >
                <Spinner size={"lg"} />
              </Flex>
            ) : (
              <>
                <ChannelList channels={channels.data} />
                <Flex direction={"column"}>
                  <Pagination
                    currentPage={page}
                    limit={LIMIT_COUNT}
                    total={channels.total_count}
                    onChange={setPage}
                  />
                </Flex>
              </>
            )
          ) : (
            <Flex
              direction={"column"}
              justify={"center"}
              align={"center"}
              h={200}
            >
              <Spinner size={"lg"} />
            </Flex>
          )}
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default ChannelsPage;
