import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div>
      {/* Dashboard Sidebar will go here later */}
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
