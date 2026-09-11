import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import BottomTabBar from "@/components/layout/bottom-tab-bar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex flex-1 flex-col pb-16 md:pb-0">{children}</main>
      <Footer className="hidden md:block" />
      <BottomTabBar />
    </>
  );
}
