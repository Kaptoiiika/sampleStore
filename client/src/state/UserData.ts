import apiClient from "../services/apiClient"
import { makeAutoObservable } from "mobx"

class UserData {
  loading = false
  user = {
    _id: "null",
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

  async getUserInfo(id: string) {
    this.loading = true
    try {
      const { data } = await apiClient.get("/api/user/" + id)

      return data
    } catch (error: any) {
      throw error
    } finally {
      this.loading = false
    }
  }
}

export default new UserData()
