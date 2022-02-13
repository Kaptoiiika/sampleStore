import { IconButton, Menu, Slider } from "@mui/material"
import React from "react"
import { IoVolumeHigh, IoVolumeMute } from "react-icons/io5"

type Props = {
  audio: HTMLAudioElement
}

const VolumeSlider = (props: Props) => {
  const { audio } = props
  const [value, setValue] = React.useState<number>(audio.volume * 100)

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number)
    audio.volume = (newValue as number) / 100
  }

  const [open, setOpen] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const handleButton = React.useCallback((node) => {
    setAnchorEl(node)
  }, [])

  return (
    <>
      <IconButton
        className="Player-icon"
        onClick={() => setOpen(!open)}
        onMouseEnter={handleOpen}
        ref={handleButton}
      >
        {value ? (
          <IoVolumeHigh color="#e6e6e6" />
        ) : (
          <IoVolumeMute color="#e6e6e6" />
        )}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
      >
        <div
          onMouseLeave={handleClose}
          className='PLayer-volume-slider'
          style={{ margin: "0 15px", width: "300px", zIndex: 100 }}
        >
          <Slider value={value} onChange={handleChange} />
        </div>
      </Menu>
    </>
  )
}

export default VolumeSlider
