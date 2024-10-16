import _ from "lodash";
import { eq } from "drizzle-orm";
import { Request, Response } from "express";

import { db } from "../../db/index.js";
import { productsTable } from "../../db/productsSchema.js";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await db.select().from(productsTable);

    res.status(200).json(products);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, id));

    if (!product) {
      res.status(404).send({ message: "Product not found" });
    } else {
      res.status(200).json(product);
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const [product] = await db
      .insert(productsTable)
      .values(req.cleanBody)
      .returning();

    res.status(201).json(product);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const updatedFields = req.cleanBody;

    const [updatedProduct] = await db
      .update(productsTable)
      .set(updatedFields)
      .where(eq(productsTable.id, id))
      .returning();

    if (updatedProduct) {
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).send({ message: "Product not found" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const [deletedProduct] = await db
      .delete(productsTable)
      .where(eq(productsTable.id, id))
      .returning();

    if (deletedProduct) {
      res.status(204).send();
    } else {
      res.status(404).send({ message: "Product was not found" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
