import { Post } from "@/apis";
import { Flex } from "@chakra-ui/react";
import { PostListItem } from "@/components";

interface PostListProps {
  posts: Post[];
}

const PostList = ({ posts }: PostListProps) => {
  return (
    <Flex direction={"column"} gap={4}>
      {posts.map((post, idx) => {
        return <PostListItem key={idx} post={post} />;
      })}
    </Flex>
  );
};

export default PostList;
