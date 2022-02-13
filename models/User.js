const { Schema, model, Types } = require("mongoose")

const schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  password: { type: String, required: true },

  icon: { type: String, default: "" },
  status: { type: String },
  subscription: { type: String, default: "standard" },
  uploads: [{ type: Types.ObjectId, ref: "Item" }],
})

schema.set("toJSON", {
  transform: (doc, { __v, password, ...rest }) => rest,
})

module.exports = model("User", schema)
