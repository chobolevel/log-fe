// by toast-ui editor
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css"; // @ts-ignore
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all";

interface WysiwygViewerProps {
  value: string;
}

const WysiwygViewer = ({ value }: WysiwygViewerProps) => {
  return <Viewer plugins={[codeSyntaxHighlight]} initialValue={value} />;
};

export default WysiwygViewer;
