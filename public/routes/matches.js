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


// Met een button kan de gebruiker matches toevoegen aan zijn/haar profiel.
// Het object wordt in addMatch opgeslagen. Als de JSON niet 'false' is dan gebruik je
// findOneAndUpdate om het object in de database op te slaan. In dit geval wordt hij dus
// opgeslagen (met $addToSet) in de array 'matches' van id 6 (het gebruikersprofiel). 

router.post('/match', async (req, res) => {
  const matchButton = req.body.matchButton;
  const addMatch = JSON.parse(matchButton);
 
  if(addMatch !== false) {
    try {
       await Match.findOneAndUpdate({id: 7}, {$addToSet:{matches: addMatch}}, {
        new: true
      })

    } catch(error) {
      console.error(error)
    }
  
    res.redirect('/matches')
  }
})

  
// router.delete('/profile', (req, res) => {
//     res.send('Match New Form')
// })
 
// router
//     .route('/:id')
//     .get((req, res) => {
//         console.log(req.match)
//         res.send(`Get user with ID ${req.params.id}`)
//     })
//     .put((req, res) => {
//         res.send(`Update user with ID ${req.params.id}`)
//     })
//     .delete((req, res) => {
//         res.send(`Delete user with ID ${req.params.id}`)
// });


module.exports =  router
