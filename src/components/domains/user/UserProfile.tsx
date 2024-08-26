import { UpdateUserRequest, User, useUpdateUser } from "@/apis";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useCallback, useEffect } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { ErrorText } from "@/components";
import { useSafePush } from "@/hooks";
import { useModalStore } from "@/stores";
import { toUrl } from "@/utils";
import { PageRoutes } from "@/constants";

interface UserProfileProps {
  user: User;
}

const UserProfile = ({ user }: UserProfileProps) => {
  const { push } = useSafePush();
  const { openAlert } = useModalStore(["openAlert"]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateUserRequest>();

  const { mutate: updateUser } = useUpdateUser();

  useEffect(() => {
    setValue("id", user.id);
    setValue("nickname", user.nickname);
    setValue("phone", user.phone);
    setValue("update_mask", ["NICKNAME", "PHONE"]);
  }, [user]);
  return (
    <Flex
      as={"form"}
      direction={"column"}
      gap={4}
      onSubmit={handleSubmit(
        useCallback((data) => {
          updateUser(data, {
            onSuccess: () => {
              openAlert({
                title: "프로필 수정",
                content: "프로필 정보를 수정하였습니다.",
              });
            },
          });
        }, []),
      )}
    >
      <Flex direction={"column"} gap={2}>
        <Text fontWeight={"bold"}>이메일</Text>
        <Text>{user.email}</Text>
      </Flex>
      <Flex direction={"column"} gap={2}>
        <Text fontWeight={"bold"}>닉네임</Text>
        <Input
          type={"text"}
          placeholder={"닉네임"}
          w={300}
          {...register("nickname", {
            required: "닉네임이 입력되지 않았습니다.",
          })}
        />
        <ErrorMessage
          name={"nickname"}
          errors={errors}
          render={({ message }) => <ErrorText>{message}</ErrorText>}
        />
      </Flex>
      <Flex direction={"column"} gap={2}>
        <Text fontWeight={"bold"}>전화번호</Text>
        <Input
          type={"text"}
          placeholder={"phone"}
          w={300}
          {...register("phone", {
            required: "전화번호가 입력되지 않았습니다.",
            pattern: {
              value: /^01(0|1|[6-9])[0-9]{3,4}[0-9]{4}$/,
              message: "휴대폰 번호 형식이 올바르지 않습니다.",
            },
          })}
        />
        <ErrorMessage
          name={"phone"}
          errors={errors}
          render={({ message }) => <ErrorText>{message}</ErrorText>}
        />
      </Flex>
      <Flex justify={"end"} align={"center"} gap={2}>
        <Button
          onClick={() => {
            push(toUrl(PageRoutes.ChangePassword));
          }}
        >
          비밀번호 변경
        </Button>
        <Button colorScheme={"green"} type={"submit"}>
          수정
        </Button>
      </Flex>
    </Flex>
  );
};

export default UserProfile;
