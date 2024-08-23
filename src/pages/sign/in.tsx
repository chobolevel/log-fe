import Head from "next/head";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useCallback, useEffect } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { ErrorText } from "@/components";
import { useSafePush } from "@/hooks";
import { toUrl } from "@/utils";
import { PageRoutes } from "@/constants";
import { LoginRequestType, useLogin } from "@/apis";

const HOME_TITLE = "초로 - 로그인";
const HOME_DESC = "초보 개발자의 블로그";
const DIVING_CATEGORIES = ["개발", "블로그"];

const SignInPage = () => {
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
    <>
      <Head>
        <title>{HOME_TITLE}</title>

        {/*view port*/}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/*meta*/}
        <meta name="title" content={HOME_TITLE} />
        <meta name="description" content={HOME_DESC} />
        {/*<meta property="image" content="/images/swiper/slide5.jpeg" />*/}
        <meta name="publisher" content={"chobolevel"} />
        <meta name="author" content={"초로"} />
        <meta name="classification" content={DIVING_CATEGORIES.join(", ")} />
        <meta name="subject" content={DIVING_CATEGORIES.join(", ")} />

        {/*링크*/}
        {/*<link rel="canonical" href="https://hankkang.com" />*/}
        {/*<link rel="icon" href="https://hankkang.com/hankkang-logo.png" />*/}

        {/*공유하기*/}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={HOME_TITLE} />
        <meta property="og:description" content={HOME_DESC} />
        {/*<meta property="og:image" content="/images/swiper/slide5.jpeg" />*/}
        {/*<meta property="og:url" content={"https://hankkang.com"} />*/}
      </Head>
      <Flex
        w={"100vw"}
        h={"100vh"}
        direction={"column"}
        justify={"center"}
        align={"center"}
      >
        <Flex
          as={"form"}
          w={400}
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
              LOGIN
            </Text>
          </Flex>
          <Flex direction={"column"} gap={2}>
            <Input
              type={"text"}
              placeholder={"ID"}
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
          <Flex direction={"column"} gap={4}>
            <Button colorScheme={"green"} type={"submit"}>
              로그인
            </Button>
            <Button
              onClick={() => {
                push(toUrl(PageRoutes.SignUp));
              }}
            >
              회원가입
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default SignInPage;
