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
  matches: [Number]
});

const Match =  mongoose.model('Match', matchSchema, "MatchesData");


module.exports ={ 
  Match
}