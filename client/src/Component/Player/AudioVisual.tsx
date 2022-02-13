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
  const [bufferLength] = React.useState(analyser.frequencyBinCount)
  const [dataArray] = React.useState(new Uint8Array(bufferLength))

  const animate = (time: any) => {
    const WIDTH = canvas.width
    const HEIGHT = canvas.height

    const barWidth = WIDTH / bufferLength / 2

    analyser.getByteFrequencyData(dataArray)

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    dataArray.forEach((value: number, index: number) => {
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
    const context = node.getContext("2d")
    
    context.globalCompositeOperation = "destination-over"

    setCtx(context)
  }, [])

  React.useEffect(() => {
    if (!canvas) return
    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current as number)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvas])

  return <canvas className="AudioVisuals" ref={handleCanvas} width="1920" />
})
const scaleFn = scaleSequential(interpolateCool).domain([0, 512])

export default AudioVisual
