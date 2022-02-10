import "./AppFooter.scss"
import React from "react"
import CreateSoundItem from "../CreateSoundItem"
import Player from "./Player"
import AudioVisual from "./AudioVisual"

type Props = {}

const AppFooter = (props: Props) => {
  const [open, setOpen] = React.useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }

  return (
    <div className="footer-wrapper">
      <AudioVisual />

      <div className="footer">
        <Player />
        <div className="alignCenter">
          <div className="footer-button" onClick={handleClickOpen}>
            Добавить звук
          </div>
        </div>
        <CreateSoundItem
          open={open}
          onClose={() => {
            setOpen(false)
          }}
        />
      </div>
    </div>
  )
}

export default AppFooter
