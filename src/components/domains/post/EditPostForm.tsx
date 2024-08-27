import {
  Post,
  Tag,
  UpdatePostRequest,
  useGetTags,
  useUpdatePost,
} from "@/apis";
import {
  Button,
  Flex,
  Input,
  Select,
  Tag as ChakraTag,
  Text,
} from "@chakra-ui/react";
import { ClientEditor, ErrorText } from "@/components";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import { useModalStore } from "@/stores";
import { ErrorMessage } from "@hookform/error-message";
import { useSafePush } from "@/hooks";
import { toUrl } from "@/utils";
import { PageRoutes } from "@/constants";

interface EditPostFormProps {
  post: Post;
}

const EditPostForm = ({ post }: EditPostFormProps) => {
  const { push } = useSafePush();
  const { openAlert } = useModalStore(["openAlert"]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdatePostRequest>();

  const { data: tags } = useGetTags();
  const { mutate: updatePost } = useUpdatePost();

  useEffect(() => {
    setValue("id", post.id);
    setValue(
      "tag_ids",
      post.tags.map((t) => t.id),
    );
    setSelectedTags(post.tags);
    setValue("title", post.title);
    setValue("sub_title", post.sub_title);
    setValue("content", post.content);
    setValue("update_mask", ["TAGS", "TITLE", "SUB_TITLE", "CONTENT"]);
  }, [post]);
  return (
    <Flex
      as={"form"}
      p={4}
      direction={"column"}
      gap={4}
      onSubmit={handleSubmit(
        useCallback((data) => {
          if (selectedTags.length < 1) {
            openAlert({
              title: "태그 필수 선택",
              content: "태그는 최소 1개 이상 선택되어야 합니다.",
            });
            return;
          } else {
            data.tag_ids = selectedTags.map((t) => t.id);
          }
          updatePost(data, {
            onSuccess: () => {
              push(toUrl(PageRoutes.PostDetailById, { id: post.id }))?.then(
                () => {
                  openAlert({
                    title: "게시글 수정",
                    content: "게시글 수정이 완료되었습니다.",
                  });
                },
              );
            },
          });
        }, []),
      )}
    >
      <Text>게시글 수정</Text>
      <Flex direction={"column"} gap={2}>
        <Select
          w={{ base: "100%", lg: 200 }}
          placeholder={"TAG"}
          value={""}
          onChange={(e) => {
            const tagId = Number(e.target.value);
            const foundTag = tags?.data.find((t) => t.id === tagId);
            if (foundTag) {
              if (selectedTags.findIndex((t) => t.id === foundTag.id) > -1) {
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
        <Flex gap={2} flexWrap={"wrap"}>
          {selectedTags.map((tag, idx) => {
            return (
              <ChakraTag
                key={idx}
                colorScheme={"green"}
                fontWeight={"bold"}
                size={"lg"}
                cursor={"pointer"}
                onClick={() => {
                  setSelectedTags((cur) => cur.filter((t) => t.id !== tag.id));
                }}
              >
                {tag.name}
              </ChakraTag>
            );
          })}
        </Flex>
      </Flex>
      <Flex direction={"column"} gap={2}>
        <Input
          type={"text"}
          placeholder={"TITLE"}
          {...register("title", { required: "제목이 입력되지 않았습니다." })}
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
      <Flex direction={"column"} gap={2}>
        <ClientEditor
          value={post.content}
          onChange={(content) => {
            setValue("content", content);
          }}
        />
      </Flex>
      <Flex justify={"end"} align={"center"} gap={2}>
        <Button
          onClick={() => {
            push(toUrl(PageRoutes.PostDetailById, { id: post.id }));
          }}
        >
          취소
        </Button>
        <Button colorScheme={"green"} type={"submit"}>
          수정
        </Button>
      </Flex>
    </Flex>
  );
};

export default EditPostForm;
