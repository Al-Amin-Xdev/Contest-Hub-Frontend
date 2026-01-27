import { Outlet } from "react-router-dom";
import Navbar from "../Shared-Components/NavBar";

const DashboardLayout = () => {
  return (
    <div>
      {/* Dashboard Sidebar will go here later */}
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default DashboardLayout;
