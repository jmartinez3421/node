require('dotenv').config();
const express = require('express');
const hbs = require('hbs');

const app = express();

//Handlebars
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

//Middlewares
app.use(express.static('public')); //Serves static content

app.get('/', (req, res) => {
    res.render('home', {
        name: 'Jordi Martínez',
        title: 'Node Course'
    });
})


app.get('/generic', (req, res) => {
    // res.sendFile(__dirname + '/public/generic.html');
    res.render('generic', {
        name: 'Jordi Martínez',
        title: 'Node Course'
    });
})

app.get('/elements', (req, res) => {
    // res.sendFile(__dirname + '/public/elements.html');
    res.render('elements', {
        name: 'Jordi Martínez',
        title: 'Node Course'
    });
})

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/404.html');
});

app.listen(process.env.PORT, () => {
    console.log(`The server is running in the port ${process.env.PORT}`);
});
