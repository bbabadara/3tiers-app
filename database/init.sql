CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  description TEXT,
  prix DECIMAL(10, 2) NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

INSERT INTO products (nom, description, prix, stock)
SELECT 'Ordinateur Portable', 'Ordinateur portable haute performance 16Go RAM', 899.99, 10
WHERE NOT EXISTS (SELECT 1 FROM products WHERE nom = 'Ordinateur Portable');

INSERT INTO products (nom, description, prix, stock)
SELECT 'Souris Sans Fil', 'Souris ergonomique sans fil', 29.99, 50
WHERE NOT EXISTS (SELECT 1 FROM products WHERE nom = 'Souris Sans Fil');

INSERT INTO products (nom, description, prix, stock)
SELECT 'Clavier Mécanique', 'Clavier mécanique RGB rétroéclairé', 79.99, 30
WHERE NOT EXISTS (SELECT 1 FROM products WHERE nom = 'Clavier Mécanique');
