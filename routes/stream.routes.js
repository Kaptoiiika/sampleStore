const config = require("config")
const { Router } = require("express")
const router = Router()
const fs = require("fs")

const streamId = async (req, res) => {
  try {
    console.log("start Idpipe")
    const path = `${config.get("filePath")}\\${req.params.id}.mp3`
    fs.createReadStream(path).pipe(res)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: "stream error", error: error.message })
  }
}
const streamQuery = async (req, res) => {
  try {
    const path = `${config.get("filePath")}\\${req.query.id}.mp3`

    fs.access(path, (e) => {
      if (e) {
        res.status(500).json({ message: "Файл не найден", error: e.message })
      } else {
        const stream = fs.createReadStream(path)
        stream.pipe(res)
      }
    })
  } catch (error) {
    res.status(500).json({ message: "streamQuery error", error: error.message })
  }
}

const downloadId = async (req, res) => {
  try {
    const path = `${config.get("filePath")}\\${req.query.id}.mp3`

    fs.access(path, (e) => {
      if (e) {
        res.status(500).json({ message: "Файл не найден", error: e.message })
      } else {
        const stream = fs.createReadStream(path)
        stream.pipe(res)
      }
    })
  } catch (error) {
    res.status(500).json({ message: "streamQuery error", error: error.message })
  }
}

router.get("/:id", streamId)
router.get("/", streamQuery)
router.get("/download/:id", downloadId)

module.exports = router
