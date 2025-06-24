const router = require("express").Router();
const { NO_DATA_ERROR_CODE } = require("../utils/errors");

const userRouter = require("./users");
const clothingRouter = require("./clothingItem");
const { createUser, login } = require("../controllers/users");
const auth = require("../middlewares/auth");
const {validateUserBody, validateUserAuth} = require("../middlewares/validation");


router.use("/users", auth, userRouter);
router.use("/items", clothingRouter);
router.post("/signin", validateUserAuth, login);
router.post("/signup", validateUserBody, createUser);

router.use((req, res) => {
  res.status(NO_DATA_ERROR_CODE).json({ error: "Route not found" });
});
module.exports = router;
