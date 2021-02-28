import status from "http-status-codes";

export class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = status.INTERNAL_SERVER_ERROR;
  }
}
