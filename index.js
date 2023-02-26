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
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:3000',
    clientID: 'nr4CJAPcEE3gZfPVUUj09u0BdRVjt4bn',
    issuerBaseURL: 'https://dev-e3tyxl21rj5pmm68.us.auth0.com'
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

