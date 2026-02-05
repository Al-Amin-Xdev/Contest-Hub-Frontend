import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";


const instance = axios.create({
  baseURL: "https://contest-hub-backend-self.vercel.app", 
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();

  useEffect(() => {
    // Request interceptor: Add token to headers
    const requestInterceptor = instance.interceptors.request.use((config) => {
      if (user?.accessToken) {
        config.headers.authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    });

    // Response interceptor: Handle errors
    const responseInterceptor = instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response?.status;

        // Handle 401 (Unauthorized) or 403 (Forbidden)
        if (status === 401 || status === 403) {
          logOut(); // Clear user and redirect to login
        }

        return Promise.reject(error);
      }
    );

    // Cleanup: Remove interceptors when component unmounts or user changes
    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logOut]);

  return instance;
};

export default useAxiosSecure;
