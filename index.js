const express = require("express");
const bodyParser = require("body-parser");
const mongodb = require("./db/connect");


const port = process.env.PORT || 8080;
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/", require("./routes"));

// Error Handeling
process.on("uncaughtException", (err, origin) => {
  console.log(
    process.stderr.fd,
    `Caught exception: ${err}\n` + `Exception origin ${origin}`
  );
});

mongodb.initDb((error, mongodb) => {
  if (error) {
    console.log("There was an issue connecting to the database!", error);
    process.exit();
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}!`);
  }
});
