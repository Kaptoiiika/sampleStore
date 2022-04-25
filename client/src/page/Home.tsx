import { observer } from "mobx-react-lite"
import "./styles/Home.scss"
import React from "react"
import SoundItem from "../Component/SoundItem/SoundItem"

import ItemsData from "../state/ItemsData"
import { item } from "../Types/item"
import AuthData from "../state/AuthData"

type Props = {}

const Home = observer((props: Props) => {
  const [dragOver, setDragOver] = React.useState(false)
  const items = ItemsData.items

  React.useEffect(() => {
    ItemsData.get()
  }, [])

  const fileDrop = (e: any) => {
    console.log(e)
    const file = e.dataTransfer.files[0]
    ItemsData.handleSend({ name: file.name, description: file.type }, file)
    console.log(file)
    setDragOver(false)
  }

  return (
    <div
      className={`cards ${dragOver ? "dragOver" : ""}`}
      onDragEnd={(e) => {
        setDragOver(false)
      }}
      onDragOver={(e) => {
        setDragOver(true)
        e.stopPropagation()
        e.preventDefault()
      }}
      onDragLeave={(e) => {
        setDragOver(false)
      }}
      onDrop={fileDrop}
    >
      {items.map((item: item) => {
        if (item.path)
          return (
            <SoundItem
              item={item}
              key={item._id}
              admin={AuthData.user._id === "6206d6a5b50b8627bd4b15c5" || AuthData.user._id === item.owner}
            />
          )
        return null
      })}
    </div>
  )
})

export default Home
