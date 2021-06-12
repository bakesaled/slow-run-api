CREATE TABLE IF NOT EXISTS users (
    id SERIAL NOT NULL PRIMARY KEY,
    email TEXT NOT NULL,
    favorite_color TEXT NOT NULL,
    UNIQUE(email)
)
