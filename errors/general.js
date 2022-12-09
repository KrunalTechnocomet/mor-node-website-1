'use strict';

const { v4: uuid } = require('uuid');

class BadRequestError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
    this.uid = uuid();
  }
}

class NotFoundError extends Error {
  code = 'G0404';

  uid = uuid();

  constructor(message, status = 404) {
    super(message);
    this.status = status;
  }
}

class InvalidLinkError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
    this.uid = uuid();
  }
}

class InvalidFileType extends Error {
  constructor(message, status = 400) {
    super(message);
    this.status = status;
    this.uid = uuid();
  }
}

class UserNotFoundError extends BadRequestError {
  constructor(message = 'User Not Found', status = 404) {
    super(message, status);
    this.status = status;
    this.uid = uuid();
  }
}

module.exports = {
  BadRequestError,
NotFoundError,
InvalidLinkError,
InvalidFileType,
UserNotFoundError,
}


