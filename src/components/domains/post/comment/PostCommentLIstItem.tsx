import { Flex, Text } from "@chakra-ui/react";
import { PostComment } from "@/apis/domains/postComment";
import { useMemo } from "react";
import { DateUtils } from "@/utils";
import { HiPencilAlt } from "react-icons/hi";
import { useModalStore } from "@/stores";
import { PostCommentEditorModal } from "@/components";

interface PostCommentListItemProps {
  postComment: PostComment;
}

const PostCommentListItem = ({ postComment }: PostCommentListItemProps) => {
  const { openModal } = useModalStore(["openModal"]);

  const writtenAt = useMemo(
    () => DateUtils.format(new Date(postComment.created_at), "YYYY-MM-DD"),
    [postComment],
  );
  return (
    <Flex
      p={4}
      direction={"column"}
      borderRadius={10}
      border={"2px solid"}
      borderColor={"lightGreen"}
      gap={2}
    >
      <Flex justify={"space-between"} align={"center"}>
        <Text fontWeight={"bold"}>{postComment.writer_name}</Text>
        <Flex>
          <HiPencilAlt
            size={24}
            cursor={"pointer"}
            onClick={() => {
              openModal(PostCommentEditorModal, { postComment });
            }}
          />
        </Flex>
      </Flex>
      <Text whiteSpace={"break-spaces"}>{postComment.content}</Text>
      <Flex justify={"end"}>
        <Text fontSize={"sm"}>{`✏️ ${writtenAt}`}</Text>
      </Flex>
    </Flex>
  );
};

export default PostCommentListItem;
