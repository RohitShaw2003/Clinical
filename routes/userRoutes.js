const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllnotificationController,
  deleteAllnotificationController,
  getAllDcotorController,
  bookAppointmentController,
  userAppointments,
} = require("../controllers/userControl");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController);
router.post("/getUserData", authMiddleware, authController);
router.post("/applyDoctor", authMiddleware, applyDoctorController);
router.post(
  "/get-all-notification",
  authMiddleware,
  getAllnotificationController
);
router.post(
  "/delete-all-notification",
  authMiddleware,
  deleteAllnotificationController
);
router.get("/getAllDoctor", authMiddleware, getAllDcotorController);
router.post("/book-appointment", authMiddleware, bookAppointmentController);
router.get("/user-appointments", authMiddleware, userAppointments);

module.exports = router;
