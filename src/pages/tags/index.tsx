import Head from "next/head";
import { ResponsiveLayout, TagList } from "@/components";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import { useGetTags } from "@/apis";
import { useSafePush } from "@/hooks";

const HOME_TITLE = "초로 - 모든 태그";
const HOME_DESC = "초보 개발자의 블로그 태그 목록";
const CATEGORIES = [
  "개발",
  "블로그",
  "초로",
  "초보 개발자의 블로그",
  "cholo",
  "chobolevel",
  "태그",
];

const TagListPage = () => {
  const { router } = useSafePush();

  const { data: tags, isFetching } = useGetTags();
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
        <meta
          property="og:url"
          content={`https://chobolevel.site${router.asPath}`}
        />
      </Head>
      <ResponsiveLayout>
        <Flex p={4} direction={"column"} gap={4}>
          <Text color={"lightGreen"} fontWeight={"bold"}>
            태그
          </Text>
          <Flex direction={"column"}>
            {tags ? (
              isFetching ? (
                <Flex
                  w={"100%"}
                  h={{ base: 200, lg: 300 }}
                  direction={"column"}
                  justify={"center"}
                  align={"center"}
                >
                  <Spinner size={"lg"} />
                </Flex>
              ) : (
                <TagList tags={tags.data} />
              )
            ) : (
              <Flex>태그 목록이 존재하지 않습니다.</Flex>
            )}
          </Flex>
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default TagListPage;
