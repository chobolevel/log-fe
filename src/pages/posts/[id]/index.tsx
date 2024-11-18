import { Api, ApiResponse, Post } from "@/apis";
import Head from "next/head";
import { DetailSkeleton, PostDetail, ResponsiveLayout } from "@/components";
import { Button, Flex, Text } from "@chakra-ui/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { QueryParser, toUrl } from "@/utils";
import { ApiRoutes, PageRoutes } from "@/constants";
import { Nullable } from "@/types";
import { Suspense } from "react";
import { useSafePush } from "@/hooks";

const HOME_TITLE = "초로 - 초보 개발자의 블로그";
const HOME_DESC = "초보 개발자의 블로그";
const CATEGORIES = [
  "개발",
  "블로그",
  "초로",
  "초보 개발자의 블로그",
  "cholo",
  "chobolevel",
  "게시글",
];

const PostDetailPage = ({
  post,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { push } = useSafePush();
  return (
    <>
      <Head>
        <title>{post ? `초로 - ${post.title}` : HOME_TITLE}</title>

        {/*view port*/}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/*meta*/}
        <link rel="icon" href="/favicon.ico" />
        <meta name="title" content={post ? post.title : HOME_TITLE} />
        <meta name="description" content={post ? post.sub_title : HOME_DESC} />
        <meta property="image" content="/images/main-logo.png" />
        <meta name="publisher" content={"chobolevel"} />
        <meta name="author" content={"chobolevel"} />
        <meta name="classification" content={CATEGORIES.join(", ")} />
        <meta name="subject" content={CATEGORIES.join(", ")} />

        {/*링크*/}
        <link rel="canonical" href="https://chobolevel.site" />
        <link rel="icon" href="https://chobolevel.site/images/main-logo.png" />

        {/*공유하기*/}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={post ? `초로 - ${post.title}` : HOME_TITLE}
        />
        <meta
          property="og:description"
          content={post ? post.sub_title : "초보 개발자의 블로그"}
        />
        <meta property="og:image" content="/images/main-logo.png" />
        <meta property="og:url" content={"https://chobolevel.site"} />
      </Head>
      <ResponsiveLayout>
        <Flex p={4} direction={"column"} gap={4}>
          <Suspense fallback={<DetailSkeleton />}>
            {post ? (
              <PostDetail post={post} />
            ) : (
              <Flex
                direction={"column"}
                h={{ base: 300, lg: 600 }}
                justify={"center"}
                align={"center"}
                gap={6}
              >
                <Text>게시글을 찾을 수 없습니다.</Text>
                <Button
                  onClick={() => {
                    push(toUrl(PageRoutes.Posts));
                  }}
                >
                  게시글 목록
                </Button>
              </Flex>
            )}
          </Suspense>
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default PostDetailPage;

export const getServerSideProps: GetServerSideProps<{
  post: Nullable<Post>;
}> = async (context) => {
  const id = QueryParser.toNumber(context.query.id, undefined);

  if (id === undefined) {
    return {
      props: { post: null },
    };
  }

  const post = await Api.get<ApiResponse<Post>>(
    toUrl(ApiRoutes.Posts, { id }),
    undefined,
  )
    .then((res) => res.data)
    .catch(() => null);

  return {
    props: { post },
  };
};
