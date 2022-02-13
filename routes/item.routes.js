const config = require("config")
const { Router } = require("express")
const router = Router()
const Item = require("../models/Item.js")
const fs = require("fs")
const { findById } = require("../models/Item.js")
const authMiddleware = require("../middleware/auth.middleware.js")
const User = require("../models/User.js")

const Create = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    const file = req.files.source
    const icon = req.files.icon

    const { name, tags, description } = req.body

    const item = new Item({
      name,
      tags,
      description,
      size: file.size,
      owner: user._id,
    })

    const path = `${config.get("filePath")}\\${file.name}`
    item.path = `${file.name}`
    file.mv(path)

    const iconPath = `${config.get("filePath")}\\icons\\${item._id}.png`
    if (icon && icon.size) {
      icon.mv(iconPath)
    } else {
      fs.copyFile(
        `${config.get("filePath")}\\icons\\default.png`,
        iconPath,
        (err) => {
          console.log(err)
        }
      )
    }

    await item.save()

    user.uploads.push(item._id)
    await user.save()

    res.status(200).json({})
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: "create item error", error: error.message })
  }
}
const Update = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    const item = await Item.findById(req.params.id)
    if (!item) return res.status(404)

    const file = req.files.source
    const icon = req.files.icon

    const { name, tags, description } = req.body

    const path = `${config.get("filePath")}\\${file.name}`
    const iconPath = `${config.get("filePath")}\\icons\\${item._id}.png`

    if (file && file.size) {
      file.mv(path)
      item.path = `${file.name}`
    }

    if (icon && icon.size) {
      icon.mv(iconPath)
    } else {
      fs.copyFile(
        `${config.get("filePath")}\\icons\\default.png`,
        iconPath,
        (err) => {
          console.log(err)
        }
      )
    }

    item.name = name
    item.tags = tags
    item.description = description

    await item.save()

    res.status(200)
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
    const user = await User.findById(req.user.id)

    const item = await Item.findById(req.params.id)

    const path = `${config.get("filePath")}\\${item.path}`
    try {
      fs.unlinkSync(path)
    } catch (error) {}

    await Item.findByIdAndDelete(req.params.id)

    res.status(200)
  } catch (error) {
    console.log(error.message)
    res
      .status(500)
      .json({ message: "get all item error", error: error.message })
  }
}

router.post("/", authMiddleware, Create)
router.put("/:id", authMiddleware, Update)
router.delete("/:id", authMiddleware, Delete)

router.get("/tags", getByTags)
router.get("/:id", ItemId)
router.get("/", All)

router.get("/icon/:id", getIcon)

module.exports = router
