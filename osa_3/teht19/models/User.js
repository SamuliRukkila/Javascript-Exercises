// Mongoose-kirjasto
const mongoose = require('mongoose');

// Tehdään User-skeema
const userSchema = mongoose.Schema({

  google: {
    id: String,
    // Googlen access-token -> valtuuttaa pääsyn suojattuihin reitteihin
    token: String,
    email: String,
    name: String
  }
});

// Exportataan valmis model
module.exports = mongoose.model('User', userSchema);
