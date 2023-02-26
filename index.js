// startup

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");
const mongodb = require("./db/connect");

const { auth, requiresAuth } = require("express-openid-connect");

const port = process.env.PORT || 3000;


const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

app.use(auth(config));

app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app
  .use(express.json())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use(cors())
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
