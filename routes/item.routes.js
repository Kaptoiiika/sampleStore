const config = require("config")
const { Router } = require("express")
const router = Router()
const Item = require("../models/Item.js")
const fs = require("fs")

const Create = async (req, res) => {
  try {
    const file = req.files.source
    const icon = req.files.icon

    const { name, tags, description } = req.body

    const item = new Item({ name, tags, description, size: file.size })

    const path = `${config.get("filePath")}\\${file.name}`
    item.path = `${file.name}`
    file.mv(path)

    const iconPath = `${config.get("filePath")}\\icons\\${item._id}.png`
    icon.mv(iconPath)

    await item.save()

    res.status(201).json({ _id: item._id })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: "create item error", error: error.message })
  }
}

const ItemId = async (req, res) => {
  try {
    const data = await Item.findById(req.params.id)
    res.status(201).json(data)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: "get item error" })
  }
}

const getIcon = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
    const filePath = `${config.get("filePath")}\\icons\\${item.id}.png`

    if (fs.existsSync(filePath)) {
      res.sendFile(filePath)
    } else {
      const filePath = `${config.get("filePath")}\\icons\\default.png`
      res.sendFile(filePath)
    }
  } catch (error) {
    console.log(error.message)
    res.status(404).json({ message: "kapec net kartinki" })
  }
}

const getByTags = async (req, res) => {
  try {
    // console.log(req.params)
    const data = await Item.where("tags").equals(req.query.tags).limit(50)
    res.status(201).json(data)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: "get item error" })
  }
}

const All = async (req, res) => {
  try {
    const data = await Item.find().limit(50)
    res.json(data)
  } catch (error) {
    console.log(error.message)
    res
      .status(500)
      .json({ message: "get all item error", error: error.message })
  }
}

const Delete = async (req, res) => {
  try {
    const data = await Item.findByIdAndDelete(req.params.id)
    const path = `${config.get("filePath")}\\${req.params.id}.mp3`
    fs.unlinkSync(path)
    res.json(data)
  } catch (error) {
    console.log(error.message)
    res
      .status(500)
      .json({ message: "get all item error", error: error.message })
  }
}

router.post("/create", Create)
router.delete("/:id", Delete)
router.get("/tags", getByTags)
router.get("/:id", ItemId)
router.get("/", All)

router.get("/icon/:id", getIcon)

module.exports = router
