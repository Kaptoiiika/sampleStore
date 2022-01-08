const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
  name: { type: String, required: true },
  tags: [{ type: String }],
  description: { type: String },
  path: { type: String, default: "" },
  size: { type: Number },
  dataCreate: { type: Date, default: Date.now() },
})

schema.set("toJSON", {
  transform: (doc, { __v, password, ...rest }) => rest,
})

module.exports = model("Item", schema)
