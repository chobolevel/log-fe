import { Post } from "@/apis";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { DateUtils, toUrl } from "@/utils";
import { useSafePush } from "@/hooks";
import { PageRoutes } from "@/constants";

interface PostListItemProps {
  post: Post;
}

const PostListItem = ({ post }: PostListItemProps) => {
  const { push } = useSafePush();
  const [loading, setLoading] = useState<boolean>(false);

  const writtenAt = useMemo(
    () => DateUtils.format(new Date(post.created_at), "YYYY-MM-DD"),
    [post],
  );
  return (
    <Flex
      direction={"column"}
      p={4}
      borderRadius={10}
      border={"3px solid"}
      borderColor={"lightGreen"}
      cursor={"pointer"}
      onClick={() => {
        setLoading(true);
        push(toUrl(PageRoutes.PostDetailById, { id: post.id }))?.then(() => {
          setLoading(false);
        });
      }}
    >
      {loading ? (
        <Flex direction={"column"} h={100} justify={"center"} align={"center"}>
          <Spinner />
        </Flex>
      ) : (
        <>
          <Flex direction={"column"} gap={2}>
            <Text fontSize={"lg"} fontWeight={"bold"}>
              {post.title}
            </Text>
            <Text>{post.sub_title}</Text>
          </Flex>
          <Flex justify={"end"} align={"center"}>
            <Text>{`작성일 ${writtenAt}`}</Text>
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default PostListItem;
