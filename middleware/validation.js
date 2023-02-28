const { validator } = require("../helpers/validate");

const saveBook = (req, res, next) => {
  const validationReq = {
    title: "required|string",
    author: "required|string",
    pages: "required|string",
    genre: "required|string",
    puplishYear: "required|string",
    invCount: "required|string",
  };

  validator(req.body, validationReq, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation Failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

const saveRenter = (req, res, next) => {
  const validationReq = {
    name: "required|string",
    birthday: "required|string",
    title: "required|string",
    checkout: "required|string",
  };

  validator(req.body, validationReq, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation Failed",
        data: err,
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveBook,
  saveRenter,
};

// exports.saveBook = [
//   check("title", "Book title is required").not().isEmpty(),
//   check("author", "Author is required").not().isEmpty(),
//   check("pages", "Number of pages is required").not().isEmpty(),
//   check("genre", "Genre type is required").not().isEmpty(),
//   check("publishYear", "Publish year is required").not().isEmpty(),
//   check("invCount", "Inventory number is required").not().isEmpty()
// ]

// exports.saveRenter = [
//   check("name", "Name is required").not().isEmpty(),
//   check("birthday", "Birth date is required").not().isEmpty(),
//   check("title", "Book title is required").not().isEmpty(),
//   check("checkout", "Checkout date is required").not().isEmpty()
// ]
