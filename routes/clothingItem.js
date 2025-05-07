const router = require('express').Router();

const {createItem, getItems, updateItem, deleteItem, likeItem, dislikeItem } = require('../controllers/clothingItems');

// Create
router.post('/', createItem);
// Read
router.get('/', getItems);
// Update
router.put('/:itemId', updateItem);
// Delete
router.delete('/:itemId', deleteItem);
// add like
router.put('/:itemId/likes', likeItem);
// remove like
router.delete('/:itemId/likes', dislikeItem );

module.exports = router;