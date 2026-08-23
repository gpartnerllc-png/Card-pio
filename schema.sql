-- 1. Cria a tabela de categorias
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

-- 2. Cria a tabela de produtos
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  category_id TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price REAL NOT NULL,
  image_url TEXT,
  is_available BOOLEAN DEFAULT 1,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- 3. Insere algumas categorias de exemplo (Opcional)
INSERT INTO categories (id, name, sort_order) VALUES 
('pratos', 'Pratos Principais', 1),
('bebidas', 'Bebidas Geladas', 2);

-- 4. Insere alguns produtos de exemplo (Opcional)
INSERT INTO products (id, category_id, name, description, price) VALUES 
('p1', 'pratos', 'Filé à Parmegiana', 'Acompanha arroz e fritas.', 65.90),
('b1', 'bebidas', 'Suco de Laranja', 'Copo 400ml natural.', 12.00);
