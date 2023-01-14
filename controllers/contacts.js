const { ObjectId } = require('mongodb').ObjectId;
const mongodb = require('../db/connect');

const getContacts = async (res) => {
  const result = await mongodb.getDb().db("test").collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getContact = async (req, res) => {
  const userId = new ObjectId(req.params.id)
  const result = await mongodb.getDb().db("test").collection('contacts').find({_id:userId});
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

module.exports = { getContacts, getContact };