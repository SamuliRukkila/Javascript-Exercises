// Kontrolleri joka sisältää kirjautumisen, rekisteröitymisen sekä
// token-session tekemisen.

// Modeeli käyttäjä-skeemasta, jolla tehdään kyselyitä
const User = require('../models/User');

// Salasanan kryptaus
const bcrypt = require('bcryptjs')
// JSON-tokenin teko
const jwt = require('jsonwebtoken');
// Sisältää "salaisen salasanan"
const config = require('../auth/config')

// Olio, jonka sisällä kaikki tietokanta-kyselyt
const UserController = {

  /*
    REKISTERÖITYMINEN
  */
  registerUser: (req, res) => {

    // Käyttäjän antama salasana salataan
    const hashedPwd = bcrypt.hashSync(req.body.password, 8);

    // Tehdään uusi käyttäjä modelista
    User.create({
      username: req.body.username,
      password: hashedPwd,
      isadmin: true
    }, (err, user) => {

      // Jos tulee virhe
      if (err) return res.status(500).send(
        err.message || 'There were problem registering the user.')
      // Jos luonti onnistuu tehdään token -- 24h voimassa
      const token = jwt.sign({ id: user._id }, config.secret, {expiresIn: 86400});
      // Palautetaan autentikaatio oikeana
      res.status(200).send({ auth: true, token: token});
    });
  },


  /*
    HAKEE NYKYISEN KÄYTTÄJÄN
  */
  getUser: (req, res) => {

    // Tehdään token POST-tulevasta datasta
    const token = req.headers['x-access-token'];
    // Jos token on tyhjä
    if (!token) return res.status(401).send({
      auth: false, message: 'Failed to authenticate token.'
    });

    // Tarkastetaan tullut token
    jwt.verify(token, config.secret, (err, decoded) => {
      // Tokenia ei saatu tarkistettua tai vääränlainen token
      if (err) return res.status(500).send({
        auth: false, message: 'Failed to authenticate token.'
      });

      // Jos hakuaikana tulee vielä ongelmia keskeytetään toiminta
      User.findById(req.userId, { password: 0 }, (err, user) => {
        if (err) return res.status(500).send('Problem finding user.');
        if (!user) return res.status(404).send('No user found.');
        // Jos tarkastus toimii
        res.status(200).send(user);
      });
    });
  },


  /*
    KÄYTTÄJÄN SISÄÄNKIRJAUTUMINEN
  */
  loginUser: (req, res) => {

    // Haetaan yksi (1) käyttäjä ktunnuksen mukaan
    User.findOne({ username: req.body.username }, (err, user) => {
      // Verkkovirhe || Käyttäjää ei löytynyt
      if (err) return res.status(500).send('Network error.');
      if (!user) return res.status(404).send('User is not found.');

      // Muuttujaan tieto onko salasana validi
      const pwdIsValid = bcrypt.compareSync(req.body.password, user.password);
      // Jos ei ole
      if (!pwdIsValid) return res.status(401).send({
        auth: false, token: null
      });

      // Tehdään token jos kaikki toimii
      const token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // 24h
      });
      // .. ja lähetetään se.
      res.status(200).send({ auth: true, token: token });
    });
  },


  /*
    KÄYTTÄJÄN ULOSKIRJAUTUMINEN
  */
  logoutUser: (req, res) => {
    res.status(200).send({ auth: false, token: null });
  }
}

// Exportataan koko model, jotta view voi käyttää sitä
module.exports = UserController;
