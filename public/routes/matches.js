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

// let currentIndex = 0;

// // Endpoint to get the next person from the MongoDB database
// router.get('/next-person', async (req, res) => {
//   try {
//     // Get the next person from the database
//     const nextPerson = await Match.findOne({id}).skip(currentIndex).exec();
//     console.log(nextPerson)

//     // If we've reached the end of the collection, reset the index to 0
//     if (!nextPerson) {
//       currentIndex = 0;
//       return res.status(404).send('No more matches found');
//     }

//     // Increment the index so the next time this endpoint is called, it will return the next person in the collection
//     currentIndex++;

//     // Return the next person as a JSON response
//     res.json(nextPerson);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });

let currentIndex = 0

router.post('/next-person', async (req, res) => {

  try {
    const nextPerson = await Match.findOne({ id: currentIndex + 1 });
    if (!nextPerson) {
      currentIndex = 0;
      return res.status(404).send('No more matches found');
    }
    currentIndex++;
    // Redirect to the matches page with the currentIndex as a query parameter
    res.redirect(`/matches?currentIndex=${currentIndex}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
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
