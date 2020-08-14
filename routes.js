const { Router } = require('express');

const multer = require('multer');
const multerConfig = require('./config/multer');

const FileController = require('./src/controller/FileController');

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/files', upload.single('Userfile'), FileController.store);

module.exports = routes;