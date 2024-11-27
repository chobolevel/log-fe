import { Button, Divider, Flex, Image, Tag, Text } from "@chakra-ui/react";
import { Post, useDeletePost, useGetMe } from "@/apis";
import { useMemo, useState } from "react";
import { DateUtils, toUrl } from "@/utils";
import {
  Pagination,
  PostCommentList,
  PostCommentWriter,
  SanitizeText,
} from "@/components";
import { useSafePush } from "@/hooks";
import { PageRoutes } from "@/constants";
import { useModalStore } from "@/stores";
import { useGetPostComments } from "@/apis/domains/postComment";
import { IoMdShare } from "react-icons/io";

const LIMIT_COUNT = 5;

interface PostDetailPops {
  post: Post;
}

const PostDetail = ({ post }: PostDetailPops) => {
  const { push, router } = useSafePush();
  const { openConfirm, openAlert } = useModalStore([
    "openConfirm",
    "openAlert",
  ]);
  const [page, setPage] = useState<number>(1);

  const { data: me } = useGetMe();
  const { mutate: deletePost } = useDeletePost();
  const { data: postComments } = useGetPostComments({
    postId: post.id,
    orderTypes: ["CREATED_AT_DESC"],
  });

  const writtenAt = useMemo(
    () => DateUtils.format(new Date(post.created_at), "YYYY-MM-DD"),
    [post],
  );
  const isWriter = useMemo(() => me?.id === post.writer.id, [post, me]);
  return (
    <Flex direction={"column"} gap={6}>
      <Flex
        direction={{ base: "column", lg: "row" }}
        justify={"space-between"}
        gap={6}
      >
        <Flex
          w={{ base: "100%", lg: 500 }}
          direction={"column"}
          gap={2}
          justify={"end"}
        >
          <Text fontSize={"xl"} fontWeight={"bold"}>
            {post.title}
          </Text>
          <Text>{post.sub_title}</Text>
          <Flex gap={4} align={"center"}>
            <Text fontSize={"sm"} mt={2}>
              {`✏️ ${writtenAt}`}
            </Text>
            <IoMdShare
              size={24}
              cursor={"pointer"}
              onClick={() => {
                if (!navigator.share) {
                  openAlert({
                    title: "공유 기능 제한",
                    content: "현재 환경에서는 공유기능을 제고하지 않습니다.",
                  });
                  return;
                }
                navigator.share({
                  url: location.href,
                  title: post.title,
                  text: post.sub_title,
                });
              }}
            />
          </Flex>
        </Flex>
        <Flex>
          {post.thumb_nail_image && (
            <Image
              w={{ base: "100%", lg: 300 }}
              h={200}
              borderRadius={10}
              src={post.thumb_nail_image.url}
              alt={post.thumb_nail_image.name}
              objectFit={"cover"}
            />
          )}
        </Flex>
      </Flex>
      <Divider />
      <Flex direction={"column"} overflowX={"auto"}>
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
      <Flex direction={"column"} gap={6}>
        <Text
          fontWeight={"bold"}
        >{`댓글(${postComments?.total_count ?? 0})`}</Text>
        {postComments && postComments.total_count > 0 ? (
          <>
            <PostCommentList postComments={postComments.data} />
            <PostCommentWriter post={post} />
            <Flex direction={"column"} justify={"center"} align={"center"}>
              <Pagination
                currentPage={page}
                limit={LIMIT_COUNT}
                total={postComments.total_count}
                onChange={setPage}
              />
            </Flex>
          </>
        ) : (
          <Flex
            w={"100%"}
            direction={"column"}
            justify={"center"}
            align={"center"}
          >
            <PostCommentWriter post={post} />
          </Flex>
        )}
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
