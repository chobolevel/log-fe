import { Button, Divider, Flex, Image, Tag, Text } from "@chakra-ui/react";
import { Post, useDeletePost, useGetMe } from "@/apis";
import { useMemo } from "react";
import { DateUtils, toUrl } from "@/utils";
import { SanitizeText } from "@/components";
import { useSafePush } from "@/hooks";
import { PageRoutes } from "@/constants";
import { useModalStore } from "@/stores";

interface PostDetailPops {
  post: Post;
}

const PostDetail = ({ post }: PostDetailPops) => {
  const { push } = useSafePush();
  const { openConfirm, openAlert } = useModalStore([
    "openConfirm",
    "openAlert",
  ]);

  const { data: me } = useGetMe();
  const { mutate: deletePost } = useDeletePost();

  const writtenAt = useMemo(
    () => DateUtils.format(new Date(post.created_at), "YYYY-MM-DD"),
    [post],
  );
  const isWriter = useMemo(() => me?.id === post.writer.id, [post, me]);
  return (
    <Flex direction={"column"} gap={6}>
      <Flex justify={"space-between"}>
        <Flex direction={"column"} gap={2}>
          <Text fontSize={"xl"} fontWeight={"bold"}>
            {post.title}
          </Text>
          <Text>{post.sub_title}</Text>
          <Text fontSize={"sm"} mt={2}>
            {`✏️ ${writtenAt}`}
          </Text>
        </Flex>
        <Flex>
          {post.thumb_nail_image && (
            <Image
              w={100}
              h={100}
              borderRadius={10}
              src={post.thumb_nail_image.url}
              alt={post.thumb_nail_image.name}
            />
          )}
        </Flex>
      </Flex>
      <Divider />
      <Flex direction={"column"} overflowX={"scroll"}>
        <SanitizeText htmlString={post.content} />
      </Flex>
      <Flex gap={2} flexWrap={"wrap"}>
        {post.tags.map((tag, idx) => {
          return (
            <Tag
              key={idx}
              size={"lg"}
              fontWeight={"bold"}
              colorScheme={"green"}
              cursor={"pointer"}
              onClick={() => {
                push({
                  pathname: PageRoutes.Posts,
                  query: {
                    tag: tag.id,
                  },
                });
              }}
            >{`# ${tag.name}`}</Tag>
          );
        })}
      </Flex>
      {isWriter && (
        <Flex justify={"space-between"} align={"center"}>
          <Flex>
            <Button
              onClick={() => {
                push(toUrl(PageRoutes.Posts));
              }}
            >
              목록으로
            </Button>
          </Flex>
          <Flex gap={2}>
            <Button
              onClick={() => {
                push(toUrl(PageRoutes.EditPost, { id: post.id }));
              }}
            >
              수정
            </Button>
            <Button
              colorScheme={"green"}
              onClick={() => {
                openConfirm({
                  title: "게시글 삭제",
                  content: "정말 게시글을 삭제하시겠습니까?",
                  onConfirm: () => {
                    deletePost(post.id, {
                      onSuccess: () => {
                        push(toUrl(PageRoutes.Posts))?.then(() => {
                          openAlert({
                            title: "게시글 삭제",
                            content: "게시글을 삭제하였습니다.",
                          });
                        });
                      },
                    });
                  },
                });
              }}
            >
              삭제
            </Button>
          </Flex>
        </Flex>
      )}
    </Flex>
  );
};

export default PostDetail;
