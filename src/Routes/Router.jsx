import { createBrowserRouter } from "react-router-dom";

// Route Guards
import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

// Pages
import Home from "../Pages/Home/Home";

import ContestDetails from "../Pages/ContestDetails/ContestDetails";
import Leaderboard from "../Pages/Leaderboard/Leaderboard";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import NotFound from "../Pages/Error/NotFound";
import MainLayout from "../Components/Layouts/MainLayout";
import DashboardLayout from "../Components/Layouts/DashboardLayout";
import Profile from "../Components/Dashboard/User/Profile";
import ParticipatedContests from "../Components/Dashboard/User/ParticipatedContests";
import WinningContests from "../Components/Dashboard/User/WinningContests";
import AddContest from "../Components/Dashboard/Creator/AddContest";
import MyContests from "../Components/Dashboard/Creator/MyContests";
import Submissions from "../Components/Dashboard/Creator/Submissions";
import ManageUsers from "../Components/Dashboard/Admin/ManageUsers";
import ManageContests from "../Components/Dashboard/Admin/ManageContests";
import ExtraSection from "../Pages/Home/ExtraSection";
import AllContests from "../Pages/AllContests/AllContest";
import Creator from "../Components/Dashboard/Creator/Creator";
import Admin from "../Components/Dashboard/Admin/Admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/contests", element: <AllContests></AllContests> },
      {
        path: "/contest/:id",
        element: (
          <PrivateRoute>
            <ContestDetails/>
          </PrivateRoute>
        ),
      },
      { path: "/leaderboard", element: <Leaderboard /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/extra", element: <ExtraSection></ExtraSection> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [

      //Normal user Dashboard route ===============================================================
      //=====================================================================================

      
      { path: "profile", element: <Profile></Profile> },
      { path: "participated", element: <ParticipatedContests/> },
      { path: "winning", element: <WinningContests /> },

      //Creator Dashboard route ===============================================================
      //=====================================================================================
      {
        path: "creator-dashboard", // ✅ corrected path
        element: (
          <RoleRoute role="creator">
            <Creator />
          </RoleRoute>
        ),
      },
      {
        path: "add-contest",
        element: (
          <RoleRoute role="creator">
            <AddContest></AddContest>
          </RoleRoute>
        ),
      },
      
      {
        path: "my-contests",
        element: (
          <RoleRoute role="creator">
            <MyContests />
          </RoleRoute>
        ),
      },
      {
        path: "submissions",
        element: (
          <RoleRoute role="creator">
            <Submissions />
          </RoleRoute>
        ),
      },

      //Admin Dashboard route ===============================================================
      //=====================================================================================

      {
        path: "admin-dashboard", 
        element: (
          <RoleRoute role="admin">
            <Admin></Admin>
          </RoleRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <RoleRoute role="admin">
            <ManageUsers />
          </RoleRoute>
        ),
      },
      {
        path: "manage-contests",
        element: (
          <RoleRoute role="admin">
            <ManageContests />
          </RoleRoute>
        ),
      },
    ],
  },
]);

export default router;
