import { Outlet } from "react-router-dom"; // always use react-router-dom
import Footer from "../Shared-Components/Footer";
import Navbar from "../Shared-Components/NavBar";

const MainLayout = () => {
  return (
     <>
      <Navbar />

      <div className="pt-2">
        <div className="w-full max-w-[1280px] mx-auto px-2 sm:px-4 lg:px-4">
          <Outlet />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
