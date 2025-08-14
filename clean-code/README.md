## Projeto: Clean Code — React e Node

Este repositório contém um projeto base para servir como material de prática do curso "Clean Code – React e Node".

- Stack: Next.js (App Router) + TypeScript + Radix UI + CSS Modules
- Estrutura: `src/app` (Next.js), componentes separados, cada componente com seu próprio hook controlador (lógica de UI)
- API: rotas no Next para listar/adicionar/remover itens
- Services: camada de serviços com adaptadores para armazenamento (inicialmente `localStorage`), pensada para troca futura

Como rodar:

1. `cd clean-code`
2. `yarn` ou `npm i`
3. `yarn dev` ou `npm run dev`

Endpoints principais:

- `GET /api/items` – lista itens
- `POST /api/items` – cria item `{ text: string }`
- `DELETE /api/items?id=...` – remove item por id

