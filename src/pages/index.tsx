import {ResponsiveLayout} from "@/components";
import Head from "next/head";

const HOME_TITLE = "초로 - 초보 개발자의 블로그";
const HOME_DESC =
  "초보 개발자의 블로그";
const DIVING_CATEGORIES = [
  "개발",
  "블로그",
];

export default function HomePage() {

  return (
    <>
      <Head>
        <title>{HOME_TITLE}</title>

        {/*view port*/}
        <meta name="viewport" content="width=device-width, initial-scale=1"/>

        {/*meta*/}
        <meta name="title" content={HOME_TITLE}/>
        <meta name="description" content={HOME_DESC}/>
        {/*<meta property="image" content="/images/swiper/slide5.jpeg" />*/}
        <meta name="publisher" content={"chobolevel"}/>
        <meta name="author" content={"초로"}/>
        <meta name="classification" content={DIVING_CATEGORIES.join(", ")}/>
        <meta name="subject" content={DIVING_CATEGORIES.join(", ")}/>

        {/*링크*/}
        {/*<link rel="canonical" href="https://hankkang.com" />*/}
        {/*<link rel="icon" href="https://hankkang.com/hankkang-logo.png" />*/}

        {/*공유하기*/}
        <meta property="og:type" content="website"/>
        <meta property="og:title" content={HOME_TITLE}/>
        <meta property="og:description" content={HOME_DESC}/>
        {/*<meta property="og:image" content="/images/swiper/slide5.jpeg" />*/}
        {/*<meta property="og:url" content={"https://hankkang.com"} />*/}
      </Head>
      <ResponsiveLayout>
      </ResponsiveLayout>
    </>
  );
}
