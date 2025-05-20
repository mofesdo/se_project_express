const bcrypt = require("bcryptjs");
// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {
  INVALID_DATA_ERROR_CODE,
  NO_DATA_ERROR_CODE,
  DEFAULT_ERROR_CODE,
  DUPLICATE_ERROR_CODE,
} = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: "An error has occurred on the server" });
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      User.create({ name, avatar, email, password: hashedPassword })
        .then((user) => {
          const userObject = user.toObject();
          delete userObject.password;
          res.status(201).send({user: userObject});
        })
        .catch((err) => {
          console.error(err);
          if (err.name === "ValidationError") {
            return res
              .status(INVALID_DATA_ERROR_CODE)
              .send({ message: "Invalid data entered" });
          }
          if (err.code === 11000) {
            return res
              .status(DUPLICATE_ERROR_CODE)
              .send({ message: "This user already exists" });
          }
          return res
            .status(DEFAULT_ERROR_CODE)
            .send({ message: "An error has occurred on the server" });
        });
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: "An error has occured on the server" });
    });
};

const getCurrentUser = (req, res) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NO_DATA_ERROR_CODE)
          .send({ message: "Item not found" });
      }
      if (err.name === "CastError") {
        return res
          .status(INVALID_DATA_ERROR_CODE)
          .send({ message: "Invalid data entered" });
      }
      return res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: "An error has occurred on the server" });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

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
      res.status(401).send({ message: err.message });
    });
};
const updateCurrentUser = (req, res) => {
  // const { name, avatar } = req.body;
  console.log(req.body);
  if (Object.keys(req.body).length === 0) {
    return res
      .status(INVALID_DATA_ERROR_CODE)
      .send({ message: "Request body is empty" });
  }
  if (!req.body.name && !req.body.avatar) {
    // body either empty or doesn't contain valid fields
    return res
      .status(INVALID_DATA_ERROR_CODE)
      .send({ message: "Request does not include a name or avatar" });
  }
  const userId = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => {
      // update user's name and avatar
      if (req.body.name) {
        user.name = req.body.name;
      }
      if (req.body.avatar) {
        user.avatar = req.body.avatar;
      }
      return user
        .save()
        .then((updatedUser) => {
          res.send(updatedUser);
        })
        .catch((err) => {
          console.error(err);
          if (err.name === "ValidationError") {
            return res
              .status(INVALID_DATA_ERROR_CODE)
              .send({ message: "Invalid data entered" });
          }
          return res
            .status(DEFAULT_ERROR_CODE)
            .send({ message: "An error has occurred on the server" });
        });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res
          .status(NO_DATA_ERROR_CODE)
          .send({ message: "User not found" });
      }
      if (err.name === "CastError") {
        return res
          .status(INVALID_DATA_ERROR_CODE)
          .send({ message: "Invalid data entered" });
      }
      return res
        .status(DEFAULT_ERROR_CODE)
        .send({ message: "An error has occurred on the server" });
    });
};
module.exports = {
  getUsers,
  createUser,
  getCurrentUser,
  login,
  updateCurrentUser,
};
