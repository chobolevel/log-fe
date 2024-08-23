import { Box } from "@chakra-ui/react";
import DOMPurify from "isomorphic-dompurify";

interface SanitizeTextProps {
  htmlString: string;
}

const SanitizeText = ({ htmlString }: SanitizeTextProps) => {
  return (
    <Box
      fontSize={"sm"}
      whiteSpace={"break-spaces"}
      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(htmlString) }}
    />
  );
};

export default SanitizeText;
