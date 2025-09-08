const express = require("express");
const router = express.Router();
const professionalRouter = require("./professional");

router.use("/professional", professionalRouter);

module.exports = router;
