import Head from "next/head";
import {
  GuestBookList,
  ListSkeleton,
  Pagination,
  ResponsiveLayout,
} from "@/components";
import { Button, Flex, Text } from "@chakra-ui/react";
import { useGetGuestBooks } from "@/apis/domains/guestBook";
import { useModalStore } from "@/stores";
import GuestBookWriter from "@/components/domains/guestBook/GuestBookWriter";
import { useEffect, useState } from "react";
import { useSafePush } from "@/hooks";
import { PageRoutes } from "@/constants";

const HOME_TITLE = "방명록 - 초로";
const HOME_DESC =
  "초보 개발자 강인재(chobolevel)가 운영하는 개인 블로그 초로에 방문한 여러분들의 방명록을 남겨주세요!";
const CATEGORIES = [
  "개발",
  "블로그",
  "초로",
  "초보 개발자의 로그",
  "cholo",
  "chobolevel",
  "방명록",
];
const LIMIT_COUNT = 10;

const GuestBookListPage = () => {
  const { push, router } = useSafePush();
  const { openModal } = useModalStore(["openModal"]);
  const [page, setPage] = useState<number>(Number(router.query.page ?? 1));

  const {
    data: guestBooks,
    isError,
    error,
  } = useGetGuestBooks({
    skipCount: (page - 1) * LIMIT_COUNT,
    limitCount: LIMIT_COUNT,
    orderTypes: ["CREATED_AT_DESC"],
  });

  useEffect(() => {
    setPage(Number(router.query.page ?? 1));
  }, [router.query]);
  return (
    <>
      <Head>
        <title>{HOME_TITLE}</title>

        {/*view port*/}
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/*meta*/}
        <link rel="icon" href="/favicon.ico" />
        <meta name="title" content={HOME_TITLE} />
        <meta name="description" content={HOME_DESC} />
        <meta property="image" content="/images/main-logo.png" />
        <meta name="publisher" content={"chobolevel"} />
        <meta name="author" content={"chobolevel"} />
        <meta name="classification" content={CATEGORIES.join(", ")} />
        <meta name="subject" content={CATEGORIES.join(", ")} />

        {/*링크*/}
        <link
          rel="canonical"
          href={`https://chobolevel.site${router.asPath}`}
        />
        <link rel="icon" href="https://chobolevel.site/images/main-logo.png" />

        {/*공유하기*/}
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:site_name" content={"초로"} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={HOME_TITLE} />
        <meta property="og:description" content={HOME_DESC} />
        <meta property="og:image" content="/images/main-logo.png" />
        <meta
          property="og:url"
          content={`https://chobolevel.site${router.asPath}`}
        />
      </Head>
      <ResponsiveLayout>
        <Flex p={4} direction={"column"} gap={4}>
          <Flex justify={"space-between"} align={"center"}>
            <Text color={"lightGreen"} fontWeight={"bold"}>
              {`최신 방명록(${guestBooks?.total_count ?? 0})`}
            </Text>
            <Button
              colorScheme={"green"}
              onClick={() => {
                openModal(GuestBookWriter, {});
              }}
            >
              방명록 등록
            </Button>
          </Flex>
          {guestBooks ? (
            <>
              <GuestBookList guestBooks={guestBooks.data} />
              <Pagination
                currentPage={page}
                limit={LIMIT_COUNT}
                total={guestBooks.total_count}
                onChange={(page) => {
                  push({
                    pathname: PageRoutes.GuestBooks,
                    query: { ...router.query, page },
                  });
                }}
              />
            </>
          ) : isError ? (
            <Text>{error?.response?.data.error_message}</Text>
          ) : (
            <ListSkeleton />
          )}
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default GuestBookListPage;
