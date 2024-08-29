import { Divider, Flex, Skeleton, SkeletonText } from "@chakra-ui/react";

const DetailSkeleton = () => {
  return (
    <Flex direction={"column"} gap={4}>
      <Flex justify={"space-between"} align={"center"}>
        <Skeleton w={{ base: 150, lg: 300 }} height={6} />
        <Skeleton w={{ base: 100, lg: 200 }} height={6} />
      </Flex>
      <Skeleton w={{ base: 200, lg: 400 }} height={4} />
      <Divider />
      <SkeletonText noOfLines={10} />
    </Flex>
  );
};

export default DetailSkeleton;
