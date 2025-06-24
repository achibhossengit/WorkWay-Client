import { Outlet } from "react-router";
import Navbar from "../../components/Header/Navbar";
import Footer from "../../components/Footer/Footer";

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
