# Clean Code Report

## Objetivo
Refatorar o app de notas para melhorar legibilidade, consistência de nomenclatura, validação de dados, mensagens HTTP, e simplificar lógica sem alterar o comportamento esperado.

## Resumo das alterações
- Padronização de nomes de variáveis e funções para maior clareza.
- Uso de early return e remoção de ramos redundantes.
- Validação e normalização de entradas de usuário (trim), com códigos/mensagens HTTP adequados.
- Simplificação do fluxo de estado na página principal e nos hooks.
- Ajustes no adapter de `localStorage` com nomes claros e lógica enxuta.

## Detalhamento por arquivo

### `src/app/api/items/route.ts`
- GET: substituição de lógica condicional por retorno direto de `getAllItems()`. (Referências: KISS e simplicidade (1.2), Regras em condicionais / early return (2.5), Legibilidade)
- POST: tipagem do body (`{ text?: string }`), normalização do texto via service e resposta 400 com mensagem clara quando inválido. (Referências: Regras em condicionais / early return (2.5), Parâmetros e desestruturação (2.6), Código em inglês nas mensagens (2.4))
- DELETE: validação de `id` com early return 400 e resposta 204 quando bem sucedido. (Referências: Regras em condicionais / early return (2.5), Código em inglês (2.4))

### `src/app/layout.tsx`
- Remoção de `suppressHydrationWarning` desnecessário no `<html>` e `<body>` para reduzir ruído; preservado `ThemeProvider`. (Referências: KISS e simplicidade (1.2), Legibilidade)

### `src/app/page.tsx`
- Renomeação: `Itm` → `Item`, `a` → `items`, `b` → `isLoading`, `n` → `total`. (Referências: Nomenclatura de variáveis (2.1), Código em inglês (2.4))
- Simplificação do `useEffect`: leitura, checagem com `Array.isArray` e controle de loading com `try/finally`. (Referências: KISS e simplicidade (1.2), Regras em condicionais (2.5), Booleanos nomeados claramente (2.2))
- Extração de handlers semânticos: `handleCreate`, `handleRemove` com atualizações imutáveis do estado. (Referências: Funções e eventos no React – padrão `handle*`/`on*` (3.3), Causa vs Efeito (2.3))
- UI: contador usa `total`; spinner condicionado por `isLoading`. (Referências: Booleanos (2.2), Condicionais no render (3.5))

### `src/components/ItemInput/ItemInput.tsx`
- Integração com hook refatorado: `value`, `setValue`, `handleCreate` em vez de `v`, `setV`, `upd`. (Referências: Nomenclatura (2.1), Funções e eventos no React (3.3), Desacoplamento via hook (3.1))

### `src/components/ItemInput/useItemInput.ts`
- API clara: `onCreate` tipado, estado `value` e `handleCreate` com `trim` e early return para strings vazias. (Referências: Regras em condicionais / early return (2.5), Nomenclatura (2.1), Desacoplamento de lógica em hooks (3.1))

### `src/components/ItemsList/ItemsList.tsx`
- Nomes descritivos e remoção de condicionais aninhadas; renderiza "No notes found" quando lista vazia. (Referências: Nomenclatura (2.1), Regras em condicionais (2.5), Condicionais no render (3.5))
- Uso de `remove` do hook, iteração com nomes explícitos (`item`). (Referências: Funções e eventos no React (3.3), Legibilidade)

### `src/components/ItemsList/useItemsList.ts`
- API clara: `onRemove` e função `remove` com `trim` e early return. (Referências: Regras em condicionais / early return (2.5), Desacoplamento via hook (3.1))

### `src/services/itemsService.ts`
- `generateId`: uso de `crypto.randomUUID()` quando disponível; fallback com `Date.now()`. (Referências: Evitar Syntactic Sugars (2.9), Números mágicos e coerções implícitas evitadas (2.7))
- `getAllItems`: retorno direto. (Referências: KISS e simplicidade (1.2))
- `addNewItem`: normalização (`trim`) e retorno `null` quando vazio; objeto `item` nomeado e consistente. (Referências: Regras em condicionais / early return (2.5), Nomenclatura (2.1), DDD – separação domínio vs infraestrutura (4.4–4.6))

### `src/services/storage/localStorageAdapter.ts`
- Constante `STORAGE_KEY` nomeada; variáveis semânticas (`serialized`, `parsed`, `current`, `next`). (Referências: Nomenclatura (2.1))
- Lógica de parse e persistência simplificadas; remoção de verificações redundantes. (Referências: KISS e simplicidade (1.2), Regras em condicionais (2.5))
