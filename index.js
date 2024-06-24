const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/mattress", async (req, res) => {
  const matresses = await prisma.mattress.findMany({
    include: {
      brand: true,
    },
  });
  console.log(matresses);
  res.send(matresses);
});

app.get("/api/brand", async (req, res) => {
  const brands = await prisma.brand.findMany({
    include: {
      mattresses: true,
    },
  });
  res.send(brands);
});

app.get("/api/brand/:id", async (req, res) => {
  const brand = await prisma.brand.findUnique({
    where: {
      id: parseInt(req.params.id),
    },
    include: {
      mattresses: true,
    },
  });
  res.send(brand);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
