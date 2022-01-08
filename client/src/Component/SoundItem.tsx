import {
  IconButton,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material"
import { styled, alpha } from "@mui/system"
import SliderUnstyled from "@mui/base/SliderUnstyled"

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
  const { _id, name, path, description, size } = props.item
  const { logic, volume } = props
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [audioObj, setAudioObj] = useState(
    new Audio(`http://${window.location.hostname}:3030/api/play/?id=${path}`)
  )

  useEffect(() => {
    audioObj.volume = volume || 0
  }, [volume])

  useEffect(() => {
    setTimeout(() => {
      setProgress(audioObj.currentTime / audioObj.duration)
    }, 50)
  }, [audioObj.currentTime, isPlaying])

  const handleLoad = (e: any) => {
    setAudioObj(e.target)
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
    <Card style={{ zIndex: "1" }}>
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
          <Slider defaultValue={0} value={progress * 100} />

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
          image="https://yt3.ggpht.com/Y3Gd6uuOjlxVvQ10gcOpCJ6F0e9vEaM3ydtRrvFdpIITCHym6yZFzVo2yjeAhpoHLqdLKKiN=s900-c-k-c0x00ffffff-no-rj"
          alt="Live from space album cover"
        />
        <audio onCanPlay={handleLoad}>
          <source
            src={`http://${window.location.hostname}:3030/api/play/?id=${path}`}
          />
        </audio>
      </Box>
    </Card>
  )
}

export default SoundItem

const Slider = styled(SliderUnstyled)(
  ({ theme }) => `
  color: ${theme.palette.mode === "light" ? "#ff0000" : "#969696"};
  height: 4px;
  width: 100%;
  padding: 0;
  display: inline-block;
  position: sticky;
  cursor: pointer;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;
  opacity: 0.75;
  
  &:hover {
    opacity: 1;
  }

  & .MuiSlider-rail {
    display: block;
    position: absolute;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background-color: currentColor;
    opacity: 0;
  }

  & .MuiSlider-track {
    display: block;
    position: absolute;
    height: 4px;
    border-radius: 2px;
    background-color: currentColor;
  }

  & .MuiSlider-thumb {
    position: absolute;
    width: 5px;
    height: 5px;
    margin-left: -6px;
    margin-top: -5px;
    box-sizing: border-box;
    border-radius: 50%;
    outline: 0;
    border: 2px solid currentColor;
    background-color: #fff;

    :hover,
    &.Mui-focusVisible {
      box-shadow: 0 0 0 0.25rem ${alpha(
        theme.palette.mode === "light" ? "#1976d2" : "#90caf9",
        0.15
      )};
    }

    &.Mui-active {
      box-shadow: 0 0 0 0.25rem ${alpha(
        theme.palette.mode === "light" ? "#1976d2" : "#90caf9",
        0.3
      )};
    }
  }
`
)
