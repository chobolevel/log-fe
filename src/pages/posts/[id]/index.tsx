import { Api, ApiResponse, Post } from "@/apis";
import Head from "next/head";
import { DetailSkeleton, PostDetail, ResponsiveLayout } from "@/components";
import { Button, Flex, Text } from "@chakra-ui/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { QueryParser, toUrl } from "@/utils";
import { ApiRoutes, PageRoutes } from "@/constants";
import { Nullable } from "@/types";
import { useEffect, useState } from "react";
import { useSafePush } from "@/hooks";

const PostDetailPage = ({
  post,
  metadata,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { push, router } = useSafePush();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <>
      <Head>
        <title>{metadata.title}</title>

        {/*view port*/}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/*meta*/}
        <link rel="icon" href="/favicon.ico" />
        <meta name="title" content={metadata.title} />
        <meta name="description" content={metadata.description} />
        <meta property="image" content="/images/main-logo.png" />
        <meta name="publisher" content={"chobolevel"} />
        <meta name="author" content={"chobolevel"} />
        <meta name="classification" content={metadata.categories.join(", ")} />
        <meta name="subject" content={metadata.categories.join(", ")} />

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
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content="/images/main-logo.png" />
        <meta
          property="og:url"
          content={`https://chobolevel.site${router.asPath}`}
        />
      </Head>
      <ResponsiveLayout>
        <Flex p={4} direction={"column"} gap={4}>
          {loading ? (
            <DetailSkeleton />
          ) : post ? (
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
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default PostDetailPage;

export const getServerSideProps: GetServerSideProps<{
  post: Nullable<Post>;
  metadata: { title: string; description: string; categories: string[] };
}> = async (context) => {
  const id = QueryParser.toNumber(context.query.id, undefined);
  const metadata = {
    title: "초로 - 초보 개발자의 블로그",
    description: "초보 개발자의 블로그",
    categories: [
      "개발",
      "블로그",
      "초로",
      "초보 개발자의 블로그",
      "cholo",
      "chobolevel",
      "게시글",
    ],
  };

  if (id === undefined) {
    return {
      props: { post: null, metadata },
    };
  }

  return await Api.get<ApiResponse<Post>>(
    toUrl(ApiRoutes.Posts, { id }),
    undefined,
  )
    .then((res) => {
      return {
        props: {
          post: res.data,
          metadata: {
            title: `초로 - ${res.data.title}`,
            description: res.data.sub_title,
            categories: [
              ...metadata.categories,
              ...res.data.tags.map((t) => t.name),
            ],
          },
        },
      };
    })
    .catch(() => {
      return {
        props: {
          post: null,
          metadata,
        },
      };
    });
};
