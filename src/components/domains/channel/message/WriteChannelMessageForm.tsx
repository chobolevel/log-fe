import { Button, Flex, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import {
  CreateChannelMessageRequest,
  ID,
  useCreateChannelMessage,
} from "@/apis";
import { useCallback } from "react";

interface WriteChannelMessageFormProps {
  channelId: ID;
}

const WriteChannelMessageForm = ({
  channelId,
}: WriteChannelMessageFormProps) => {
  const { register, handleSubmit, resetField } =
    useForm<CreateChannelMessageRequest>({
      defaultValues: {
        channel_id: channelId,
        type: "TALK",
      },
    });

  const { mutate: createChannelMessage } = useCreateChannelMessage();
  return (
    <Flex
      gap={6}
      as={"form"}
      onSubmit={handleSubmit(
        useCallback((data) => {
          createChannelMessage(data, {
            onSuccess: () => {
              resetField("content");
            },
          });
        }, []),
      )}
    >
      <Input type={"text"} {...register("content", { required: true })} />
      <Button type={"submit"}>전송</Button>
    </Flex>
  );
};

export default WriteChannelMessageForm;
