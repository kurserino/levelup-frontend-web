## Level UP – Frontend (Web)

Repositório para armazenar os projetos de conclusão do curso Front-end (Web) da Level UP.

### Cursos

- **Clean Code — React and Node**: [clean-code](./clean-code/)
- **React Accessibility (a11y)**: [react-a11y](./react-a11y/)
- **React Frontend Testing (TDD, Vitest, Cypress)**: [react-testing](./react-testing/)

Cada projeto contém:
- `README.md` com instruções.
- `REPORT.md` com relatório detalhado.

### Como executar os projetos

- **Requisitos**: Node.js 18+ e npm ou yarn instalados.

1) **Instalação de dependências**

- Na raiz (para o CLI):

```bash
yarn
```

- Em cada subprojeto (na pasta correspondente):
 
 
```bash
# Exemplo com yarn
cd clean-code && yarn
cd react-a11y && yarn
cd react-testing && yarn

# Ou com yarn
cd clean-code && yarn
cd react-a11y && yarn
cd react-testing && yarn
```

2) **Comandos principais a partir da raiz (seleção interativa ou via flag)**

- Interativo:

```bash
yarn run dev
```

- Não interativo (use `--project=` para escolher o projeto):

```bash
# Desenvolvimento
yarn run dev -- --project=clean-code

# Build de produção
yarn run build -- --project=clean-code

# Lint
yarn run lint -- --project=clean-code

# Testes 
yarn run test -- --project=react-a11y
```

