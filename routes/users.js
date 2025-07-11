const router = require("express").Router();
const { getCurrentUser, updateCurrentUser } = require("../controllers/users");
const { validateUpdate } = require("../middlewares/validation");

router.get("/me", getCurrentUser);
router.patch("/me", validateUpdate, updateCurrentUser);

module.exports = router;
