/*Routteritiedosto joka reitittää tietokannasta
  haetun modelin url-osoitteisiin.
Post-reittiin on tehty autentikaatio JWT:llä.

JWT (Json Web Token) on standardi JSON-olio jota käytetään
sovelluksen käyttäjien tunnistukseen eli autentikointiin.
Palvelin luo tokenin joka sisältää esim. tiedon "Käyttäjä on admin" ja
tarjoaa tokenin asiakassovellukselle. Asiakas voi käyttää tokenia ja
todistaa sen avulla olevansa admin. Token on allekirjoitettu palvelimen
avaimella jolloin asiakas voi todistaa että token on oikea.

JWT-olio muodostuu kolmesta osasta: header, payload ja signature.
Signature-osassa on tekijän palvelimelle määrittämä
salainen merkkijono.

Seuraavassa luodaan JWT-token kun käyttäjä antaa oikean tunnuksen ja salasanan
jotka käydään katsomassa tietokannasta. Tässä esimerkissä JWT-tokenia ei tallenneta
mihinkään vaan se pitää poimia Postmanin JSON-muotoisesta tulosteesta

Token voidaan tallentaa selaimen localstorageen josta se voidaan tarjota palvelimelle
kun halutaan päästä  suojattuun reittiin.


*/
var express = require('express');
var Ilmo = require('../models/Ilmo'); //Ilmo -modelin käyttöönotto
var User = require('../models/User'); //User -modelin käyttöönotto
var router = express.Router();
var jwt = require('jsonwebtoken'); // moduli jolla luodaan JWT
//var checkjwt = require('express-jwt'); //express middleware jolla validoidaan JWT
//express-jwt:tä ei olla tarkoituksella käytetty
var config = require('../config'); // tiedosto jossa on JWT -salasana

var secret = config.secret; //JWT-salasana joka liitetään JWT:n signature-osaan

//var auth = checkjwt({secret: config.secret});
//auth laitettaisiin reitteihin toiseksi parametriksi niin
//reitti vaatisi että token jossa on oikea secret-arvo on lähetetty
/*
callbackin parametrit:
req - lähetetään pyyntö eli request jonka mukana voidaan lähettää parametreja
res - haetaan vastaus eli response jonka mukana saadaan pyydettyä dataa
next - käytetään virheen palautukseen ja kontrollin siirtoon seuraavalle reitille
 */


//Osoitteesta http://localhost:3000/ilmot/ haetaan kaikki ilmot
router.get('/', function(req, res, next) {
    //modelissa määritelty callback toteutetaan tässä
    Ilmo.getAllIlmos(function(err, rows) {
        //console.log(rows[0].nimi);
        if (err) {
            res.json(err);
        } else {
            res.json(rows); //data saadaan json-tyyppiseen muuttujaan rows
        }

    });
});
//reititys id:n perusteella
//Osoitteesta http://localhost:3000/ilmot/1 haetaan eka ilmo jne...
router.get('/:id?', function(req, res, next) {
    //modelissa määritellyt parametrit ovat id ja callback
    //req.params.id ottaa id:n urlista jonne käyttäjä sen kirjoittaa tai hakee linkistä
    Ilmo.getIlmoById(req.params.id, function(err, rows) {
        if (err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

/*Tällä reitillä mennäänkin view-sivulle joka on ilmot.ejs
ei enää näytetä saatua dataa json -muodossa vaan renderöidään sivu
jossa data on listattu*/
router.get('/ilmot/list', function(req, res, next) {

    Ilmo.getAllIlmos(function(err, rows) {
        if (err) {
            res.render("error");
        } else {
            //mennään list -viewiin ja viedään indeksissä list muuttuja rows
            res.render('list', {
                list: rows,
                title: 'List'
            });
        }

    });
});

/******************Autentikaatio*************************************/

/*autentikaatioreitti
  Käyttäjä antaa tunnuksen ja salasanan. Käydään katsomassa
  omasta tietokannasta (tai ulkoisesta palvelusta) ovatko ne oikeat.
  Jos ovat oikeat, niin luodaan JWT -token
*/
router.post('/auth', function(req, res) {
    //haetaan user usernamen perusteella
    //req.body.username ottaa usernamen lomakkeelta jonne käyttäjä sen syöttää
    //console.log(req.body.username);
    User.getUserByName(req.body.username, function(err, user) {
        if (err) {
            throw (err);
        }
        //jos ei taulusta löydy useria annetulla tunnuksellla
        console.log(user); //tyhjä taulukko jos ei löydy useria
        if (user.length === 0) {
            res.json({
                success: false,
                message: 'Tunnus on virheellinen'
            });
        } else if (user) {

            // Jos (kannasta haettu passu !== käyttäjän antama passu)
            if (user[0].password !== req.body.password) {
                res.json({
                    success: false,
                    message: 'Salasana on virheellinen'
                });
            } else {
                // Oikea tunnus ja salasana on annettu - luodaan JWT
                //Token muodostuu user-objektista (payload), secret keystä ja optioista (tässä expiresIn)
                //tokeniin ei pitäisi laittaa salasanaa koska se voidaan dekryptata tokenista,
                //Tieto siitä että käyttäjä on admin riittää
                var payload = {
                    'name': user[0].username,
                    'admin': user[0].isadmin
                }; //{'name':'tunnus', 'admin':'true'}

                var token = jwt.sign(payload, secret, {
                    expiresIn: 60 * 60 * 24 // expires in 24 hours
                });

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Alla oleva merkkijono on JWT-token, ota talteen!',
                    token: token
                });
            }
        }
    });
});

/**************router middleware jolla vahvistetaan token******************/
//Tarkoituksella tehty ilman valmista middlewarea joka vähentäisi koodia
//mutta myös abstraktoisi koodin toiminnan.
router.use(function(req, res, next) {
    // haetaan token jos se on annettu esim. Postmanissa
    // laita Postmanissa headeriin Key: x-access-token Value: tokenin merkkijono
    var token = req.body.token || req.headers['x-access-token'];

    // Tokenin purku eli dekoodaus ja tarkistus eli verifiointi
    if (token) {
        // verify -metodilla puretaan token, tarkistetaan secret-arvo ja tokenin voimassaolo
        jwt.verify(token, secret, function(err, decodedtoken) {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token virheellinen tai vanhentunut!'
                });
            } else {
                console.log(decodedtoken);
                if (decodedtoken.admin === 'true') {//tarkistetaan vielä että kirjautunut on admin
                    // jos token oli ok, tallennetaan muuttujaan req.decodedtoken jota voidaan käyttää jatkossa
                    req.decodedtoken = decodedtoken;
                    next(); //siirrytään seuraaviin reitteihin
                }
                //else {} //jos olisi olemassa ei-admin kirjautunut niin tehtäisiin jotain muuta
            }
        });
    } else {
        // jos ei ole tokenia tai se on vanha/väärä, jäädään tähän, eikä siirrytä seuraaviin reitteihin
        return res.status(403).send({
            success: false,
            message: 'Tokenia ei ole!'
        });
    }
});

/*****************Suojattu reitti****************/

//post-reititys juuresta eli datan lähetys kantaan
//osoitteesta http://localhost:3000/ilmot/
router.post('/', function(req, res, next) {
    //modelissa määritellyt parametrit ovat bodyssä lähetettävä data ja callback
    //req.body otetaan lomakkeelta jonne käyttäjä kirjoittaa lähetettävät tiedot
    Ilmo.addIlmo(req.body, function(err, count) {
        if (err) {
            res.json(err);
        } else {
            res.json(req.body); //palauttaa postatun datan json-muodossa
            //voitaisiin myös palauttaa ilmoitus että lähetys onnistui
        }
    });
});

//Tähän voisi tehdä delete ja update -reitit

module.exports = router;
