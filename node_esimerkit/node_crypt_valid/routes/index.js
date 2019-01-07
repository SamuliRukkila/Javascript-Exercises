/*
Routteritiedosto jossa on mukana tietokannan käsittely Mongoosella.
Erillistä kontrolleria ei siis ole tässä tapauksessa tehty.

Routerissa validoidaan email validator-moduulin avulla ja
kryptataan salasana ja vertaillaan salasanoja User.js -tiedostossa
olevia metodeja käyttämällä.
*/
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const validator = require('validator');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});
/* Signupform */
router.get('/signupform', function(req, res, next) {
    res.render('signupform', {
        message: ''
    });
});
/* Signup-reitti jonne mennään signupform -sivulta */
router.post('/signup', function(req, res, next) {
    // Tarkistetaan validator-lisäosalla emailin oikellisuus
    if (!validator.isEmail(req.body.email)) {
        res.render('signupform', {
            message: 'Sähköpostiosoitteen muoto virheellinen!'
        });
    } else {
        /*Tarkistetaan onko se email jolla
        yritetään rekisteröityä jo olemassa.*/
        User.findOne({
            'local.email': req.body.email
        }, function(err, user) { // palautetaan user jos semmoinen löytyi
            if (err) {
                throw err;
            }
            if (user) {
                res.render('signupform', {
                    message: 'Antamasi sähköpostiosoite on jo käytössä!'
                });
            } else {
                //Jos tunnusta ei ole jo olemassa, luodaan uusi käyttäjä
                var newUser = new User();
                newUser.local.email = req.body.email;
                newUser.local.password = newUser.generateHash(req.body.password);

                newUser.save(function(err) {
                    if (err) {
                        throw err;
                    }
                    res.json(newUser); // näytetään uusi käyttäjä
                });
            } // else loppu
        });
    } // else loppu
});

/* Loginform */
router.get('/loginform', function(req, res, next) {
    res.render('loginform');
});

/* Login-reitti jonne mennään loginform -sivulta*/
router.post('/login', function(req, res, next) {

    User.findOne({
        'local.email': req.body.email
    }, function(err, user) { // palautetaan user jos semmoinen löytyi
        if (err) {
            throw err;
        }
        if (!user) {
            res.send('Käyttäjää ei ole!');
        } else {
            // Tarkistetaan että salasana oikea
            // userilla on käytössä sen modelissa määritelty validPassword -metodi
            if (!user.validPassword(req.body.password)) {
                res.send('Väärä salasana!');
            } else {
                res.send('Kirjautuminen onnistui! Tässä demossa ei muuta tehdäkään kuin todetaan tämä asia!');
            }
        } // else loppu
    });
});

module.exports = router;
