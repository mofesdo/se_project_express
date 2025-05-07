const ClothingItem = require("../models/clothingItems");
const { INVALID_DATA_ERROR_CODE, NO_DATA_ERROR_CODE, DEFAULT_ERROR_CODE } = require("../utils/errors");

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res.status(INVALID_DATA_ERROR_CODE).send({ message: err.message });
      }
      return res.status(DEFAULT_ERROR_CODE).send({ message: err.message });
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      res.status(DEFAULT_ERROR_CODE).send({ message: err.message });
    });
};
const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageUrl } })
    .orFail()
    .then((item) => {
      res.status(200).send({ data: item });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NO_DATA_ERROR_CODE).send({ message: err.message });
      }
      if (err.name === "CastError") {
        return res.status(INVALID_DATA_ERROR_CODE).send({ message: err.message });
      }
      return res.status(DEFAULT_ERROR_CODE).send({ message: err.message });
    });
};
const deleteItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((item) => {
      res.status(204).send({});
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NO_DATA_ERROR_CODE).send({ message: err.message });
      }
      if (err.name === "CastError") {
        return res.status(INVALID_DATA_ERROR_CODE).send({ message: err.message });
      }
      return res.status(DEFAULT_ERROR_CODE).send({ message: err.message });
    });
};

module.exports = { createItem, getItems, updateItem, deleteItem };