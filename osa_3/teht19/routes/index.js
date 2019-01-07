const express = require('express');
const passport = require('passport');
const router = express.Router();

// Tokenin teko sekä kryptays
const config = require('../auth/config');
const jwt = require('jsonwebtoken');

// etusivu
router.get('/', function(req, res) {
    res.render('index.ejs');
});

// profiilisivu suojattu isLoggedIn -funktiolla joka on
// siis tämän saman reitin callback mutta erillisenä ei-anonyyminä funktiona filun lopussa
router.get('/profile', isLoggedIn, function(req, res) {
    console.log(req.isAuthenticated()); // Passportin metodi joka tuottaa true jos Google auth onnistui

    sess = req.session; //laitetaan sessio-olio muuttujaan sess

    // Validoinnin jälkeen luodan käyttäjälle token.
    const token = jwt.sign({}, config.secret, { expiresIn: 86400 });

    res.render('profile.ejs', {
        user: req.user, // user requestista templaattiin
        sessid: sess.id, // viedään session id templaattiin
        token: token
    });
});

/*
Googlen autentikaatioreitti
scope kuvaa Googlelta saatavaa dataa
profiilitiedot, ja email
*/
router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

// callback -osoite jonne ohjataan Google-autentikaation jälkeen
// tässä tapauksessa mennään suoraan profile-sivulle jossa näytetään profiilitiedot
router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }));


//logout
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


// middleware jota käytetään autentikoitavissa reiteissä ( tässä vain /profile)
function isLoggedIn(req, res, next) {
    console.log(req.isAuthenticated()); // tuottaa true jos Google auth onnistui
    // jos käyttäjä autentikoitunut, mennään eteenpäin
    if (req.isAuthenticated())
        return next();
    // muuten mennään etusivulle
    res.redirect('/');
}

module.exports = router;
