// import { useContext } from "react";
// import AuthContext from "../Providers/AuthContext";


// const useAuth =()=>{
//   const authInfo = useContext(AuthContext);
//   return authInfo;
// }

// export default useAuth


import { useContext } from "react";
import AuthContext from "../providers/AuthContext"; // default import

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;

