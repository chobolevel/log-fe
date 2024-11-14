import { useCallback, useEffect, useRef, useState } from "react";
import { toUrl } from "@/utils";
import { PageRoutes } from "@/constants";
import {
  Button,
  Flex,
  Image,
  Input,
  Select,
  Tag as ChakraTag,
  Text,
} from "@chakra-ui/react";
import { ErrorMessage } from "@hookform/error-message";
import { ClientEditor, ErrorText, ImageUploader } from "@/components";
import { useSafePush } from "@/hooks";
import { useModalStore } from "@/stores";
import { useForm } from "react-hook-form";
import { CreatePostRequest, Tag, useCreatePost, useGetTags } from "@/apis";
import { MdAddPhotoAlternate } from "react-icons/md";

const WritePostForm = () => {
  const { push } = useSafePush();
  const { openAlert } = useModalStore(["openAlert"]);
  const thumbNailInputRef = useRef<HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreatePostRequest>();
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const { data: tags } = useGetTags();
  const { mutate: createPost } = useCreatePost();

  useEffect(() => {
    setValue("content", "<p>새로운 게시글</p>");
  }, []);
  return (
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
            w={{ base: "100%", lg: 200 }}
            placeholder={"태그를 선택하세요."}
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
        <Flex justify={"space-between"} align={"center"} gap={4}>
          <Flex direction={"column"} gap={4} flex={1}>
            <Flex direction={"column"} gap={2}>
              <Input
                w={{ base: "100%", md: 400, lg: 500 }}
                type={"text"}
                placeholder={"제목을 입력하세요."}
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
                w={{ base: "100%", md: 500, lg: 700 }}
                type={"text"}
                placeholder={"부제목을 입력하세요."}
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
          </Flex>
          <Flex
            direction={"column"}
            justify={"center"}
            align={"center"}
            gap={2}
          >
            <Text fontSize={"sm"} fontWeight={"bold"}>
              썸네일(100 x 100)
            </Text>
            <ImageUploader
              inputRef={thumbNailInputRef}
              onUpload={(url, filename) => {
                setValue("thumb_nail_image", {
                  type: "THUMB_NAIL",
                  name: filename,
                  url: url,
                  width: 100,
                  height: 100,
                });
              }}
            />
            {watch("thumb_nail_image") ? (
              <Image
                w={"100px"}
                h={"100px"}
                src={watch("thumb_nail_image.url")}
                alt={watch("thumb_nail_image.name")}
                border={"1px solid"}
                borderColor={"lightGray"}
                borderRadius={10}
                cursor={"pointer"}
                objectFit={"cover"}
                onClick={() => {
                  thumbNailInputRef.current?.click();
                }}
              />
            ) : (
              <Button
                w={"100px"}
                h={"100px"}
                borderRadius={10}
                cursor={"pointer"}
                onClick={() => {
                  thumbNailInputRef.current?.click();
                }}
              >
                <MdAddPhotoAlternate size={50} />
              </Button>
            )}
          </Flex>
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
  );
};

export default WritePostForm;
