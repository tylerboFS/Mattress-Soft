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
    if (mattress) {
      res.send(mattress);
    } else {
      res.sendStatus(404);
    }
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
      data: req.body,
    });
    res.send(newMattress);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

//DELETE /api/mattress/:id
mattressRouter.delete("/:id", async (req, res) => {
  try {
    const deletedMattress = await prisma.mattress.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (deletedMattress) {
      res.send(deletedMattress);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log("Error deleting mattress", err);
    res.sendStatus(500);
  }
});

// PUT /api/mattress/:id
// updates the given mattress
mattressRouter.put("/:id", async (req, res) => {
  try {
    const updatedMattress = await prisma.mattress.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: req.body,
    });
    if (updatedMattress) {
      res.send(updatedMattress);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log("Error deleting mattress", err);
    res.sendStatus(500);
  }
});

module.exports = mattressRouter;
