const { Router } = require("express")
const router = Router()
const Item = require("../models/Item.js")

const postCreate = async (req, res) => {
  try {
    const source = req.files.source
 
    const { name, tags, description } = req.body

    const item = new Item({ name, tags, description, source })
    await item.save()
    res.status(201).json({ _id: item._id })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: "create item error", error: error.message })
  }
}

const getItemId = async (req, res) => {
  try {
    const data = await item.findById(req.params.id)
    res.status(201).json(data)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: "get item error" })
  }
}

const getAll = async (req, res) => {
  try {
    const data = await item
    res.json(data)
  } catch (error) {
    console.log(error.message)
    res
      .status(500)
      .json({ message: "get all item error", error: error.message })
  }
}

router.post("/create", postCreate)
router.get("/:id", getItemId)
router.get("/", getAll)

module.exports = router
