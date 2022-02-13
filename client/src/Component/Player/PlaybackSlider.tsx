import React from "react"
//@ts-ignore
import WaveSurfer from "wavesurfer.js"

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
    }
  }, [audio.src])

  React.useEffect(() => {
    const wave = WaveSurfer.create({
      barWidth: 1,
      cursorWidth: 2,
      container: "#waveform",
      backend: "MediaElement",
      height: 50,
      progressColor: "#4a74a5",
      responsive: true,
      waveColor: "#ccc",
      cursorColor: "#4a74a5",
    })
    wave.setVolume(audio.volume)
    setWaveSurfer(wave)
  }, [])


  React.useEffect(() => {}, [])

  return (
    <>
      <div className="waveform" id="waveform"></div>
    </>
  )
}

export default PlaybackSlider
