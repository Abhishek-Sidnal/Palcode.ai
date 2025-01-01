const express = require("express");
const authMiddleware = require("../utils/authMiddleware");
const { saveLayout, loadLayout } = require("../controllers/layout");
const router = express.Router();

router.post("/save", authMiddleware, saveLayout);
router.get("/load", authMiddleware, loadLayout);

module.exports = router;
