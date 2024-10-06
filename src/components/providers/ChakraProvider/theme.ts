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
