'use scrict';

// Moduulit tietokantakyselyihin sekä virheenkäsittelyyn.
const Dbmethods = require('../Dbmethods');
// Yhteyden lopetus sekä virheenkäsittely
const helper = require('../helper');


// Päivittää tietyn opiskelijan opintopistemäärää.
Dbmethods.update('A1234', 50, (err, res) => {
  if (err) helper.handle(err);
  console.log('Updated student\'s study points.');
  helper.exit();
});
