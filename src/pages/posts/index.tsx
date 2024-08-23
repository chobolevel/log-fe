import Head from "next/head";
import { useState } from "react";
import { useGetPosts } from "@/apis";
import { Pagination, PostList, ResponsiveLayout } from "@/components";
import { Button, Flex, Input, Select, Text } from "@chakra-ui/react";
import { useSafePush } from "@/hooks";
import { PageRoutes } from "@/constants";

const HOME_TITLE = "초로 - 초보 개발자의 블로그";
const HOME_DESC = "초보 개발자의 블로그 목록";
const DIVING_CATEGORIES = ["개발", "블로그"];

const LIMIT_COUNT = 10;

type KeywordType = "title" | "content";

const PostListPage = () => {
  const { push, router } = useSafePush();
  const [page, setPage] = useState<number>(1);
  const [keywordType, setKeywordType] = useState<KeywordType>("title");
  const [keyword, setKeyword] = useState<string>("");

  const { data: posts } = useGetPosts({
    skipCount: (page - 1) * LIMIT_COUNT,
    limitCount: LIMIT_COUNT,
    tagId: router.query.tag ? Number(router.query.tag) : undefined,
    title: (router.query.title as string) ?? undefined,
    content: (router.query.content as string) ?? undefined,
    orderTypes: ["CREATED_AT_DESC"],
  });

  const handleSearch = () => {
    delete router.query.title;
    delete router.query.content;
    push({
      pathname: PageRoutes.Posts,
      query: { ...router.query, [keywordType]: keyword },
    });
  };
  return (
    <>
      <Head>
        <title>{HOME_TITLE}</title>

        {/*view port*/}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/*meta*/}
        <meta name="title" content={HOME_TITLE} />
        <meta name="description" content={HOME_DESC} />
        {/*<meta property="image" content="/images/swiper/slide5.jpeg" />*/}
        <meta name="publisher" content={"chobolevel"} />
        <meta name="author" content={"초로"} />
        <meta name="classification" content={DIVING_CATEGORIES.join(", ")} />
        <meta name="subject" content={DIVING_CATEGORIES.join(", ")} />

        {/*링크*/}
        {/*<link rel="canonical" href="https://hankkang.com" />*/}
        {/*<link rel="icon" href="https://hankkang.com/hankkang-logo.png" />*/}

        {/*공유하기*/}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={HOME_TITLE} />
        <meta property="og:description" content={HOME_DESC} />
        {/*<meta property="og:image" content="/images/swiper/slide5.jpeg" />*/}
        {/*<meta property="og:url" content={"https://hankkang.com"} />*/}
      </Head>
      <ResponsiveLayout>
        <Flex p={4} direction={"column"} gap={6}>
          <Flex justify={"space-between"} align={"center"}>
            <Text>전체 게시글</Text>
            <Flex gap={2}>
              <Select
                w={100}
                value={keywordType}
                onChange={(e) => {
                  setKeywordType(e.target.value as KeywordType);
                }}
              >
                <option value={"title"}>제목</option>
                <option value={"content"}>내용</option>
              </Select>
              <Input
                type={"text"}
                placeholder={"키워드를 입력하세요."}
                w={300}
                value={keyword}
                onChange={(e) => {
                  setKeyword(e.target.value);
                }}
              />
              <Button onClick={handleSearch}>검색</Button>
            </Flex>
          </Flex>
          {posts ? (
            <Flex direction={"column"} gap={6}>
              <PostList posts={posts.data} />
              <Pagination
                currentPage={page}
                limit={LIMIT_COUNT}
                total={posts.total_count}
                onChange={setPage}
              />
            </Flex>
          ) : (
            <Flex>게시글이 없습니다.</Flex>
          )}
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default PostListPage;
