const { Pool } = require('pg');

const pool = new Pool({
  user: 'jimmy',
  password: 'jimmy',
  host: 'localhost',
  database: 'bootcampx'
});
const args = process.argv;

if (args.length != 3) {
  return console.log('Usage: node teachers.js cohort_name');
}

pool.query(`
SELECT DISTINCT teachers.name AS teacher, cohorts.name AS cohort
FROM assistance_requests
  JOIN teachers ON teacher_id=teachers.id
  JOIN students ON student_id=students.id
  JOIN cohorts ON cohort_id=cohorts.id
WHERE cohorts.name='${args[2]}'
ORDER BY teachers.name;
`)
  .then(res => {
    res.rows.forEach(row => {
      console.log(`${row.cohort}: ${row.teacher}`);
    });
  })
  .catch(err => console.error('query error', err.stack));