const router = require('express').Router();

const {createItem, getItems, deleteItem, likeItem, dislikeItem } = require('../controllers/clothingItems');

// Create
router.post('/', createItem);
// Read
router.get('/', getItems);
// Delete
router.delete('/:itemId', deleteItem);
// add like
router.put('/:itemId/likes', likeItem);
// remove like
router.delete('/:itemId/likes', dislikeItem );

module.exports = router;