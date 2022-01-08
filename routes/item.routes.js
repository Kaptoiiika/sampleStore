const config = require("config")
const { Router } = require("express")
const router = Router()
const Item = require("../models/Item.js")

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

const All = async (req, res) => {
  try {
    const data = await Item.find()
    res.json(data)
  } catch (error) {
    console.log(error.message)
    res
      .status(500)
      .json({ message: "get all item error", error: error.message })
  }
}

router.post("/create", Create)
router.get("/:id", ItemId)
router.get("/", All)

module.exports = router
