const router = require("express").Router();
const auth = require("../middlewares/auth");
const {validateCardBody, validateID} = require("../middlewares/validation");

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
} = require("../controllers/clothingItems");

// Create
router.post("/", validateCardBody, auth, createItem);
// Read
router.get("/", getItems);
// Delete
router.delete("/:itemId", validateID, auth, deleteItem);
// add like
router.put("/:itemId/likes", validateID, auth, likeItem);
// remove like
router.delete("/:itemId/likes", validateID, auth, dislikeItem);

module.exports = router;
