import React, { useState } from "react"

type Props = {}

const Charts = (props: Props) => {
  const [ctx, setCtx] = React.useState<CanvasRenderingContext2D | null>(null)
  const handleCanvas = React.useCallback((node: HTMLCanvasElement) => {
    const canvas = node
    canvas.width = WIDTH
    canvas.height = HEIGHT
    const context = canvas.getContext("2d")
    setCtx(context)
  }, [])

  const [lastData, setLastData] = useState([
    200, 200, 200, 200, 200, 200, 200, 200, 200, 200,
  ])
  const [dataX, setdataX] = useState([
    200, 200, 200, 200, 200, 200, 200, 200, 200, 200,
  ])
  const [WIDTH, HEIGHT, MAXDOTS, ANIMATION_STEPS] = [1400, 800, 10, 20]

  const Draw = (dataToDraw: number[], xToDraw: number[]) => {
    if (ctx) {
      ctx.clearRect(0, 0, WIDTH, HEIGHT)
      ctx.lineWidth = 2

      const calcY = (num: number) => {
        return HEIGHT - HEIGHT * num
      }

      ctx.beginPath()
      dataToDraw.forEach((_y: number, index: number) => {
        const y = calcY(_y)
        ctx.lineTo(xToDraw[index], y)
      })
      ctx.stroke()

      dataToDraw.forEach((_y: number, index: number) => {
        const y = calcY(_y)
        ctx.fillStyle = "#000"
        drawEllipseByCenter(ctx, xToDraw[index], y, 18, 18)
        ctx.fill()

        ctx.fillStyle = "#FFF"
        drawEllipseByCenter(ctx, xToDraw[index], y, 14, 14)
        ctx.fill()
      })
    }
  }

  Draw(lastData, dataX)

  const animate = (update: number[], updateX: number[], step = 1) => {
    if (step >= ANIMATION_STEPS) {
      setdataX(updateX)
      return setLastData(update)
    }

    const newY = lastData.map((value: number, index: number) => {
      const result = value - ((value - update[index]) / ANIMATION_STEPS) * step
      return result
    })

    const newX = dataX.map((value: number, index: number) => {
      const result = value - ((value - updateX[index]) / ANIMATION_STEPS) * step
      return result
    })

    Draw(newY, newX)

    window.requestAnimationFrame(() => {
      animate(update, updateX, ++step)
    })
  }

  function drawEllipseByCenter(ctx: any, cx: any, cy: any, w: any, h: any) {
    drawEllipse(ctx, cx - w / 2.0, cy - h / 2.0, w, h)
  }
  function drawEllipse(ctx: any, x: any, y: any, w: any, h: any) {
    const kappa = 0.5522848,
      ox = (w / 2) * kappa,
      oy = (h / 2) * kappa,
      xe = x + w,
      ye = y + h,
      xm = x + w / 2,
      ym = y + h / 2

    ctx.beginPath()
    ctx.moveTo(x, ym)
    ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y)
    ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym)
    ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye)
    ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym)
    ctx.closePath()
  }

  const calc = (array: any[]) => {
    const arr = array.map((value, index, array) => {
      if (index === array.length - 1) return WIDTH
      return index * (WIDTH / (array.length - 1))
    })
    return arr
  }

  const changeData = (update: number[]) => {
    const arr = update
    const updateX = calc(update)

    const max = Math.max(...arr)
    const min = Math.min(...arr)

    const filtredArray = arr.map((value: number) => {
      if (max < 1) return value
      return value / max
      // return (value - min) / (max - min)
    })

    if (filtredArray.length !== MAXDOTS) {
      const fillCount = MAXDOTS - filtredArray.length
      for (let i = 0; i < fillCount; i++) {
        const index = (MAXDOTS / fillCount) * i
        filtredArray.splice(
          Math.floor(index),
          0,
          filtredArray[Math.floor(index)]
        )
        updateX.splice(Math.floor(index), 0, updateX[Math.floor(index)])
      }
    }
    animate(filtredArray, updateX)
  }

  return (
    <div style={{ margin: "2em" }}>
      <div>
        {[2, 3, 4, 5, 6, 7, 8, 9, MAXDOTS].map((obj: number) => {
          return (
            <button
              style={{ margin: "0 10px" }}
              key={obj}
              onClick={() => {
                const arr = []
                for (let index = 0; index < obj; index++) {
                  arr.push(Math.random())
                }
                changeData(arr)
              }}
            >
              {obj}
            </button>
          )
        })}
      </div>
      <canvas
        onClick={() => {
          const arr =
            lastData[0] === 1
              ? [9, 10, 4, 5, 8, 3, 2]
              : [10, 7, 2, 1, 4, 6, 8, 6, 3, 2]
          changeData(arr)
        }}
        style={{
          border: "1px solid black",
          width: WIDTH / 2,
          height: HEIGHT / 2,
          backgroundColor: "#ffffff40",
        }}
        ref={(e) => {
          if (e) handleCanvas(e)
        }}
      />
    </div>
  )
}

export default Charts
