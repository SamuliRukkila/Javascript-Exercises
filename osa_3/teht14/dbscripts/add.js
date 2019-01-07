'use scrict';

// Sisältää kyselyt MySQL-tietokantaan
const Dbmethods = require('../Dbmethods');
// Yhteyden lopetus sekä virheenkäsittely
const helper = require('../helper');


// Kutsutaan olion funktiota, joka lisää uuden opiskelijan.
Dbmethods.add('a1234', 'Ossi Opiskelija', 'a1234@jamk.fi', 105,
  (err, res) => {
    if (err) helper.handle(err);
    console.log(res.affectedRows + ' record(s) inserted.');
    helper.exit();
});
