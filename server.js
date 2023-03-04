const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('<h1>Hello Ronan</h1>')
})

app.get('/marieke', (req, res) => {
    res.send('<h1>Hello Marieke</h1>')
  })

app.get('/willem', (req, res) => {
    res.send('<h1>Hello Willem</h1>')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use('/static', express.static('public'));

