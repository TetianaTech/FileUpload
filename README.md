# 📁 Bulk File Upload API

This project provides a backend service for handling bulk file uploads using Docker, PostgreSQL, and Redis.

## 🚀 Getting Started

### 1. Place googleServiceAccount.json in the root of the project

### 2. Required environment variables

```bash
PORT=3000
GOOGLE_CREDENTIALS_PATH=googleServiceAccount.json
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=file_upload
POSTGRES_PORT=5432
POSTGRES_HOST=postgres
REDIS_HOST=redis
REDIS_PORT=6379
```

### 3. Start the project with Docker Compose:

```bash
docker-compose up --build
```

### 4. Run Migrations inside api container (should be integrated to CI/CD pipeline)

```bash
npm run generate
npm run migrate
```