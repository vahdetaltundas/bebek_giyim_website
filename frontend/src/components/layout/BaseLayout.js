import Footer from "./Footer";
import Header from "./Headers"

const BaseLayout = ({ children }) => {

  return (
    <>
    <Header/>
    {children}
    <Footer/>
    </>
  );
};

export default BaseLayout;