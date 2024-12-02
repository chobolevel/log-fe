import { Avatar, Checkbox, Flex, Input, Tag, Text } from "@chakra-ui/react";
import { images } from "@/constants";
import { User } from "@/apis";
import { useMemo, useState } from "react";

interface UserSelectorProps {
  users: User[];
  selectedUsers: User[];
  handleSelect: (user: User) => void;
  handleUnSelect: (user: User) => void;
}

const UserSelector = ({
  users,
  selectedUsers,
  handleSelect,
  handleUnSelect,
}: UserSelectorProps) => {
  const [keyword, setKeyword] = useState<string>("");

  const filteredUsers = useMemo(
    () =>
      users.filter(
        (user) =>
          user.email.includes(keyword) || user.nickname.includes(keyword),
      ),
    [users, keyword],
  );
  return (
    <Flex direction={"column"} gap={2}>
      <Text fontWeight={"bold"}>선택된 회원</Text>
      <Flex align={"center"} gap={2} flexWrap={"wrap"}>
        {selectedUsers.map((user, idx) => {
          return (
            <Tag key={idx} size={"lg"} colorScheme={"green"}>
              <Text
                fontWeight={"bold"}
              >{`${user.nickname}(${user.email})`}</Text>
            </Tag>
          );
        })}
      </Flex>
      <Input
        type={"text"}
        placeholder={"이름 또는 이메일로 검색"}
        value={keyword}
        onChange={(e) => {
          const val = e.target.value;
          val ? setKeyword(val) : setKeyword("");
        }}
      />
      <Flex direction={"column"} maxH={400} overflowY={"auto"}>
        {filteredUsers?.map((user, idx) => {
          return (
            <Flex key={idx} p={4} align={"center"} gap={2}>
              <Checkbox
                size={"lg"}
                onChange={(e) => {
                  const isChecked = e.target.checked;
                  isChecked ? handleSelect(user) : handleUnSelect(user);
                }}
              />
              <Avatar
                src={
                  user.profile_image
                    ? user.profile_image.origin_url
                    : images.unknown.src
                }
                size={"sm"}
              />
              <Text
                fontWeight={"bold"}
              >{`${user.nickname}(${user.email})`}</Text>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default UserSelector;
