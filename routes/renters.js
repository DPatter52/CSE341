const express = require("express");
const routes = express.Router();

const renterControl = require("../controllers/renters");
const validation = require("../middleware/validation");
const OAuth = require("../middleware/authorize");

routes.get("/", renterControl.getRenters);

routes.get("/:id", renterControl.getRenter);

routes.post("/", OAuth.checkLoggedIn, validation.saveRenter, renterControl.createRenter);

routes.put("/:id", OAuth.checkLoggedIn, validation.saveRenter, renterControl.updateRenter);

routes.delete("/:id", OAuth.checkLoggedIn, renterControl.deleteRenter);

module.exports = routes;