import { createBrowserRouter } from "react-router-dom";

// Route Guards
import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

// Pages
import Home from "../Pages/Home/Home";
import AllContest from "../Pages/AllContests/AllContest";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/contests", element: <AllContest /> },
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
      { path: "profile", element: <Profile></Profile> },
      { path: "participated", element: <ParticipatedContests/> },
      { path: "winning", element: <WinningContests /> },

      {
        path: "add-contest",
        element: (
          <RoleRoute role="creator">
            <AddContest />
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
