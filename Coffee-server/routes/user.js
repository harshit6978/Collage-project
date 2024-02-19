const express = require('express');
const { registerController, authController, loginController } = require('../controller/User');
const verifytoken = require("../middleware/authMiddleware");

router = express.Router();

router.post("/register", registerController);
router.get("/get-user", verifytoken, authController);
router.post("/login", loginController);
module.exports = router;