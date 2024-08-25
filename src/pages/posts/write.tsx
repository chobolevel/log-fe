import Head from "next/head";
import { QuillTextEditor, ResponsiveLayout } from "@/components";
import { Button, Flex, Input, Select, Text } from "@chakra-ui/react";
import { useGetTags } from "@/apis";
import { useSafePush } from "@/hooks";
import { toUrl } from "@/utils";
import { PageRoutes } from "@/constants";

const HOME_TITLE = "초로 - 초보 개발자의 블로그";
const HOME_DESC = "초보 개발자의 블로그 목록";
const DIVING_CATEGORIES = ["개발", "블로그"];

const WritePostPage = () => {
  const { push } = useSafePush();

  const { data: tags } = useGetTags();
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
        <Flex as={"form"} p={4} direction={"column"} gap={4}>
          <Text>게시글 작성</Text>
          <Flex direction={"column"} gap={6}>
            <Flex>
              <Select placeholder={"TAG"}>
                {tags?.data.map((tag, idx) => {
                  return (
                    <option key={idx} value={tag.id}>
                      {tag.name}
                    </option>
                  );
                })}
              </Select>
            </Flex>
            <Flex direction={"column"} gap={2}>
              <Input type={"text"} placeholder={"TITLE"} />
            </Flex>
            <Flex direction={"column"} gap={2}>
              <Input type={"text"} placeholder={"SUB_TITLE"} />
            </Flex>
            <Flex direction={"column"}>
              <QuillTextEditor
                value={""}
                onChange={(val) => {
                  console.log(val);
                }}
              />
            </Flex>
            <Flex justify={"end"} align={"center"} gap={2}>
              <Button
                onClick={() => {
                  push(toUrl(PageRoutes.Posts));
                }}
              >
                취소
              </Button>
              <Button colorScheme={"green"} type={"submit"}>
                등록
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default WritePostPage;
