CREATE TABLE refresh_tokens(
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     account_id UUID NOT NULL REFERENCES accounts(id),
     token_hash VARCHAR(300) NOT NULL UNIQUE,
     revoked BOOLEAN NOT NULL DEFAULT false,
     expiresAt TIMESTAMP NOT NULL ,
     createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);