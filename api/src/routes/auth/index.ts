import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Router } from "express";
import { eq } from "drizzle-orm";

import { db } from "../../db/index.js";
import { validateData } from "../../middlewares/validationMiddleware.js";
import {
  registerSchema,
  loginSchema,
  usersTable,
} from "../../db/usersSchema.js";

const router = Router();

router.post("/register", validateData(registerSchema), async (req, res) => {
  try {
    const data = req.cleanBody;
    data.password = await bcrypt.hash(data.password, 10);

    const [user] = await db.insert(usersTable).values(data).returning();

    res.status(201).json(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/login", validateData(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.cleanBody;

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!user) {
      res.status(401).json({ error: "Authentication failed" });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(401).json({ error: "Authentication failed" });
      return;
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      "your-secret",
      { expiresIn: "23h" }
    );

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
