const express = require('express');
const cors = require('cors');
const {dbConnection} = require("../db/config");

class Server {
    port = process.env.PORT;
    userPath = '/api/user';
    authPath = '/api/auth';

    constructor() {
        this.app = express();

        //Connect DB
        this.database();

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }

    async database() {
        await dbConnection();
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //Process body information
        this.app.use(express.json());

        //Static page
        this.app.use(express.static('public'));
    }

    routes() {
        //User routes
        this.app.use(this.userPath, require('../routes/user'));
        this.app.use(this.authPath, require('../routes/auth'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server listening port ', this.port);
        });
    }

}

module.exports = Server;
