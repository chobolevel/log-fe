import { Post } from "@/apis";
import { Flex, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { DateUtils } from "@/utils";

interface PostListItemProps {
  post: Post;
}

const PostListItem = ({ post }: PostListItemProps) => {
  const writtenAt = useMemo(
    () => DateUtils.format(new Date(post.created_at), "YYYY-MM-DD"),
    [post],
  );
  return (
    <Flex
      direction={"column"}
      py={4}
      borderY={"1px solid #eee"}
      cursor={"pointer"}
      _hover={{ textDecoration: "underline" }}
    >
      <Flex direction={"column"} gap={2}>
        <Text fontSize={"lg"} fontWeight={"bold"}>
          {post.title}
        </Text>
        <Text>{post.sub_title}</Text>
      </Flex>
      <Flex justify={"end"} align={"center"}>
        <Text>{`작성일 ${writtenAt}`}</Text>
      </Flex>
    </Flex>
  );
};

export default PostListItem;
