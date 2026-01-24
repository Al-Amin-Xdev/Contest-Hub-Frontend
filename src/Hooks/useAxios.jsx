import axios from "axios"

const AxiosInstance = axios.create({
  baseURL: 'https://krishi-link-server-nine.vercel.app'
})

const useAxios =()=>{
  return AxiosInstance;
}

export default useAxios