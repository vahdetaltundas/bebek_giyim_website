import Footer from "./Footer";
import Header from "./Header"

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