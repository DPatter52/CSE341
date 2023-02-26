const express = require("express");
const router = express.Router();

router.use("/", require("./swagger"));
router.use("/book_inventory", require("./books"));
router.use("/renter_info", require("./renters"));


module.exports = router;
