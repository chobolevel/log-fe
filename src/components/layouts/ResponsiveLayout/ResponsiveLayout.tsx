import {useLayout} from "@/hooks";
import {useMemo} from "react";
import {DefaultLayout} from "../DefaultLayout";
import {MobileLayout} from "../MobileLayout";

interface ResponsiveLayoutProps {
  children?: React.ReactNode;
}

const ResponsiveLayout = ({children}: ResponsiveLayoutProps) => {
  const {layout} = useLayout();

  const Layout = useMemo(() => {
    switch (layout) {
      case "desktop":
        return DefaultLayout;
      case "mobile":
        return MobileLayout;
      default:
        throw new Error(`Invalid layout: ${layout}`);
    }
  }, [layout]);

  return <Layout>{children}</Layout>;
};

export default ResponsiveLayout;
