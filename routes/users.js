const router = require('express').Router();
const {getUsers, createUser, getCurrentUser, login} = require('../controllers/users');

router.get('/me', getCurrentUser);


module.exports = router;