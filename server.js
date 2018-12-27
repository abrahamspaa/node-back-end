const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { connect } = require('mongoose');
const morgan = require('morgan');

const user = require('./user/route');

connect('mongodb://localhost/jwtauth', {
  useNewUrlParser: true
}).then(() => {
  console.log('Mongo DB connected')
}).catch(error => {
  console.log('Cant able to connect ot Mongo DB getting error as:', error)
});

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('short'));

app.get('/status', (req, res) => {
   res.json({
      "Tutorial": "Welcome to the Node express JWT Tutorial"
   });
});

app.use('/user', user);

app.listen(PORT, () => {
   console.log('Server is running on Port', PORT);
});
