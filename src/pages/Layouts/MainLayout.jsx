import { Outlet } from "react-router";
import Navbar from "../../components/Header/Navbar";
import Footer from "../../components/Footer/Footer";
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
  return (
    <section>
      <ToastContainer/>
      <Navbar />
      <Outlet/>
      <Footer/>
    </section>
  );
};

export default MainLayout;
