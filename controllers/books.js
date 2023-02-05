const ObjectId = require("mongodb").ObjectId;
const mongodb = require("../db/connect");

const getBooks = async (req, res, next) => {
    const result = await mongodb.getDb().db("test2").collection("book_inventory").find();
    result.toArray().then((lists) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(lists);
    });
};

const getBook = async (req, res, next) => {
    const bookId = new ObjectId(req.params.id);
    const result = await mongodb
        .getDb()
        .db("test2")
        .collection("book_inventory")
        .find({_id: bookId});
    result.toArray().then((lists) => {
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
      readingLvl: req.body.readingLvl,
    };
    const response = await mongodb
      .getDb()
      .db("test2")
      .collection("book_inventory")
      .insertOne(contact);
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
    const bookId = new ObjectId(req.params.id);
    const book = {
        title: req.body.title,
        author: req.body.author,
        pages: req.body.pages,
        genre: req.body.genre,
        readingLvl: req.body.readingLvl,
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