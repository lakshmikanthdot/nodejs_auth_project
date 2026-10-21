CREATE TABLE users(
    id UUID PRIMARY KEY DEFAULT get_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    -- wannted to keep null
    -- when we create a user by using google auth, we don't have a password for that user
    passwords_hash TEXT,
    google_id VARCHAR(255) UNIQUE,
    role VARCHAR(20) NOT NULL DEFAULT 'USER' CHECK (role IN ('USER', 'ADMIN')),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
)