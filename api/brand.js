const express = require("express");
const brandRouter = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// GET /api/brand
brandRouter.get("/", async (req, res) => {
  const brands = await prisma.brand.findMany({
    include: {
      mattresses: true,
    },
  });
  res.send(brands);
});

// GET /api/brand/:id
brandRouter.get("/:id", async (req, res) => {
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

module.exports = brandRouter;
