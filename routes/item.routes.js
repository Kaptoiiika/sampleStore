const config = require("config")
const { Router } = require("express")
const router = Router()
const Item = require("../models/Item.js")
const fs = require("fs")

const Create = async (req, res) => {
  try {
    const file = req.files.source

    const { name, tags, description } = req.body

    const item = new Item({ name, tags, description, size: file.size })

    const path = `${config.get("filePath")}\\${item._id}.mp3`
    file.mv(path)
    item.path = item._id
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

module.exports = router
