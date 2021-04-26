const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
    first: { type: String, required: true },
    last: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: Date, required: true },
    email: { type: String, required: true },
    secret: { type: String, required: true },
  }, {
    timestamps: true,
    collection: "Users",
  }
);

module.exports = mongoose.model("User", userSchema);
