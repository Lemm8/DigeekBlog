require('dotenv').config();

const Server = require('./models/server');

// LEVANTAR SERVIDOR
const server = new Server();
server.listen();