import { useModalStore } from "@/stores";
import {
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useCallback } from "react";

const Confirm = () => {
  const { confirm, closeConfirm } = useModalStore(["confirm", "closeConfirm"]);

  const handleConfirm = useCallback(() => {
    confirm?.onConfirm && confirm.onConfirm();
    closeConfirm();
  }, [closeConfirm, confirm]);

  return (
    <Modal isOpen={!!confirm} onClose={closeConfirm}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader />
        <ModalCloseButton />
        <ModalBody>
          <Flex direction={"column"} align={"center"} gap={"4"}>
            <Heading size={"md"}>{confirm?.title}</Heading>
            <Flex direction={"column"} whiteSpace={"break-spaces"}>
              {confirm?.content}
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter justifyContent={"center"} gap={"2"} mb={"4"}>
          <Button minW={"24"} onClick={closeConfirm}>
            닫기
          </Button>
          <Button colorScheme={"green"} minW={"24"} onClick={handleConfirm}>
            확인
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Confirm;
