'use strict';

const { v4: uuid } = require('uuid');

class InvalidCredidentialsError extends Error {
    code = 'A0001';

    constructor(message = 'Invalid Credentials', status = 400) {
        super(message);
        this.status = status;
        this.uid = uuid();
    }
}

class EmailNotVerifiedError extends Error {
    code = 'A0002';

    constructor(message = 'Email Not Verified', status = 400) {
        super(message);
        this.status = status;
        this.uid = uuid();
    }
}

class MobileNotVerifiedError extends Error {
    code = 'A0003';

    constructor(message = 'Mobile Number Not Verified', status = 400) {
        super(message);
        this.status = status;
        this.uid = uuid();
    }
}

class PermissionDeniedError extends Error {
    code = 'A0004';

    constructor(message = 'You Don\'t Have Permission To Perform This Operation', status = 403) {
        super(message);
        this.status = status;
        this.uid = uuid();
    }
}

class InvalidOtpError extends Error {
    code = 'A0005';

    constructor(message = 'Incorrect OTP. Please try again.', status = 400) {
        super(message);
        this.status = status;
        this.uid = uuid();
    }
}

class InvalidVerificationLink extends Error {
    code = 'A0006';

    constructor(message = 'Invalid Verification Link', status = 400) {
        super(message);
        this.status = status;
        this.uid = uuid();
    }
}

class AbsenceOfRequiredFieldError extends Error {
    code = 'A0007';

    constructor(input, status = 428, message = `${input} Should Not Be Empty.`) {
        super(message);
        this.status = status;
        this.uid = uuid();
    }
}

class InvalidInputError extends Error {
    code = 'A0008';
    constructor(input, status = 400, message = `Invalid ${input}`) {
        super(message);
        this.status = status;
        this.uid = uuid();
    }
}


class FailedOperationError extends Error {
    code = 'A0009';

    constructor(input, status = 428, message = `Failed To ${input}`) {
        super(message);
        this.status = status;
        this.uid = uuid();
    }
}

class DataAlreadyExistsError extends Error {
    code = 'A0010';

    constructor(input, message = `${input} Already Exists`, status = 422) {
        super(message);
        this.status = status;
        this.uid = uuid();
    }
}

class ValidationError extends Error {
    code = 'A0011';

    constructor(input, message = `Enter valid ${input}`, status = 422) {
        super(message);
        this.status = status;
        this.uid = uuid();
    }
}

class DataNotAvailable extends Error {
    code = 'A0012';

    constructor(input, message = `${input} not available`, status = 404) {
        super(message);
        this.status = status;
        this.uid = uuid();
    }
}

class SessionExpired extends Error {
    code = 'A0013';

    constructor(input, message = `Session Expired, Please Login Again`, status = 401) {
        super(message);
        this.status = status;
        this.uid = uuid();
    }
}

class NoUserError extends Error {
    code = 'A0014';

    constructor(input, message = `No account found linked to ${input}.`, status = 404) {
        super(message);
        this.status = status;
        this.uid = uuid();
    }
}

class ExceedRequestQuota extends Error {
    code = 'A0015';

    constructor(input, message = `Exceeded Request Quota`, status = 429) {
        super(message);
        this.status = status;
        this.uid = uuid();
    }
}

class ReservedUserName extends Error {
    code = 'A0016';

    constructor(input, message = `This Username is reserved`, status = 429) {
        super(message);
        this.status = status;
        this.uid = uuid();
    }
}

class duplicateKey extends Error {
    code = 'A0017';

    constructor(input, message = `Account already exists - ${input}`, status = 404) {
        super(message);
        this.status = status;
        this.uid = uuid();
    }
}

class insufficientDiamonds extends Error {
    code = 'A0018';

    constructor(input, message = `Insufficient Diamonds to send`, status = 404) {
        super(message);
        this.status = status;
        this.uid = uuid();
    }
}

class UserAlreadyExist extends Error {
    code = 'A0019';

    constructor(message = `User already exist.`, status = 404) {
        super(message);
        this.status = status;
        this.uid = uuid();
    }
}

class Insufficient extends Error {
    code = 'A0020';

    constructor(input, message = `Insufficient ${input}.`, status = 400) {
        super(message);
        this.status = status;
        this.uid = uuid();
    }
}

class SignUpInCompleteError extends Error {
    code = 'A0021';

    constructor(message = 'SignUp process is incomplete', status = 400) {
        super(message);
        this.status = status;
        this.uid = uuid();
    }
}

class UserAccessDeniedError extends Error {
    code = 'A0023';

    constructor(message = 'You can not view this profile', status = 400) {
        super(message);
        this.status = status;
        this.uid = uuid();
    }
}

class IncorrectpasswordError extends Error {
    code = 'A0024';

    constructor(message = 'Incorrect Password.', status = 400) {
        super(message);
        this.status = status;
        this.uid = uuid();
    }
}

module.exports = {
    InvalidCredidentialsError,
EmailNotVerifiedError,
MobileNotVerifiedError,
PermissionDeniedError,
InvalidOtpError,
InvalidVerificationLink,
AbsenceOfRequiredFieldError,
InvalidInputError,
FailedOperationError,
DataAlreadyExistsError,
ValidationError,
DataNotAvailable,
SessionExpired,
NoUserError,
ExceedRequestQuota,
ReservedUserName,
duplicateKey,
insufficientDiamonds,
UserAlreadyExist,
Insufficient,
SignUpInCompleteError,
UserAccessDeniedError,
IncorrectpasswordError,
}
