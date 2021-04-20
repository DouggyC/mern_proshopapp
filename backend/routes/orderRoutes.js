import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrders,
  getOrderById,
  getMyOrders,
  updateOrderToPaid,
  updateOrderToDelivered,
} from "../controllers/orderController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

router.route("/").get(protect, isAdmin, getOrders).post(protect, addOrderItems);

router.route("/myorders").get(protect, getMyOrders);

router.route("/:id").get(protect, getOrderById);

router.route("/:id/pay").put(protect, updateOrderToPaid);

router.route("/:id/deliver").put(protect, isAdmin, updateOrderToDelivered);

export default router;
