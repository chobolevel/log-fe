import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Channel, useGetUsers, useInviteChannel, User } from "@/apis";
import { useState } from "react";
import { UserSelector } from "@/components";

interface InviteChannelModalProps {
  onClose: () => void;
  channel: Channel;
}

const InviteChannelModal = ({ onClose, channel }: InviteChannelModalProps) => {
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const { data: users } = useGetUsers({
    role: "ROLE_USER",
    resigned: false,
    excludeUserIds: channel.participants.map((p) => p.id),
    skipCount: 0,
    limitCount: 999,
    orderTypes: ["NICKNAME_ASC"],
  });
  const { mutate: inviteChannel } = useInviteChannel();
  return (
    <Modal isOpen={!!alert} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader />
        <ModalCloseButton />
        <ModalBody>
          <Flex p={4} direction={"column"} gap={4}>
            <UserSelector
              users={users?.data ?? []}
              selectedUsers={selectedUsers}
              handleSelect={(user) => setSelectedUsers((cur) => [...cur, user])}
              handleUnSelect={(user) =>
                setSelectedUsers((cur) => cur.filter((u) => u.id != user.id))
              }
            />
            <Flex align={"center"} justify={"end"} gap={2}>
              <Button
                colorScheme={"green"}
                onClick={() => {
                  inviteChannel(
                    {
                      channel_id: channel.id,
                      user_ids: selectedUsers.map((u) => u.id),
                    },
                    {
                      onSuccess: () => {
                        onClose();
                      },
                    },
                  );
                }}
              >
                초대
              </Button>
              <Button
                onClick={() => {
                  onClose();
                }}
              >
                취소
              </Button>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default InviteChannelModal;
