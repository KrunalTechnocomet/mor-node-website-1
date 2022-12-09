'use strict';

const SOFT_DELETE = 'SOFT-DELETE';
const PERMANENT_DELETE = 'PERMANENT-DELETE';

const deleteTypes = [
    SOFT_DELETE,
    PERMANENT_DELETE
];


module.exports = {
    SOFT_DELETE,
    PERMANENT_DELETE,
    deleteTypes
};