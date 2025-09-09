const router = require("express").Router();
const contactsRouter = require("./contacts");

router.use("/", contactsRouter);

module.exports = router;
