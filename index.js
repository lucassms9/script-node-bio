const path = require('path');

const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const server = express();

server.use(cors());
server.use('/files',express.static(path.resolve(__dirname, 'tmp', 'uploads')));

server.use(routes);

server.listen(3333);
