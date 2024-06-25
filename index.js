const express = require("express");
const app = express();
const { PrismaClient } = require("@prisma/client");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const prisma = new PrismaClient();
const port = process.env.PORT || 8080;

//Logging Middleware
app.use(morgan("dev"));

//middleware to parse the request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//log out the body to the console.
app.use((req, res, next) => {
  console.log("<___BODY LOGGER START___>");
  console.log(req.body);
  console.log("<___BODY LOGGER END>");
  next();
});

//Home route (This will need to serve the front end)
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api", require("./api"));

app.listen(port, () => {
  console.log(`Mattress-soft listening on port ${port}`);
});
