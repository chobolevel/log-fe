import { Post } from "@/apis";
import { Badge, Flex, Image, Spinner, Text, Tooltip } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { DateUtils, toUrl } from "@/utils";
import { useSafePush } from "@/hooks";
import { images, PageRoutes } from "@/constants";

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
    <Tooltip
      hasArrow
      arrowSize={16}
      placement={"right-start"}
      openDelay={500}
      label={
        <Flex direction={"column"} gap={2} p={2}>
          <Flex gap={2} flexWrap={"wrap"}>
            {post.tags.map((tag, idx) => {
              return (
                <Badge key={idx} variant={"solid"}>{`#${tag.name}`}</Badge>
              );
            })}
          </Flex>
          <Text fontWeight={"bold"}>{post.title}</Text>
          <Text fontSize={"sm"} color={"gray"}>
            {post.sub_title}
          </Text>
        </Flex>
      }
    >
      <Flex
        w={"100%"}
        position={"relative"}
        direction={"column"}
        cursor={"pointer"}
        borderRadius={10}
        border={"3px solid"}
        borderColor={"lightGreen"}
        overflow={"hidden"}
        _hover={{
          transform: "translate(0, -10px)",
        }}
        transition={"ease-in-out all 0.2s"}
        onClick={() => {
          setLoading(true);
          push(toUrl(PageRoutes.PostDetailById, { id: post.id }))?.then(() => {
            setLoading(false);
          });
        }}
      >
        <Flex position={"absolute"} top={2} left={2} gap={2} flexWrap={"wrap"}>
          {post.tags.map((tag, idx) => {
            return (
              <Badge colorScheme={"green"} key={idx}>{`#${tag.name}`}</Badge>
            );
          })}
        </Flex>
        <Image
          src={post.thumb_nail_image?.url ?? images.logo.src}
          alt={post.title}
          w={"100%"}
          h={200}
          objectFit={"cover"}
        />
        <Flex p={2} direction={"column"} h={120} justify={"space-between"}>
          {loading ? (
            <Flex
              w={"100%"}
              h={"100%"}
              direction={"column"}
              justify={"center"}
              align={"center"}
            >
              <Spinner size={"lg"} color={"lightGreen"} />
            </Flex>
          ) : (
            <>
              <Flex direction={"column"} gap={2}>
                <Text
                  fontSize={"sm"}
                  fontStyle={"italic"}
                  fontWeight={"bold"}
                  noOfLines={1}
                >
                  {post.title}
                </Text>
                <Text fontSize={"sm"} noOfLines={2} color={"#707277"}>
                  {post.sub_title}
                </Text>
              </Flex>
              <Flex justify={"end"}>
                <Text fontSize={"xs"} fontWeight={"bold"} color={"gray"}>
                  {writtenAt}
                </Text>
              </Flex>
            </>
          )}
        </Flex>
      </Flex>
    </Tooltip>
  );
};

export default PostListItem;
