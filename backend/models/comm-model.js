const mongoose = require("mongoose");
const schema = mongoose.Schema;

const professionalSchema = new schema({
    license: { type: String, required: true },
    first: { type: String, required: true },
    last: { type: String, required: true },
    gender: { type: String, required: true },
    dob: { type: Date, required: true },
    email: { type: String, required: true },
    secret: { type: String, required: true },
  }, {
    timestamps: true,
    collection: "Community",
  }
);

const Professional = mongoose.model("Community", professionalSchema);
module.exports = Professional;
