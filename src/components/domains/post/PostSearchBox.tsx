import { Button, Flex, Input, Select, Text } from "@chakra-ui/react";
import { PageRoutes } from "@/constants";
import { useState } from "react";
import { useSafePush } from "@/hooks";
import { useGetTags } from "@/apis";
import { GrPowerReset } from "react-icons/gr";

interface PostSearchBoxProps {
  totalCount: number;
}

type KeywordType = "title" | "content";

const PostSearchBox = ({ totalCount }: PostSearchBoxProps) => {
  const { push, router } = useSafePush();
  const [keywordType, setKeywordType] = useState<KeywordType>("title");
  const [keyword, setKeyword] = useState<string>("");

  const { data: tags } = useGetTags();

  const handleSearch = () => {
    delete router.query.title;
    delete router.query.content;
    push({
      pathname: PageRoutes.Posts,
      query: { ...router.query, page: 1, [keywordType]: keyword },
    });
  };
  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      justify={"space-between"}
      align={{ base: "start", lg: "center" }}
      gap={2}
    >
      <Text
        display={{ base: "none", lg: "block" }}
        color={"lightGreen"}
        fontWeight={"bold"}
      >
        {`전체 게시글(${totalCount})`}
      </Text>
      <Flex
        w={{ base: "100%", lg: "auto" }}
        gap={2}
        direction={{ base: "column", lg: "row" }}
      >
        <Select
          w={{ base: "100%", lg: 200 }}
          placeholder={"태그를 선택하세요."}
          onChange={(e) => {
            delete router.query.tag;
            const id = Number(e.target.value);
            if (id) {
              push({
                pathname: PageRoutes.Posts,
                query: { ...router.query, page: 1, tag: id },
              });
            } else {
              push({
                pathname: PageRoutes.Posts,
                query: { ...router.query, page: 1 },
              });
            }
          }}
        >
          {tags?.data.map((tag, idx) => {
            return (
              <option key={idx} value={tag.id}>
                {tag.name}
              </option>
            );
          })}
        </Select>
        <Select
          w={{ base: "auto", lg: 100 }}
          value={keywordType}
          onChange={(e) => {
            setKeywordType(e.target.value as KeywordType);
          }}
        >
          <option value={"title"}>제목</option>
          <option value={"content"}>내용</option>
        </Select>
        <Input
          type={"text"}
          placeholder={"키워드를 입력하세요."}
          w={{ base: "auto", lg: 300 }}
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
        <Button
          colorScheme={"green"}
          variant={"outline"}
          onClick={() => {
            push({
              pathname: PageRoutes.Posts,
            });
          }}
        >
          <GrPowerReset />
        </Button>
        <Button colorScheme={"green"} onClick={handleSearch}>
          검색
        </Button>
      </Flex>
    </Flex>
  );
};

export default PostSearchBox;
