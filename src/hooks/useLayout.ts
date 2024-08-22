import {Layout} from "@/types";
import {createContext, useContext} from "react";

const LayoutContext = createContext<{
  layout: Layout;
}>({
  layout: "desktop",
});

const useLayout = () => {
  const {layout} = useContext(LayoutContext);

  return {Provider: LayoutContext.Provider, layout};
};

export default useLayout;
