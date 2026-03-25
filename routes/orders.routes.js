const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/orders.controller");

router.post("/", ordersController.addOrder);

router.get("/", ordersController.getOrders);

router.post("/pay", ordersController.pay);

module.exports = router;
