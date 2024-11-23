import { Flex, Grid, GridItem, Skeleton } from "@chakra-ui/react";

const ListSkeleton = () => {
  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
        lg: "repeat(4, 1fr)",
      }}
      gap={10}
    >
      <GridItem>
        <Flex direction={"column"}>
          <Skeleton h={200} />
          <Flex p={2} direction={"column"} h={120} justify={"space-between"}>
            <Flex direction={"column"} gap={2}>
              <Skeleton w={140} h={4} />
              <Skeleton w={200} h={4} />
            </Flex>
            <Flex justify={"end"}>
              <Skeleton w={100} h={4} />
            </Flex>
          </Flex>
        </Flex>
      </GridItem>
      <GridItem>
        <Flex direction={"column"}>
          <Skeleton h={200} />
          <Flex p={2} direction={"column"} h={120} justify={"space-between"}>
            <Flex direction={"column"} gap={2}>
              <Skeleton w={140} h={4} />
              <Skeleton w={200} h={4} />
            </Flex>
            <Flex justify={"end"}>
              <Skeleton w={100} h={4} />
            </Flex>
          </Flex>
        </Flex>
      </GridItem>
      <GridItem>
        <Flex direction={"column"}>
          <Skeleton h={200} />
          <Flex p={2} direction={"column"} h={120} justify={"space-between"}>
            <Flex direction={"column"} gap={2}>
              <Skeleton w={140} h={4} />
              <Skeleton w={200} h={4} />
            </Flex>
            <Flex justify={"end"}>
              <Skeleton w={100} h={4} />
            </Flex>
          </Flex>
        </Flex>
      </GridItem>
      <GridItem>
        <Flex direction={"column"}>
          <Skeleton h={200} />
          <Flex p={2} direction={"column"} h={120} justify={"space-between"}>
            <Flex direction={"column"} gap={2}>
              <Skeleton w={140} h={4} />
              <Skeleton w={200} h={4} />
            </Flex>
            <Flex justify={"end"}>
              <Skeleton w={100} h={4} />
            </Flex>
          </Flex>
        </Flex>
      </GridItem>
      <GridItem>
        <Flex direction={"column"}>
          <Skeleton h={200} />
          <Flex p={2} direction={"column"} h={120} justify={"space-between"}>
            <Flex direction={"column"} gap={2}>
              <Skeleton w={140} h={4} />
              <Skeleton w={200} h={4} />
            </Flex>
            <Flex justify={"end"}>
              <Skeleton w={100} h={4} />
            </Flex>
          </Flex>
        </Flex>
      </GridItem>
      <GridItem>
        <Flex direction={"column"}>
          <Skeleton h={200} />
          <Flex p={2} direction={"column"} h={120} justify={"space-between"}>
            <Flex direction={"column"} gap={2}>
              <Skeleton w={140} h={4} />
              <Skeleton w={200} h={4} />
            </Flex>
            <Flex justify={"end"}>
              <Skeleton w={100} h={4} />
            </Flex>
          </Flex>
        </Flex>
      </GridItem>
      <GridItem>
        <Flex direction={"column"}>
          <Skeleton h={200} />
          <Flex p={2} direction={"column"} h={120} justify={"space-between"}>
            <Flex direction={"column"} gap={2}>
              <Skeleton w={140} h={4} />
              <Skeleton w={200} h={4} />
            </Flex>
            <Flex justify={"end"}>
              <Skeleton w={100} h={4} />
            </Flex>
          </Flex>
        </Flex>
      </GridItem>
      <GridItem>
        <Flex direction={"column"}>
          <Skeleton h={200} />
          <Flex p={2} direction={"column"} h={120} justify={"space-between"}>
            <Flex direction={"column"} gap={2}>
              <Skeleton w={140} h={4} />
              <Skeleton w={200} h={4} />
            </Flex>
            <Flex justify={"end"}>
              <Skeleton w={100} h={4} />
            </Flex>
          </Flex>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default ListSkeleton;
