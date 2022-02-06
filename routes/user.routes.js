const { Router } = require("express")
const router = Router()
const config = require("config")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User.js")
const authMiddleware = require("../middleware/auth.middleware.js")
const fs = require("fs")

const registration = async (req, res) => {
  try {
    const { username, email, password } = req.body
    const candidat = await User.findOne({ username })
    if (candidat)
      return res
        .status(400)
        .json({ message: `Пользователь ${username} уже создан` })

    const hashPassword = await bcrypt.hash(password, 6)

    const user = new User({
      email,
      username,
      password: hashPassword,
    })
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
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user)
      return res
        .status(404)
        .json({ message: `Пользователь ${email} не найден` })

    const isPassValid = bcrypt.compareSync(password, user.password)
    if (!isPassValid)
      return res.status(400).json({ message: `Неверный пароль` })

    const token = jwt.sign({ id: user.id }, config.get("jwtKey"), {
      expiresIn: "30d",
    })

    res.json({
      token,
      user,
    })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: "error code 500", error: error.message })
  }
}

const subscribe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
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
      user,
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

router.post("/register", registration)

router.post("/login", login)
router.post("/upload/avatar", authMiddleware, avatar)
router.post("/updateInfo", authMiddleware, updateInfo)

router.get("/subscribe/:name", authMiddleware, subscribe)
router.get("/auth", authMiddleware, auth)

router.get("/avatar/:id", getAvatar)
router.get("/:id", getUser)

module.exports = router
