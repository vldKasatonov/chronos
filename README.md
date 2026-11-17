# chronos
Study project | Innovation Campus

## System Requirements:
* **[Docker Desktop](https://www.docker.com/products/docker-desktop/)** (with Docker Compose v5.7.0+)

## Usage:
Start the application:
```bash
docker compose --profile prod up -d --build
```
Stop running containers:
```bash
docker compose --profile prod stop
```
Stop and remove containers:
```bash
docker compose --profile prod down
```
Stop and remove containers with volumes:
```bash
docker compose --profile prod down -v
```

### as developer:
```bash
docker compose --profile dev up --watch --build
```
Stop running containers:
```bash
docker compose --profile dev stop
```
Stop and remove containers:
```bash
docker compose --profile dev down
```
Stop and remove containers with volumes:
```bash
docker compose --profile dev down -v
```

> Run **either** the `prod` **or** `dev` profile at a time — do not run both simultaneously, as they share the same host ports. Before switching profiles, stop the active one.

### By default:
- client: [http://localhost:5000](http://localhost:5000)
- api: [http://localhost:3000](http://localhost:3000)