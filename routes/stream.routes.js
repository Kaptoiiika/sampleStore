const config = require("config")
const { Router } = require("express")
const router = Router()
const fs = require("fs")
const Item = require("../models/Item")
const { findById } = require("../models/Item")

const streamId = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
    const path = `${config.get("filePath")}\\${item.path}`

    fs.createReadStream(path).pipe(res)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: "stream error", error: error.message })
  }
}
const streamQuery = async (req, res) => {
  try {
    const item = await Item.findById(req.query.id)
    const path = `${config.get("filePath")}\\${item.path}`

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
    const path = `${config.get("filePath")}\\${req.params.path}`

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
/*
/api/play
*/
router.get("/:id", streamId)
router.get("/", streamQuery)
router.get("/download/:path", downloadId)

module.exports = router
