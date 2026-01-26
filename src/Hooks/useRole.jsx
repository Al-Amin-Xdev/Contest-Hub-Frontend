import { useContext, useState, useEffect } from "react";
import AuthContext from "../providers/AuthContext";
import useAxios from "./useAxios";

const useRole = () => {
  const { user } = useContext(AuthContext); // get current logged-in user
  const axios = useAxios();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reset when user logs out
    if (!user?.uid) {
      setRole(null);
      setLoading(false);
      return;
    }

    // Fetch role when user logs in
    let isMounted = true;

    const fetchRole = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`/user-role/${user.uid}`);
        if (isMounted) {
          setRole(data.role);
        }
      } catch (err) {
        console.error("Fetch role error:", err);
        if (isMounted) {
          setRole(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchRole();

    return () => {
      isMounted = false;
    };
  }, [user?.uid, axios]);

  return { role, loading };
};

export default useRole;
