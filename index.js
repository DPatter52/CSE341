const express = require('express');
const app = express();
const mongodb = require('./db/connect');
const port = process.env.PORT || 3000;

app.use('/', require('./routes'))

mongodb.initDb((e, mongodb) => {
    if (e) {
        console.log(e);

    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});


