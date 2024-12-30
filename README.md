# URL Shortener API 

<p>
Uma API para encurtar URLs transforma links longos em versões curtas e fáceis de compartilhar.
</p>

#### Tecnologias Utilizadas:  
- **Node.js**  
- **NestJS**  
- **TypeScript**  
- **PostgreSQL**  
- **Redis**  
- **Prisma ORM**  
- **ZOD** para validação de schema
- Documentação com **Swagger**
- Padronização de commits com **commitlint**, **commitizen** e **husky** para execução de *git hooks*
- **Sentry** (opcional, para monitoramento de erros)


## Setup

<h3>
  Crie o arquivo de variáveis de ambiente .env na raiz com base no .env.example. Todas as variáveis já estão preenchidas para que o sistema funcione no Docker.
</h3>

## Iniciando com Docker

<p>
 Com o Docker, o banco de dados Postgres e o Redis já serão instanciados.  
<p>

```bash
$ docker compose up
```
<h3>
  A API estará acessível através do endereço <a href="#">http://localhost:3000</a>
</h3>

<h3>
  Para visualizar a documentação da API (Swagger) acesse: <a href="http://localhost:3000/docs">http://localhost:3000/docs</a>
</h3>

## Iniciando localmente

<p> 
  Configure as variáveis de ambiente de conexão com o Postgres e o Redis.
</p>


```bash
# Caso não tenha o pnpm, ative usando o comando:
$ corepack enable

# Instale as dependências
$ pnpm i

# Execute as migrations do prisma
$ pnpm run prisma:generate
$ pnpm run prisma:migrate

# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run build
$ pnpm run start:prod
```

## Tests

```bash
# unit tests
$ pnpm run test

```

## Habilitando o Sentry para monitoramento de erros

### Ative através da variável de ambiente `SENTRY_ENABLED` (.env)

`
SENTRY_ENABLED=true
`
### Configure as demais variáveis de acordo com a sua conta no Sentry.

DSN
<a>
  https://docs.sentry.io/platforms/javascript/guides/nestjs/configuration/options/#dsn
</a>

Source map upload config
<a>
  https://docs.sentry.io/platforms/javascript/guides/nestjs/sourcemaps/uploading/
</a>

<br>

```env
SENTRY_DSN=

- slug da organização
SENTRY_ORG=

- slug do projeto
SENTRY_PROJECT=

- API key 
SENTRY_AUTH_TOKEN=
```
<p>

  No Docker, caso a variável `SENTRY_ENABLED=true`, o Source Map da aplicação será enviado automaticamente para o Sentry.

  Caso esteja rodando localmente, execute o comando:
  
</p>

```bash
$ pnpm run sentry:sourcemaps
```
