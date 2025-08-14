## Level UP – Frontend (Web)

Repositório para armazenar os projetos de conclusão do curso Front-end (Web) da Level UP.

### Cursos

- **Clean Code — React and Node**: [clean-code](./clean-code/)
- **React Accessibility (a11y)**: [react-a11y](./react-a11y/)
- **React Frontend Testing (TDD, Vitest, Cypress)**: [react-testing](./react-testing/)

Cada pasta contém:
- `README.md` com a descrição do curso, espaço para listar os projetos e os respectivos links.
- `REPORT.md` com um relatório detalhado sobre o projeto.

### Como executar os projetos

- **Requisitos**: Node.js 18+ e npm ou yarn instalados.

1) **Instalação de dependências**

- Na raiz (para o CLI):

```bash
npm install
```

- Em cada subprojeto (dentro da pasta do projeto):

```bash
# Exemplo com npm
cd clean-code && npm install
cd react-a11y && npm install

# Ou com yarn
cd clean-code && yarn
cd react-a11y && yarn
```

2) **Comandos principais a partir da raiz (seleção interativa ou via flag)**

- Interativo:

```bash
npm run dev
```

- Não interativo (use `--project=` para escolher o projeto):

```bash
# Desenvolvimento
npm run dev -- --project=clean-code

# Build de produção
npm run build -- --project=clean-code

# Lint
npm run lint -- --project=clean-code

# Testes 
npm run test -- --project=react-a11y
```

