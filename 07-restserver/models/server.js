const express = require('express');
const cors = require('cors');
const {dbConnection} = require("../db/config");

class Server {
    port = process.env.PORT;
    paths = {
        user: '/api/user',
        auth: '/api/auth',
        categories: '/api/categories',
        product: '/api/products',
        search: '/api/search'
    }


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
        this.app.use(this.paths.user, require('../routes/user'));
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.categories, require('../routes/category'));
        this.app.use(this.paths.product, require('../routes/product'));
        this.app.use(this.paths.search, require('../routes/search'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server listening port ', this.port);
        });
    }

}

module.exports = Server;
