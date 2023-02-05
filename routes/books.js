const express = require('express');
const routes = express.Router();

const booksControl = require('../controllers/books');

routes.get('/', booksControl.getBook);

routes.get('/:id', booksControl.getBook);

routes.post('/', booksControl.createBook);

routes.put('/:id', booksControl.updateBook);

routes.delete('/:id', booksControl.deleteBook);

module.exports = routes;