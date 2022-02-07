import React from "react"
import { IconButton } from "@mui/material"
import { observer } from "mobx-react-lite"
import AudioPlayer from "../../state/AudioPlayer"

import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import PauseIcon from "@mui/icons-material/Pause"

type Props = {
  color?: string
}

const Player = observer((props: Props) => {
  const { color = "white" } = props
  const styles = {  height: 32, width: 32 }

  const playHundle = () => {
    AudioPlayer.play()
  }
  const pauseHundle = () => {
    AudioPlayer.pause()
  }

  return (
    <>
      <IconButton
        className="Player-icon"
        onClick={AudioPlayer.isPlay ? pauseHundle : playHundle}
      >
        {AudioPlayer.isPlay ? (
          <PauseIcon sx={styles} />
        ) : (
          <PlayArrowIcon sx={styles} />
        )}
      </IconButton>
    </>
  )
})

export default Player
