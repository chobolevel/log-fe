// by toast-ui editor
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css"; // @ts-ignore
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all";
import { useColorModeValue } from "@chakra-ui/react";

interface WysiwygViewerProps {
  value: string;
}

const WysiwygViewer = ({ value }: WysiwygViewerProps) => {
  const editorTheme = useColorModeValue("white", "dark");
  return (
    <Viewer
      theme={editorTheme}
      plugins={[codeSyntaxHighlight]}
      initialValue={value}
    />
  );
};

export default WysiwygViewer;
