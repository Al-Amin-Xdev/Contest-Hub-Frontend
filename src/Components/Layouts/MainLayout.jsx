// import { Outlet } from "react-router";
// import NavBar from "../Shared-Components/NavBar";
// import Footer from "../Shared-Components/Footer";

// const MainLayout = () => {
//   return (
//     <>
//       <NavBar />
//       <Outlet />
//       <Footer />
//     </>

//   );
// };

// export default MainLayout;

import { Outlet } from "react-router-dom"; // always use react-router-dom
import Footer from "../Shared-Components/Footer";
import Navbar from "../Shared-Components/NavBar";

const MainLayout = () => {
  return (
     <>
      <Navbar />

      <div className="pt-16">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
          <Outlet />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
