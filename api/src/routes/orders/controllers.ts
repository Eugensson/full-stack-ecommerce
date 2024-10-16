import { Request, Response } from "express";

import { db } from "../../db/index.js";
import { orderItemsTable, ordersTable } from "../../db/ordersSchema.js";

export const createOrder = async (req: Request, res: Response) => {
  try {
    const { order, items } = req.cleanBody;
    const userId = req.userId;

    if (!userId) {
      res.status(400).send("Invalid order data");
      return;
    }

    const [newOrder] = await db
      .insert(ordersTable)
      .values({ userId })
      .returning();

    // TODO: Validate products Ids and take their actual price from db
    const orderItems = items.map((item: any) => ({
      ...item,
      orderId: newOrder.id,
    }));

    const newOrderItems = await db
      .insert(orderItemsTable)
      .values(orderItems)
      .returning();

    res.status(201).json({ ...newOrder, items: newOrderItems });
  } catch (err) {
    res.status(400).send("Invalid order data");
  }
};
