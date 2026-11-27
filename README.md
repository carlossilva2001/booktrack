# BookTrack

BookTrack é um rastreador de leitura feito com HTML, CSS e JavaScript. O projeto
ajuda leitores a manter seus livros organizados e acompanhar o progresso de
leitura em uma interface simples.

## Objetivo

Reunir os livros que uma pessoa quer ler, está lendo ou já concluiu em uma lista
fácil de consultar e atualizar.

## Problema

Livros e o progresso de leitura costumam ficar espalhados em anotações ou serem
esquecidos. O BookTrack oferece um lugar único para cadastrar títulos, autores
e status de leitura.

## Integrantes

Carlos Daniel Teodoro da Silva RA: 2525763
Carlos Eduardo Sert Ferreira RA: 2601354
Renan Gabriel Bueno RA: 2454254
Lucas Nicoletti RA: 2601427

## Funcionalidades

- Cadastrar e listar livros com título, autor e status.
- Alterar o status para **Quero ler**, **Lendo** ou **Concluído**.
- Excluir livros da lista.
- Salvar os dados no `localStorage` do navegador.
- Validar os campos obrigatórios e informar erros ao usuário.

## Tecnologias

- HTML5 para a estrutura da página.
- CSS3 para o layout responsivo.
- JavaScript para a interface e a lógica dos livros.
- Node.js e `node:test` / `node:assert` para build e testes.
- GitHub Actions e GitHub Pages para integração e publicação contínuas.

## Como executar localmente

Instale o Node.js 20 ou superior. Na raiz do projeto, gere a versão publicável:

```bash
npm run build
```

Depois, abra `dist/index.html` no navegador. A interface funciona sem
dependências adicionais; os livros ficam salvos no navegador usado.

## Testes

Execute os testes automatizados com:

```bash
npm test
```

O comando executa `tests/books.test.js` usando `node:test`. Se alguma asserção
falhar, o processo termina com código diferente de zero.

## Pipeline CI/CD

O workflow `.github/workflows/ci-cd.yml` é acionado em `push` e
`pull_request` para a branch `main`.

- **CI (`ci`)** executa `npm run build` e `npm test`.
- **CD (`cd`)** depende do sucesso de `ci`, gera o artefato da pasta `dist/` e
  publica o site no GitHub Pages quando há push para `main`.

Configure o GitHub Pages do repositório para usar GitHub Actions em **Settings >
Pages**. O endereço esperado do projeto é:

[https://carlossilva2001.github.io/Booktrack/](https://carlossilva2001.github.io/booktrack/)

Se o proprietário ou o nome do repositório forem diferentes, ajuste o link.

## Estrutura do projeto

```text
.
├── .github/workflows/ci-cd.yml
├── public/
│   ├── app.js
│   ├── books.js
│   ├── index.html
│   └── styles.css
├── scripts/build.js
├── tests/books.test.js
├── .gitignore
├── package.json
└── README.md
```

## Limitações conhecidas

- `localStorage` é específico do navegador e do dispositivo; não há contas nem
  sincronização entre dispositivos.
- A publicação online depende de o GitHub Pages estar habilitado no repositório.
- A interface precisa de JavaScript habilitado no navegador.
