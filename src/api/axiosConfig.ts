import axios from "axios"

// Create an axios instance
const axiosInstance = axios.create({
  baseURL:
    import.meta.env.REACT_APP_API_BASE_URL || "http://localhost:4000/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
