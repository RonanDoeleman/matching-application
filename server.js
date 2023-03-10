const express = require('express');
const app = express();
const port = 3000
// const path = require('path');
// let ejs = require('ejs');


// ******************
// - Middleware
// ******************

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// ******************
// - Templating
// ******************

app.set("view engine", "ejs");

app.get('/', (req, res) => {
  const matches = [
    {name: 'Marieke',
     age: '22',
     genres: 'Techno' + 'Industrial',
     favfestivals: 'Rotterdam Rave' + 'Smeerboel Festival'
    },
    {name: 'Amber',
     age: '20',
     genres: 'Hip-Hop' + 'Urban',
     favfestivals: 'Woo Hah' + 'Vunzige Deuntjes'
    },
    {name: 'Lisa',
     age: '23',
     genres: 'Hardcore' + 'Industrial',
     favfestivals: 'PRSPCT Festival' + 'Soenda'
    }
  ];

  res.render('index', {name: 'Home page', matches})
});




// ******************
// - Routing
// ******************


app.get('/profile', (req, res) => {
    res.render('profile', { text: 'Ronan'})
});

app.get('/about', (req, res) => {
  res.render('about', {text: 'This is the about page'})
});

app.get('/contact', (req, res) => {
  res.render('contact', {text: 'This is the contact page'})
});

// ******************
// - 404 Error handler, if no page is found
// ******************

app.use((req, res) => {
    res.status(404).send('We did not find the page you were looking for');
});


// ******************
// - Start Webserver
// ******************

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

