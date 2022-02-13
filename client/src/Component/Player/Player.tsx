import React from "react"
import "./Player.scss"
import { IconButton } from "@mui/material"
import { observer } from "mobx-react-lite"
import AudioPlayer from "../../state/AudioPlayer"

import { IoPlay, IoPause } from "react-icons/io5"
import PlaybackSlider from "./PlaybackSlider"
import VolumeSlider from "./VolumeSlider"

type Props = {}

const Player = observer((props: Props) => {
  const audio = AudioPlayer.audio

  const playHundle = () => {
    AudioPlayer.play()
  }
  const pauseHundle = () => {
    AudioPlayer.pause()
  }

  return (
    <div className="Player">
      <IconButton
        className="Player-icon"
        onClick={AudioPlayer.isPlay ? pauseHundle : playHundle}
      >
        {AudioPlayer.isPlay ? (
          <IoPause color="#e6e6e6" />
        ) : (
          <IoPlay color="#e6e6e6" />
        )}
      </IconButton>
      <PlaybackSlider audio={audio} audioContext={AudioPlayer.context} />
      <div className="Player-volume">
        <VolumeSlider audio={AudioPlayer.audio} />
      </div>
    </div>
  )
})

export default Player
