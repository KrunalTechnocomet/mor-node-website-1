'use strict';

const multer = require('multer');
const { v4: uuid } =require('uuid');
const path = require('path');

exports.uploadDisplayImage = multer({
  storage: multer.diskStorage({
    destination: `uploads/users`,
    filename(req, file, cb) {
      const fileExtension = path.extname(file.originalname);
      cb(null, `${uuid()}${fileExtension}`);
    },
  }),
});

exports.uploadOfficialHostDocs = multer({
  storage: multer.diskStorage({
    destination: `uploads/officialHostDocs`,
    filename(req, file, cb) {
      const fileExtension = path.extname(file.originalname);
      cb(null, `${uuid()}${fileExtension}`);
    },
  }),
});


exports.uploadChatImage = multer({
  storage: multer.diskStorage({
    destination: `uploads/chat`,
    filename(req, file, cb) {
      const fileExtension = path.extname(file.originalname);
      cb(null, `${uuid()}${fileExtension}`);
    },
  }),
});