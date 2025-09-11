# Flashot API Deployment Guide

This guide covers deploying the Flashot API using Docker containers to GitHub Container Registry and Docker Hub.

## Prerequisites

### Required Secrets

Set up the following secrets in your GitHub repository (`Settings > Secrets and variables > Actions`):

1. **DOCKERHUB_USERNAME** - Your Docker Hub username
2. **DOCKERHUB_TOKEN** - Docker Hub access token (create at hub.docker.com/settings/security)

### GitHub Container Registry

GitHub Container Registry (GHCR) authentication is handled automatically using `GITHUB_TOKEN`.

## Deployment Workflow

The CI/CD pipeline is triggered on:

- Push to `main` branch (when API or package files change)
- Manual workflow dispatch
- Pull requests (build only, no deployment)

### Workflow Steps

1. **Build and Test**

   - Install dependencies with Bun
   - Build the package and API
   - Run tests
   - Extract Docker metadata

2. **Build and Push**

   - Set up Docker Buildx for multi-platform builds
   - Login to both registries
   - Build and push images for `linux/amd64` and `linux/arm64`
   - Generate build attestations

3. **Security Scan**

   - Run Trivy vulnerability scanner
   - Upload results to GitHub Security tab

4. **Deployment Notification**
   - Report deployment status

## Container Registries

### GitHub Container Registry

```
ghcr.io/thuongtruong109/flashot-api:latest
ghcr.io/thuongtruong109/flashot-api:main
ghcr.io/thuongtruong109/flashot-api:main-<sha>
```

### Docker Hub

```
docker.io/thuongtruong109/flashot-api:latest
docker.io/thuongtruong109/flashot-api:main
docker.io/thuongtruong109/flashot-api:main-<sha>
```

## Local Development

### Building Locally

```bash
# Build the Docker image
cd api
docker build -t flashot-api .

# Run the container
docker run -p 8080:8080 flashot-api

# Or use npm scripts
npm run build:docker
npm run docker:run
```

### Using Docker Compose

```bash
# Development mode
docker-compose up flashot-api

# Production mode with nginx
docker-compose --profile production up
```

## Production Deployment

### Using Docker Run

```bash
# Pull from GitHub Container Registry
docker pull ghcr.io/thuongtruong109/flashot-api:latest

# Or pull from Docker Hub
docker pull thuongtruong109/flashot-api:latest

# Run the container
docker run -d \
  --name flashot-api \
  --restart unless-stopped \
  -p 8080:8080 \
  -e NODE_ENV=production \
  ghcr.io/thuongtruong109/flashot-api:latest
```

### Using Docker Compose

```bash
# Production deployment
docker-compose --profile production up -d
```

### Kubernetes Deployment

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: flashot-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: flashot-api
  template:
    metadata:
      labels:
        app: flashot-api
    spec:
      containers:
        - name: flashot-api
          image: ghcr.io/thuongtruong109/flashot-api:latest
          ports:
            - containerPort: 8080
          env:
            - name: NODE_ENV
              value: "production"
          resources:
            requests:
              memory: "256Mi"
              cpu: "250m"
            limits:
              memory: "512Mi"
              cpu: "500m"
          livenessProbe:
            httpGet:
              path: /health
              port: 8080
            initialDelaySeconds: 30
            periodSeconds: 10
          readinessProbe:
            httpGet:
              path: /health
              port: 8080
            initialDelaySeconds: 5
            periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: flashot-api-service
spec:
  selector:
    app: flashot-api
  ports:
    - protocol: TCP
      port: 80
      targetPort: 8080
  type: LoadBalancer
```

## Environment Variables

| Variable   | Description      | Default      |
| ---------- | ---------------- | ------------ |
| `NODE_ENV` | Environment mode | `production` |
| `PORT`     | Server port      | `8080`       |

## Health Monitoring

The API includes a health check endpoint at `/health` that returns:

```json
{
  "status": "healthy",
  "service": "flashot-api",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Security Features

- **Multi-stage builds** for smaller, secure images
- **Non-root user** execution
- **Vulnerability scanning** with Trivy
- **Build attestations** for supply chain security
- **Rate limiting** via nginx configuration
- **Security headers** in nginx

## Performance Optimizations

- **Multi-platform builds** (AMD64 + ARM64)
- **Build caching** with GitHub Actions cache
- **Gzip compression** via nginx
- **Connection pooling** and timeouts
- **Health check** configuration

## Troubleshooting

### Build Issues

```bash
# Check build logs
docker build --no-cache -t flashot-api ./api

# Debug container
docker run -it --entrypoint /bin/bash flashot-api
```

### Runtime Issues

```bash
# Check container logs
docker logs flashot-api

# Connect to running container
docker exec -it flashot-api /bin/bash

# Test health endpoint
curl http://localhost:8080/health
```

### Common Issues

1. **Font rendering problems**: Ensure font packages are installed in Dockerfile
2. **Permission issues**: Verify non-root user setup
3. **Network connectivity**: Check port mappings and firewall rules
4. **Memory issues**: Adjust container resource limits

## Manual Deployment

To manually trigger deployment:

1. Go to GitHub Actions
2. Select "Build and Deploy" workflow
3. Click "Run workflow"
4. Set `force_deploy` to `true` if needed

## Registry Management

### Cleanup Old Images

```bash
# GitHub Container Registry (requires GitHub CLI)
gh api -X DELETE /orgs/thuongtruong109/packages/container/flashot-api/versions/OLD_VERSION_ID

# Docker Hub (via UI or API)
curl -X DELETE "https://hub.docker.com/v2/repositories/thuongtruong109/flashot-api/tags/OLD_TAG/"
```

## Support

For deployment issues:

1. Check GitHub Actions logs
2. Review security scan results
3. Monitor container health
4. Check application logs

## Next Steps

Consider implementing:

- **Blue-green deployments**
- **Canary releases**
- **Monitoring and alerting**
- **Auto-scaling policies**
- **Backup strategies**
