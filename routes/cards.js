import express from "express";
import { celebrate, Joi } from "celebrate";
import {getAllCards, createCard, deleteCard, likeCard, dislikeCard} from "../controllers/cards.js";

const router = express.Router();

router.get('/', (req, res, next) => {
  getAllCards(req, res, next);
});

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri(),
  }),
}), (req, res, next) => {
  createCard(req, res, next);
});

router.delete('/:id', (req, res, next) => {
  deleteCard(req, res, next);
});

router.put('/:cardId/likes', (req, res, next) => {
  likeCard(req, res, next);
});

router.delete('/:cardId/likes', (req, res, next) => {
  dislikeCard(req, res, next);
});

export default router;
