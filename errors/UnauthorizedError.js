import status from "http-status-codes";

export class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = status.UNAUTHORIZED;
  }
}
