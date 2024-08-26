import Head from "next/head";
import { ClientEditor, ErrorText, ResponsiveLayout } from "@/components";
import {
  Button,
  Flex,
  Input,
  Select,
  Tag as ChakraTag,
  Text,
} from "@chakra-ui/react";
import { CreatePostRequest, Tag, useCreatePost, useGetTags } from "@/apis";
import { useSafePush } from "@/hooks";
import { toUrl } from "@/utils";
import { PageRoutes } from "@/constants";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { useModalStore } from "@/stores";

const HOME_TITLE = "초로 - 초보 개발자의 블로그";
const HOME_DESC = "초보 개발자의 블로그 목록";
const DIVING_CATEGORIES = ["개발", "블로그"];

const WritePostPage = () => {
  const { push } = useSafePush();
  const { openAlert } = useModalStore(["openAlert"]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreatePostRequest>();
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const { data: tags } = useGetTags();
  const { mutate: createPost } = useCreatePost();

  useEffect(() => {
    setValue("content", "<p>새로운 게시글</p>");
  }, []);
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
        <Flex
          as={"form"}
          p={4}
          direction={"column"}
          gap={4}
          onSubmit={handleSubmit(
            useCallback(
              (data) => {
                if (selectedTags.length < 1) {
                  openAlert({
                    title: "태그 필수 선택",
                    content: "태그는 최소 1개 이상 선택되어야 합니다.",
                  });
                  return;
                } else {
                  data.tag_ids = selectedTags.map((t) => t.id);
                }
                createPost(data, {
                  onSuccess: () => {
                    push(toUrl(PageRoutes.Posts))?.then(() => {
                      openAlert({
                        title: "게시글 등록 완료",
                        content: "게시글 목록 화면으로 이동합니다.",
                      });
                    });
                  },
                });
              },
              [selectedTags],
            ),
          )}
        >
          <Text>게시글 작성</Text>
          <Flex direction={"column"} gap={6}>
            <Flex direction={"column"} gap={2}>
              <Select
                placeholder={"TAG"}
                value={""}
                onChange={(e) => {
                  const tagId = Number(e.target.value);
                  const foundTag = tags?.data.find((t) => t.id === tagId);
                  if (foundTag) {
                    if (
                      selectedTags.findIndex((t) => t.id === foundTag.id) > -1
                    ) {
                      openAlert({
                        title: "태그 중복 선택",
                        content: "이미 선택된 태그입니다.",
                      });
                      return;
                    }
                    setSelectedTags((cur) => [...cur, foundTag]);
                    return;
                  }
                }}
              >
                {tags?.data.map((tag, idx) => {
                  return (
                    <option key={idx} value={tag.id}>
                      {tag.name}
                    </option>
                  );
                })}
              </Select>
              <Flex gap={2}>
                {selectedTags.map((tag, idx) => {
                  return (
                    <ChakraTag
                      key={idx}
                      colorScheme={"green"}
                      fontWeight={"bold"}
                      size={"lg"}
                      cursor={"pointer"}
                      onClick={() => {
                        setSelectedTags((cur) =>
                          cur.filter((t) => t.id !== tag.id),
                        );
                      }}
                    >
                      {tag.name}
                    </ChakraTag>
                  );
                })}
              </Flex>
              <ErrorMessage
                name={"tag_ids"}
                errors={errors}
                render={({ message }) => <ErrorText>{message}</ErrorText>}
              />
            </Flex>
            <Flex direction={"column"} gap={2}>
              <Input
                type={"text"}
                placeholder={"TITLE"}
                {...register("title", {
                  required: "제목이 입력되지 않았습니다.",
                })}
              />
              <ErrorMessage
                name={"title"}
                errors={errors}
                render={({ message }) => <ErrorText>{message}</ErrorText>}
              />
            </Flex>
            <Flex direction={"column"} gap={2}>
              <Input
                type={"text"}
                placeholder={"SUB_TITLE"}
                {...register("sub_title", {
                  required: "부제목이 입력되지 않았습니다.",
                })}
              />
              <ErrorMessage
                name={"sub_title"}
                errors={errors}
                render={({ message }) => <ErrorText>{message}</ErrorText>}
              />
            </Flex>
            <Flex direction={"column"}>
              <ClientEditor
                onChange={(content) => {
                  setValue("content", content);
                }}
              />
              <ErrorMessage
                name={"content"}
                errors={errors}
                render={({ message }) => <ErrorText>{message}</ErrorText>}
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
