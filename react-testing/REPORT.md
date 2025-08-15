# Relatório do Projeto: Emoji Explorer (React Testing)

## Objetivo
Criar uma aplicação Next.js com listagem de emojis, navegação por teclado e diálogo de detalhes, com testes unitários (Vitest + Testing Library) e E2E (Cypress). Meta de cobertura: >= 80%.

## Stack
- Next.js 14 (App Router)
- Radix UI (`@radix-ui/react-dialog`)
- CSS Modules
- Vitest + Testing Library + jsdom
- Cypress (E2E) com Testing Library commands

## Estrutura
- `src/app/page.tsx`: Página principal com busca, grid e atalho de teclado.
- `src/components/EmojiList/*`: Hook de estado e `EmojiGrid` (acessível com roles ARIA).
- `src/components/EmojiDialog/EmojiDialog.tsx`: Diálogo com Radix UI.
- `src/data/emojis.ts`: Dataset local para testes determinísticos.
- `src/test/*`: setup e testes unitários.
- `cypress/*`: configuração e testes E2E.

## Funcionalidades
- Busca por nome ou caractere do emoji.
- Navegação por teclado: setas (esquerda/direita/cima/baixo) quando um item do grid (emoji) está focado; Enter (abrir), Esc (fechar).
- Diálogo de detalhes com foco gerenciado pelo Radix UI.

## Testes Unitários (Vitest)
- `EmojiList.test.tsx` cobre:
  - Renderização da página e do grid
  - Filtro por texto
  - Navegação por teclado e abertura do diálogo
  - Fechamento com Escape

Como executar:
```
yarn test
```

Cobertura:
- Configurada em `vitest.config.ts` com provider v8 e reporter `text`, `html`, `lcov`.
- Rodar:
```
yarn coverage
```

Meta: os arquivos críticos estão cobertos (>80%).

## Testes E2E (Cypress)
- `emoji.cy.ts`: fluxo do usuário
  - Acessa a página
  - Busca por "cora"
  - Usa setas (com um emoji focado) e Enter para abrir o diálogo

Como executar (com o app rodando em `3000`):
```
yarn dev
# em outro terminal
yarn e2e
```
Ou abra a UI:
```
yarn e2e:open
```


