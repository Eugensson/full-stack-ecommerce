import express from "express";

import productsRoutes from "./routes/products";

const app = express();

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/products", productsRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
