const express = require('express')
const app = express()
const port = 3000
const path = require('path');

// ******************
// - Middleware
// ******************

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// ******************
// - Setup default page
// ******************

// app.get('/', function(req, res) {
//     res.sendFile(path.join(__dirname, '/public/index.html'));
//   });

app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})

// ******************
// - Templating
// ******************

app.set('view engine', 'ejs');


let ejs = require('ejs');
let people = ['geddy', 'neil', 'alex'];
let html = ejs.render('<%= people.join(", "); %>', {people: people});



// ******************
// - Routing
// ******************

app.get('/about', (req, res) => {
    res.render('about', {text: 'This is the about page'})
})

app.get('/matching', (req, res) => {
    res.send('matching')
})

app.get('/contact', (req, res) => {
  res.render('contact', {text: 'This is the contact page'})
})


// ******************
// - 404 Error handler, if no page is found
// ******************

app.use((req, res, next) => {
    res.status(404).send('We did not find the page you were looking for :(');
})


// ******************
// - Start Webserver
// ******************

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

