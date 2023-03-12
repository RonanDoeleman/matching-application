require('dotenv').config()
// const { Router } = require('express');
const express = require('express');
const { MongoClient } = require("mongodb")
// const router = express.Router();
const app = express();
const port = 3000;
const userRouter = require('./public/routes/matches')
// const path = require('path');
// let ejs = require('ejs');
const mongoose = require('mongoose');
const uri = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}${process.env.DATABASE_URI}`
const { Match }  = require('./public/routes/matchSchema')

async function main() {
  await mongoose.connect(uri,{
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

app.get('/profile', async (req, res) => {
  try {
    const getMatches= await Match.find();
    const profile = getMatches.shift()
    // const matches = await Match.find({id: { $in: profile.matches}})
    const matches = getMatches.filter(match => profile.matches.find(id => id === match.id))

    res.render('profile', { profile, matches})
  } catch (error) {
    console.error(error)
  }
    
});

app.post('/removeFromMatches', async (req, res) => {
  const removeMatchButton = req.body.removeMatchButton
  try { 
    await Match.findOneAndUpdate({id: 6}, {$pull:{matches: Number(removeMatchButton)}})
    console.log(removeMatchButton)

  } catch (error) {
    console.error(error)
  }
  res.redirect('/profile')
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



