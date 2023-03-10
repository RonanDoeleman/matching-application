const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    const matches = [
        {   id: 1,
            image: './images/marieke.jpg',
            name: 'Marieke',
            location: 'Hoofddorp',
            age: '22',
            genres: 'Techno' + ' & ' + 'Tech-House',
            favfestivals: 'Rotterdam Rave' + ', ' + 'Soenda',
            bio: 'Exploring the world'
        },
        {   id: 2,
            image: './images/amber.jpg',
            name: 'Amber',
            location: 'Lisse',
            age: '20',
            genres: 'Hip-Hop' + ' & ' + 'R&B',
            favfestivals: 'Woo Hah' + ', ' + 'Vunzige Deuntjes',
            bio: 'Live, Laugh, Love'
        },
        {   id: 3,
            image: './images/lisa.jpg',
            name: 'Lisa',
            location: 'Amsterdam',
            age: '23',
            genres: 'Hardcore' + ' & ' + 'Industrial',
            favfestivals: 'PRSPCT Festival' + ', ' + 'Smeerboel',
            bio: 'Lets dance till dawn'
        },
        {   id: 4,
            image: './images/charissa.jpg',
            name: 'Charissa',
            location: 'Alkmaar',
            age: '24',
            genres: 'Techno' + ' & ' + 'Urban',
            favfestivals: 'Verknipt' + ', ' + 'Appelsap',
            bio: 'Carpe Diem' 
        },
        {   id: 5,
            image: './images/alisa.jpg',
            name: 'Alisa',
            location: 'Utrecht',
            age: '27',
            genres: 'Klassiek' + ' & ' + 'Modern',
            favfestivals: 'Bach in Symphony XII' + ', ' + 'Candle Lights',
            bio: 'Lets enjoy music together!' 
        }
        
      ];
    
      res.render('matches', {name: 'Find Match', matches})
});
  
router.get('/new', (req, res) => {
    res.send('Match New Form')
})

router.post('/', (req, res) => {
    res.send('Create Match')
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


const matches = [
    {   id: 1,
        image: './images/marieke.jpg',
        name: 'Marieke',
        location: 'Hoofddorp',
        age: '22',
        genres: 'Techno' + ' & ' + 'Tech-House',
        favfestivals: 'Rotterdam Rave' + ', ' + 'Soenda',
        bio: 'Exploring the world'
    },
    {   id: 2,
        image: './images/amber.jpg',
        name: 'Amber',
        location: 'Lisse',
        age: '20',
        genres: 'Hip-Hop' + ' & ' + 'R&B',
        favfestivals: 'Woo Hah' + ', ' + 'Vunzige Deuntjes',
        bio: 'Live, Laugh, Love'
    },
    {   id: 3,
        image: './images/lisa.jpg',
        name: 'Lisa',
        location: 'Amsterdam',
        age: '23',
        genres: 'Hardcore' + ' & ' + 'Industrial',
        favfestivals: 'PRSPCT Festival' + ', ' + 'Smeerboel',
        bio: 'Lets dance till dawn'
    },
    {   id: 4,
        image: './images/charissa.jpg',
        name: 'Charissa',
        location: 'Alkmaar',
        age: '24',
        genres: 'Techno' + ' & ' + 'Urban',
        favfestivals: 'Verknipt' + ', ' + 'Appelsap',
        bio: 'Carpe Diem' 
    },
    {   id: 5,
        image: './images/alisa.jpg',
        name: 'Alisa',
        location: 'Utrecht',
        age: '27',
        genres: 'Klassiek' + ' & ' + 'Modern',
        favfestivals: 'Bach in Symphony XII' + ', ' + 'Candle Lights',
        bio: 'Lets enjoy music together!' 
    }
];

router.param('id', (req, res, next, id) => {
    req.match = matches[id]
    next()
})


module.exports = router