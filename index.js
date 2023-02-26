// startup
  const { auth } = require('express-openid-connect');

  const express = require("express");
  const bodyParser = require("body-parser");
  const mongodb = require("./db/connect");

  const port = process.env.PORT || 3000;
  const app = express();


  const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
  };

  app.use(auth(config));

  app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
  });


  app
    .use(bodyParser.json())
    .use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      next();
    })
    .use("/", require("./routes"));

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

