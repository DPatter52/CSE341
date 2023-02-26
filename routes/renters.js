const express = require("express");
const routes = express.Router();

const renterControl = require("../controllers/renters");
const validation = require("../validation");

routes.get("/", renterControl.getRenters);

routes.get("/:id", renterControl.getRenter);

routes.post("/", validation.saveRenter, renterControl.createRenter);

routes.put("/:id", validation.saveRenter, renterControl.updateRenter);

routes.delete("/:id", renterControl.deleteRenter);

module.exports = routes;