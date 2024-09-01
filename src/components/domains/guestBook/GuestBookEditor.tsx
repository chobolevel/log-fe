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
  GuestBook,
  UpdateGuestBookRequest,
  useUpdateGuestBook,
} from "@/apis/domains/guestBook";
import { useForm } from "react-hook-form";
import { useCallback, useEffect } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { ErrorText } from "@/components";
import { useModalStore } from "@/stores";

interface GuestBookEditorProps {
  onClose: () => void;
  guestBook: GuestBook;
}

const GuestBookEditor = ({ onClose, guestBook }: GuestBookEditorProps) => {
  const { openAlert } = useModalStore(["openAlert"]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateGuestBookRequest>();

  const { mutate: updateGuestBook } = useUpdateGuestBook();

  useEffect(() => {
    setValue("id", guestBook.id);
    setValue("content", guestBook.content);
    setValue("update_mask", ["CONTENT"]);
  }, [guestBook]);
  return (
    <Modal isOpen={!!alert} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader />
        <ModalCloseButton />
        <ModalBody>
          <Flex
            as={"form"}
            direction={"column"}
            gap={6}
            onSubmit={handleSubmit(
              useCallback((data) => {
                updateGuestBook(data, {
                  onSuccess: () => {
                    onClose();
                    openAlert({
                      title: "방명록 수정",
                      content: "방멸록이 수정되었습니다.",
                    });
                  },
                });
              }, []),
            )}
          >
            <Text fontWeight={"bold"} fontSize={"lg"}>
              방명록 수정
            </Text>
            <Flex direction={"column"} gap={2}>
              <Input
                type={"password"}
                placeholder={"PASSWORD"}
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
            <Flex direction={"column"} gap={2}>
              <Input
                type={"text"}
                placeholder={"CONTENT"}
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
              <Button
                onClick={() => {
                  onClose();
                }}
              >
                취소
              </Button>
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

export default GuestBookEditor;
