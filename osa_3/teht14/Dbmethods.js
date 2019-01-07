'use scrict';

// Oliotiedosto, joka tekee tarvittavat SQL-injektiot tietokantaan

// Yhteys-instanssi
const con = require('./dbconnection');

// Olio, mikä sisältää tarvittavat funktiot SQL-kyselyihin
const Dbmethods = {

  // Funktio, joka lisää uuden opiskelijan tietokantaan.
  // Sisältää myös cb-funktion, jolla tuodaan takaisin informaatiota
  // sitä kutsuvalle tiedostolle.
  add: (code, name, email, points, cb) => {
    // Kysely tietokantaan, jossa koitetaan lisätä uusi data
    con.query('INSERT INTO `Students` (`student_code`, `name`, `email`, \
      `study_points`) VALUES (?, ?, ?, ?);', [code, name, email, points], cb);
  },


  // Lisää uuden arvosanan opiskelijalle. Lisää samalla 5 opintopistettä
  // opiskelijan tauluun.
  //
  // Jos joku funktio epäonnistuu lopetetaan funktion suorittaminen ja siirrytään
  // lukemaan konsoliin tullutta virheviestiä.
  addGrade: function (code, course, grade, cb) {

    // MySQL oma funktio, jonka avulla voi suorittaa monta kyselyä.
    con.beginTransaction((err) => {
      // Lisää uuden tietueen Grades -taulukkoon.
      con.query('INSERT INTO `Grades` (`student_code`, `course_code`, `grade`) \
      VALUES (?, ?, ?);', [code, course, grade], (err, result) => {

        if (err) cb (err);

        // Lisätään opiskelijalle 5 opintopistettä staattisesti. Alikysellä
        // haetaan vanhat opintopisteet alikyselyllä, jotka lisätään nykyiseen
        // opiskelijaan.
        con.query('UPDATE `Students` SET study_points = study_points + 5 WHERE \
        `student_code` = ?', code, (err, result) => {
          // Virhe
          if (err) cb (err);
          // Jos kaikki menee tähän asti läpi commitoidaan kaikki kyselyt
          con.commit((err) => {
            // Jos commitissa tulee virhe
            if (err) cb (err);
            // Jos onnistuu
            cb(null, result);
          });
        });
      });
    });
  },


  // Funktio joka poistaa Opiskelija-taulun viittaaman Arvosana-tiedon.
  // Tämä tehdään ennen oppilaan poistoa.
  deleteGrade: (code, cb) => {
    con.query('DELETE FROM `Grades` WHERE `student_code` = ?;', code, cb);
  },


  // Poistaa opiskelijan tietokannasta.
  delete: (code, cb) => {
    // Kysely tietokantaan, jolla koitetaan poistaa tietue.
    con.query('DELETE FROM `Students` WHERE `student_code` = ?;', code, cb);
  },


  // Funktio joka etsii kaikki opiskelijat, joiden opintopistemäärä on alle 100.
  find: cb => {
    con.query('SELECT * FROM `Students` WHERE `study_points` < 100;', cb);
  },


  // Funktio joka etsii KAIKKI opiskelijat
  findAll: cb => {
    con.query('SELECT * FROM `Students`;', cb);
  },


  // Funktio joka päivittää tietyn opiskelijan arvosanaa kurssilta
  updateGrade: (code, value, cb) => {
    con.query('UPDATE `Grades` SET `grade` = ? WHERE `student_code` = ?;',
      [value, code], cb);
  },


  // Funktio joka päivittää tietyn opiskelijan opintopistemäärää.
  update: (code, value, cb) => {
    con.query('UPDATE `Students` SET `study_points` = ? WHERE student_code = ?',
      [value, code], cb);
  }
}


// Exportataan olio-moduuli, jotta SQL-funktioita voidaan käyttää muissa
// tiedostoissa.
module.exports = Dbmethods;
