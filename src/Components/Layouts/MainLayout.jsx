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
import NavBar from "../Shared-Components/NavBar";
import Footer from "../Shared-Components/Footer";


const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Main content */}
      <main className="flex-1 w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        <NavBar></NavBar>
        <Outlet />
        <Footer></Footer>
      
      </main>
    </div>
  );
};

export default MainLayout;
