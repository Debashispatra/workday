const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/workday");

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
  is_admin: {
    type: Number,
    required: true,
  },

  token: {
    type: String,
    default: "",
  },
});

const User = mongoose.model("admin", adminSchema);

module.exports = User;
