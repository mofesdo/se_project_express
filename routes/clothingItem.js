const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

// Create
router.post("/", auth, createItem);
// Read
router.get("/", getItems);
// Delete
router.delete("/:itemId", auth, deleteItem);
// add like
router.put("/:itemId/likes", auth, likeItem);
// remove like
router.delete("/:itemId/likes", auth, dislikeItem);

module.exports = router;
