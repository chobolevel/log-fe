import {useModalStore} from "@/stores";
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
import {useCallback} from "react";

const Alert = () => {
  const {alert, closeAlert} = useModalStore(["alert", "closeAlert"]);

  const handleConfirm = useCallback(() => {
    alert?.onConfirm?.();
    closeAlert();
  }, [alert, closeAlert]);

  return (
    <Modal isOpen={!!alert} onClose={closeAlert}>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader/>
        <ModalCloseButton/>
        <ModalBody>
          <Flex direction={"column"} align={"center"} gap={"4"}>
            <Heading size={"md"}>{alert?.title}</Heading>
            <Flex direction={"column"} whiteSpace={"break-spaces"}>
              {alert?.content}
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter justifyContent={"center"}>
          <Button minW={"24"} onClick={handleConfirm}>
            {alert?.confirmText ?? "확인"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Alert;
