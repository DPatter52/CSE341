const express = require("express");
const router = express.Router();

router.use("/book_inventory", require("./books"));
// router.use("/checkout_info", require("../checkout_info"));
router.use("/", require("./swagger"));

module.exports = router;
