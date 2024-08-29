import {
  UpdateUserRequest,
  useCreatePresignedUrl,
  useCreateUserImage,
  useDeleteUserImage,
  User,
  useUpdateUser,
} from "@/apis";
import { Button, Flex, Image, Input, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useMemo } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { ErrorText } from "@/components";
import { useSafePush } from "@/hooks";
import { useModalStore } from "@/stores";
import { toUrl } from "@/utils";
import { images, PageRoutes } from "@/constants";

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
  const { mutate: createUserImage } = useCreateUserImage();
  const { mutate: deleteUserImage } = useDeleteUserImage();
  const { mutate: createPresignedUrl } = useCreatePresignedUrl();

  const profileImage = useMemo(() => {
    if (user.profile_image) {
      return user.profile_image.origin_url;
    } else {
      return images.unknown.src;
    }
  }, [user]);

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
      <Flex direction={{ base: "column", lg: "row" }}>
        <Flex direction={"column"} p={10} align={"center"} gap={4}>
          <Image
            src={profileImage}
            alt={"회원 프로필 이미지"}
            w={200}
            h={200}
            borderRadius={"50%"}
          />
          <Button
            onClick={() => {
              if (user.profile_image != null) {
                deleteUserImage(user.profile_image.id);
              }
            }}
          >
            기본 이미지
          </Button>
          <Button
            colorScheme={"green"}
            onClick={() => {
              const input = document.createElement("input");
              input.setAttribute("type", "file");
              input.setAttribute("accept", "image/*");
              input.click();
              input.addEventListener("change", () => {
                if (input.files && input.files.length > 0) {
                  const file = input.files[0];
                  const filename = file.name.split(".")[0];
                  const extension = file.name.split(".")[1];
                  createPresignedUrl(
                    {
                      prefix: "image",
                      filename,
                      extension,
                    },
                    {
                      onSuccess: (res) => {
                        fetch(res.data.url, {
                          method: "PUT",
                          body: file,
                        })?.then(() => {
                          createUserImage({
                            type: "PROFILE",
                            origin_url: res.data.url,
                            name: res.data.filename_with_extension,
                          });
                        });
                      },
                    },
                  );
                }
              });
            }}
          >
            프로필 이미지 변경
          </Button>
          <Text fontSize={"sm"} color={"#333"}>
            정사각형 이미지가 아닌 경우 깨질 수 있습니다.
          </Text>
        </Flex>
        <Flex direction={"column"} p={{ base: 2, lg: 10 }} gap={4}>
          <Flex direction={"column"} gap={2}>
            <Text fontWeight={"bold"}>이메일</Text>
            <Text textIndent={"6px"}>{user.email}</Text>
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
        </Flex>
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
