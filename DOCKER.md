# Docker Setup Guide

This guide explains how to run the application using Docker and Docker Compose.

## Prerequisites

- Docker Desktop installed and running
- Docker Compose (included with Docker Desktop)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o

# API Configuration
FRONTEND_URL=http://localhost:5173

# Frontend Configuration (for production build)
VITE_API_URL=http://localhost:4000
```

## Development Mode (with Hot Reload)

To run the application in development mode with hot reload:

```bash
docker-compose -f docker-compose.dev.yml up
```

This will:
- Start the backend API on `http://localhost:4000` with hot reload
- Start the frontend on `http://localhost:5173` with hot reload
- Mount source files as volumes for instant updates

### Stopping Development Containers

```bash
docker-compose -f docker-compose.dev.yml down
```

## Production Mode

To build and run the application in production mode:

```bash
# Build and start containers
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

This will:
- Build optimized production images
- Start the backend API on `http://localhost:4000`
- Start the frontend on `http://localhost:80` (nginx)

### Building Images Separately

```bash
# Build backend
docker build -t resume-api ./apps/api

# Build frontend
docker build -t resume-web ./apps/web --build-arg VITE_API_URL=http://localhost:4000
```

## Docker Compose Commands

### View running containers
```bash
docker-compose ps
```

### View logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f api
docker-compose logs -f web
```

### Restart services
```bash
docker-compose restart
```

### Stop and remove containers
```bash
docker-compose down
```

### Stop and remove containers with volumes
```bash
docker-compose down -v
```

### Rebuild images
```bash
# Development
docker-compose -f docker-compose.dev.yml build --no-cache

# Production
docker-compose build --no-cache
```

## Troubleshooting

### Port Already in Use

If you get a port conflict error, you can change the ports in `docker-compose.yml`:

```yaml
ports:
  - "4001:4000"  # Change 4000 to 4001
```

### Environment Variables Not Loading

Make sure your `.env` file is in the root directory and contains all required variables.

### Hot Reload Not Working

In development mode, ensure:
1. Source files are mounted as volumes (check `docker-compose.dev.yml`)
2. File watchers are enabled in your Docker settings
3. You're editing files on the host machine, not inside the container

### Build Failures

If builds fail:
1. Clear Docker cache: `docker system prune -a`
2. Rebuild without cache: `docker-compose build --no-cache`
3. Check Docker has enough resources allocated (Docker Desktop → Settings → Resources)

## Production Deployment

For production deployment:

1. Update environment variables in `.env`
2. Set `VITE_API_URL` to your production API URL
3. Build and push images to a container registry
4. Deploy using your preferred platform (AWS, GCP, Azure, etc.)

Example production deployment:

```bash
# Build for production
docker-compose build

# Tag images
docker tag resume-api:latest your-registry/resume-api:latest
docker tag resume-web:latest your-registry/resume-web:latest

# Push to registry
docker push your-registry/resume-api:latest
docker push your-registry/resume-web:latest
```

