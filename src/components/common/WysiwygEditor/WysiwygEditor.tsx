"use client";

import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useCreatePresignedUrl } from "@/apis";
import { useMemo, useRef } from "react";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import { useColorModeValue } from "@chakra-ui/react";

interface WysiwygEditorProps {
  value?: string;
  onChange: (content: string) => void;
}

const toolbarItems = [
  ["heading", "bold", "italic", "strike"],
  ["hr", "quote"],
  ["ul", "ol", "task"],
  ["table", "link"],
  ["image"],
  ["code", "codeblock"],
  ["scrollSync"],
];

const WysiwygEditor = ({ value, onChange }: WysiwygEditorProps) => {
  const editorRef = useRef<Editor>(null);
  const editorTheme = useColorModeValue("white", "dark");

  const { mutate: createPresignedUrl } = useCreatePresignedUrl();

  const defaultValue = useMemo(
    () => value ?? "게시글 내용을 입력하세요.",
    [value],
  );
  return (
    <Editor
      ref={editorRef}
      onChange={() => {
        const content = editorRef.current?.getInstance().getHTML().toString();
        if (content) {
          onChange(content);
        }
      }}
      theme={editorTheme}
      initialValue={defaultValue}
      initialEditType={"wysiwyg"}
      previewStyle={"vertical"}
      hideModeSwitch={true}
      height={"500px"}
      usageStatistics={false}
      toolbarItems={toolbarItems}
      useCommandShortcut={true}
      hooks={{
        addImageBlobHook: (file: File | Blob, callback) => {
          const uploadedFile = file as File;
          const lastDotIdx = uploadedFile.name.lastIndexOf(".");
          const filename = uploadedFile.name.substring(0, lastDotIdx);
          const extension = uploadedFile.name.substring(lastDotIdx + 1);
          createPresignedUrl(
            {
              prefix: "image",
              filename,
              extension,
            },
            {
              onSuccess: (res) => {
                fetch(res.data.url, {
                  method: "PUT",
                  body: uploadedFile,
                  headers: {
                    "Content-Type": extension,
                  },
                }).then(() => {
                  callback(res.data.url, res.data.filename_with_extension);
                });
              },
            },
          );
        },
      }}
    />
  );
};

export default WysiwygEditor;
