const express = require("express");
const router = express.Router();

router.use("/book_inventory", require("./books"));
router.use("/renter_info", require("./renters"));
router.use("/", require("./swagger"));

module.exports = router;
