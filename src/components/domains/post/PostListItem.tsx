import { Post } from "@/apis";
import { Flex, Image, Spinner, Text } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { DateUtils, toUrl } from "@/utils";
import { useIsMobile, useSafePush } from "@/hooks";
import { PageRoutes } from "@/constants";
import { IoIosArrowForward } from "react-icons/io";

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
  const isMobile = useIsMobile();
  return (
    <Flex
      direction={"column"}
      p={4}
      borderRadius={10}
      border={"3px solid"}
      borderColor={"lightGreen"}
      cursor={"pointer"}
      position={"relative"}
      onClick={() => {
        setLoading(true);
        push(toUrl(PageRoutes.PostDetailById, { id: post.id }))?.then(() => {
          setLoading(false);
        });
      }}
      transition={"all 0.2s ease-in-out"}
      _hover={{
        filter: !isMobile && "blur(1px)",
      }}
      _active={{
        filter: "blur(1px)",
      }}
    >
      {loading ? (
        <Flex direction={"column"} h={100} justify={"center"} align={"center"}>
          <Spinner />
        </Flex>
      ) : (
        <>
          <Flex justify={"space-between"} align={"start"}>
            <Flex
              direction={"column"}
              gap={2}
              w={
                post.thumb_nail_image
                  ? "calc(100% - 100px)"
                  : "calc(100% - 50px)"
              }
            >
              <Text
                fontSize={"lg"}
                fontWeight={"bold"}
                w={"100%"}
                textOverflow={"ellipsis"}
                whiteSpace={"nowrap"}
                overflow={"hidden"}
              >
                {post.title}
              </Text>
              <Text
                w={"100%"}
                textOverflow={"ellipsis"}
                whiteSpace={"nowrap"}
                overflow={"hidden"}
              >
                {post.sub_title}
              </Text>
              <Text fontSize={"sm"}>{`✏️ ${writtenAt}`}</Text>
            </Flex>
            <Flex>
              {post.thumb_nail_image ? (
                <Image
                  w={"90px"}
                  h={"90px"}
                  borderRadius={10}
                  src={post.thumb_nail_image.url}
                  alt={post.thumb_nail_image.name}
                  objectFit={"cover"}
                />
              ) : (
                <Flex w={"30px"} h={"90px"} justify={"end"} align={"center"}>
                  <IoIosArrowForward size={30} />
                </Flex>
              )}
            </Flex>
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default PostListItem;
