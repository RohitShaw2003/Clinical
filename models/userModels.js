const mongooes = require("mongoose");

const userSchema = new mongooes.Schema({
  name: {
    type: String,
    required: [true, "name is require"],
  },
  email: {
    type: String,
    required: [true, "email is require"],
  },
  password: {
    type: String,
    required: [true, "password is require"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isDoctor: {
    type: Boolean,
    default: false,
  },
  notification: {
    type: Array,
    default: [],
  },
  sennnotification: {
    type: Array,
    default: [],
  },
});

const userModel = mongooes.model("user", userSchema);

module.exports = userModel;
