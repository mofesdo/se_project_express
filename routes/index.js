const router = require('express').Router();
const {NO_DATA_ERROR_CODE} = require('../utils/errors');

const userRouter = require('./users');
const clothingRouter = require('./clothingItem');

router.use('/users', userRouter);
router.use('/items', clothingRouter)
router.use((req, res) => {
    res.status(NO_DATA_ERROR_CODE).json({ error: 'Route not found' });
 });

module.exports = router;