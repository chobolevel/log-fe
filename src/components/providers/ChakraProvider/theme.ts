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
      // heading
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
      "div.sanitize-text-area del": {
        color: "#777980",
      },
      // quote
      "div.sanitize-text-area blockquote": {
        borderLeft: "6px solid gray",
        paddingLeft: "10px",
        marginY: "10px",
        fontWeight: "bold",
      },
      // list(ol, ul)
      "div.sanitize-text-area ul": {
        marginLeft: "20px",
      },
      "div.sanitize-text-area ol": {
        marginLeft: "20px",
      },
      "div.sanitize-text-area li": {
        margin: "10px 0",
      },
      // check list
      "div.sanitize-text-area ul li.task-list-item": {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        listStyle: "none",
      },
      "div.sanitize-text-area ul li.task-list-item::before": {
        content: `"✅"`,
      },
      "div.sanitize-text-area table": {
        borderCollapse: "collapse",
      },
      "div.sanitize-text-area thead": {
        backgroundColor: "#38a16a",
      },
      "div.sanitize-text-area table, div.sanitize-text-area th, div.sanitize-text-area td":
        {
          padding: "10px",
          border: "1px solid #38a16a",
        },
      // img
      "div.sanitize-text-area img": {
        marginTop: "20px",
        maxWidth: "800px",
        borderRadius: "10px",
      },
      // a
      "div.sanitize-text-area a:hover": {
        fontWeight: "bold",
        color: "#38a16a",
      },
      // code block
      "div.sanitize-text-area code": {
        padding: "6px",
        color: "#EB5757",
        backgroundColor: "rgba(135, 131, 120, .15)",
        borderRadius: "10px",
      },
      "div.sanitize-text-area .toastui-editor-ww-code-block": {
        marginY: "20px",
        overflowX: "auto",
        borderRadius: "10px",
        padding: "20px",
        backgroundColor: "rgba(135, 131, 120, .15)",
        textWrap: "wrap",
      },
      "div.sanitize-text-area .toastui-editor-ww-code-block code": {
        padding: "unset",
        border: "none",
        color: "var(--chakra-colors-chakra-body-text)",
        backgroundColor: "transparent",
        borderRadius: "unset",
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
