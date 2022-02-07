import axios from "axios"
import AuthData from "../state/AuthData"

axios.interceptors.request.use(
  (config) => {
    if (AuthData.isAuth) {
      config.headers = { Authorization: `Bearer ${AuthData.token}` } //todo: использовать этот токен
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axios
