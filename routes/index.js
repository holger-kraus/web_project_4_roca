import express from "express";
import users from "./users.js";
import cards from "./cards.js";
import {NotFoundError} from "../errors/NotFoundError.js";
import {messagesConfig} from "../config/messagesConfig.js";
import {celebrate, Joi} from "celebrate";
import {createUser} from "../controllers/users.js";
import {getOverviewPage} from "../controllers/index.js";

const router = express.Router();

router.post('/signup', celebrate({
    body: Joi.object().keys({
        name: Joi.string().required().min(2).max(40)
            .pattern(new RegExp('^[a-zA-Z-\\s]*$')),
        about: Joi.string().required().min(2).max(200),
        avatar: Joi.string().required().uri(),
    }),
}), createUser);

router.use('/users', users);
router.use('/cards', cards);
router.get('/', (req, res, next) => {
    getOverviewPage(req, res, next);
});

router.get("/", (req, res) => {

});

router.get('*', () => {
    throw new NotFoundError(messagesConfig.resourceNotFound);
});

export default router;
