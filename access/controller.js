const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { jwtSecret } = require('../config');

const Access = require('./model');

const validateUserEmail = email =>  Access.findOne({email}).then(result => result !== null);

const signup = (req, res) => {
  validateUserEmail(req.body.email).then((valid) => {

    if (valid) {

      return res.status(403).json({
        error: 'Already email is used'
      });

    } else {
      bcrypt.hash(req.body.password, 10, (error, hash) => {

        if (error) {

          return res.status(500).json({error: error});
        } else {

          const user = new Access({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            password: hash
          });

          user.save()
            .then(() => {
              res.status(200).json({
                success: 'New user has been created'
              });
            })
            .catch(userError => {
              res.status(500).json({error: userError});
            });

        }
      });
    }

  });
};

const login = (req, res) => {

  Access.findOne({
    email: req.body.email
  })
    .exec()
    .then(user => {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            error: 'Unauthorized Access'
          });
        }

        if (result) {
          const JWTToken = sign({
            email: user.email,
            _id: user._id
          }, jwtSecret, {
            expiresIn: '2h'
          });

          return res.status(200).json({
            success: 'Valid user',
            token: JWTToken
          })
        }

        return res.status(401).json({
          error: 'Unauthorized Access'
        });
      });
    })
    .catch(error => {
      res.status(500).json({error: error});
    })
};

module.exports = { signup, login };
