const express = require('express')
const router = express.Router()

const { Match }  = require('./matchSchema')

router.get('/', async (req, res) => {
    try {
        const potentialMatches = await Match.find();
        potentialMatches.shift()
        res.render('matches', {name: 'Find Match', potentialMatches})
      } catch (error) {
        console.error(error)
      }
});

router.post('/match', async (req, res) => {
  const matchButton = req.body.matchButton;
  const addMatch = JSON.parse(matchButton);
 
  if(addMatch!== false) {
    try {
       await Match.findOneAndUpdate({id: 6}, {$addToSet:{matches: addMatch}}, {
        new: true
      })

      
    } catch(error) {
      console.error(error)
    }
  
    res.redirect('/matches')
  }
 
})
  
router.delete('/profile', (req, res) => {
    res.send('Match New Form')
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
