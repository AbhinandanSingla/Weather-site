const express = require('express');
const app = express(); // calling express function
const port = process.env.PORT || 5000;
const path = require('path');
const hbs = require('hbs');

// path for main root directory

static_path = path.join(__dirname, '../public');
templatePath = path.join(__dirname, '/templates/views');
partials_path = path.join(__dirname, '/templates/partials');
// middleware to use static site
app.use(express.static(static_path));
app.set('view engine', 'hbs');
app.set('views', templatePath);
hbs.registerPartials(partials_path);
// routing
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/weather', (req, res) => {
    res.render('weather');
});

app.get('*', (req, res) => {
    res.render('404error', {
        errorMsg: 'Page not found'
    });
});

app.listen(port, () => {
    console.log('sever is listening to requests');
});

