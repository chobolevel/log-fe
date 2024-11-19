import { ListSkeleton, PostList, ResponsiveLayout } from "@/components";
import Head from "next/head";
import { useGetPosts } from "@/apis";
import { Flex, Text } from "@chakra-ui/react";

const HOME_TITLE = "초로 - 초보 개발자의 블로그";
const HOME_DESC = "초보 개발자의 블로그";
const CATEGORIES = [
  "개발",
  "블로그",
  "초로",
  "초보 개발자의 블로그",
  "cholo",
  "chobolevel",
];

export default function HomePage() {
  const {
    data: posts,
    isError,
    error,
  } = useGetPosts({
    skipCount: 0,
    limitCount: 5,
    orderTypes: ["CREATED_AT_DESC"],
  });
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
        <link rel="canonical" href="https://chobolevel.site" />
        <link rel="icon" href="https://chobolevel.site/images/main-logo.png" />

        {/*웹 마스터 도구*/}
        <meta
          name="naver-site-verification"
          content="feeafc253d837182ad237200dd12ac55bbc3da5c"
        />
        <meta
          name="google-site-verification"
          content="obf1F82VgJTwj1comoY_Yc8KQU_hH3UnoZ1gDD6zYIc"
        />

        {/*공유하기*/}
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:site_name" content={"초로"} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={HOME_TITLE} />
        <meta property="og:description" content={HOME_DESC} />
        <meta property="og:image" content="/images/main-logo.png" />
        <meta property="og:url" content={"https://chobolevel.site"} />
      </Head>
      <ResponsiveLayout>
        <Flex p={4} direction={"column"} gap={4}>
          <Text color={"lightGreen"} fontWeight={"bold"}>
            최신글
          </Text>
          {posts ? (
            <PostList posts={posts.data} />
          ) : isError ? (
            <Text>{error?.response?.data.error_message}</Text>
          ) : (
            <ListSkeleton />
          )}
        </Flex>
      </ResponsiveLayout>
    </>
  );
}
