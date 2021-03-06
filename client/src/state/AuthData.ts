import axios from "axios"
import apiClient from "../services/apiClient"
import { makeAutoObservable } from "mobx"

const storageName = "userData"
class AuthData {
  firstLoad = true
  loading = false
  isAuth = false
  token = ""
  user = {
    _id: "",
    username: "null",
    email: "null",
    icon: "null",
    status: "",
    subscription: "null",
    uploads: [{ _id: "null" }],
  }

  constructor() {
    makeAutoObservable(this)
  }

  async login(email: string, password: string) {
    try {
      this.loading = true
      const { data } = await axios.post("/api/user/login", {
        email: email,
        password: password,
      })
      this.token = data.token
      this.user = data.user
      localStorage.setItem(
        storageName,
        JSON.stringify({
          token: data.token,
        })
      )
      this.isAuth = true
      return ""
    } catch (error: any) {
      throw new Error(error)
    } finally {
      this.loading = false
    }
  }

  async registertration(email: string, username: string, password: string) {
    this.loading = true
    try {
      const { data } = await axios.post("api/user/register", {
        email: email,
        username: username,
        password: password,
      })
      this.token = data.token
      this.user = data.user
      localStorage.setItem(
        storageName,
        JSON.stringify({
          token: data.token,
        })
      )
      this.isAuth = true
      return ""
    } catch (error: any) {
      throw new Error(error)
    } finally {
      this.loading = false
    }
  }

  async updateInfo(status: string, social: string) {
    try {
      await apiClient.post("api/user/updateInfo", {
        status: status,
        social: social,
      })
    } catch (error: any) {
      return error.response.data.message
    }
  }

  loginToken() {
    const { token } = JSON.parse(
      localStorage.getItem(storageName) || `{"token":""}`
    )
    if (!token) {
      this.firstLoad = false
      return
    }
    axios
      .get("/api/user/auth", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(({ data }) => {
        this.token = data.token
        this.user = data.user
        this.isAuth = true
        localStorage.setItem(
          storageName,
          JSON.stringify({
            token: data.token,
          })
        )
      })
      .catch((error) => {
        this.isAuth = true
        this.token = ""
        localStorage.removeItem(storageName)
      })
      .finally(() => {
        this.firstLoad = false
      })
  }

  logout() {
    localStorage.removeItem(storageName)
    window.location.reload()
  }
  async subscribe(name: string) {
    try {
      await axios.get(`api/user/subscribe/${name}`, {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      return ""
    } catch (error: any) {
      return error.response.data.message
    }
  }
}

export default new AuthData()
