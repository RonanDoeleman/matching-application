const express = require('express')
const router = express.Router()
const { Match }  = require('./matchSchema')

// Alle potentiele matches worden in de variable getUsers gezet. Het eerste element uit deze array,
// wat het profiel is van de gebruiker, wordt eruit gehaald met shift en in de variabele profile gezet.
// getUsers filter zorgt ervoor dat alle id's in de array van de variabele matches wordt gezet.

router.get('/', async (req, res) => {
    try {
      const getUsers= await Match.find();
      const profile = getUsers.shift()
      // Check in alle users of hun id overeenkomt met de gebruikers matches id's, 
      // zo ja haal dan hun volledige data op en voeg toe aan matches
      const matches = getUsers.filter(user => profile.matches.find(id => id === user.id))
  
      res.render('profile', {profile, matches})
    } catch (error) {
      console.error(error)
    }
});
  
// Met een button wordt in de database van id 7 de bijbehorende match verwijderd uit de array
  
router.post('/removeFromMatches', async (req, res) => {
    const removeMatchButton = req.body.removeMatchButton
    try { 
      await Match.findOneAndUpdate({id: 7}, {$pull:{matches: Number(removeMatchButton)}})
      console.log(removeMatchButton)
  
    } catch (error) {
      console.error(error)
    }
    res.redirect('/profile')
});

module.exports =  router;
