import {BadRequestError} from "../errors/BadRequestError.js";
import {NotFoundError} from "../errors/NotFoundError.js";
import User from "../models/user.js";

export function getAllUsers(req, res, next) {
    User.find()
        .then((users) => res.send({data: users}))
        .catch(next);
}

export function getUser(req, res, next) {
    const userId = req.params.id;
    User.findById(userId)
        .then((user) => {
            if (user) {
                res.send({data: user});
            } else {
                throw new NotFoundError('User does not exist');
            }
        })
        .catch((err) => {
            if (err.name === 'CastError') {
                throw new NotFoundError('User does not exist');
            } else {
                throw err;
            }
        }).catch(next);
}

export function getMe(req, res, next) {
    const userId = "req.user._id;"
    User.findById(userId)
        .then((user) => {
            if (user) {
                res.send({data: user});
            } else {
                throw new NotFoundError('User does not exist');
            }
        })
        .catch((err) => {
            if (err.name === 'CastError') {
                throw new NotFoundError('User does not exist');
            } else {
                throw err;
            }
        }).catch(next);
}

export function createUser(req, res, next) {
    const { name, about, avatar, } = req.body;
    User.create({ name, about, avatar, })
        .then((user) => {
            return res.send({
                data: user,
            });
        })
        .catch((err) => {
            if (err.name === 'ValidationError' || err.name === 'MongoError') {
                throw new BadRequestError('Not a valid user object or the user exists already.');
            } else {
                throw err;
            }
        });
}

export function updateUser(req, res, next) {
    const {name, about} = req.body;

    User.findByIdAndUpdate(
        req.user._id,
        {
            name,
            about,
        },
        {
            new: true,
            runValidators: true,
            upsert: true,
        },
    )
        .then((user) => res.send({data: user}))
        .catch((err) => {
            if (err.name === 'ValidationError') {
                throw new BadRequestError('Not a valid user object');
            } else {
                throw err;
            }
        }).catch(next);
}

export function updateAvatar(req, res, next) {
    const {avatar} = req.body;

    User.findByIdAndUpdate(
        req.user._id,
        {
            avatar,
        },
        {
            new: true,
            runValidators: true,
            upsert: true,
        },
    )
        .then((user) => res.send({data: user}))
        .catch((err) => {
            if (err.name === 'ValidationError') {
                throw new BadRequestError('Not a valid user object');
            } else {
                throw err;
            }
        }).catch(next);
}
