import { observer } from "mobx-react-lite"
import React from "react"
import AudioPlayer from "../../state/AudioPlayer"

type Props = {}
const AudioVisual = observer((props: Props) => {
  const requestRef = React.useRef<number>()
  const previousTimeRef = React.useRef<number>()

  const [canvas, setCanvas] = React.useState<any>()
  const [ctx, setCtx] = React.useState<any>()

  const analyser = AudioPlayer.analyser
  const [bufferLength, setbufferLength] = React.useState<any>(
    analyser.frequencyBinCount
  )
  const [dataArray, setdataArray] = React.useState<any>(
    new Uint8Array(bufferLength)
  )

  const animate = (time: any) => {
    const WIDTH = canvas.width
    const HEIGHT = canvas.height

    const barWidth = WIDTH / bufferLength

    analyser.getByteFrequencyData(dataArray)
    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, WIDTH, HEIGHT)
    for (let i = 0; i < bufferLength; i += 1) {
      const barHeight = dataArray[i]

      ctx.fillStyle = "blue"
      //void ctx.fillRect(x, y, width, height);
      ctx.fillRect(i * barWidth, HEIGHT - barHeight, barWidth, barHeight)
    }

    previousTimeRef.current = time
    requestRef.current = requestAnimationFrame(animate)
  }
  const handleCanvas = React.useCallback((node) => {
    setCanvas(node)
    setCtx(node.getContext("2d"))
  }, [])

  React.useEffect(() => {
    if (!canvas) return
    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current as number)
  }, [canvas])

  return <canvas className="canvas" ref={handleCanvas} />
})

export default AudioVisual
