const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const BadRequestError = require("../utils/BadRequestError");
const UnauthorizedError = require("../utils/UnauthorizedError");
const NotFoundError = require("../utils/NotFoundError");
const ConflictError = require("../utils/ConflictError");

const { JWT_SECRET } = require("../utils/config");

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      User.create({ name, avatar, email, password: hashedPassword })
        .then((user) => {
          const userObject = user.toObject();
          delete userObject.password;
          res.status(201).send({ user: userObject });
        })
        .catch((err) => {
          if (err.name === "ValidationError") {
            next(new BadRequestError("Invalid data entered"));
          } else if (err.code === 11000) {
            next(new ConflictError("This user already exists"));
          } else {
            next(err);
          }
        });
    })
    .catch((err) => {
      next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Item not found"));
      } else if (err.name === "CastError") {
        next(new BadRequestError("Invalid data entered"));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!req.body.email || !req.body.password) {
    next(new BadRequestError("Request does not include email or password"));
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      // authentication successful! user is in the user variable
      const userObject = user.toObject();
      delete userObject.password;

      res.status(200).send({
        token: jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        }),
        user: userObject,
      });
    })
    .catch((err) => {
      // authentication error
      if (err.message === "Incorrect email or password") {
        next(new UnauthorizedError(err.message));
      } else {
        next(err);
      }
    });
};
const updateCurrentUser = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    next(new BadRequestError("Request body is empty"));
  }
  if (!req.body.name && !req.body.avatar) {
    // body either empty or doesn't contain valid fields
    next(new BadRequestError("Request does not include a name or avatar"));
  }
  const userId = req.user._id;
  return User.findById(userId)
    .orFail()
    .then((user) => {
      // update user's name and avatar
      if (req.body.name) {
        user.set("name", req.body.name);
      }
      if (req.body.avatar) {
        user.set("avatar", req.body.avatar);
      }
      return user
        .save()
        .then((updatedUser) => {
          res.send(updatedUser);
        })
        .catch((err) => {
          if (err.name === "ValidationError") {
            next(new BadRequestError("Invalid data entered"));
          } else {
            next(err);
          }
        });
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Item not found"));
      } else if (err.name === "CastError") {
        next(new BadRequestError("Invalid data entered"));
      } else {
        next(err);
      }
    });
};
module.exports = {
  createUser,
  getCurrentUser,
  login,
  updateCurrentUser,
};
