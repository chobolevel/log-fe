import Head from "next/head";
import { useEffect, useState } from "react";
import { useGetPosts } from "@/apis";
import {
  ListSkeleton,
  Pagination,
  PostList,
  PostSearchBox,
  ResponsiveLayout,
} from "@/components";
import { Flex, Text } from "@chakra-ui/react";
import { useSafePush } from "@/hooks";
import { PageRoutes } from "@/constants";

const HOME_TITLE = "모든 게시글 - 초로";
const HOME_DESC =
  "초보 개발자 강인재(chobolevel)가 운영하는 개인 블로그 초로의 게시글 목록";
const CATEGORIES = [
  "개발",
  "블로그",
  "초로",
  "초보 개발자의 로그",
  "cholo",
  "chobolevel",
  "게시글",
];

const LIMIT_COUNT = 8;

const PostListPage = () => {
  const { push, router } = useSafePush();
  const [page, setPage] = useState<number>(Number(router.query.page ?? 1));

  const {
    data: posts,
    isError,
    isFetching,
  } = useGetPosts({
    skipCount: (page - 1) * LIMIT_COUNT,
    limitCount: LIMIT_COUNT,
    tagId: router.query.tag ? Number(router.query.tag) : undefined,
    title: (router.query.title as string) ?? undefined,
    subTitle: (router.query.subTitle as string) ?? undefined,
    orderTypes: ["CREATED_AT_DESC"],
  });

  useEffect(() => {
    setPage(Number(router.query.page ?? 1));
  }, [router.query]);
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
        <Flex p={4} direction={"column"} gap={6}>
          <PostSearchBox totalCount={posts?.total_count ?? 0} />
          {posts ? (
            isFetching ? (
              <ListSkeleton />
            ) : posts.total_count > 0 ? (
              <Flex direction={"column"} gap={6}>
                <PostList posts={posts.data} />
                <Pagination
                  currentPage={page}
                  limit={LIMIT_COUNT}
                  total={posts.total_count}
                  onChange={(page) => {
                    push({
                      pathname: PageRoutes.Posts,
                      query: { ...router.query, page },
                    });
                  }}
                />
              </Flex>
            ) : (
              <Flex
                h={{ base: 150, lg: 300 }}
                direction={"column"}
                justify={"center"}
                align={"center"}
              >
                <Text
                  whiteSpace={"break-spaces"}
                  textAlign={"center"}
                  fontWeight={"bold"}
                >
                  {"️🥹검색 조건에 맞는 게시글이 없습니다.🥹"}
                </Text>
              </Flex>
            )
          ) : isError ? (
            <Flex
              h={{ base: 150, lg: 300 }}
              direction={"column"}
              justify={"center"}
              align={"center"}
            >
              <Text
                whiteSpace={"break-spaces"}
                textAlign={"center"}
                fontWeight={"bold"}
              >
                {"️🙅게시글을 찾을 수 없습니다.🙅\n다시 시도해 주세요!"}
              </Text>
            </Flex>
          ) : (
            <ListSkeleton />
          )}
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default PostListPage;
