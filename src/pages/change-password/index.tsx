import Head from "next/head";
import { ErrorText, ResponsiveLayout } from "@/components";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { ChangeUserPasswordRequest, useChangeUserPassword } from "@/apis";
import { useCallback } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { useSafePush } from "@/hooks";
import { toUrl } from "@/utils";
import { PageRoutes } from "@/constants";
import { useModalStore } from "@/stores";

const HOME_TITLE = "초로 - 나의 프로필";
const HOME_DESC = "초보 개발자의 블로그";
const DIVING_CATEGORIES = ["개발", "블로그"];

const ChangePasswordPage = () => {
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
      <ResponsiveLayout>
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
            <Input
              type={"password"}
              placeholder={"CUR_PASSWORD"}
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
            <Input
              type={"password"}
              placeholder={"NEW_PASSWORD"}
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
              type={"password"}
              placeholder={"CHECK_NEW_PASSWORD"}
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
      </ResponsiveLayout>
    </>
  );
};

export default ChangePasswordPage;
