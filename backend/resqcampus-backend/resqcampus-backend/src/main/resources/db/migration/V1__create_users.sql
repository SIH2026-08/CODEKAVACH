CREATE TABLE app_users (
                           id UUID PRIMARY KEY,
                           name VARCHAR(100) NOT NULL,
                           email VARCHAR(255) NOT NULL UNIQUE,
                           password VARCHAR(255) NOT NULL,
                           role VARCHAR(20) NOT NULL,
                           created_at TIMESTAMP NOT NULL
);