const jwt = require("jsonwebtoken")
const config = require("config")

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next()
  }

  try {
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) {
      return next()
    }
    const decoded = jwt.verify(token, config.get("jwtKey"))
    req.user = decoded
    next()
  } catch (error) {
    console.log(error.message)
    return res.status(401).json({ message: "Auth error" })
  }
}
