const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const db = require('./db/db');
const studentRouter = require('./routes/students');
const testRouter = require('./routes/tests');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use('/students', studentRouter);
app.use('/tests', testRouter);

app.use(function(err, req, res, next) {
  console.error(err.stack);
  if (err.status) {
    res.status(err.status).send(err.message);
  }
  else {
    res.status(500).send('Something broke!');
  }
});


if (require.main === module){
  //will only run when run with npm start and not with npm test to avoid db syncing in multiple threads when running tests
  db
    .sync()
    .then(() =>
      app.listen(3000, function() {
        console.log('Server is listening on port 3000!');
      })
    )
    .catch(console.error);
}

module.exports = app;
