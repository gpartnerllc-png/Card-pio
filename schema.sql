-- Schema do banco Cloudflare D1 para o cardápio Laguna Plaza
-- Execute com: npm run db:init (local) ou npm run db:init:remote (produção)

CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id TEXT NOT NULL UNIQUE,
  items_json TEXT NOT NULL,
  subtotal REAL NOT NULL,
  service_charge REAL NOT NULL,
  total REAL NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders (created_at);
