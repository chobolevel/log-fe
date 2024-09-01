import { Flex } from "@chakra-ui/react";
import { GuestBook } from "@/apis/domains/guestBook";
import { GuestBookListItem } from "@/components";

interface GuestBookListProps {
  guestBooks: GuestBook[];
}

const GuestBookList = ({ guestBooks }: GuestBookListProps) => {
  return (
    <Flex direction={"column"}>
      {guestBooks.map((guestBook, idx) => {
        return <GuestBookListItem key={idx} guestBook={guestBook} />;
      })}
    </Flex>
  );
};

export default GuestBookList;
