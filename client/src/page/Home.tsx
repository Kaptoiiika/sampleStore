import axios from "axios"
import { observer } from "mobx-react-lite"
import React from "react"
import SoundItem from "../Component/SoundItem"
import ItemsData from "../state/ItemsData"
import { item } from "../Types/item"

type Props = {}

const Home = observer((props: Props) => {
  const [isOver, setisOver] = React.useState(false)
  const items = ItemsData.items

  React.useEffect(() => {
    ItemsData.get()
  }, [])

  const fileDrop = (e: any) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    ItemsData.handleSend({ name: file.name, description: file.type }, file)
    console.log(file)
    setisOver(false)
  }
  const dragOver = (e: any) => {
    setisOver(true)
    e.preventDefault()
  }

  const dragEnter = (e: any) => {
    e.preventDefault()
  }

  const dragLeave = (e: any) => {
    setisOver(false)
    e.preventDefault()
  }

  return (
    <div
      onDragOver={dragOver}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDrop={fileDrop}
      className={isOver ? "dragOver" : ""}
      style={{ height: "100%" }}
    >
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
