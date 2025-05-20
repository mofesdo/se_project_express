const router = require('express').Router();
const {getUsers, createUser, getUser, login} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', createUser);
router.post('/signin', login);

module.exports = router;