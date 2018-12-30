const { verify } = require('jsonwebtoken');
const { clientAuthorizationKey, jwtSecret } = require('./config.js');

module.exports = {
  isAuthenticated: (req, res, next) => {
    let token = req && req.headers && req.headers.authorization;

    if (token && token.startsWith(clientAuthorizationKey)) {
      token = token.slice(clientAuthorizationKey.length, token.length);
    } else {
      return res.status(403).json({
        message: 'No token provided'
      });
    }

    if (token) {

      verify(token, jwtSecret, (error, decoded) => {
        if (error) {
          return res.status(401);
        } else {
          req.decode = decoded;
          next();
        }
      });

    } else {
      return res.status(403).json({
        message: 'Please provide full token'
      });
    }
  }
};
