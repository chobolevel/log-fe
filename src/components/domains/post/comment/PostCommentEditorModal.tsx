import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import React, { useCallback } from "react";
import {
  PostComment,
  UpdatePostCommentRequest,
  useUpdatePostComment,
} from "@/apis/domains/postComment";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { ErrorText } from "@/components";

interface PostCommentEditorModalProps {
  onClose: () => void;
  postComment: PostComment;
}

const PostCommentEditorModal = ({
  onClose,
  postComment,
}: PostCommentEditorModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePostCommentRequest>({
    defaultValues: {
      id: postComment.id,
      content: postComment.content,
      update_mask: ["CONTENT"],
    },
  });

  const { mutate: updatePostComment } = useUpdatePostComment();
  return (
    <Modal isOpen={!!alert} onClose={onClose} size={{ base: "full", lg: "md" }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>댓글 수정</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            as={"form"}
            direction={"column"}
            py={6}
            gap={4}
            onSubmit={handleSubmit(
              useCallback((data) => {
                updatePostComment(data, {
                  onSuccess: () => {
                    onClose();
                  },
                });
              }, []),
            )}
          >
            <Flex direction={"column"} gap={2}>
              <Textarea
                placeholder={"내용을 입력하세요."}
                {...register("content", {
                  required: "내용이 입력되지 않았습니다.",
                })}
              />
              <ErrorMessage
                name={"content"}
                errors={errors}
                render={({ message }) => <ErrorText>{message}</ErrorText>}
              />
            </Flex>
            <Flex justify={"end"} align={"center"} gap={2}>
              <Button onClick={onClose}>취소</Button>
              <Button colorScheme={"green"} type={"submit"}>
                수정
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PostCommentEditorModal;
