const express = require("express");
const apiRouter = express.Router();

// /api/
apiRouter.get("/", (req, res) => {
  res.send("Api route /api");
});

apiRouter.use("/mattress", require("./mattress"))
apiRouter.use("/brand", require("./brand"))

module.exports = apiRouter;
