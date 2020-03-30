SELECT students.name AS student, count(*) AS total_submissions
FROM assignment_submissions
  JOIN students ON students.id = student_id
WHERE end_date IS NULL
GROUP BY students.name
HAVING count(*) < 100;

-- The HAVING clause is evaluated before the SELECT so we can't use the alias total_submissions alias that is created in the SELECT.