CREATE TABLE IF NOT EXISTS athletes (
    id SERIAL NOT NULL PRIMARY KEY,
    strava_id BIGINT NOT NULL,
    username TEXT NOT NULL,
    firstname TEXT NOT NULL,
    lastname TEXT NOT NULL,
    sex TEXT NOT NULL,
    weight FLOAT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    country TEXT NOT NULL,
    strava_created_at timestamp NOT NULL,
    strava_updated_at timestamp NOT NULL,
    created_at timestamp NOT NULL,
    updated_at timestamp NOT NULL
    UNIQUE(username)
);

CREATE TABLE IF NOT EXISTS activities (
    id SERIAL NOT NULL PRIMARY KEY,
    strava_id BIGINT NOT NULL,
    type TEXT NOT NULL,
    athelete_id INT NOT NULL,
    name TEXT NOT NULL,
    distance FLOAT NOT NULL,
    moving_time INT NOT NULL,
    total_elevation_gain FLOAT NOT NULL,
    start_date timestamp NOT NULL,
    start_date_local timestamp NOT NULL,
    timezone TEXT,
    utc_offset INT,
    average_speed FLOAT,
    average_heartrate FLOAT,
    average_watts FLOAT,
    max_speed FLOAT,
    max_heartrate FLOAT,
    max_watts FLOAT
)
