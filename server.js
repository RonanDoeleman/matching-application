const express = require('express')
const app = express()
const port = 3000
const path = require('path');
let ejs = require('ejs');


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



// ******************
// - Routing
// ******************


app.get('/profile', (req, res) => {
    res.render('profile', { text: 'Ronan'})
})

app.get('/matchmaker', (req, res) => {
  res.render('matchmaker', { text: 'Ronan!'})
})

app.get('/about', (req, res) => {
  res.render('about', {text: 'This is the about page'})
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

