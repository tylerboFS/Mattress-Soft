const express = require("express");
const authRouter = express.Router();
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");
const { requireUser } = require("../utils/utils");

// /auth/
authRouter.get("/", (req, res) => {
  res.send("Auth route /auth");
});

authRouter.post("/register", async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
    const newUser = await prisma.user.create({
      data: {
        username: req.body.username,
        password: hashPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      },
    });
    if (newUser) {
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: { id: newUser.id },
        },
        process.env.JWT_SECRET
      );
      res.send({ token: token });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    // get username and password from the body
    const username = req.body.username;
    const password = req.body.password;
    // check if user exists
    const foundUser = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!foundUser) {
      res.status(401).send({ message: "Invalid Login Credentials" });
    } else {
      const match = await bcrypt.compare(password, foundUser.password);
      if (!match) {
        res.status(401).send({ message: "Invalid Login Credentials" });
      } else {
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60,
            data: { id: foundUser.id },
          },
          process.env.JWT_SECRET
        );
        res.send({ token: token });
      }
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

authRouter.get("/me", requireUser, (req, res) => {
  res.send(req.user);
});

module.exports = authRouter;
