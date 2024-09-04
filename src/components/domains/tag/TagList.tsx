import { Tag } from "@/apis";
import { Flex } from "@chakra-ui/react";
import { TagListItem } from "@/components";

interface TagListProps {
  tags: Tag[];
}

const TagList = ({ tags }: TagListProps) => {
  return (
    <Flex direction={"column"} gap={4}>
      {tags.map((tag, idx) => {
        return <TagListItem key={idx} tag={tag} />;
      })}
    </Flex>
  );
};

export default TagList;
