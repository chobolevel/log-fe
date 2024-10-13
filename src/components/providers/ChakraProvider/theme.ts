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
  config: {
    initialColorMode: "system",
    useSystemColorMode: false,
  },
  styles: {
    global: {
      "div.sanitize-text-area h1": {
        fontSize: "3.5rem",
        fontWeight: "bold",
        marginTop: "30px",
        marginBottom: "10px",
      },
      "div.sanitize-text-area h2": {
        fontSize: "3rem",
        fontWeight: "bold",
        marginTop: "30px",
        marginBottom: "10px",
      },
      "div.sanitize-text-area h3": {
        fontSize: "2.5rem",
        fontWeight: "bold",
        marginTop: "30px",
        marginBottom: "10px",
      },
      "div.sanitize-text-area h4": {
        fontSize: "2rem",
        fontWeight: "bold",
        marginTop: "30px",
        marginBottom: "10px",
      },
      "div.sanitize-text-area h5": {
        fontSize: "1.5rem",
        fontWeight: "bold",
        marginTop: "30px",
        marginBottom: "10px",
      },
      "div.sanitize-text-area h6": {
        fontSize: "1rem",
        fontWeight: "bold",
        marginTop: "30px",
        marginBottom: "10px",
      },
      ul: {
        marginLeft: "30px",
      },
      "div.sanitize-text-area ol": {
        marginLeft: "30px",
      },
      "div.sanitize-text-area li": {
        margin: "10px 0",
      },
      "div.sanitize-text-area img": {
        marginTop: "20px",
        maxWidth: "800px",
        borderRadius: "10px",
      },
      "div.sanitize-text-area a:hover": {
        fontWeight: "bold",
      },
      ".toastui-editor-ww-code-block": {
        overflowX: "auto",
        borderRadius: "10px",
        padding: "20px",
        backgroundColor: "#eee",
        textWrap: "wrap",
      },
    },
  },
  fonts: {
    heading: fonts.oneMobile.style.fontFamily,
    body: fonts.oneMobile.style.fontFamily,
  },
  colors: {
    lightGreen: "#38a16a",
    lightModeBack: "#fff",
    darkModeBack: "#1B202B",
  },
  breakpoints,
});

export default theme;
