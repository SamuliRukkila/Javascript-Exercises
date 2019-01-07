'use scrict';

// Moduulit tietokantakyselyihin sekä virheenkäsittelyyn.
const Dbmethods = require('../Dbmethods');
// Yhteyden lopetus sekä virheenkäsittely
const helper = require('../helper');


// Poistetaan aluksi käyttäjän arvosana-tietue.
Dbmethods.deleteGrade('a1234', (err, res) => {
  if (err) helper.handle(err);
})

// ..jonka jälkeen poistetaan itse opiskelija tietokannasta.
Dbmethods.delete('a1234', (err, res) => {
  if (err) helper.handle(err);
  console.log(res.affectedRows + ' records deleted.');
  helper.exit();
});
