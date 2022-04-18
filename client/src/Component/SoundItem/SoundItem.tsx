import { IconButton, Card, Typography, Popper } from "@mui/material"

import "./SoundItem.scss"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import PauseIcon from "@mui/icons-material/Pause"
import { Delete, FileDownload } from "@mui/icons-material/"
import { item } from "../../Types/item"
import AudioPlayer from "../../state/AudioPlayer"
import { observer } from "mobx-react-lite"
import ItemsData from "../../state/ItemsData"
import AuthData from "../../state/AuthData"
import React from "react"

type Props = {
  item: item
  admin?: boolean
}

const SoundItem = observer((props: Props) => {
  const { admin } = props
  const { _id, name, path, description, size, icon, countOfPlays } = props.item

  const [open, setOpen] = React.useState(false)
  const [playPauseEl, setPlayPauseEl] = React.useState(null)

  const isPlaying = AudioPlayer.audioId === _id && AudioPlayer.isPlay

  const handlePlay = (e: any) => {
    AudioPlayer.setAudio(_id)
  }

  const handlePause = (e?: any) => {
    AudioPlayer.pause()
  }

  const handleDelete = (e: any) => {
    ItemsData.delete(_id)
  }
  const hundleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const PlayPause = React.useCallback((node) => {
    if (node !== null) {
      setPlayPauseEl(node)
    }
  }, [])

  return (
    <Card style={{ margin: "10px", height: 150, width: 400 }}>
      <div className="SoundItem-wrapper">
        <div className="SoundItem-content">
          <div className="SoundItem-content-info">
            <div className="SoundItem-content-info-name">{name}</div>
            <div className="SoundItem-content-info-description">
              {description}
            </div>
          </div>
          <div className="SoundItem-content-buttons">
            {["mp3", "wav", "mp4a"].includes(
              path.split(".").pop() as string
            ) ? (
              <IconButton
                ref={PlayPause}
                onMouseEnter={hundleOpen}
                onMouseLeave={handleClose}
                onClick={isPlaying ? handlePause : handlePlay}
              >
                {isPlaying ? (
                  <PauseIcon sx={{ height: 38, width: 38 }} />
                ) : (
                  <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                )}
              </IconButton>
            ) : (
              <div style={{ margin: 8 }}></div>
            )}
            <Popper open={open} anchorEl={playPauseEl} placement={"top"}>
              <div className="popper popper-text">
                {countOfPlays as number}
              </div>
            </Popper>

            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {`${((size || 0) / 1024 / 1024).toFixed(2)} mb`}
            </Typography>

            <IconButton
              href={`/api/play/download/${path}`}
              download
              no-referrer
              size="large"
            >
              <FileDownload />
            </IconButton>

            {admin ? (
              <IconButton onClick={handleDelete} size="large">
                <Delete />
              </IconButton>
            ) : null}
          </div>
        </div>

        <img
          className="SoundItem-content-image"
          src={
            icon
              ? icon
              : `/api/item/icon/${_id}`
          }
          alt="someAvatar"
        />
      </div>
    </Card>
  )
})

export default SoundItem
