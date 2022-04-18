const express = require("express")
const config = require("config")
const fileUpload = require("express-fileupload")
const mongoose = require("mongoose")

const app = express()

app.use(fileUpload({}))
app.use(express.json())

app.use("/api/play", require("./routes/stream.routes.js"))
app.use("/api/item", require("./routes/item.routes.js"))
app.use("/api/user", require("./routes/user.routes.js"))

const PORT = config.get("port")

async function start() {
  try {
    await mongoose.connect(config.get("mongoURL"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    app.listen(PORT, () => {
      console.log(`Server started on port: ${PORT}...`)
    })
  } catch (error) {
    console.log("server error", error.message)
    process.exit(1)
  }
}

start()

const path = require('path');
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});