import { Flex } from "@chakra-ui/react";
import { PostComment } from "@/apis/domains/postComment";
import { PostCommentListItem } from "@/components";

interface PostCommentListProps {
  postComments: PostComment[];
}

const PostCommentList = ({ postComments }: PostCommentListProps) => {
  return (
    <Flex direction={"column"} gap={2}>
      {postComments.map((postComment, idx) => {
        return <PostCommentListItem key={idx} postComment={postComment} />;
      })}
    </Flex>
  );
};

export default PostCommentList;
