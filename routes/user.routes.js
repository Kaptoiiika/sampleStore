const { Router } = require("express")
const router = Router()
const config = require("config")
const { check, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User.js")
const authMiddleware = require("../middleware/auth.middleware.js")
const FileManager = require("../services/fileManager.js")
const Server = require("../models/Server.js")
const fs = require("fs")

const registration = async (req, res) => {
  try {
    const { name, password } = req.body
    const candidat = await User.findOne({ name })
    if (candidat)
      return res
        .status(400)
        .json({ message: `Пользователь ${name} уже создан` })

    const validErr = validationResult(req)
    if (!validErr.isEmpty()) {
      return res
        .status(400)
        .json({ message: "incorect requset", errors: validErr.errors })
    }

    const hashPassword = await bcrypt.hash(password, 6)

    const user = new User({ name, password: hashPassword, icon: "avatar.png" })
    await FileManager.createDir("users", user._id)
    await FileManager.duplicateFile(
      "users",
      user._id,
      `${config.get("filePath")}\\users\\default\\avatar.png`
    )
    await user.save()

    const token = jwt.sign({ id: user.id }, config.get("jwtKey"), {
      expiresIn: "30d",
    })

    res.status(201).json({ token, user })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: "error code 500", error: error.message })
  }
}

const login = async (req, res) => {
  try {
    const { name, password } = req.body
    const user = await User.findOne({ name })
    if (!user)
      return res.status(404).json({ message: `Пользователь ${name} не найден` })

    const isPassValid = bcrypt.compareSync(password, user.password)
    if (!isPassValid)
      return res.status(400).json({ message: `Неверный пароль` })

    const token = jwt.sign({ id: user.id }, config.get("jwtKey"), {
      expiresIn: "30d",
    })

    res.json({
      token,
      user: await user.populate({ path: "subscribers", select: "name" }),
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: "error code 500", error: error.message })
  }
}

const subscribe = async (req, res) => {
  try {
    const server = await Server.findOne({ name: req.params.name })
    const user = await User.findById(req.user.id)
    if (!server)
      return res
        .status(404)
        .json({ message: `server ${req.params.name} not found` })
    if (
      user.subscribers.find((obj) => {
        return obj.toString() === server._id.toString()
      })
    ) {
      return res.json({ message: "done" })
    }
    server.members.push(`${user._id}`)
    user.subscribers.push(`${server._id}`)
    server.save()
    user.save()

    res.json({ message: "done" })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: "error code 500", error: error.message })
  }
}

const avatar = async (req, res) => {
  try {
    const file = req.files.avatar
    const user = await User.findById(req.user.id)
    if (!user)
      return res.status(404).json({ message: `Пользователь не найден` })

    await FileManager.createFile("users", user.id, file)

    user.icon = file.name
    user.save()

    res.json({ message: "avatar uploaded" })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: "error code 500", error: error.message })
  }
}

const auth = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    const token = jwt.sign({ id: user.id }, config.get("jwtKey"), {
      expiresIn: "30d",
    })
    res.json({
      token,
      user: await user.populate({ path: "subscribers", select: "name" }),
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: "error code 500", error: error.message })
  }
}

const update = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    res.json({
      user: await user.populate({ path: "subscribers", select: "name" }),
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: "error code 500", error: error.message })
  }
}

const getAvatar = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const filePath = `${config.get("filePath")}\\users\\${user.id}\\${
      user.icon
    }`
    if (fs.existsSync(filePath)) {
      res.sendFile(filePath)
    } else {
      const filePath = `${config.get("filePath")}\\users\\default\\unknown.png`
      res.sendFile(filePath)
    }
  } catch (error) {
    console.log(error.message)
    res.status(404).json({ message: "kapec net kartinki" })
  }
}

const getUser = async (req, res) => {
  try {
    const data = await User.findById(req.params.id)

    res.json(data)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: "error code 500", error: error.message })
  }
}

const updateInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    const { status, social } = req.body

    user.status = status
    user.social = social
    user.save()

    res.json({ message: "done" })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: "error code 500", error: error.message })
  }
}

router.post(
  "/register",
  [
    check("name", "name is not string").isString(),
    check("password", "password length must be 4 to 32").isLength({
      min: 4,
      max: 32,
    }),
  ],
  registration
)

router.post("/login", login)
router.post("/upload/avatar", authMiddleware, avatar)
router.post("/updateInfo", authMiddleware, updateInfo)

router.get("/subscribe/:name", authMiddleware, subscribe)
router.get("/auth", authMiddleware, auth)
router.get("/update", authMiddleware, update)

router.get("/avatar/:id", getAvatar)
router.get("/:id", getUser)

module.exports = router
