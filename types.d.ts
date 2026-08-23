export interface Env {
  DB: D1Database;
  /** Opcional: token para proteger endpoints administrativos, definido via `wrangler secret put ADMIN_TOKEN` */
  ADMIN_TOKEN?: string;
}
