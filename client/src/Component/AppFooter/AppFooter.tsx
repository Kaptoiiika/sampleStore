import "./AppFooter.scss"
import React from "react"
import CreateSoundItem from "../CreateSoundItem"
import Player from "../Player/Player"
import AudioVisual from "../Player/AudioVisual"

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
        <div>
        </div>
        <Player />

        <div className="footer-button footer-button-addButton" onClick={handleClickOpen}>
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
  )
}

export default AppFooter
