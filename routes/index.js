const router = require("express").Router();
const NotFoundError = require("../utils/NotFoundError");

const userRouter = require("./users");
const clothingRouter = require("./clothingItem");
const { createUser, login } = require("../controllers/users");
const auth = require("../middlewares/auth");
const {validateUserBody, validateUserAuth} = require("../middlewares/validation");


router.use("/users", auth, userRouter);
router.use("/items", clothingRouter);
router.post("/signin", validateUserAuth, login);
router.post("/signup", validateUserBody, createUser);

router.use((req, res, next) => {
  next(new NotFoundError("Route not found"));
});
module.exports = router;
