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
    {   id: 1,
        image: './images/marieke.jpg',
        name: 'Marieke',
        location: 'Hoofddorp',
        age: '22',
        genres: 'Techno' + ' & ' + 'Tech-House',
        favfestivals: 'Rotterdam Rave' + ', ' + 'Soenda',
        bio: 'Exploring the world'
    },
    {   id: 2,
        image: './images/amber.jpg',
        name: 'Amber',
        location: 'Lisse',
        age: '20',
        genres: 'Hip-Hop' + ' & ' + 'R&B',
        favfestivals: 'Woo Hah' + ', ' + 'Vunzige Deuntjes',
        bio: 'Live, Laugh, Love'
    },
    {   id: 3,
        image: './images/lisa.jpg',
        name: 'Lisa',
        location: 'Amsterdam',
        age: '23',
        genres: 'Hardcore' + ' & ' + 'Industrial',
        favfestivals: 'PRSPCT Festival' + ', ' + 'Smeerboel',
        bio: 'Lets dance till dawn'
    },
    {   id: 4,
        image: './images/charissa.jpg',
        name: 'Charissa',
        location: 'Alkmaar',
        age: '24',
        genres: 'Techno' + ' & ' + 'Urban',
        favfestivals: 'Verknipt' + ', ' + 'Appelsap',
        bio: 'Carpe Diem' 
    },
    {   id: 5,
        image: './images/alisa.jpg',
        name: 'Alisa',
        location: 'Utrecht',
        age: '27',
        genres: 'Klassiek' + ' & ' + 'Modern',
        favfestivals: 'Bach in Symphony XII' + ', ' + 'Candle Lights',
        bio: 'Lets enjoy music together!' 
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

