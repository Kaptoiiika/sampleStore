import apiClient from "../services/apiClient"
import { makeAutoObservable } from "mobx"

class ItemsData {
  items = [
    {
      _id: "string",
      name: "string",
      path: "",
      dataCreate: new Date(),
      description: "string",
      tags: ["string"],
      size: 0,
    },
  ]

  constructor() {
    makeAutoObservable(this)
  }
  async get() {
    try {
      const { data } = await apiClient.get("/api/item")
      this.items = data
    } catch (error) {}
  }

  async handleSend(form: any, file: any, avatar?: any) {
    const formData = new FormData()
    formData.append("name", form.name)
    formData.append("tags", form.tags)
    formData.append("description", form.description)

    formData.append("source", file)
    if (avatar) formData.append("icon", avatar)
    try {
      await apiClient.post("/api/item/", formData)
      this.get()
    } catch (error: any) {
      console.log(error.message)
    }
  }
  
  async delete(id: string) {
    try {
      await apiClient.delete(`/api/item/${id}`)
      this.get()
    } catch (error: any) {
      console.log(error.message)
    }
  }
}

export default new ItemsData()
