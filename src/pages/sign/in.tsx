import Head from "next/head";
import { Flex } from "@chakra-ui/react";
import { SignInForm } from "@/components";
import { useSafePush } from "@/hooks";

const HOME_TITLE = "로그인 - 초로";
const HOME_DESC =
  "초보 개발자 강인재(chobolevel)가 운영하는 개인 블로그 초로에 함께해보세요!";
const CATEGORIES = [
  "개발",
  "블로그",
  "초로",
  "초보 개발자의 로그",
  "cholo",
  "chobolevel",
  "로그인",
];

const SignInPage = () => {
  const { router } = useSafePush();
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
          href={`https://chobolevel.co.kr${router.asPath}`}
        />
        <link rel="icon" href="https://chobolevel.co.kr/images/main-logo.png" />

        {/*공유하기*/}
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:site_name" content={"초로"} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={HOME_TITLE} />
        <meta property="og:description" content={HOME_DESC} />
        <meta property="og:image" content="/images/main-logo.png" />
        <meta
          property="og:url"
          content={`https://chobolevel.co.kr${router.asPath}`}
        />
      </Head>
      <Flex
        w={"100vw"}
        h={"100vh"}
        direction={"column"}
        justify={"center"}
        align={"center"}
      >
        <SignInForm />
      </Flex>
    </>
  );
};

export default SignInPage;
