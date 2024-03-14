const express = require('express');
const ExpressFormidable = require('express-formidable');
const { imageUploadController } = require('../controller/imageUpload');

router = express.Router();

router.post("/upload-image", ExpressFormidable({ maxFieldsSize: 5 * 2024 * 2024 }),  
imageUploadController
);

module.exports = router;