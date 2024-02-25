const express = require('express');
// const protect = require('../middleware/authMiddleware');
const verifytoken = require("../middleware/authMiddleware");
const { createOrder, getAllOrders, getSingleOrder, markOrderAsDelivered } = require('../controller/order');


router = express.Router();

router.post("/order", createOrder);
router.post("/getorders", verifytoken, getAllOrders);
router.post("/getorder", verifytoken, getSingleOrder);
router.post("/deliverd", verifytoken, markOrderAsDelivered);

module.exports = router;