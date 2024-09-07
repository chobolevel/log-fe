import { useCallback } from "react";
import { toUrl } from "@/utils";
import { PageRoutes } from "@/constants";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { ErrorMessage } from "@hookform/error-message";
import { ErrorText } from "@/components";
import { useSafePush } from "@/hooks";
import { useModalStore } from "@/stores";
import { useForm } from "react-hook-form";
import { ChangeUserPasswordRequest, useChangeUserPassword } from "@/apis";

const ChangeUserPasswordForm = () => {
  const { push } = useSafePush();
  const { openAlert } = useModalStore(["openAlert"]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangeUserPasswordRequest>();

  const { mutate: changePassword } = useChangeUserPassword();
  return (
    <Flex
      as={"form"}
      p={4}
      direction={"column"}
      gap={4}
      onSubmit={handleSubmit(
        useCallback((data) => {
          changePassword(data, {
            onSuccess: () => {
              push(toUrl(PageRoutes.Profile))?.then(() => {
                openAlert({
                  title: "비밀번호 변경",
                  content: "비밀번호를 변경하였습니다.",
                });
              });
            },
          });
        }, []),
      )}
    >
      <Text>비밀번호 변경</Text>
      <Flex direction={"column"} gap={2}>
        <Text fontWeight={"bold"}>현재 비밀번호</Text>
        <Input
          w={{ base: "100%", lg: 400 }}
          type={"password"}
          placeholder={"현재 비밀번호"}
          {...register("cur_password", {
            required: "현재 비밀번호가 입력되지 않았습니다.",
          })}
        />
        <ErrorMessage
          name={"cur_password"}
          errors={errors}
          render={({ message }) => <ErrorText>{message}</ErrorText>}
        />
      </Flex>
      <Flex direction={"column"} gap={2}>
        <Text fontWeight={"bold"}>변경할 비밀번호</Text>
        <Input
          w={{ base: "100%", lg: 400 }}
          type={"password"}
          placeholder={"변경할 비밀번호"}
          {...register("new_password", {
            required: "변경할 비밀번호가 입력되지 않았습니다.",
          })}
        />
        <ErrorMessage
          name={"new_password"}
          errors={errors}
          render={({ message }) => <ErrorText>{message}</ErrorText>}
        />
      </Flex>
      <Flex direction={"column"} gap={2}>
        <Input
          w={{ base: "100%", lg: 400 }}
          type={"password"}
          placeholder={"변경할 비밀번호 재확인"}
          {...register("check_new_password", {
            required: "변경할 비밀번호(확인)가 입력되지 않았습니다.",
            validate: (val: string) => {
              if (watch("new_password") != val) {
                return "비밀번호가 일치하지 않습니다.";
              }
            },
          })}
        />
        <ErrorMessage
          name={"check_new_password"}
          errors={errors}
          render={({ message }) => <ErrorText>{message}</ErrorText>}
        />
      </Flex>
      <Flex justify={"end"} align={"center"} gap={2}>
        <Button
          onClick={() => {
            push(toUrl(PageRoutes.Profile));
          }}
        >
          취소
        </Button>
        <Button colorScheme={"green"} type={"submit"}>
          변경
        </Button>
      </Flex>
    </Flex>
  );
};

export default ChangeUserPasswordForm;
