import Head from "next/head";
import { ResponsiveLayout, UserProfile } from "@/components";
import { Flex, Spinner, Text } from "@chakra-ui/react";
import { useGetMe } from "@/apis";

const HOME_TITLE = "초로 - 나의 프로필";
const HOME_DESC = "초보 개발자의 블로그";
const DIVING_CATEGORIES = ["개발", "블로그"];

const ProfilePage = () => {
  const { data: me } = useGetMe();
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
        <meta name="classification" content={DIVING_CATEGORIES.join(", ")} />
        <meta name="subject" content={DIVING_CATEGORIES.join(", ")} />

        {/*링크*/}
        <link rel="canonical" href="https://chobolevel.site" />
        <link rel="icon" href="https://chobolevel.site/main-logo.png" />

        {/*공유하기*/}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={HOME_TITLE} />
        <meta property="og:description" content={HOME_DESC} />
        <meta property="og:image" content="/images/main-logo.png" />
        <meta property="og:url" content={"https://chobolevel.site"} />
      </Head>
      <ResponsiveLayout>
        <Flex p={4} direction={"column"} gap={4}>
          <Text>프로필</Text>
          {me ? (
            <UserProfile user={me} />
          ) : (
            <Flex w={"100%"} h={300} justify={"center"} align={"center"}>
              <Spinner />
            </Flex>
          )}
        </Flex>
      </ResponsiveLayout>
    </>
  );
};

export default ProfilePage;
