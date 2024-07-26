const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getAllUseresController,
  getAllDoctorsController,
  changeAccountStatusController,
} = require("../controllers/adminContol");

const router = express.Router();

router.get("/getAllUsers", authMiddleware, getAllUseresController);
router.get("/getAllDoctors", authMiddleware, getAllDoctorsController);
router.post(
  "/changeAccountStatus",
  authMiddleware,
  changeAccountStatusController
);

module.exports = router;
