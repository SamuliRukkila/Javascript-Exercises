// Kirjastot JSON-tokenille sekä config-tiedostolle
const jwt = require('jsonwebtoken');
const config = require('./config');

// Functio joka tarkastaa tokenin
verifyToken = (req, res, next) => {
  // Otetaan HEADER-osiosta token
  const token = req.body.token || req.headers['x-access-token'];
  // Jos token tyhjä palautetaan virhe
  if (!token) return res.status(403).send({
    auth: false, message: 'No token provided.'
  });

  // Tokenin tarkastus
  jwt.verify(token, config.secret, (err, decoded) => {
    // Jos tulee virhe tarkastusvaiheessa
    if (err) return res.status(500).send({
      auth: false, message: 'Failed to authenticate token.'
    });

    // Jos onnistuu, laitetaan käyttäjä ID:seen dekoodattu
    req.userId = decoded.id;
    // Mahdollistaa, että seuraava autentikaatio-prosessi jatkuu tämän jälkeen
    next();
  })
}

// Luodaan funktiosta moduuli joka exportataan
module.exports = verifyToken;
