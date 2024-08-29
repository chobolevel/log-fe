import { Flex, Skeleton } from "@chakra-ui/react";

const ListSkeleton = () => {
  return (
    <Flex direction={"column"} gap={6}>
      <Flex direction={"column"} gap={2}>
        <Skeleton w={200} height={6} />
        <Skeleton w={500} height={4} />
        <Flex justify={"end"} align={"center"}>
          <Skeleton w={200} h={6} />
        </Flex>
      </Flex>
      <Flex direction={"column"} gap={2}>
        <Skeleton w={200} height={6} />
        <Skeleton w={500} height={4} />
        <Flex justify={"end"} align={"center"}>
          <Skeleton w={200} h={6} />
        </Flex>
      </Flex>
      <Flex direction={"column"} gap={2}>
        <Skeleton w={200} height={6} />
        <Skeleton w={500} height={4} />
        <Flex justify={"end"} align={"center"}>
          <Skeleton w={200} h={6} />
        </Flex>
      </Flex>
      <Flex direction={"column"} gap={2}>
        <Skeleton w={200} height={6} />
        <Skeleton w={500} height={4} />
        <Flex justify={"end"} align={"center"}>
          <Skeleton w={200} h={6} />
        </Flex>
      </Flex>
      <Flex direction={"column"} gap={2}>
        <Skeleton w={200} height={6} />
        <Skeleton w={500} height={4} />
        <Flex justify={"end"} align={"center"}>
          <Skeleton w={200} h={6} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ListSkeleton;
