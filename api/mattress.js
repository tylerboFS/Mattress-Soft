const express = require("express");
const mattressRouter = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// /api/mattress/
// get all matresses
mattressRouter.get("/", async (req, res) => {
  try {
    const matresses = await prisma.mattress.findMany({
      include: {
        brand: true,
      },
    });
    res.send(matresses);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = mattressRouter;
