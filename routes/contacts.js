// const express = require('express');
// const routes = express.Router();

// const { getContacts, getContact, createContact, updateContact, deleteContact } = require('../controllers/contacts');

// routes.get('/', getContacts);

// routes.get('/:id', getContact);

// routes.get('/', createContact);

// routes.get('/:id', updateContact);

// routes.get('/:id', deleteContact);

// module.exports = routes;


const express = require('express');
const routes = express.Router();

const contactsControl = require('../controllers/contacts');

routes.get('/', contactsControl.getContacts);

routes.get('/:id', contactsControl.getContact);

routes.post('/', contactsControl.createContact);

routes.put('/:id', contactsControl.updateContact);

routes.delete('/:id', contactsControl.deleteContact);

module.exports = routes;