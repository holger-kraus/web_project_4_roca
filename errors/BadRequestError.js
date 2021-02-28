import status from "http-status-codes";

export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = status.BAD_REQUEST;
  }
}
