'use scrict';

// Moduulit tietokantakyselyihin sekä virheenkäsittelyyn.
const Dbmethods = require('../Dbmethods');
// Yhteyden lopetus sekä virheenkäsittely
const helper = require('../helper');


// Päivittää tietyn opiskelijan arvosanaa kurssista.
Dbmethods.updateGrade('a1234', 2, (err, res) => {
  if (err) helper.handle(err);
  console.log('Updated student\'s grade value.');
  helper.exit();
});
