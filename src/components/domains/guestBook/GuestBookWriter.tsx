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
import { useForm } from "react-hook-form";
import {
  CreateGuestBookRequest,
  useCreateGuestBook,
} from "@/apis/domains/guestBook";
import { useCallback } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { ErrorText } from "@/components";
import { useModalStore } from "@/stores";

interface GuestBookWriterProps {
  onClose: () => void;
}

const GuestBookWriter = ({ onClose }: GuestBookWriterProps) => {
  const { openAlert } = useModalStore(["openAlert"]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateGuestBookRequest>();

  const { mutate: createGuestBook } = useCreateGuestBook();
  return (
    <Modal isOpen={!!alert} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader />
        <ModalCloseButton />
        <ModalBody>
          <Flex
            as={"form"}
            p={4}
            direction={"column"}
            gap={4}
            onSubmit={handleSubmit(
              useCallback((data) => {
                createGuestBook(data, {
                  onSuccess: () => {
                    openAlert({
                      title: "방명록 등록",
                      content: "방명록이 등록되었습니다.",
                    });
                  },
                });
              }, []),
            )}
          >
            <Text fontWeight={"bold"} fontSize={"lg"}>
              방명록 등록
            </Text>
            <Flex direction={"column"} gap={2}>
              <Input
                type={"text"}
                placeholder={"GUEST NAME"}
                {...register("guest_name", {
                  required: "방문자 이름이 입력되지 않았습니다.",
                })}
              />
              <ErrorMessage
                name={"guest_name"}
                errors={errors}
                render={({ message }) => <ErrorText>{message}</ErrorText>}
              />
            </Flex>
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
                  required: "방문록 내용이 입력되지 않았습니다.",
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
                등록
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default GuestBookWriter;
