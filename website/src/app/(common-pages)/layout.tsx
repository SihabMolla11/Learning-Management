import Footer from "@/components/common-components/Footer";
import Header from "@/components/common-components/Header";

const WebsiteLayout = ({ children }) => {
  return (
    <main>
      <Header />
      <div className="min-h-[calc(100vh-420px)]">{children}</div>
      <Footer />
    </main>
  );
};

export default WebsiteLayout;
