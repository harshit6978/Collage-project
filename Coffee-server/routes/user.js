const express = require('express');
const { registerController } = require('../controller/User');

router = express.Router();

router.post("/register",
    registerController
);

module.exports = router;