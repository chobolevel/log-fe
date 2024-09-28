import { Flex, Text } from "@chakra-ui/react";
import { GuestBook } from "@/apis/domains/guestBook";
import { useMemo } from "react";
import { DateUtils } from "@/utils";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useModalStore } from "@/stores";
import { GuestBookEditor } from "@/components";

interface GuestBookListItemProps {
  guestBook: GuestBook;
}

const GuestBookListItem = ({ guestBook }: GuestBookListItemProps) => {
  const { openModal } = useModalStore(["openModal"]);

  const writtenAt = useMemo(
    () => DateUtils.format(new Date(guestBook.created_at), "YYYY-MM-DD"),
    [guestBook],
  );
  return (
    <Flex
      direction={"column"}
      gap={2}
      p={4}
      borderRadius={10}
      border={"3px solid"}
      borderColor={"lightGreen"}
    >
      <Flex justify={"space-between"} align={"center"}>
        <Text
          fontWeight={"bold"}
        >{`${guestBook.guest_name} 게스트님의 방명록`}</Text>
        <HiOutlinePencilAlt
          size={24}
          cursor={"pointer"}
          onClick={() => {
            openModal(GuestBookEditor, { guestBook: guestBook });
          }}
        />
      </Flex>
      <Text>{guestBook.content}</Text>
      <Flex justify={"end"} align={"center"}>
        <Text fontSize={"sm"}>{`✏️ ${writtenAt}`}</Text>
      </Flex>
    </Flex>
  );
};

export default GuestBookListItem;
