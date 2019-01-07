// Uusi Opiskelija-olio..
const newStudentObject = {
  student_code: 'l5050',
  name: 'Samuli Rukkila',
  email: 'l5050@student.jamk.fi',
  study_points: 50,
  grades: [
    { course_code: 'HTS10600', grade: 5 },
    { course_code: 'HEW19300', grade: 3 }
  ]
}
// ..joka exportataan.
module.exports = newStudentObject;
