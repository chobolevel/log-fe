import { Button, Flex, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { CreateChannelMessageRequest, ID } from "@/apis";
import { useCallback } from "react";

interface WriteChannelMessageFormProps {
  channelId: ID;
  onSend: (content: string) => void;
}

const WriteChannelMessageForm = ({
  channelId,
  onSend,
}: WriteChannelMessageFormProps) => {
  const { register, handleSubmit, resetField } =
    useForm<CreateChannelMessageRequest>({
      defaultValues: {
        channel_id: channelId,
        type: "TALK",
      },
    });

  return (
    <Flex
      gap={6}
      as={"form"}
      onSubmit={handleSubmit(
        useCallback((data) => {
          onSend(data.content);
          resetField("content");
        }, []),
      )}
    >
      <Input
        type={"text"}
        placeholder={"메세지를 입력하세요."}
        {...register("content", { required: true })}
      />
      <Button type={"submit"}>전송</Button>
    </Flex>
  );
};

export default WriteChannelMessageForm;
