const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/orders.controller");

router.post("/", ordersController.addOrder);

router.get("/", ordersController.getOrders);

router.post("/pay", ordersController.pay);

router.get("/verify", ordersController.getVerify);

module.exports = router;
