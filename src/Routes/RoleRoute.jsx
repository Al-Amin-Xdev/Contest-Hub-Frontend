import { Navigate } from "react-router-dom";
import useRole from "../Hooks/useRole";






const RoleRoute = ({ children, role }) => {
  const { role: userRole, loading } = useRole();

  if (loading) return null;

  if (userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleRoute;
