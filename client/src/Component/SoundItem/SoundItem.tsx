import {
  IconButton,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material"

import "./SoundItem.scss"
import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import PauseIcon from "@mui/icons-material/Pause"
import { Delete, FileDownload } from "@mui/icons-material/"
import { item } from "../../Types/item"
import AudioPlayer from "../../state/AudioPlayer"
import { observer } from "mobx-react-lite"
import ItemsData from "../../state/ItemsData"
import AuthData from "../../state/AuthData"

type Props = {
  item: item
}

const SoundItem = observer((props: Props) => {
  const { _id, name, path, description, size, icon } = props.item

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

  return (
    <Card style={{ zIndex: "1", margin: "10px" }}>
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
                onClick={isPlaying ? handlePause : handlePlay}
                aria-label="play/pause"
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

            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {`${((size || 0) / 1024 / 1024).toFixed(2)} mb`}
            </Typography>

            <IconButton
              href={`http://${window.location.hostname}:3030/api/play/download/${path}`}
              download
              no-referrer
              size="large"
            >
              <FileDownload />
            </IconButton>

            {AuthData.user._id === "6206d6a5b50b8627bd4b15c5" ? (
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
              : `http://${window.location.hostname}:3030/api/item/icon/${_id}`
          }
          alt="someAvatar"
        />
      </div>
    </Card>
  )
})

export default SoundItem
