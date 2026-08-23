# Cardápio Digital · Laguna Plaza Hotel & Restaurante Mandi

Cardápio digital interativo, reconstruído a partir do export do Canva num projeto
moderno, rápido e de código aberto:

- **Vite + React 18 + TypeScript** no front-end
- **Tailwind CSS** para o visual (tema dourado/marinho do hotel)
- **Cloudflare Pages** para hospedagem estática, com deploy contínuo pelo GitHub
- **Cloudflare Pages Functions + D1** como back-end serverless para registrar os pedidos (substitui o "Canva Sheet" original)

## Estrutura do projeto

```
├── src/
│   ├── components/     # Header, Hero, abas de categoria, cartão de item, modal, carrinho, rodapé
│   ├── data/            # menu.ts (dados do cardápio) + types.ts
│   ├── hooks/           # useCart.ts (estado do pedido)
│   ├── lib/              # formatação de moeda
│   └── App.tsx
├── functions/
│   └── api/orders.ts    # Pages Function: POST cria pedido, GET lista pedidos (D1)
├── schema.sql            # schema do banco D1
├── wrangler.toml
└── .github/workflows/deploy.yml
```

## Rodando localmente

Pré-requisitos: [Node.js 20+](https://nodejs.org).

```bash
npm install
npm run dev
```

O app abre em `http://localhost:5173`. As chamadas para `/api/orders` só funcionam
com o Wrangler rodando também (veja abaixo) — sem isso, o app funciona normalmente
para navegar o cardápio e montar o pedido, mas a confirmação final falha.

Para testar a API localmente, em outro terminal:

```bash
npm run build
npx wrangler pages dev dist --d1=DB=laguna_plaza_db
```

## Publicando no GitHub

```bash
git init
git add .
git commit -m "Cardápio digital Laguna Plaza"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/laguna-plaza-cardapio.git
git push -u origin main
```

## Publicando no Cloudflare Pages

### Opção 1 — pelo painel da Cloudflare (mais simples)

1. Acesse **Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git**.
2. Selecione o repositório que você acabou de subir para o GitHub.
3. Configurações de build:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Em **Settings → Functions → D1 database bindings**, crie o binding `DB` apontando
   para o banco criado no passo seguinte.
5. Clique em **Save and Deploy**.

### Opção 2 — pela linha de comando (Wrangler)

```bash
npm install -g wrangler
wrangler login

# 1. Crie o banco D1 e copie o database_id para wrangler.toml
wrangler d1 create laguna_plaza_db

# 2. Crie as tabelas
npm run db:init:remote

# 3. Build e deploy
npm run deploy
```

### Deploy automático via GitHub Actions

O workflow em `.github/workflows/deploy.yml` já builda e publica a cada push na
`main`. Basta cadastrar dois segredos no repositório (**Settings → Secrets and
variables → Actions**):

| Segredo                  | Onde encontrar                                                         |
| ------------------------- | ------------------------------------------------------------------------ |
| `CLOUDFLARE_API_TOKEN`   | Cloudflare Dashboard → My Profile → API Tokens → "Edit Cloudflare Workers" |
| `CLOUDFLARE_ACCOUNT_ID`  | Cloudflare Dashboard → barra lateral direita, em qualquer domínio        |

## Banco de dados (pedidos)

Os pedidos confirmados no cardápio são gravados na tabela `orders` (ver
`schema.sql`), com o JSON dos itens, subtotal, taxa de serviço e total. Para
consultar os últimos pedidos (uso interno da recepção/cozinha):

```bash
curl -H "Authorization: Bearer SEU_ADMIN_TOKEN" https://SEU-SITE.pages.dev/api/orders
```

Defina o token com:

```bash
wrangler pages secret put ADMIN_TOKEN --project-name=laguna-plaza-cardapio
```

Se `ADMIN_TOKEN` não for definido, o endpoint `GET /api/orders` fica aberto — defina
o segredo antes de ir para produção.

## Atualizando o cardápio

Todos os itens, preços, categorias, guarnições e molhos ficam em
`src/data/menu.ts`, tipados e organizados por categoria — não é preciso tocar em
nenhum componente para adicionar, remover ou reprecificar um prato.

## Acessibilidade e qualidade

- Contraste alto sobre fundo escuro, foco visível em todos os controles interativos
- Modal de personalização fecha com `Esc` e tem `aria-modal`
- Respeita `prefers-reduced-motion`
- Totalmente responsivo, do celular ao desktop grande
- Sem dependências de `localStorage`/domínio do Canva — o carrinho usa
  `sessionStorage` do próprio navegador do cliente
