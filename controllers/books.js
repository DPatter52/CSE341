const ObjectId = require("mongodb").ObjectId;
const mongodb = require("../db/connect");

const getBooks = async (req, res) => {
  mongodb
    .getDb()
    .db("test2")
    .collection("book_inventory")
    .find()
    .toArray()
    .then((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
};

const getBook = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid book id to get book information.');
  }
  const bookId = new ObjectId(req.params.id);
  mongodb
    .getDb()
    .db("test2")
    .collection("book_inventory")
    .find({ _id: bookId })
    .toArray()
    .then((err, lists) => {
      if (err) {
        res.status(400).json({ message: err });
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
    });
};

const createBook = async (req, res) => {
  const book = {
    title: req.body.title,
    author: req.body.author,
    pages: req.body.pages,
    genre: req.body.genre,
    publishYear: req.body.publishYear,
    invCount: req.body.invCount,
  };
  const response = await mongodb
    .getDb()
    .db("test2")
    .collection("book_inventory")
    .insertOne(book);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while creating book information."
      );
  }
};

const updateBook = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid book id to update book information.');
  }
  const bookId = new ObjectId(req.params.id);
  const book = {
    title: req.body.title,
    author: req.body.author,
    pages: req.body.pages,
    genre: req.body.genre,
    publishYear: req.body.publishYear,
    invCount: req.body.invCount,
  };
  const response = await mongodb
    .getDb()
    .db("test2")
    .collection("book_inventory")
    .replaceOne({ _id: bookId }, book);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || "Some error occurred while updating book information"
      );
  }
};

const deleteBook = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid book id to delete book.');
  }
  const bookId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db("test2")
    .collection("book_inventory")
    .remove({ _id: bookId }, true);
  console.log(result);
  if (result.deletedCount > 0) {
    res.status(200).send();
  } else {
    res
      .status(500)
      .json(
        result.error || "Some error occurred while deleting the selected book."
      );
  }
};

module.exports = {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
