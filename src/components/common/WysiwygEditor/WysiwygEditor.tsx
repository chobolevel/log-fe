"use client";

import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { useCreatePresignedUrl } from "@/apis";
import { useRef } from "react";

interface WysiwygEditorProps {
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

const WysiwygEditor = ({ onChange }: WysiwygEditorProps) => {
  const editorRef = useRef<Editor>(null);
  const { mutate: createPresignedUrl } = useCreatePresignedUrl();
  return (
    <Editor
      ref={editorRef}
      onChange={() => {
        const content = editorRef.current?.getInstance().getHTML().toString();
        if (content) {
          onChange(content);
        }
      }}
      initialValue={"게시글 내용을 입력하세요."}
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
          const filename = uploadedFile.name.split(".")[0];
          const extension = uploadedFile.name.split(".")[1];
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
