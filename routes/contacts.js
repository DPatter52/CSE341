const express = require('express');
const routes = express.Router();

const { getContacts, getContact, createContact, updateContact, deleteContact } = require('../controllers/contacts');

routes.get('/', getContacts);

routes.get('/:id', getContact);

routes.get('/', createContact);

routes.get('/:id', updateContact);

routes.get('/:id', deleteContact);

module.exports = routes;
