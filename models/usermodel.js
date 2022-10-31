const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/workday");
var autoIncrement = require('mongoose-auto-increment');

const adminSchema = new mongoose.Schema({
  firstname:{
    type: String,
    required: true,
  },
  lastname:{
    type: String,
    required: true,
  },
  username:{
    type: String,
    required: true,
  },
  empId:{
    type: String,
    unique: true,
  },
  JoiningDate:{
    type: Date,
    required: true,
  },  
  phone:{
    type: String,
    required: true,
  },  
  company: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  Department: {
    type: String,
    required: true,
  },
  Designation: {
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
  incre:{type: Number, default: 0, unique: true},
});

autoIncrement.initialize(mongoose.connection)
adminSchema.plugin(autoIncrement.plugin, {
    model: 'adminSchema',
    field: 'incre',
    startAt: 1,
    incrementBy: 1
  });

const User = mongoose.model("admin", adminSchema);

module.exports = User;
