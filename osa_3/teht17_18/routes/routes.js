// Reititystiedosto (router), joka tarjoaa REST-APIN.
// Itse operaatiot tietokantaan ovat controllers-hakemistossa.

// Tämä sisältää opiskelijaan sisältäviä pyyntöjä
const studentCon = require('../controllers/StudentController');
// Sisältää rekisteröitymisen sekä kirjautumisen -- muutamia pyyntöjä
// ei voida tehdä ilman kirjautumatta sisään.
const userCon = require('../controllers/UserController');

// Moduuli, jonka avulla autentikoidaan token
const VerifyToken = require('../auth/VerifyToken');

// Tämä exportataan app.js -käytettäväksi
module.exports = app => {

  // Controller (sisältää itse queryt tietokantaan)
  const studentCtrl = require('../controllers/StudentController');

  /*
    Router-haut eri tietokantaoperaattoreihin
  */

  // Hakee kaikki opiskelijat
  app.get('/students', studentCtrl.findStudents);
  // Hakee yhden opiskelijan (ID:n perusteella)
  app.get('/students/:id', studentCtrl.findStudent);
  // Hakee opiskelijat, joilla on alle 100 opintopistettä
  app.get('/lt/:study_points', studentCtrl.studentsByStudyPoints);

  // Rekisteröitymimen
  app.post('/register', userCon.registerUser);
  // Oman session (käyttäjätunnuksien) katsominen => tsekataan samalla onko
  // token voimassa.
  app.get('/me', VerifyToken, userCon.getUser);
  // Kirjautuminen sisään -- session luonti samalla tokenia varten
  app.post('/login', userCon.loginUser);
  // Uloskirjautuminen -- sessio tuhotaan
  app.get('/logout', userCon.logoutUser);

  /*
    Vain jos olet kirjautunut sisään
  */

  // // Poistaa opiskelijan ID:n perusteella
  app.delete('/students/:id', VerifyToken, studentCtrl.deleteStudent);
  // // Lisää uuden opiskelijan
  app.post('/students', VerifyToken, studentCtrl.addStudent);
  // // Muokkaa opiskeljaa
  app.put('/students/:id', VerifyToken, studentCtrl.updateStudent);
  // // Lisää uuden kurssin opiskelijalle ID:n mukaan
  app.put('/addgrade/:id', VerifyToken, studentCtrl.addGrade);
  // // Muokkaa opiskelijan kurssia (molemmat ID:n mukaan)
  app.put('/updategrade/:student_id/:grade_id',
    VerifyToken, studentCtrl.updateGrade);
}
