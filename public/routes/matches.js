const express = require('express')
const router = express.Router()
const { Match }  = require('./matchSchema')

router.get('/', async (req, res) => {

    try {
        const getUsers = await Match.find();
        // Haal de eerste user uit de Array (het gebruikersprofiel)
        const profile =  getUsers.shift();
        // Voeg twee arrays samen
        const seenMatches = profile.matches.concat(profile.dislikes);
         // Check of de user id's niet de id's van de matches en dislikes bevatten (seenMatches)
        const potentialMatches = getUsers.filter(user => !seenMatches.includes(user.id))
    
        res.render('matches', {name: 'Find Match', potentialMatches, profile})

      } catch (error) {
        console.error(error)
      }
});

// Met een button kan de gebruiker matches toevoegen aan zijn/haar profiel.
// Het object wordt in addMatch opgeslagen. Als de "matchButtonLike" niet "undefined" is dan gebruik je
// findOneAndUpdate om het object in de database op te slaan. In dit geval wordt hij dus
// opgeslagen (met $addToSet) in de array 'matches' van id 7 (het gebruikersprofiel). 

router.post('/match', async (req, res) => {
  const matchButtonLike = req.body.matchButtonLike;
  const matchButtonDislike = req.body.matchButtonDislike;
     
    if(matchButtonLike){
      try {
        await Match.findOneAndUpdate({id: 7}, {$addToSet:{matches: Number(matchButtonLike)}}, {
          new: true

        })
      } catch(error) {
          console.error(error)
      }
    } else {
      try {
        await Match.findOneAndUpdate({id: 7}, {$addToSet:{dislikes: Number(matchButtonDislike)}}, {
          new: true
          })
      } catch(error) {
          console.error(error)
      }
    }
    res.redirect('/matches')
});

module.exports =  router
