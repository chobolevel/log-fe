import { useCallback, useEffect } from "react";
import { toUrl } from "@/utils";
import { PageRoutes } from "@/constants";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { ErrorMessage } from "@hookform/error-message";
import { ErrorText } from "@/components";
import { useSafePush } from "@/hooks";
import { useForm } from "react-hook-form";
import { LoginRequestType, useLogin } from "@/apis";

const SignInForm = () => {
  const { push } = useSafePush();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginRequestType>();

  const { mutate: login } = useLogin();

  useEffect(() => {
    setValue("login_type", "GENERAL");
  }, []);
  return (
    <Flex
      as={"form"}
      w={"90%"}
      maxW={400}
      p={4}
      direction={"column"}
      onSubmit={handleSubmit(
        useCallback((data) => {
          login(data, {
            onSuccess: () => {
              push(toUrl(PageRoutes.Home));
            },
          });
        }, []),
      )}
      borderRadius={10}
      border={"2px solid #000"}
      gap={6}
    >
      <Flex justify={"center"} align={"center"} py={10}>
        <Text fontSize={"2xl"} fontWeight={"bold"}>
          로그인
        </Text>
      </Flex>
      <Flex direction={"column"} gap={2}>
        <Input
          type={"text"}
          placeholder={"아이디(이메일 형식)"}
          {...register("email", {
            required: "아이디가 입력되지 않았습니다.",
          })}
        />
        <ErrorMessage
          name={"email"}
          errors={errors}
          render={({ message }) => <ErrorText>{message}</ErrorText>}
        />
      </Flex>
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
      <Flex direction={"column"} gap={4}>
        <Button colorScheme={"green"} type={"submit"}>
          로그인
        </Button>
        <Button
          onClick={() => {
            push(toUrl(PageRoutes.Home));
          }}
        >
          홈으로
        </Button>
      </Flex>
    </Flex>
  );
};

export default SignInForm;
