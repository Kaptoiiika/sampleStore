import * as React from "react"
import axios from "axios"
import CreateSoundItem from "./Component/CreateSoundItem"
import SoundItem from "./Component/SoundItem"
import Filter from "./Component/Filter"
import "./App.css"
import { item } from "./Types/item"
import { Stack, Slider } from "@mui/material"
import { VolumeDown, VolumeUp } from "@mui/icons-material"

function App() {
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
    <div className="App">
      <div className="header">
        <Filter setFilter={setFilter} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: 200,
            height: "100%",
          }}
        >
          <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
            <VolumeDown />
            <Slider
              aria-label="Volume"
              value={volume * 100}
              onChange={handleChange}
            />
            <VolumeUp />
          </Stack>
        </div>
      </div>
      <div className="content">
        <div className="cards">
          {items.map((item: item) => {
            if (item.path)
              return <SoundItem item={item} volume={volume} key={item._id}  />
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
