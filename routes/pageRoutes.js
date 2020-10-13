const express = require("express");
const router = express.Router();
const { home, dashboard } = require("../controllers/page_controller");

router.get("/", home);
router.get("/dashboard", dashboard);

module.exports = router;
