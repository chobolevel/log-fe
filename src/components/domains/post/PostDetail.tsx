import { Divider, Flex, Text } from "@chakra-ui/react";
import { Post } from "@/apis";
import { useMemo } from "react";
import { DateUtils } from "@/utils";
import { SanitizeText } from "@/components";

interface PostDetailPops {
  post: Post;
}

const PostDetail = ({ post }: PostDetailPops) => {
  const writtenAt = useMemo(
    () => DateUtils.format(new Date(post.created_at), "YYYY-MM-DD"),
    [post],
  );
  return (
    <Flex direction={"column"} gap={10}>
      <Flex justify={"space-between"} align={"center"}>
        <Text fontSize={"xl"} fontWeight={"bold"}>
          {post.title}
        </Text>
        <Text>{writtenAt}</Text>
      </Flex>
      <Divider />
      <Flex direction={"column"}>
        <SanitizeText htmlString={post.content} />
      </Flex>
    </Flex>
  );
};

export default PostDetail;
