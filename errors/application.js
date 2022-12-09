'use strict';

import { v4 as uuid } from 'uuid';

export class ApplicationAlreadyRegistered extends Error {
    code = 'AP0001';

    constructor(message = 'APPLICATION ALREADY REGISTERED', status = 409) {
        super(message);
        this.status = status;
        this.uid = uuid();
    }
}