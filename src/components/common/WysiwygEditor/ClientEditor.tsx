import dynamic from "next/dynamic";

interface ClientEditorProps {
  onChange: (content: string) => void;
}

const WysiwygEditor = dynamic(() => import("./WysiwygEditor"), {
  ssr: false,
});

const ClientEditor = ({ onChange }: ClientEditorProps) => {
  return <WysiwygEditor onChange={onChange} />;
};

export default ClientEditor;
