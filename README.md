## Requirements

- Java 25
- Node.js 20+
- PostgreSQL running locally with `postgres` / empty password (database `postgres`)

> The `test_nekit` schema is created automatically when the backend starts (`schema.sql`).

## Backend (at the root)

```bash
./gradlew bootRun      # mac/linux
gradlew.bat bootRun    # windows
```

- API: http://localhost:8080
- Swagger UI: http://localhost:8080/swagger-ui.html

## Front

```bash
cd front
npm install
npm run dev
```

- App: http://localhost:3000
- The front proxies `/api/backend/*` to the backend at `http://localhost:8080` (configured in `front/.env.local` / `next.config.ts`).

## See also

- `front/README.md` — details about the Next.js project.
