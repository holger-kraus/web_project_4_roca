import status from "http-status-codes";

export class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = status.CONFLICT;
  }
}
