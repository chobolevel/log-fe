import { Post } from "@/apis";
import { Grid, GridItem } from "@chakra-ui/react";
import { PostListItem } from "@/components";

interface PostListProps {
  posts: Post[];
}

const PostList = ({ posts }: PostListProps) => {
  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
        lg: "repeat(4, 1fr)",
      }}
      gap={10}
    >
      {posts.map((post, idx) => {
        return (
          <GridItem key={idx}>
            <PostListItem post={post} />
          </GridItem>
        );
      })}
    </Grid>
  );
};

export default PostList;
