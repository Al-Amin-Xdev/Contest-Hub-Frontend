// import { Navigate } from "react-router-dom";
// import useRole from "../Hooks/useRole";

// const RoleRoute = ({ children, role }) => {
//   const { role: userRole, loading } = useRole();

//   if (loading) return null;

//   if (userRole !== role) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default RoleRoute;


import { Navigate, useLocation } from "react-router-dom";
import useRole from "../Hooks/useRole";

const RoleRoute = ({ children, role }) => {
  const { role: userRole, loading } = useRole();
  const location = useLocation();

  // Show loader while checking role
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // If role does not match → go to register
  if (userRole !== role) {
    return (
      <Navigate
        to="/register"
        state={{ from: location.pathname }}
        replace
      />
    );
  }

  // Role matches → allow access
  return children;
};

export default RoleRoute;

