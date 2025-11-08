
CREATE TABLE workspaces(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID NOT NULL REFERENCES accounts(id),
    name VARCHAR(300) NOT NULL,
    slug VARCHAR(300) UNIQUE ,
    description TEXT,
    subscriptionTier VARCHAR(50) DEFAULT 'free',
    status VARCHAR(50) NOT NULL DEFAULT 'active',
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP




    


);