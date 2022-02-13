import { IconButton, Menu, Slider } from "@mui/material"
import React from "react"
import { IoVolumeHigh, IoVolumeMute } from "react-icons/io5"

type Props = {
  audio: HTMLAudioElement
}

const VolumeSlider = (props: Props) => {
  const { audio } = props
  const [value, setValue] = React.useState<number>(audio.volume * 100)

  const handleChange = (event: any, newValue: number | number[]) => {
    setValue(newValue as number)
    audio.volume = (newValue as number) / 100
  }

  return (
    <>
      <IconButton className="Player-icon" onClick={() => handleChange(null, 0)}>
        {value ? (
          <IoVolumeHigh color="#e6e6e6" />
        ) : (
          <IoVolumeMute color="#e6e6e6" />
        )}
      </IconButton>
      <Slider value={value} onChange={handleChange} />
    </>
  )
}

export default VolumeSlider
