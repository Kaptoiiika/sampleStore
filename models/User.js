const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  icon: { type: String, default: "" },
  status: { type: String },
  social: { type: String },
  subscribers: [{ type: Types.ObjectId, ref: "Server" }],
})

schema.set("toJSON", {
  transform: (doc, { __v, password, ...rest }) => rest,
})

module.exports = model("User", schema)
