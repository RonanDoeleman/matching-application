require('dotenv').config()
const { Router } = require('express');
const express = require('express');
const router = express.Router();
const app = express();
const port = 3000;
const userRouter = require('./public/routes/matches')
const path = require('path');
let ejs = require('ejs');
const mongoose = require('mongoose');



async function main() {
  await mongoose.connect(`mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}${process.env.DATABASE_URI}`,{
    dbName: process.env.DATABASE_NAME,
  });
  console.log("Succesfully connected")
}
main().catch(err => console.log(err));






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

// ******************
// - Routing
// ******************

app.get('/', (req, res) => {
  res.render('index', { text: 'Ronan,'})
});

app.get('/profile', (req, res) => {
    res.render('profile', { text: 'Ronan,'})
});

app.get('/about', (req, res) => {
  res.render('about', {text: 'This is the about page'})
});

app.get('/contact', (req, res) => {
  res.render('contact', {text: 'This is the contact page'})
});


app.use('/matches', userRouter)

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

