import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import {
  DeletePostCommentRequest,
  PostComment,
  useDeletePostComment,
} from "@/apis/domains/postComment";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { ErrorText } from "@/components";

interface PostCommentDeleterModalProps {
  onClose: () => void;
  postComment: PostComment;
}

const PostCommentDeleterModal = ({
  onClose,
  postComment,
}: PostCommentDeleterModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DeletePostCommentRequest>({
    defaultValues: {
      id: postComment.id,
    },
  });
  const { mutate: deletePostComment } = useDeletePostComment();
  return (
    <Modal isOpen={!!alert} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>댓글 삭제</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            as={"form"}
            direction={"column"}
            py={6}
            gap={6}
            onSubmit={handleSubmit(
              useCallback((data) => {
                deletePostComment(data, {
                  onSuccess: () => {
                    onClose();
                  },
                });
              }, []),
            )}
          >
            <Text textAlign={"center"} fontWeight={"bold"}>
              댓글 삭제를 위해 비밀번호를 입력해주세요.
            </Text>
            <Flex direction={"column"} gap={2}>
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
            <Flex justify={"end"} align={"center"} gap={2}>
              <Button onClick={onClose}>취소</Button>
              <Button colorScheme={"green"} type={"submit"}>
                삭제
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PostCommentDeleterModal;
