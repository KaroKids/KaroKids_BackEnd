const { Router } = require("express");
const getExample = require("../controllers/getExample");

const router = Router();

// Routes GET
router.get("/karokids", getExample);

// Routes POST

module.exports = router;
