import { Button, Flex, Input, Select, Text } from "@chakra-ui/react";
import { PageRoutes } from "@/constants";
import { useState } from "react";
import { useSafePush } from "@/hooks";

type KeywordType = "title" | "content";

const PostSearchBox = () => {
  const { push, router } = useSafePush();
  const [keywordType, setKeywordType] = useState<KeywordType>("title");
  const [keyword, setKeyword] = useState<string>("");

  const handleSearch = () => {
    delete router.query.title;
    delete router.query.content;
    push({
      pathname: PageRoutes.Posts,
      query: { ...router.query, [keywordType]: keyword },
    });
  };
  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      justify={"space-between"}
      align={{ base: "start", lg: "center" }}
      gap={2}
    >
      <Text display={{ base: "none", lg: "block" }}>전체 게시글</Text>
      <Flex
        w={{ base: "100%", lg: "auto" }}
        gap={2}
        direction={{ base: "column", lg: "row" }}
      >
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
        <Button onClick={handleSearch}>검색</Button>
      </Flex>
    </Flex>
  );
};

export default PostSearchBox;
