import axios from "axios"
import { observer } from "mobx-react-lite"
import React from "react"
import SoundItem from "../Component/SoundItem"
import AudioPlayer from "../state/AudioPlayer"
import { item } from "../Types/item"

type Props = {}

const Home = observer((props: Props) => {
  const [filter, setFilter] = React.useState("")
  const [items, setItems] = React.useState<any>([
    {
      _id: "string",
      name: "string",
      path: "",
      dataCreate: new Date(),
      description: "string",
      tags: ["string"],
      size: 0,
    },
  ])

  React.useEffect(() => {
    if (!filter) {
      const handle = async () => {
        try {
          const data = await axios.get("/api/item")
          setItems(data.data)
        } catch (error) {}
      }
      handle()
    } else {
      const handle = async () => {
        try {
          const data = await axios.get(`/api/item/tags?tags=${filter}`)
          setItems(data.data)
        } catch (error) {}
      }
      handle()
    }
  }, [filter])

  return (
    <div>
      <div className="content">
        <div className="cards">
          {items.map((item: item) => {
            if (item.path) return <SoundItem item={item} key={item._id} />
            return null
          })}
        </div>
      </div>
    </div>
  )
})

export default Home
