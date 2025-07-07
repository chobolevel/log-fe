import Head from "next/head";
import { Flex, Text } from "@chakra-ui/react";

const HOME_TITLE = "초보 개발자의 로그 - 초로";
const HOME_DESC =
  "안녕하세요! 초보 개발자 강인재(chobolevel)가 운영하는 개인 블로그 초로입니다. 현재 java/kotlin, javascript, spring, db, network, kafka, linux, aws, programing, os, git, redis 카테고리로 블로그를 운영하고 있습니다.";
const CATEGORIES = [
  "개발",
  "블로그",
  "초로",
  "초보 개발자의 로그",
  "cholo",
  "chobolevel",
];

export default function HomePage() {
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
        <link rel="canonical" href="https://chobolevel.co.kr" />
        <link rel="icon" href="https://chobolevel.co.kr/images/main-logo.png" />

        {/*웹 마스터 도구*/}
        <meta
          name="naver-site-verification"
          content="65a69709a0c4cd983815820bc54e58ac1e451355"
        />
        <meta
          name="google-site-verification"
          content="Nrob-smwtJPVsW1tKJdGjFTODSecJyb1SyvdMLBxCiQ"
        />

        {/*공유하기*/}
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:site_name" content={"초로"} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={HOME_TITLE} />
        <meta property="og:description" content={HOME_DESC} />
        <meta property="og:image" content="/images/main-logo.png" />
        <meta property="og:url" content={"https://chobolevel.co.kr"} />
      </Head>
      <Flex
        py={200}
        px={200}
        direction={"column"}
        align={"center"}
        justify={"center"}
        gap={10}
      >
        <Text fontSize={"2xl"} fontWeight={"bold"} color={"lightGreen"}>
          🙋‍♀️ [서비스 리뉴얼로 인한 일시 중단 안내]
        </Text>
        <Text
          whiteSpace={"break-spaces"}
          textAlign={"center"}
          fontSize={"lg"}
          fontWeight={"bold"}
        >
          {`[초보 개발자의 로그 초로]가 여러분께 더 좋은 경험을 드리기 위해
          잠시 숨을 고르고, 다시 뛰어오를 준비를 하고 있습니다!

          내부적으로 큰 변화와 개선을 위한 리뉴얼 작업에 돌입하면서,
          부득이하게 [2025.07.07]부터 서비스 이용이 어렵게 되었습니다.

          정확한 재오픈 시점은 아직 정해지지 않았지만,
          새로운 모습으로 꼭 다시 인사드릴게요.

          기다려주시는 모든 분들께 감사드리며,
          앞으로의 소식은 추후에 여기를 통해 전달드리겠습니다.

          고맙습니다. 또 만나요! 🌱`}
        </Text>
      </Flex>
    </>
  );
}
