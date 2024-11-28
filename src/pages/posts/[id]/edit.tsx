import Head from "next/head";
import { DetailSkeleton, EditPostForm, ResponsiveLayout } from "@/components";
import { useSafePush } from "@/hooks";
import { Flex, Text } from "@chakra-ui/react";
import { useGetPost } from "@/apis";

const HOME_TITLE = "게시글 수정 - 초로";
const HOME_DESC = "초보 개발자 강인재(chobolevel)의 블로그 게시글 수정";
const CATEGORIES = [
  "개발",
  "블로그",
  "초로",
  "초보 개발자의 블로그",
  "cholo",
  "chobolevel",
  "게시글",
  "게시글 수정",
];

const EditPostPage = () => {
  const { router } = useSafePush();

  const {
    data: post,
    isError,
    error,
  } = useGetPost({
    id: Number(router.query.id ?? 0),
  });
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
          content={`https://chobolevel.site${router.asPath}}`}
        />
      </Head>
      <ResponsiveLayout>
        <Flex p={4} direction={"column"} gap={4}>
          <Text>게시글 수정</Text>
          {post ? (
            <EditPostForm post={post} />
          ) : isError ? (
            <Text>{error?.response?.data.error_message}</Text>
          ) : (
            <DetailSkeleton />
          )}
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default EditPostPage;
