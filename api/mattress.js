const express = require("express");
const mattressRouter = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// GET /api/mattress/
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

// GET /api/mattress/:id
// get mattress by id
mattressRouter.get("/:id", async (req, res) => {
  try {
    const mattress = await prisma.mattress.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
      include: {
        brand: true,
      },
    });
    res.send(mattress);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

// POST /api/mattress
// Inserts a new mattress
mattressRouter.post("/", async (req, res) => {
  try {
    const newMattress = await prisma.mattress.create({
      data:{
        //TODO get data from body
      }
    });
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = mattressRouter;
