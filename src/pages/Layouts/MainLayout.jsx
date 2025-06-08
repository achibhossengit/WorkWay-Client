import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <section>
      <Navbar />
      <Outlet/>
      <Footer/>
    </section>
  );
};

export default MainLayout;
