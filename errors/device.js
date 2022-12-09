'use strict';

import { v4 as uuid } from 'uuid';

export class FailedOperationError extends Error {
    code = 'D0001';

    constructor(input, status = 428, message = `Failed To ${input}`) {
        super(message);
        this.status = status;
        this.uid = uuid();
    }
}