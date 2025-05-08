const User = require('../models/user');
const { INVALID_DATA_ERROR_CODE, NO_DATA_ERROR_CODE, DEFAULT_ERROR_CODE } = require("../utils/errors");


const getUsers = (req, res) => {
    User.find({})
        .then((users)=>{
            res.send(users)
        })
        .catch((err) => {
            console.error(err);
            return res.status(DEFAULT_ERROR_CODE).send({message: 'An error has occurred on the server'})
        })
};

const createUser = (req, res) => {
    const {name, avatar} = req.body;
    User.create({name, avatar})
        .then((user) => {
            res.status(201).send(user);
        })
        .catch((err) => {
            console.error(err);
            if(err.name === "ValidationError"){
                return res.status(INVALID_DATA_ERROR_CODE).send({message: 'Invalid data entered'});
            }
            return res.status(DEFAULT_ERROR_CODE).send({message: 'An error has occurred on the server'});
        });
};

const getUser = (req, res) => {
    const {userId} = req.params;
    User.findById(userId)
        .orFail()
        .then((user) => {
            res.status(200).send(user);
        })
        .catch((err) => {
            console.error(err);
            if(err.name === "DocumentNotFoundError"){
                return res.status(NO_DATA_ERROR_CODE).send({message: 'Item not found'});
            }
            if(err.name === "CastError"){
                return res.status(INVALID_DATA_ERROR_CODE).send({message: 'Invalid data entered'});
            }
            return res.status(DEFAULT_ERROR_CODE).send({message: 'An error has occurred on the server'});
        });
}
module.exports = {getUsers, createUser, getUser};