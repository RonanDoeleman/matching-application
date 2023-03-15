require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const userRouter = require('./public/routes/matches');
const profileRouter = require('./public/routes/profile');
const mongoose = require('mongoose');
const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}${process.env.DATABASE_URI}`;
const { Match }  = require('./public/routes/matchSchema');

async function main() {
    await mongoose.connect(uri,{
      dbName: process.env.DATABASE_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true
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

app.use('/matches', userRouter)

app.use('/profile', profileRouter)

app.get('/about', (req, res) => {
  res.render('about', {text: 'About'})
});

app.get('/contact', (req, res) => {
  res.render('contact', {text: 'Contact'})
});

// ******************
// - 404 Error handler, if no page is found
// ******************

app.use((req, res) => {
    res.status(404).send('Unfortunately we did not find the page you were looking for');
});

// ******************
// - Start Webserver
// ******************

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});



