const mongoose = require('mongoose');
const User = require('./model');

module.exports = {

  create: (req, res) => {

    const user = new User({
      _id: req.decode._id || '',
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      roles: req.body.roles
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
  },
  findOne: (req, res) => {
    User.findOne({
      email: req.params.email
    })
      .exec()
      .then(success => {
        res.status(200).json(success)
      })
      .catch(error => {
        res.status(500).json({error: error})
      });
  },
  findAll: (req, res) => {

    User.find()
      .exec()
      .then(success => {
        res.status(200).json(success)
      })
      .catch(userError => {
        res.status(500).json({error: userError})
      });
  },
  deleteOne: (req, res) => {
    let email = req.params.email;

    User.findOneAndDelete({
      email
    })
      .exec()
      .then(sucess => {
        res.status(200).json({
          success: email + ' has been deleted successfully'
        });
      })
      .catch(error => {
        res.status(500).json(error);
      })
  },
  deleteAll: (req, res) => {

    User.remove()
      .exec()
      .then(sucess => {
        res.status(200).json({
          success: 'All deleted'
        });
      })
      .catch(error => {
        res.status(500).json(error);
      })
  }
};
