/* Userin model.
   salasanan kryptaus on modelin metodeissa
*/
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema({

    local: {
        email: String,
        password: String,
    }
    //mahdollisia muita autentikaatiostrategioita
    /*,
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    }*/

});

/* Kun modeliin tehdään metodeja, pitää käyttää methods -viittausta
   Sitä ei kuitenkaan käytetä kun metodia kutsutaan
*/

/**
 * Kryptaa salasanan.
 * @param {string} password - Käyttäjän antama salasana.
 * @return {string} - Kryptattu salasana.
 */
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

/**
 * Vertaa käyttäjän antamaa salasanaa kryptattuun salasanaan.
 * @param {string} password - Käyttäjän antama salasana.
 * @return {boolean} - true jos vertailtavat samat.
 */
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
