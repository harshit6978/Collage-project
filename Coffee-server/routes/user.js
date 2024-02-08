const express = require('express');
const { registerController, authController, loginController } = require('../controller/User');
const protect = require('../middleware/authMiddleware');

router = express.Router();

router.post("/register", registerController);
router.get("/get-user", protect, authController);
router.post("/login", loginController);
module.exports = router;