# CourtVision Backend

Backend service for CourtVision fantasy basketball, built with Express, Prisma, PostgreSQL, and Redis.

## Current Status

This backend is in foundation stage.

- App bootstrap is working.
- Environment validation is implemented.
- PostgreSQL and Redis connections are initialized at startup.
- Prisma schema and initial migration are created.
- Project folders for controllers, routes, services, jobs, middlewares, and utils are scaffolded.
- Business endpoints and domain logic are not implemented yet.

## Tech Stack

- Node.js (CommonJS)
- Express 5
- Prisma ORM
- PostgreSQL
- Redis
- BullMQ (installed, not yet wired)
- JWT + bcrypt (installed, not yet wired)

## Project Structure

```text
backend/
  server.js
  package.json
  .env
  prisma/
    schema.prisma
    migrations/
  src/
    app.js
    config/
      config.js
      db.js
      redis.js
    controllers/   # empty
    routes/        # empty
    services/      # empty
    jobs/          # empty
    middlewares/   # empty
    utils/         # empty
```

## Startup Flow

1. `server.js` loads config and app.
2. Redis connects first (`connectRedis`).
3. Prisma connects to PostgreSQL (`connectDB`).
4. Express server starts listening on `PORT`.

If required environment variables are missing, startup fails immediately.

## Environment Variables

`src/config/config.js` requires all of the following values:

- `PORT`
- `DATABASE_URL`
- `REDIS_URL`
- `NODE_ENV`
- `JWT_ACCESS_SECRET`
- `JWT_REFRESH_SECRET`
- `JWT_ACCESS_EXPIRY`
- `JWT_REFRESH_EXPIRY`

Example `.env`:

```env
PORT=8000
DATABASE_URL="postgresql://postgres:password@localhost:5432/courtvision"
REDIS_URL=redis://localhost:6379
NODE_ENV=development

JWT_ACCESS_SECRET=replace_with_strong_secret
JWT_REFRESH_SECRET=replace_with_strong_secret
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d
```

## Available Scripts

- `npm run start` - Run production server
- `npm run dev` - Run with nodemon
- `npm run migrate -- --name <migration_name>` - Create/apply Prisma migration

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Make sure PostgreSQL and Redis are running locally.

3. Configure `.env`.

4. Run Prisma migration:

```bash
npm run migrate -- --name init
```

5. Start backend:

```bash
npm run dev
```

## Database Schema (Current)

Prisma models currently defined:

- `User`
- `League`
- `LeagueMember`
- `Player`
- `PlayerStats`
- `FantasyTeam`
- `FantasyTeamPlayer`

Enum:

- `Position` (`PG`, `SG`, `SF`, `PF`, `C`)

Relationships and composite keys are already present in the initial migration.

## API Status

- No routes are registered yet.
- `src/app.js` currently only applies JSON and cookie-parser middleware.

## Next Backend Milestones

- Add health route (`GET /health`).
- Implement auth routes (register/login/refresh/logout).
- Add league and fantasy team CRUD flows.
- Add player sync/job pipeline with BullMQ + Redis.
- Add request validation and centralized error handling middleware.
- Add tests and linting.
