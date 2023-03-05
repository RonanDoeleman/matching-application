const express = require('express')
const app = express()
const port = 3000
const path = require('path');
const ejs = require('ejs');

app.use(express.static('public'));




app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'));
  });  

app.get('/about', (req, res) => {
    res.send('about')
})

app.get('/matching', (req, res) => {
    res.send('matching')
})

app.use((req, res, next) => {
    res.status(404).send('We did not find the page you were looking for :(');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

