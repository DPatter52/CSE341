const express = require("express");
const routes = express.Router();

const booksControl = require("../controllers/books");
const validation = require("../validation");

routes.get("/", booksControl.getBooks);

routes.get("/:id", booksControl.getBook);

routes.post("/", validation.saveBook, booksControl.createBook);

routes.put("/:id", validation.saveBook, booksControl.updateBook);

routes.delete("/:id", booksControl.deleteBook);

module.exports = routes;
