import { Text } from "@chakra-ui/react";

interface ErrorTextProps {
  children: React.ReactNode;
}

const ErrorText = ({ children }: ErrorTextProps) => {
  return (
    <Text fontSize={"sm"} color={"red"} pl={2}>
      {children}
    </Text>
  );
};

export default ErrorText;
