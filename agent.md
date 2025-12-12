Este documento orienta qualquer modelo de IA que venha a trabalhar no repositório, descrevendo como a base atual está estruturada e quais padrões devem ser mantidos.

## Visão geral do stack

- **Framework:** [NestJS 11](https://docs.nestjs.com/) com TypeScript.
- **ORM:** Prisma (PostgreSQL), com `PrismaService` exposto pelo `InfraModule`.
- **Autenticação:** Passport com estratégias Local e JWT. Os JWTs são gerados pelo `AuthService` e validados via `JwtStrategy`; o `JwtAuthGuard` é aplicado globalmente (`APP_GUARD` no `AppModule`). Sessões são rastreadas por `sessionId` gravado no banco.
- **Validação/transformação:** `class-validator` e `class-transformer` em DTOs.
- **Criptografia:** `bcrypt` para hash de senha.
- **Armazenamento de objetos:** AWS S3 via `AwsService` (presigned URLs com SDK v3).
- **Ferramentas de qualidade:** ESLint (config em `eslint.config.mjs`) e Prettier.
- **Configuração:** `ConfigModule.forRoot()` lê variáveis de ambiente. O mapeamento de paths em `tsconfig.json` inclui `@infra/*`, `@auth/*`, `@user/*`, `@channel/*`.

## Estrutura de pastas

- `src/main.ts`: bootstrap Nest padrão.
- `src/app.module.ts`: agrega módulos de domínio e aplica `JwtAuthGuard` global.
- `src/infra/Prisma`: provider único `PrismaService` para acesso ao banco.
- `src/modules/<domínio>/`: módulos organizados por domínio, cada um contendo:
  - `controllers/`: pontos de entrada HTTP.
  - `services/`: lógica de negócio.
  - `repositories/`: acesso a dados (Prisma) e conversões entidade/ORM.
  - `entities/`: modelos de domínio com métodos auxiliares (ex.: `User.PrismaToEntity`).
  - `dtos/` e `models/`: contratos de entrada/saída e payloads (ex.: `UserPayload` para JWT).
  - `guards/`, `strategy/`, `decorators/` ou `constants/` quando aplicável.

## Padrões para novas implementações

- Crie novos domínios replicando o formato existente: `module.ts` centralizando providers, `service` para regras, `controller` para rotas, `repository` para Prisma e `entity` para mapeamento ORM↔️domínio.
- Use o `InfraModule` para obter `PrismaService`; não instancie `PrismaClient` diretamente.
- Mantenha o controle de sessão: ao autenticar, gere `sessionId` (`randomUUID`) e grave no banco; valide sessões em guard/estratégia antes de autorizar requisições protegidas.
- Para respostas públicas, converta entidades em DTOs/objetos de API (ver `User.EntityToApi`).
- Utilize os paths configurados em `tsconfig.json` para imports internos e mantenha os checks de ESLint/Prettier.
- Respeite a tipagem forte: interfaces para props e retornos, validação de DTOs em rotas.

## Como rodar

- Instalação: `yarn install`.
- Desenvolvimento: `yarn start:dev`.
- Testes: `yarn test` / `yarn test:e2e` / `yarn test:cov`.
- Build: `yarn build` (gera em `dist/`).

Manter este padrão garante que novos recursos permaneçam consistentes com o desenho atual da aplicação.
