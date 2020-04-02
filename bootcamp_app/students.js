const { Pool } = require('pg');

const pool = new Pool({
  user: 'jimmy',
  password: 'jimmy',
  host: 'localhost',
  database: 'bootcampx'
});
const args = process.argv;

if (args.length != 4) {
  return console.log('Usage: node students.js cohort_name max_results');
}

pool.query(`
SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1::text
LIMIT $2::integer;
`, [`%${args[2]}%`, args[3]])
  .then(res => {
    res.rows.forEach(user => {
      console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
    });
  })
  .catch(err => console.error('query error', err.stack));