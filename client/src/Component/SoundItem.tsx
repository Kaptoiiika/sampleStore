import {
  IconButton,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material"

import PlayArrowIcon from "@mui/icons-material/PlayArrow"
import PauseIcon from "@mui/icons-material/Pause"
import { Delete, FileDownload } from "@mui/icons-material/"
import { item } from "../Types/item"
import { useState } from "react"
import axios from "axios"
import AudioPlayer from "../state/AudioPlayer"
import { observer } from "mobx-react-lite"
import ItemsData from "../state/ItemsData"

type Props = {
  item: item
}

const SoundItem = observer((props: Props) => {
  const { _id, name, path, description, size, icon } = props.item

  const isThis = AudioPlayer.audio.src.split('=').pop() === _id
  const [isPlaying, setIsPlaying] = useState(false)


  const handlePlay = (e: any) => {
    if (!isThis) AudioPlayer.setAudio(_id)
    else AudioPlayer.play()
    setIsPlaying(true)
  }
  const handlePause = (e?: any) => {
    AudioPlayer.pause()
    setIsPlaying(false)
  }

  const handleDelete = (e: any) => {
    ItemsData.delete(_id)
  }

  return (
    <Card style={{ zIndex: "1", margin: "10px" }}>
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            width: "250px",
            height: "150px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h6">
              {name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {description}
            </Typography>
          </CardContent>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              pl: 1,
              pb: 1,
              position: "sticky",
              bottom: 0,
            }}
          >
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
              <div>  &nbsp;</div>
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

            <IconButton onClick={handleDelete} size="large">
              <Delete />
            </IconButton>
          </Box>
        </Box>

        <CardMedia
          component="img"
          sx={{ width: 150 }}
          image={
            icon
              ? icon
              : `http://${window.location.hostname}:3030/api/item/icon/${_id}`
          }
          alt="someAvatar"
        />
      </Box>
    </Card>
  )
})

export default SoundItem
