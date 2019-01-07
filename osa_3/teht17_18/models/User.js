// Userista tehty Model mongoa varten. Tämän skeeman ja modelin
// avulla pystyt kirjautumaan sisään, rekisteröitymään sekä tekemään
// vain admineille tarkoitettuja toimenpiteitä.

// Tuodaan Mongoose -kirjasto
const mongoose = require('mongoose');
// Estetään Mongoosen Promisen deprecation error
mongoose.Promise = global.Promise;

// Student-taulun skeema
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isadmin: { type: Boolean, required: true }
});

// Skeemasta luodaan model, joka exportataan
module.exports =  mongoose.model('User', UserSchema);
