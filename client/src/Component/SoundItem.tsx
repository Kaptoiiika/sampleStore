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

import { item } from "../Types/item"
import { useEffect, useState } from "react"

type Props = {
  item: item
}
function SoundItem(props: Props) {
  const { name, path, description, size } = props.item
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioObj, setAudioObj] = useState<any>(false)
  // audio/mpeg
  const handlePlay = () => {
    isPlaying ? audioObj.pause() : audioObj.play()
    setIsPlaying(!isPlaying)
  }

  useEffect(() => {
    setAudioObj(new Audio(`http://localhost:3030/api/play/?id=${path}`))
  }, [])

  useEffect(() => {
    console.log(audioObj.paused)
  }, [audioObj.paused])

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
            <IconButton onClick={handlePlay} aria-label="play/pause">
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
          </Box>
        </Box>

        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image="https://media.discordapp.net/attachments/499622001850318858/928965958784122920/Pianobook-Thumbnail-1.jpg?width=512&height=512"
          alt="Live from space album cover"
        />
      </Box>
    </Card>
  )
}

export default SoundItem
