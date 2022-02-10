import { observer } from "mobx-react-lite"
import React from "react"
import AudioPlayer from "../../state/AudioPlayer"
import { interpolateCool, scaleSequential } from "d3"

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

    const barWidth = WIDTH / bufferLength / 2

    analyser.getByteFrequencyData(dataArray)

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    dataArray.map((value: number, index: number) => {
      const interval = Math.max(value, 16)

      ctx.fillStyle = scaleFn(value)
      if (!index) {
        return ctx.fillRect(WIDTH / 2, HEIGHT - value / 2, barWidth, value / 2)
      }

      ctx.fillRect(
        WIDTH / 2 + index * barWidth,
        HEIGHT - value / 2,
        barWidth,
        value / 2
      )

      ctx.fillRect(
        WIDTH / 2 - index * barWidth,
        HEIGHT - value / 2,
        barWidth,
        value / 2
      )
    })

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

  return <canvas className="AudioVisuals" ref={handleCanvas} width="1920" />
})
const scaleFn = scaleSequential(interpolateCool)
  .domain([0, 512])

export default AudioVisual
