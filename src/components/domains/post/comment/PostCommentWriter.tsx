import { Button, Flex, Input, Textarea } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {
  CreatePostCommentRequest,
  useCreatePostComment,
} from "@/apis/domains/postComment";
import { useCallback } from "react";
import { Post } from "@/apis";
import { ErrorMessage } from "@hookform/error-message";
import { ErrorText } from "@/components";

interface PostCommentWriterProps {
  post: Post;
}

const PostCommentWriter = ({ post }: PostCommentWriterProps) => {
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<CreatePostCommentRequest>({
    defaultValues: {
      post_id: post.id,
    },
  });

  const { mutate: createPostComment } = useCreatePostComment();
  return (
    <Flex
      w={"100%"}
      as={"form"}
      direction={"column"}
      gap={4}
      onSubmit={handleSubmit(
        useCallback((data) => {
          createPostComment(data, {
            onSuccess: () => {
              resetField("writer_name");
              resetField("password");
              resetField("content");
            },
          });
        }, []),
      )}
    >
      <Flex gap={2}>
        <Flex direction={"column"} flex={1} gap={2}>
          <Input
            type={"text"}
            placeholder={"이름"}
            {...register("writer_name", {
              required: "이름이 입력되지 않았습니다.",
            })}
          />
          <ErrorMessage
            name={"writer_name"}
            errors={errors}
            render={({ message }) => <ErrorText>{message}</ErrorText>}
          />
        </Flex>
        <Flex direction={"column"} flex={1} gap={2}>
          <Input
            type={"password"}
            placeholder={"비밀번호"}
            {...register("password", {
              required: "비밀번호가 입력되지 않았습니다.",
            })}
          />
          <ErrorMessage
            name={"password"}
            errors={errors}
            render={({ message }) => <ErrorText>{message}</ErrorText>}
          />
        </Flex>
      </Flex>
      <Flex direction={"column"}>
        <Textarea
          placeholder={"내용을 입력하세요."}
          {...register("content", { required: "내용이 입력되지 않았습니다." })}
        />
        <ErrorMessage
          name={"content"}
          errors={errors}
          render={({ message }) => <ErrorText>{message}</ErrorText>}
        />
      </Flex>
      <Flex justify={"end"}>
        <Button colorScheme={"green"} type={"submit"}>
          댓글 등록
        </Button>
      </Flex>
    </Flex>
  );
};

export default PostCommentWriter;
