import { useContext } from "react";
import AuthContext from "../providers/AuthContext"; // default import

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
