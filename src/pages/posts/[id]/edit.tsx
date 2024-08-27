import Head from "next/head";
import { EditPostForm, ResponsiveLayout } from "@/components";
import { useSafePush } from "@/hooks";
import { Flex, Text } from "@chakra-ui/react";
import { useGetPost } from "@/apis";

const HOME_TITLE = "초로 - 초보 개발자의 블로그";
const HOME_DESC = "초보 개발자의 블로그 목록";
const DIVING_CATEGORIES = ["개발", "블로그"];

const EditPostPage = () => {
  const { push, router } = useSafePush();

  const { data: post } = useGetPost({
    id: Number(router.query.id ?? 0),
  });
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
        <Flex p={4} direction={"column"} gap={4}>
          <Text>게시글 수정</Text>
          {post ? <EditPostForm post={post} /> : <Flex>Not Found</Flex>}
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default EditPostPage;
