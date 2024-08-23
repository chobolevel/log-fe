import { Post } from "@/apis";
import { Flex, Text } from "@chakra-ui/react";
import { useMemo } from "react";
import { DateUtils, toUrl } from "@/utils";
import { useSafePush } from "@/hooks";
import { PageRoutes } from "@/constants";

interface PostListItemProps {
  post: Post;
}

const PostListItem = ({ post }: PostListItemProps) => {
  const { push } = useSafePush();

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
      onClick={() => {
        push(toUrl(PageRoutes.PostDetailById, { id: post.id }));
      }}
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
