const router = require("express").Router();
const controllerExample = require("../controllers/example");

router.get("/", controllerExample.oviRoute);

module.exports = router;
