const express = require('express');
const { registerController, authController, loginController, verifyOtpController, updateUserProfile } = require('../controller/User');
// const protect = require('../middleware/authMiddleware');
const verifytoken = require("../middleware/authMiddleware");


router = express.Router();

router.post("/register", registerController);
router.get("/get-user", verifytoken, authController);
router.post("/login", loginController);
router.post("/verify-otp", verifyOtpController);
router.put("/update", updateUserProfile);
module.exports = router;