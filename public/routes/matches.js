const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
    _id: String,
    id: Number,
    image: String,
    name: String,
    location: String,
    age: String,
    genres: [String],
    favfestivals: [String],
    bio: String,
    matches: [{id:String, hasLiked:Boolean}]
  });
  
const Matches =  mongoose.model('Matches', matchSchema, "MatchesData");


router.get('/', async (req, res) => {
    try {
        const potentialMatches = await Matches.find();
        res.render('matches', {name: 'Find Match', potentialMatches})
      } catch (error) {
        throw new Error(error)
      }
});
  
router.get('/new', (req, res) => {
    res.send('Match New Form')
})
 
router.post('/', (req, res) => {
    res.send('Create Match')
})

router.post('/match', async (req, res, next) => {
    const matchButton = req.body.matchButton
    console.log(matchButton)
    res.redirect('/matches')
  })

router
    .route('/:id')
    .get((req, res) => {
        console.log(req.match)
        res.send(`Get user with ID ${req.params.id}`)
    })
    .put((req, res) => {
        res.send(`Update user with ID ${req.params.id}`)
    })
    .delete((req, res) => {
        res.send(`Delete user with ID ${req.params.id}`)
});


module.exports =  router
