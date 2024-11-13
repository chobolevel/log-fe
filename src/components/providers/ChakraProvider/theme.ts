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
      "div.toastui-editor-contents": {
        fontSize: "1rem",
      },
      // heading
      "div.sanitize-text-area h1, div.toastui-editor-contents h1": {
        fontSize: "2rem",
        fontWeight: "bold",
        marginTop: "30px",
        marginBottom: "10px",
        border: "none",
      },
      "div.sanitize-text-area h2, div.toastui-editor-contents h2": {
        fontSize: "1.8rem",
        fontWeight: "bold",
        marginTop: "30px",
        marginBottom: "10px",
        border: "none",
      },
      "div.sanitize-text-area h3, div.toastui-editor-contents h3": {
        fontSize: "1.6rem",
        fontWeight: "bold",
        marginTop: "30px",
        marginBottom: "10px",
      },
      "div.sanitize-text-area h4, div.toastui-editor-contents h4": {
        fontSize: "1.4rem",
        fontWeight: "bold",
        marginTop: "30px",
        marginBottom: "10px",
      },
      "div.sanitize-text-area h5, div.toastui-editor-contents h5": {
        fontSize: "1.2rem",
        fontWeight: "bold",
        marginTop: "30px",
        marginBottom: "10px",
      },
      "div.sanitize-text-area h6, div.toastui-editor-contents h6": {
        fontSize: "1rem",
        fontWeight: "bold",
        marginTop: "30px",
        marginBottom: "10px",
      },
      "div.sanitize-text-area del, div.toastui-editor-contents del": {
        color: "#777980",
      },
      // quote
      "div.sanitize-text-area blockquote, div.toastui-editor-contents blockquote":
        {
          borderLeft: "6px solid gray",
          paddingLeft: "10px",
          marginY: "10px",
          fontWeight: "bold",
        },
      // list(ol, ul)
      "div.sanitize-text-area ul, div.toastui-editor-contents ul": {
        marginLeft: "20px",
      },
      "div.sanitize-text-area ol, div.toastui-editor-contents ol": {
        marginLeft: "20px",
      },
      "div.sanitize-text-area li, div.toastui-editor-contents li": {
        margin: "10px 0",
      },
      // check list
      "div.sanitize-text-area ul li.task-list-item, div.toastui-editor-contents ul li.task-list-item":
        {
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
      "div.toastui-editor-contents th": {
        backgroundColor: "#38a16a !important",
        border: "1px solid #38a16a !important",
      },
      "div.toastui-editor-contents table, div.toastui-editor-contents td": {
        padding: "10px",
        border: "1px solid #38a16a !important",
      },
      // img
      "div.sanitize-text-area img, div.toastui-editor-contents img": {
        marginTop: "20px",
        maxWidth: "800px",
        borderRadius: "10px",
      },
      // a
      "div.sanitize-text-area a, div.toastui-editor-contents a": {
        cursor: "pointer",
        textDecoration: "none",
        color: "#38a16a !important",
      },
      "div.sanitize-text-area a:hover, div.toastui-editor-contents a:hover": {
        fontWeight: "bold",
      },
      // code block
      "div.sanitize-text-area code, div.toastui-editor-contents code": {
        padding: "6px",
        color: "#EB5757 !important",
        backgroundColor: "rgba(135, 131, 120, .15) !important",
        borderRadius: "10px",
      },
      "div.sanitize-text-area .toastui-editor-ww-code-block, div.toastui-editor-contents .toastui-editor-ww-code-block":
        {
          marginY: "20px",
          overflowX: "auto",
          borderRadius: "10px",
          padding: "20px",
          backgroundColor: "rgba(135, 131, 120, .15)",
          textWrap: "wrap",
        },
      "div.sanitize-text-area .toastui-editor-ww-code-block code, div.toastui-editor-contents .toastui-editor-ww-code-block code":
        {
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
