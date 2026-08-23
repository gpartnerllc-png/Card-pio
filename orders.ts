import type { Env } from "../types";

interface OrderItemPayload {
  name: string;
  quantity: number;
  unitPrice: number;
  custom?: Record<string, unknown>;
}

interface OrderPayload {
  items: OrderItemPayload[];
  subtotal: number;
  serviceCharge: number;
  total: number;
}

function isValidPayload(body: unknown): body is OrderPayload {
  if (!body || typeof body !== "object") return false;
  const p = body as Partial<OrderPayload>;
  return (
    Array.isArray(p.items) &&
    p.items.length > 0 &&
    p.items.every(
      (i) =>
        i &&
        typeof i.name === "string" &&
        i.name.trim().length > 0 &&
        typeof i.quantity === "number" &&
        i.quantity > 0 &&
        typeof i.unitPrice === "number" &&
        i.unitPrice >= 0,
    ) &&
    typeof p.subtotal === "number" &&
    typeof p.serviceCharge === "number" &&
    typeof p.total === "number"
  );
}

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

function generateOrderId(): string {
  const suffix = Date.now().toString().slice(-7);
  return `LAG-${suffix}`;
}

/** POST /api/orders — cria um novo pedido */
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Corpo da requisição inválido." }, 400);
  }

  if (!isValidPayload(body)) {
    return jsonResponse({ error: "Dados do pedido incompletos ou inválidos." }, 422);
  }

  const orderId = generateOrderId();

  try {
    await env.DB.prepare(
      `INSERT INTO orders (order_id, items_json, subtotal, service_charge, total, created_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6)`,
    )
      .bind(
        orderId,
        JSON.stringify(body.items),
        body.subtotal,
        body.serviceCharge,
        body.total,
        new Date().toISOString(),
      )
      .run();
  } catch (err) {
    console.error("Falha ao salvar pedido no D1:", err);
    return jsonResponse({ error: "Não foi possível salvar o pedido." }, 500);
  }

  return jsonResponse({ orderId }, 201);
};

/** GET /api/orders — lista os pedidos mais recentes (uso interno da cozinha/recepção) */
export const onRequestGet: PagesFunction<Env> = async ({ request, env }) => {
  if (env.ADMIN_TOKEN) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${env.ADMIN_TOKEN}`) {
      return jsonResponse({ error: "Não autorizado." }, 401);
    }
  }

  const { results } = await env.DB.prepare(
    `SELECT order_id, items_json, subtotal, service_charge, total, created_at
     FROM orders ORDER BY created_at DESC LIMIT 50`,
  ).all();

  return jsonResponse({ orders: results });
};
