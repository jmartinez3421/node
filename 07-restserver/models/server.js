const express = require('express');
const cors = require('cors');

class Server{
    port = process.env.PORT;
    userPath = '/api/user';

    constructor() {
        this.app = express();

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        //Process body information
        this.app.use(express.json());

        //Static page
        this.app.use(express.static('public'));
    }

    routes(){
        //User routes
        this.app.use(this.userPath, require('../routes/user'));
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log('Server listening port ', this.port);
        });
    }

}

module.exports = Server;
