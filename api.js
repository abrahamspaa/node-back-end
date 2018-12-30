const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const morgan = require('morgan');
const { connect } = require('mongoose');

const { mongoURL } = require('./config');
const { isAuthenticated } = require('./middleware');

// For accessing the application
const access = require('./access/route');
const user = require('./user/route');
const PORT = process.env.PORT || 3000;

const app = express();

// Mongo DB connection
connect(mongoURL, {
  useNewUrlParser: true
}).then(() => {
  console.log('Mongo DB connected');
}).catch(error => {
  console.error('Error in connecting MongoDB:', error);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Log of api
app.use(morgan(':remote-addr - :remote-user [:date[clf]] :method :url HTTP/:http-version :status :res[content-length] :referrer :user-agent - :response-time ms'));

// To check up and running
app.get('/status', (req, res) => {
   res.send('Up and running properly');
});

// Routes
access(app);
app.use('/api/user', isAuthenticated, user);

app.listen(PORT, () => {
   console.log('Server is running on Port', PORT);
});
