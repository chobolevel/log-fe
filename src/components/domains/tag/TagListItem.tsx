import { Flex, Text } from "@chakra-ui/react";
import { Tag } from "@/apis";
import { useSafePush } from "@/hooks";
import { PageRoutes } from "@/constants";

interface TagListItemProps {
  tag: Tag;
}

const TagListItem = ({ tag }: TagListItemProps) => {
  const { push } = useSafePush();
  return (
    <Flex fontSize={"lg"}>
      <Flex
        cursor={"pointer"}
        _hover={{ textDecoration: "underline", color: "lightGreen" }}
        onClick={() => {
          push({
            pathname: PageRoutes.Posts,
            query: { tag: tag.id },
          });
        }}
      >
        <Text fontWeight={"bold"}>{tag.name}</Text>
        <Text>{`(${tag.posts_count})`}</Text>
      </Flex>
    </Flex>
  );
};

export default TagListItem;
