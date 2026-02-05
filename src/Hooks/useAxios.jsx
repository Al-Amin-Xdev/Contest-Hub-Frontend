import axios from "axios"

const AxiosInstance = axios.create({
  baseURL: 'https://contest-hub-backend-self.vercel.app'
})

const useAxios =()=>{
  return AxiosInstance;
}

export default useAxios