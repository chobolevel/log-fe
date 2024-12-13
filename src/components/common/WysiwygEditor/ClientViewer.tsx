import dynamic from "next/dynamic";

const WysiwygViewer = dynamic(() => import("./WysiwygViewer"), {
  ssr: false,
});

interface ClientViewerProps {
  value: string;
}

const ClientViewer = ({ value }: ClientViewerProps) => {
  return <WysiwygViewer value={value} />;
};

export default ClientViewer;
