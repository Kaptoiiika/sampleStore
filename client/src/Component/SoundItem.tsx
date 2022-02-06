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
import { useEffect, useState } from "react"
import axios from "axios"

type Props = {
  item: item
  volume?: number
  logic?: boolean
}

function SoundItem(props: Props) {
  const { _id, name, path, description, size, icon } = props.item
  const { logic, volume } = props
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [audioObj, setAudioObj] = useState(new Audio(``))

  useEffect(() => {
    audioObj.volume = volume || 0
    setTimeout(() => {
      setProgress(audioObj.currentTime / audioObj.duration)
    }, 50)
  }, [audioObj, audioObj.currentTime, isPlaying, volume])

  const handleLoad = (e: any) => {
    if (audioObj) setAudioObj(e.target)
  }
  const handlePlay = (e: any) => {
    if (!logic) audioObj?.play()
    setIsPlaying(true)
  }
  const handlePause = (e?: any) => {
    if (!logic) audioObj?.pause()
    setIsPlaying(false)
  }

  const handleDelete = (e: any) => {
    if (!logic) {
      axios.delete(`/api/item/${_id}`)
      window.location.reload()
    }
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
            height: "165px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              height: "4px",
              width: `${progress * 100}%`,
              backgroundColor: "red",
            }}
          />

          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
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
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {`${((size || 0) / 1024 / 1024).toFixed(2)} mb`}
            </Typography>
            <IconButton
              href={`http://${window.location.hostname}:3030/api/play/?id=${path}`}
              download={`${name}`}
              no-referrer
              aria-label="delete"
              size="large"
            >
              <FileDownload />
            </IconButton>
            <IconButton onClick={handleDelete} aria-label="delete" size="large">
              <Delete />
            </IconButton>
          </Box>
        </Box>

        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={icon ? icon : `http://localhost:3030/api/item/icon/${_id}`}
          alt="someAvatar"
        />
        <audio onEnded={handlePause} onCanPlay={handleLoad}>
          <source
            src={`http://${window.location.hostname}:3030/api/play/?id=${path}`}
          />
        </audio>
      </Box>
    </Card>
  )
}

export default SoundItem
