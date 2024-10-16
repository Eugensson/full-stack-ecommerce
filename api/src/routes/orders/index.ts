import { Router } from "express";

import { createOrder } from "./controllers.js";
import { insertOrderWithItemsSchema } from "../../db/ordersSchema.js";
import { verifyToken } from "../../middlewares/authMiddleware.js";
import { validateData } from "../../middlewares/validationMiddleware.js";

const router = Router();

router.post(
  "/",
  verifyToken,
  validateData(insertOrderWithItemsSchema),
  createOrder
);

export default router;
