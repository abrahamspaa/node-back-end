const { Router } = require('express');
const router = Router();

const { create, findOne, findAll, deleteOne, deleteAll } = require('./controller');

// Create a new user
router.post('/', create);

// Get only one user
router.get('/:email', findOne);

// Get user list
router.get('/', findAll);

// Delete a user
router.delete('/:email', deleteOne);

// Delete all user
router.delete('/', deleteAll);

module.exports = router;
