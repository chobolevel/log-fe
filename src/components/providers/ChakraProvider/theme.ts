import { fonts } from "@/constants";
import { extendTheme } from "@chakra-ui/react";

const breakpoints = {
  base: "0em",
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
};

const theme = extendTheme({
  styles: {
    global: {
      h1: {
        fontSize: "3rem",
        fontWeight: "bold",
        marginTop: "30px",
        marginBottom: "10px",
      },
      h2: {
        fontSize: "2rem",
        fontWeight: "bold",
        marginTop: "30px",
        marginBottom: "10px",
      },
      h3: {
        fontSize: "1rem",
        fontWeight: "bold",
        marginTop: "30px",
        marginBottom: "10px",
      },
      ul: {
        marginLeft: "30px",
      },
      ol: {
        marginLeft: "30px",
      },
      li: {
        margin: "10px 0",
      },
      img: {
        maxWidth: "800px",
      },
      "a:hover": {
        fontWeight: "bold",
      },
      ".toastui-editor-ww-code-block": {
        overflowX: "auto",
        borderRadius: "10px",
        padding: "20px",
        backgroundColor: "#eee",
        textWrap: "wrap",
      },
      // "input[type='date']": {
      //   position: "relative",
      //   backgroundColor: "transparent",
      // },
      // "input[type='date']::-webkit-calendar-picker-indicator": {
      //   position: "absolute",
      //   background: "transparent",
      //   top: 0,
      //   left: 0,
      //   zIndex: 999,
      //   width: "100%",
      //   height: "100%",
      // },
      // "input[type='date']::before": {
      //   content: "attr(placeholder)",
      //   width: "100%",
      //   height: "100%",
      // },
      // "input[type='date']:valid::before": {
      //   display: "none",
      // },
      // td: {
      //   border: "1px solid",
      // },
    },
  },
  fonts: {
    heading: fonts.oneMobile.style.fontFamily,
    body: fonts.oneMobile.style.fontFamily,
  },
  colors: {
    lightGreen: "#38a16a",
    // hoverBg: "#f7f7f7",
    // darkOrange: "#de6412",
    // crimson: "#a30606",
    // oceanBlue: "#0e71eb",
    // ocean: "#03629e",
    // oceanLight: "#03629edd",
    // oceanLighter: "#03629ebb",
    // oceanBright: "#03629e22",
    // oceanBrighter: "#03629e11",
    // indigo: "#1b4aa1",
    // indigoLight: "#1b4aa1dd",
    // indigoLighter: "#1b4aa1bb",
    // indigoBright: "#1b4aa122",
    // indigoBrighter: "#1b4aa111",
    // bg: "var(--chakra-colors-chakra-body-bg)",
    // subtleBg: "var(--chakra-colors-chakra-subtle-bg)",
    // text: "var(--chakra-colors-chakra-body-text)",
    // subtleText: "var(--chakra-colors-chakra-subtle-text)",
    // inverseText: "var(--chakra-colors-chakra-inverse-text)",
    // placeholder: "var(--chakra-colors-chakra-placeholder-color)",
    // border: "var(--chakra-colors-chakra-border-color)",
    // naver: "#2db400",
    // kakao: "#fae100",
  },
  breakpoints,
});

export default theme;
