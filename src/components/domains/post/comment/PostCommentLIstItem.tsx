import { Avatar, Flex, Text } from "@chakra-ui/react";
import { PostComment, useDeletePostComment } from "@/apis/domains/postComment";
import { useMemo } from "react";
import { DateUtils } from "@/utils";
import { HiPencilAlt } from "react-icons/hi";
import { useModalStore } from "@/stores";
import { PostCommentEditorModal } from "@/components";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useGetMe } from "@/apis";

interface PostCommentListItemProps {
  postComment: PostComment;
}

const PostCommentListItem = ({ postComment }: PostCommentListItemProps) => {
  const { openConfirm, openModal } = useModalStore([
    "openConfirm",
    "openModal",
  ]);

  const { data: me } = useGetMe();
  const { mutate: deletePostComment } = useDeletePostComment();

  const isWriter = useMemo(
    () => postComment.writer.id === me?.id,
    [postComment, me],
  );
  const writer = useMemo(() => postComment.writer, [postComment]);
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
      gap={4}
    >
      <Flex justify={"space-between"} align={"center"}>
        <Flex align={"center"} gap={2}>
          <Avatar size={"xs"} src={writer.profile_image?.origin_url} />
          <Text fontWeight={"bold"}>{writer.nickname}</Text>
        </Flex>
        {isWriter && (
          <Flex gap={4} align={"center"}>
            <HiPencilAlt
              size={20}
              cursor={"pointer"}
              onClick={() => {
                openModal(PostCommentEditorModal, { postComment });
              }}
            />
            <RiDeleteBin5Fill
              size={20}
              cursor={"pointer"}
              onClick={() => {
                openConfirm({
                  title: "댓글 삭제",
                  content: "정말 댓글을 삭제하시겠습니까?",
                  onConfirm: () => {
                    deletePostComment({ id: postComment.id });
                  },
                });
              }}
            />
          </Flex>
        )}
      </Flex>
      <Text whiteSpace={"break-spaces"}>{postComment.content}</Text>
      <Text fontSize={"sm"}>{`✏️ ${writtenAt}`}</Text>
    </Flex>
  );
};

export default PostCommentListItem;
