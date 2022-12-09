'use strict';
import { v4 as uuid } from 'uuid';

export class InvalidEmailError extends Error {
    code = 'U0001';

    constructor(message = 'Email Should Not Be Empty', status = 400) {
        super(message);
        this.status = status;
        this.uid = uuid();
    }
}

export class InvalidMobileError extends Error {
    code = 'U0002';

    constructor(message = 'Mobile Should Not Be Empty', status = 400) {
        super(message);
        this.status = status;
        this.uid = uuid();
    }
}

export class InvalidCountryCodeError extends Error {
    code = 'U0003';

    constructor(message = 'Country Code Should Not Be Empty', status = 400) {
        super(message);
        this.status = status;
        this.uid = uuid();
    }
}

export class InvalidGenderFormatError extends Error {
    code = 'U0004';

    constructor(message = 'Enter Valid Gender', status = 400) {
        super(message);
        this.status = status;
        this.uid = uuid();
    }
}

export class InvalidRoleFormatError extends Error {
    code = 'U0005';

    constructor(message = 'Enter Valid Role', status = 400) {
        super(message);
        this.status = status;
        this.uid = uuid();
    }
}

export class InvalidLevelFormatError extends Error {
    code = 'U0006';

    constructor(message = 'Enter Valid VIP Level', status = 400) {
        super(message);
        this.status = status;
        this.uid = uuid();
    }
}

export class DuplicateEmailError extends Error {
    code = 'U0007';

    constructor(message = 'Email ID is already exist', status = 409) {
        super(message);
        this.status = status;
        this.uid = uuid();
    }
}

export class InvalidParamError extends Error {
    code = 'U0008';

    constructor(message = 'Invalid User ID', status = 409) {
        super(message);
        this.status = status;
        this.uid = uuid();
    }
}

export class DuplicatePhoneError extends Error {
    code = 'U0009';

    constructor(message = 'mobile already exist', status = 409) {
        super(message);
        this.status = status;
        this.uid = uuid();
    }
}