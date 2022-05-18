import { Outlet } from "react-router-dom";
import Header from "./header.js"
import Navbar from "./Navbar.js";
import Footer from "./footer.js";
import "./styles/style.css";

const Layout = () => {
  return (
    <>

      <Header />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
};

export default Layout;