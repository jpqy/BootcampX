SELECT cohorts.name AS cohort, count(*) AS total_submissions
FROM cohorts JOIN students ON cohort_id=cohorts.id
  JOIN assignment_submissions ON student_id=students.id
GROUP BY cohort
ORDER BY count(*) DESC;