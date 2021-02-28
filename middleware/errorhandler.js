import { messagesConfig } from "../config/messagesConfig.js";

export default (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? messagesConfig.internalServerError
        : message,
    });
  next(err);
}
