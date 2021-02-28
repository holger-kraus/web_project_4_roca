import Card from "../models/card.js";
import { BadRequestError } from "../errors/BadRequestError.js";
import { NotFoundError } from "../errors/NotFoundError.js";

export function getAllCards(req, res, next) {
  Card.find()
    .populate('owner')
    .populate('likes')
    .then((cards) => res.send({ data: cards }))
    .catch(next);
}

export function createCard(req, res, next) {
  const { name, link } = req.body;
  Card.create({
    name,
    link,
    owner: "603b66fb323cbf5993e9e24c",
  })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      console.log(err);
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Not a valid card object');
      } else {
        throw err;
      }
    }).catch(next);
}

export function deleteCard (req, res, next) {
  Card.findOneAndDelete(
    { _id: req.params.id, owner: { _id: req.user._id } },
  )
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        throw new NotFoundError('Card does not exist or this card is not accessible for you for deletion');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotFoundError('Card does not exist or this card is not accessible for you for deletion');
      } else {
        throw err;
      }
    }).catch(next);
}

export function likeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .populate('likes')
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        throw new NotFoundError('Card does not exist');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotFoundError('Card does not exist');
      } else {
        throw err;
      }
    })
    .catch(next);
}

export function dislikeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // remove _id from the array
    { new: true },
  )
    .populate('likes')
    .then((card) => {
      if (card) {
        res.send({ data: card });
      } else {
        throw new NotFoundError('Card does not exist');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotFoundError('Card does not exist');
      } else {
        throw err;
      }
    })
    .catch(next);
}
