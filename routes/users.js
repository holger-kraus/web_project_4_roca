import express from "express";
import { celebrate, Joi } from "celebrate";
import { getAllUsers, getMe, getUser, updateAvatar, updateUser } from "../controllers/users.js";

const router = express.Router();

router.get('/', (req, res, next) => {
  getAllUsers(req, res, next);
});

router.get('/me', (req, res, next) => {
  getMe(req, res, next);
});

router.get('/:id', (req, res, next) => {
  getUser(req, res, next);
});

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(40)
      .pattern(new RegExp('^[a-zA-Z-\\s]*$')),
    about: Joi.string().required().min(2).max(200),
  }),
}), (req, res, next) => {
  updateUser(req, res, next);
});

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().uri(),
  }),
}), (req, res, next) => {
  updateAvatar(req, res, next);
});

export default router;
