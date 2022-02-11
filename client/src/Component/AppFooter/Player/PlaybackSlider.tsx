import React from "react"
//@ts-ignore
import WaveSurfer from "wavesurfer.js"
import AudioPlayer from "../../../state/AudioPlayer"

type Props = {
  audio: HTMLAudioElement
  audioContext: AudioContext
}

const PlaybackSlider = (props: Props) => {
  const { audio, audioContext } = props
  const [waveSurfer, setWaveSurfer] = React.useState<any>()

  React.useEffect(() => {
    console.log("Update src")
    if (audio.src) {
      waveSurfer.loadMediaElement(audio)
      waveSurfer.on("ready", () => {
        waveSurfer.play()
      })
      console.log(waveSurfer)
    }
  }, [audio.src])

  React.useEffect(() => {
    const wave = WaveSurfer.create({
      barWidth: 1,
      cursorWidth: 1,
      container: "#waveform",
      backend: "MediaElement",
      height: 55,
      progressColor: "#4a74a5",
      responsive: true,
      waveColor: "#ccc",
      cursorColor: "#4a74a5",
    })
    console.log(audio.volume)
    wave.setVolume(audio.volume)
    setWaveSurfer(wave)
  }, [])

  React.useEffect(() => {
    if (!waveSurfer) return
    waveSurfer.setVolume(audio.volume)
  }, [audio.volume, waveSurfer])

  React.useEffect(() => {}, [])

  return (
    <>
      <div style={{ width: 400 }} id="waveform"></div>
    </>
  )
}

export default PlaybackSlider
