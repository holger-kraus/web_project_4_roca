import status from "http-status-codes";

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = status.NOT_FOUND;
  }
}
