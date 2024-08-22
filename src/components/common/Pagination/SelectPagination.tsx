import {
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { PaginationProps } from "./Pagination";

const SelectPagination = ({
  currentPage,
  limit,
  total,
  onChange,
}: PaginationProps) => {
  const totalPage = Math.ceil(total / limit);

  return (
    <Flex direction={"column"} gap={"4"} align={"center"}>
      <Flex gap={"4"} justify={"center"} align={"center"}>
        <Button
          aria-label={"prev"}
          // baseColor={"indigo"}
          variant={"outline"}
          isDisabled={currentPage === 1}
          onClick={() => onChange(currentPage - 1)}
        >
          이전
        </Button>
        <Flex gap={"2"}>
          <Text
            color={"ocean"}
          >{`${(currentPage - 1) * limit + 1} - ${Math.min(currentPage * limit, total)}`}</Text>
          <Text>/</Text>
          <Text>{total}</Text>
        </Flex>
        <Button
          aria-label={"next"}
          // baseColor={"indigo"}
          variant={"outline"}
          isDisabled={total === 0 || currentPage === totalPage}
          onClick={() => onChange(currentPage + 1)}
        >
          다음
        </Button>
      </Flex>
      <Menu placement={"top"}>
        <MenuButton
          as={Button}
          width={"150px"}
          variant={"outline"}
          _hover={{ bgColor: "transparent" }}
          _active={{ bgColor: "transparent" }}
          isDisabled={totalPage === 0}
        >{`더보기 (${currentPage}/${totalPage})`}</MenuButton>
        <MenuList>
          {Array.from({ length: totalPage }, (_, i) => i + 1).map((page) => (
            <MenuItem key={page} onClick={() => onChange(page)}>
              {page}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default SelectPagination;
