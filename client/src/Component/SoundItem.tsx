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
import { Delete } from "@mui/icons-material/"

import { item } from "../Types/item"
import { useEffect, useState } from "react"
import axios from "axios"

type Props = {
  item: item
  volume?: number
  logic?: boolean
}
function SoundItem(props: Props) {
  const { _id, name, path, description, size } = props.item
  const { logic, volume } = props
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioObj, setAudioObj] = useState<any>(false)

  useEffect(() => {
    if (audioObj) audioObj.volume = volume
  }, [volume])

  const handleLoad = (e: any) => {
    if (!logic) setAudioObj(e.target)
  }
  const handlePlay = (e: any) => {
    if (!logic) audioObj?.play()
    setIsPlaying(true)
  }
  const handlePause = (e: any) => {
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
    <Card>
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
            <IconButton onClick={handleDelete} aria-label="delete" size="large">
              <Delete />
            </IconButton>
          </Box>
        </Box>

        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image="https://yt3.ggpht.com/Y3Gd6uuOjlxVvQ10gcOpCJ6F0e9vEaM3ydtRrvFdpIITCHym6yZFzVo2yjeAhpoHLqdLKKiN=s900-c-k-c0x00ffffff-no-rj"
          alt="Live from space album cover"
        />
      </Box>

      <audio id="player1" onEnded={handlePause} onCanPlay={handleLoad}>
        <source
          src={`http://localhost:3030/api/play/?id=${path}`}
          type="audio/mpeg"
        />
      </audio>
    </Card>
  )
}

export default SoundItem
