const { check } = require("express-validator");

const saveBook = (req, res, next) => {
  const validationReq = {
    title: "required|string",
    author: "required|string",
    pages: "required|string",
    genre: "required|string",
    puplishYear: "required|string",
    invCount: "required|string"
  };

  check(req.body, validationReq, {}, (err, status) => {
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

  check(req.body, validationReq, {}, (err, status) => {
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
  saveRenter
};
