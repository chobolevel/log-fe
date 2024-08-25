"use client";

import dynamic from "next/dynamic";
import { Spinner } from "@chakra-ui/react";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <Spinner />,
});

interface QuillTextEditorProps {
  value?: string;
  onChange: (val: string) => void;
}

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

const QuillTextEditor = ({ value, onChange }: QuillTextEditorProps) => {
  return (
    <ReactQuill
      modules={modules}
      formats={formats}
      value={value}
      onChange={(val) => onChange(val)}
    />
  );
};

export default QuillTextEditor;
