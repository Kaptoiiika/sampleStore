import * as React from "react"
import CreateSoundItem from "./Component/CreateSoundItem"
import SoundItem from "./Component/SoundItem"
import "./App.css"

import { item } from "./Types/item"
import axios from "axios"

function App() {
  const [items, setItems] = React.useState<any>([
    {
      _id: "string",
      name: "string",
      path: "string",
      dataCreate: new Date(),
      description: "string",
      tags: ["string"],
      size: 0,
    },
  ])

  React.useEffect(() => {
    const handle = async () => {
      try {
        const data = await axios.get("/api/item")
        setItems(data.data)
      } catch (error) {}
    }
    handle()
  }, [])

  return (
    <div className="App">
      <div className="header"></div>
      <div className="content">
        <div className="cards">
          {items.map((item: item) => {
            return <SoundItem item={item} key={item._id} />
          })}
        </div>
        <div className="slider"></div>
      </div>
      <div className="footer">
        <CreateSoundItem />
      </div>
    </div>
  )
}

export default App
