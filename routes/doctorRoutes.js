const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getDoctorInfoController,
  updateProfileController,
  getDoctorById,
  doctorAppointments,
  updateStatusController,
} = require("../controllers/doctorControl");

router.post("/getDoctorInfo", authMiddleware, getDoctorInfoController);
router.post("/updateProfile", authMiddleware, updateProfileController);
router.post("/getDoctorById", authMiddleware, getDoctorById);
router.get("/doctor-appointments", authMiddleware, doctorAppointments);
router.post("/update-status", authMiddleware, updateStatusController);

module.exports = router;
