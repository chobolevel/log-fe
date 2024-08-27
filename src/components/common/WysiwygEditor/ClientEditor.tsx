import dynamic from "next/dynamic";

interface ClientEditorProps {
  value?: string;
  onChange: (content: string) => void;
}

const WysiwygEditor = dynamic(() => import("./WysiwygEditor"), {
  ssr: false,
});

const ClientEditor = ({ value, onChange }: ClientEditorProps) => {
  return <WysiwygEditor value={value} onChange={onChange} />;
};

export default ClientEditor;
