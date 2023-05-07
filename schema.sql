DROP TABLE IF EXISTS newMovie;


CREATE TABLE IF NOT EXISTS newMovie (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    release_data VARCHAR(255),
    overview VARCHAR(255)
);