// Kontrolleri, joka sisältää db-operaattoreita. Router käyttää näitä
// hyväkseen.

// Student-modelia käytetään hyväkseen, kun siirretään uutta dataa tietokantaan.
const Student = require('../models/Student.js');


// Olio mikä sisältää kaikki tarvittavat queryt MongoDB-tietokantaan
const StudentController = {


  /*
    HAKEE KAIKKI OPISKELIJAT
  */
  findStudents: (req, res) => {
    Student.find().then(students => {
      // Jos opiskelijoita ei löydy
      if (!students) {
        return res.status(404).send('No students were found.');
      }
      // Lähetä opiskelijat
      res.send(students);
    // Virheenkäsittely
    }).catch(err => {
        res.status(500).send(
          err.message || 'Error while retrieving all students.'
      );
    });
  },



  /*
    1 OPISKELIJAN HAKU ID:N AVULLA
  */
  findStudent: (req, res) => {
    Student.findById(req.params.id).then(student => {
      // Jos opiskelijaa ei löydy ID:n perusteella
      if (!student) {
        return res.status(404).send(
          'Student not found with ID: ' + req.params.id
        );
      }
      // Lähetä opiskelijat
      res.send(student);
    // Virheenkäsittely
    }).catch(err => {
      // Opiskelijaa ei löytynyt
      if (err.kind === 'ObjectId') {
        return res.status(404).send(
          'Student not found with ID: ' + req.params.id
        );
      // Virhe opiskelijan haun aikana
      } return res.status(500).send(
          'Error retrieving student with ID: ' + req.params.id
      );
    });
  },



  /*
    OPISKELIJAN LUONTI
  */
  addStudent: (req, res) => {
    // Jos student_code -arvoa ei olla täytetty -> tähän oltaisiin voitu tuoda
    // muita tärkeitä kuten sähköposti tai nimi, mutta ne antavat varoituksen
    // myöhemmin tarvittaessa.
    if (!req.body.student_code) {
      return res.status(400).send({
        message: 'Some of the contents cannot be empty!'
      });
    }

    // Luodaan uusi opiskelija käyttäjien antamista arvoista
    const newStudent = new Student({
      student_code: req.body.student_code,
      name: req.body.name,
      email: req.body.email,
      study_points: req.body.study_points,
      grades: req.body.grades
    });

    // Tallennetaan uusi opiskelija
    newStudent.save().then(student => {
      res.send(student);
    // Virheenkäsittely, esim. virhe tallentaessa tai tietojen puuttuminen
    }).catch(err => {
        res.status(500).send(
          err.message || 'Error occured while creating student.'
      );
    });
  },



  /*
    OPISKELIJAN POISTO
  */
  deleteStudent: (req, res) => {
    Student.findByIdAndRemove(req.params.id).then(student => {
      // Jos opiskelijaa ei löydy ID:n avulla
      if (!student) {
        return res.status(404).send({
          message: 'Student not found with ID: ' + req.params.id
        });
      }
      // Lähetetään tieto onnistuneesta poistosta
      res.send({ message: 'Student deleted successfully!' });
    // Virheenkäsittely
    }).catch(err => {
        // Jos ID:tä ei löydy
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.status(404).send({
            message: 'Student not found with ID: ' + req.params.id
          });
        // Virhe yrittäessä poistaa opiskelijaa
        } return res.status(500).send({
            message: 'Could not delete student with ID: ' + req.params.id
        });
    });
  },


  /*
    OPISKELIJAN PÄIVITTÄMINEN
  */
  updateStudent: (req, res) => {
    // Jos mitään ei tuotu päivityksen yhteydessä
    if (!req.body) {
      return res.status(400).send('Some of the values cannot be empty.');
    }
    // Kaikki kohdat päivitetään -> käyttäjällä valta päättää mitkä
    Student.findByIdAndUpdate(req.params.id, {
      student_code: req.body.student_code,
      name: req.body.name,
      email: req.body.email,
      study_points: req.body.study_points
    }, { new: true }).then(student => {
      // Jos opiskelijaa ei löydy
      if (!student) {
        return res.status(404).send(
          'Student not found with ID: ' + req.params.id
        );
      // Lähetään käyttäjälle uuden opiskelijan tiedot onnistuessa
      } res.send(student);
    // Virheenkäsittely
    }).catch(err => {
      // ID:tä ei löydy
      if (err.kind === 'ObjectId') {
        return res.status(404).send(
          'Student not found with ID: ' + req.params.id
        );
      // Virhe päivittäessä
      } return res.status(500).send(
        'Error updating student with ID: ' + req.params.id
      );
    });
  },


  /*
    OPISKELIJOIDEN HAKU JOILLA OP:T VÄHEMMÄN KUIN HALUTTU
  */
  studentsByStudyPoints: (req, res) => {
    Student.find().where('study_points').lt(req.params.study_points).exec()
      .then(students => {
        // Jos oppilaita ei löydy
        if (students.length < 1) {
          return res.status(404).send(
            'Did not found any students under points: ' + req.params.study_points
          );
        // Lähetetään opiskelijat käyttäjälle
        } res.send(students)
      // Virheenkäsittely
      }).catch(err => {
          res.status(500).send('Error occured while retrieving students.');
    });
  },


  /*
    UUDEN ARVOSANAN (KURSSIN) LISÄÄMINEN OPPILAALLE
  */
  addGrade: (req, res) => {
    // Opiskelija etsitään ID:n perusteella
    Student.findByIdAndUpdate(req.params.id, { $push: { grades: {
      course_code: req.body.course_code,
      grade: req.body.grade
      }}}, { new: true }).then(student => {
        // Jos opiskelijaa ei löydy
        if (!student) {
          return res.status(404).send(
            'Student not found with ID: ' + req.params.id
          );
        // Lähetetään "päivittynyt" opiskelija takaisin
        } res.send(student);
      // Virheenkäsittely
      }).catch(err => {
          // Opiskelijaa ei löydy
          if (err.kind === 'ObjectId') {
            return res.status(404).send(
              'Student not found with ID: ' + req.params.id
            );
          // Virhe tuodessa uutta kurssia
          } return res.status(500).send(
            'Error adding new grade to student with ID: ' + req.params.id
          );
      })
  },


  /*
    OPISKELIJAN KURSSIN ARVOSANAN MUOKKAUS (ID:n MUKAAN)
  */
  updateGrade: (req, res) => {
    Student.findOneAndUpdate({
      // Opiskelijan ja kurssi-taulukon ID
      '_id': req.params.student_id, 'grades._id': req.params.grade_id }, {
        // Muokataan opiskelijan tarkan kurssin arvosanaa
        $set: { 'grades.$.grade': req.body.grade }}, {
          new: true }).then(student => {
            // Jos opiskelijaa ei löydy
            if (!student) return res.status(404).send(
              'Student or Grade ID not found with values: ' +
                req.params.student_id + ' AND ' + req.params.grade_id
            );
            // Tieto käyttäjälle päivityksen onnistumisesta
            res.send('Updated grade!');
          // Virheenkäsittely
          }).catch(err => {
            // Käyttäjää ei löydy
            if (err.kind === 'ObjectId') return res.status(404).send(
              'Student or Grade ID not found with values: ' +
                req.params.student_id + ' AND ' +  req.params.grade_id
            );
            // Yleinen virhe päivittäessä
            return res.status(500).send(
                err.message || `Error updating student\'s grade with ID values:
                  ${req.params.student_id} AND ${req.params.grade_id}`
          );
      });
  }

}

// Exportataan StudentController-olio
module.exports = StudentController;
