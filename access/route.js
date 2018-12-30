module.exports = (app) => {
  const { signup, login } = require('./controller');

  // Create a new userError
  app.post('/api/signup', signup);

  // For Login
  app.post('/api/login', login);
};
