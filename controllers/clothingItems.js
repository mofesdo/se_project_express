const ClothingItem = require("../models/clothingItems");
const {
  INVALID_DATA_ERROR_CODE,
  NO_DATA_ERROR_CODE,
  DEFAULT_ERROR_CODE,
  FORBIDDEN_ERROR_CODE,
} = require("../utils/errors");

const errorHandler = require('../middlewares/error-handler');

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((err) => {
      // .error(err);
      // if (err.name === "ValidationError") {
      //   // return res
      //   //   .status(INVALID_DATA_ERROR_CODE)
      //   //   .send({ message: "Invalid data entered" });
      // }
      // return res
      //   .status(DEFAULT_ERROR_CODE)
      //   .send({ message: "An error has occurred on the server" });
      next(err);
    });
};

const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      // console.error(err);
      // return res
      //   .status(DEFAULT_ERROR_CODE)
      //   .send({ message: "An error has occurred on the server" });
      next(err);
    });
};
const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  ClothingItem.findById(itemId)
    .orFail()
    .then((item) => {
      if (req.user._id.toString() !== item.owner.toString()) {
        return res
          .status(FORBIDDEN_ERROR_CODE)
          .send({ message: "User is not authorized to do this action" });
      }
      return ClothingItem.findByIdAndDelete(itemId).then(() => {
        res.status(200).send({ data: item });
      });
    })
    .catch((err) => {
      // console.error(err);
      // if (err.name === "DocumentNotFoundError") {
      //   return res
      //     .status(NO_DATA_ERROR_CODE)
      //     .send({ message: "Item not found" });
      // }
      // if (err.name === "CastError") {
      //   return res
      //     .status(INVALID_DATA_ERROR_CODE)
      //     .send({ message: err.message });
      // }
      // return res
      //   .status(DEFAULT_ERROR_CODE)
      //   .send({ message: "An error has occurred on the server" });
      next(err);
    });
};

const likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true }
  )
    .orFail()
    .then((item) => {
      res.status(200).send({ data: item });
    })
    .catch((err) => {
      // console.error(err);
      // if (err.name === "DocumentNotFoundError") {
      //   return res
      //     .status(NO_DATA_ERROR_CODE)
      //     .send({ message: "Item not found" });
      // }
      // if (err.name === "CastError") {
      //   return res
      //     .status(INVALID_DATA_ERROR_CODE)
      //     .send({ message: err.message });
      // }
      // return res
      //   .status(DEFAULT_ERROR_CODE)
      //   .send({ message: "An error has occurred on the server" });
      next(err);
    });
};
const dislikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true }
  )
    .orFail()
    .then((item) => {
      res.status(200).send({ data: item });
    })
    .catch((err) => {
      // console.error(err);
      // if (err.name === "DocumentNotFoundError") {
      //   return res
      //     .status(NO_DATA_ERROR_CODE)
      //     .send({ message: "Item not found" });
      // }
      // if (err.name === "CastError") {
      //   return res
      //     .status(INVALID_DATA_ERROR_CODE)
      //     .send({ message: err.message });
      // }
      // return res
      //   .status(DEFAULT_ERROR_CODE)
      //   .send({ message: "An error has occurred on the server" });
      next(err);
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
