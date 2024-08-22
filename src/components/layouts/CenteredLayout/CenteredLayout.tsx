import {Center} from "@chakra-ui/react";

interface CenteredLayoutProps {
  children?: React.ReactNode;
}

const CenteredLayout = ({children}: CenteredLayoutProps) => {
  return (
    <Center w={"full"} h={"full"}>
      {children}
    </Center>
  );
};

export default CenteredLayout;
