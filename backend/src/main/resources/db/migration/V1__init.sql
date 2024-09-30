CREATE TABLE IF NOT EXISTS course
(
    id SERIAL NOT NULL PRIMARY KEY,
    subject TEXT,
    course_number VARCHAR(3),
    description TEXT,
    UNIQUE(subject, course_number)
);
