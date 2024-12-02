import { Button, Flex, Input, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {
  CreateChannelRequest,
  useCreateChannel,
  useGetUsers,
  User,
} from "@/apis";
import { useCallback, useState } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { ErrorText, UserSelector } from "@/components";
import { useSafePush } from "@/hooks";
import { toUrl } from "@/utils";
import { PageRoutes } from "@/constants";
import { useModalStore } from "@/stores";

const CreateChannelForm = () => {
  const { push } = useSafePush();
  const { openAlert } = useModalStore(["openAlert"]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateChannelRequest>();

  const { data: users } = useGetUsers({
    role: "ROLE_USER",
    resigned: false,
    skipCount: 0,
    limitCount: 999,
    orderTypes: ["NICKNAME_ASC"],
  });
  const { mutate: createChannel } = useCreateChannel();
  return (
    <Flex
      as={"form"}
      direction={"column"}
      gap={6}
      onSubmit={handleSubmit(
        useCallback(
          (data) => {
            if (selectedUsers.length < 1) {
              openAlert({
                title: "초대 인원 부족",
                content: "최소 1명 이상 초대해야합니다.",
              });
              return;
            }
            data.user_ids = selectedUsers.map((u) => u.id);
            createChannel(data, {
              onSuccess: () => {
                push(toUrl(PageRoutes.Channels));
              },
            });
          },
          [selectedUsers],
        ),
      )}
    >
      <Flex direction={"column"} gap={2}>
        <Text fontWeight={"bold"}>채널명</Text>
        <Input
          type={"text"}
          placeholder={"채널명"}
          {...register("name", { required: "채널명이 입력되지 않았습니다." })}
        />
        <ErrorMessage
          name={"name"}
          errors={errors}
          render={({ message }) => <ErrorText>{message}</ErrorText>}
        />
      </Flex>
      <UserSelector
        users={users?.data ?? []}
        selectedUsers={selectedUsers}
        handleSelect={(user) => setSelectedUsers((cur) => [...cur, user])}
        handleUnSelect={(user) =>
          setSelectedUsers((cur) => cur.filter((u) => u.id != user.id))
        }
      />
      <Flex align={"center"} justify={"end"} gap={2}>
        <Button colorScheme={"green"} type={"submit"}>
          생성
        </Button>
        <Button
          onClick={() => {
            push(toUrl(PageRoutes.Channels));
          }}
        >
          취소
        </Button>
      </Flex>
    </Flex>
  );
};

export default CreateChannelForm;
