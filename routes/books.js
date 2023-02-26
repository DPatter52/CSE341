const express = require("express");
const routes = express.Router();

const booksControl = require("../controllers/books");
const validation = require("../middleware/validation");
const OAuth = require("../middleware/authorize");

routes.get("/", booksControl.getBooks);

routes.get("/:id", booksControl.getBook);

routes.post("/", OAuth.checkLoggedIn, validation.saveBook, booksControl.createBook);

routes.put("/:id", OAuth.checkLoggedIn, validation.saveBook, booksControl.updateBook);

routes.delete("/:id", OAuth.checkLoggedIn, booksControl.deleteBook);

module.exports = routes;
