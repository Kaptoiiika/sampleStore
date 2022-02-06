import axios from "axios"
import { makeAutoObservable } from "mobx"

const storageName = "userData"
class AuthData {
  firstLoad = true
  loading = false
  isAuth = false
  token = ""
  user = {
    _id: "null",
    name: "null",
    icon: "null",
    status: "",
    subscribers: [{ _id: "null", name: "null" }],
  }

  constructor() {
    makeAutoObservable(this)
  }
  async update() {
    axios
      .get("/api/user/update", {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      .then(({ data }) => {
        this.user = data.user
      })
      .catch((error) => {
        this.token = ""
        localStorage.removeItem(storageName)
      })
      .finally(() => {
        this.firstLoad = false
      })
  }
  async login(login: string, password: string) {
    this.loading = true
    try {
      const { data } = await axios.post("/api/user/login", {
        name: login,
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
      return error.response.data.message
    } finally {
      this.loading = false
    }
  }

  async registertration(login: string, password: string) {
    this.loading = true
    try {
      const { data } = await axios.post("api/user/register", {
        name: login,
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
      return error.response.data.message
    } finally {
      this.loading = false
    }
  }

  async updateInfo(status: string, social: string) {
    try {
      await axios.post(
        "api/user/updateInfo",
        {
          status: status,
          social: social,
        },
        {
          headers: { Authorization: `Bearer ${this.token}` },
        }
      )
    } catch (error: any) {
      return error.response.data.message
    }
  }

  loginToken() {
    const { token } = JSON.parse(
      localStorage.getItem(storageName) || `{"token":""}`
    )
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
      this.update()
      return ""
    } catch (error: any) {
      return error.response.data.message
    }
  }
}

export default new AuthData()
