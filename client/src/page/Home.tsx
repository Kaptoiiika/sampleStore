import axios from "axios"
import React from "react"
import CreateSoundItem from "../Component/CreateSoundItem"
import SoundItem from "../Component/SoundItem"
import { item } from "../Types/item"

type Props = {}

const Home = (props: Props) => {
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
  const [volume, setVolume] = React.useState(0.25)

  const handleChange = (event: Event, newValue: number | number[]) => {
    setVolume((newValue as number) / 100)
  }

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
            if (item.path)
              return <SoundItem item={item} volume={volume} key={item._id} />
            return null
          })}
        </div>
        <div className="slider"></div>
      </div>
      <div className="footer">
        <CreateSoundItem />
      </div>{" "}
    </div>
  )
}

export default Home
