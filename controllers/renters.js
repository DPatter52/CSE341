const ObjectId = require("mongodb").ObjectId;
const mongodb = require("../db/connect");

const getRenters = async (req, res) => {
  mongodb
    .getDb()
    .db("test2")
    .collection("renter_info")
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

const getRenter = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json("Must use a valid renter id to get renter information.");
    }
    const renterId = new ObjectId(req.params.id);
    mongodb
      .getDb()
      .db("test2")
      .collection("renter_info")
      .find({ _id: renterId })
      .toArray()
      .then((err, lists) => {
        if (err) {
          res.status(400).json({ message: err });
        }
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(lists[0]);
      });
  }; 

  const createRenter = async (req, res) => {
    const renter = {
        name: req.body.title,
        birthday: req.body.birthday,
        title: req.body.title,
        checkout: req.body.checkout,
    };
    const response = await mongodb
      .getDb()
      .db("test2")
      .collection("renter_info")
      .insertOne(renter);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while creating renter information."
        );
    }
  };

  const updateRenter = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res
        .status(400)
        .json("Must use a valid renter id to update renter information.");
    }
    const renterId = new ObjectId(req.params.id);
    const renter = {
        name: req.body.title,
        birthday: req.body.birthday,
        title: req.body.title,
        checkout: req.body.checkout,
    };
    const response = await mongodb
      .getDb()
      .db("test2")
      .collection("renter_info")
      .replaceOne({ _id: renterId }, renter);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occurred while updating renter information"
        );
    }
  };

  const deleteRenter = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json("Must use a valid renter id to delete renter.");
    }
    const renterId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db("test2")
      .collection("renter_info")
      .remove({ _id: renterId }, true);
    console.log(result);
    if (result.deletedCount > 0) {
      res.status(200).send();
    } else {
      res
        .status(500)
        .json(
          result.error || "Some error occurred while deleting the selected renter."
        );
    }
  };
  
  module.exports = {
    getRenters,
    getRenter,
    createRenter,
    updateRenter,
    deleteRenter
  };