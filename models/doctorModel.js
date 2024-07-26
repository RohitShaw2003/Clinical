const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    firstName: {
      type: String,
      required: [true, "First Name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    specialization: {
      type: String,
      required: [true, "Please enter your specialization"],
    },
    experience: {
      type: String,
      required: [true, "Please enter your experience"],
    },
    fees: {
      type: Number,
      required: [true, "Please enter your fees"],
    },
    status: {
      type: String,
      default: "pending",
    },
    timing: {
      type: Object,
      required: [true, "Please enter your work timing"],
    },
  },
  { timestamps: true }
);

const doctorModel = mongoose.model("Doctors", doctorSchema);
module.exports = doctorModel;
