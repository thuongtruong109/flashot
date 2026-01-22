#!/bin/bash

echo "🚀 Flashot Docker Deployment Setup Verification"
echo "=============================================="

echo -n "📁 Checking Dockerfile... "
if [ -f "api/Dockerfile" ]; then
    echo "✅ Found"
else
    echo "❌ Missing"
    exit 1
fi

echo -n "📁 Checking .dockerignore... "
if [ -f "api/.dockerignore" ]; then
    echo "✅ Found"
else
    echo "❌ Missing"
    exit 1
fi

echo -n "📁 Checking docker-compose.yml... "
if [ -f "docker-compose.yml" ]; then
    echo "✅ Found"
else
    echo "❌ Missing"
    exit 1
fi

echo -n "📁 Checking CI/CD workflow... "
if [ -f ".github/workflows/cd.yml" ]; then
    echo "✅ Found"
else
    echo "❌ Missing"
    exit 1
fi

echo -n "📁 Checking deployment docs... "
if [ -f "api/DEPLOYMENT.md" ]; then
    echo "✅ Found"
else
    echo "❌ Missing"
    exit 1
fi

echo ""
echo "🔧 Verifying API structure..."

echo -n "📦 Checking package.json... "
if [ -f "api/package.json" ]; then
    echo "✅ Found"
else
    echo "❌ Missing"
    exit 1
fi

echo -n "🔨 Checking build script... "
if grep -q '"build": "tsc"' api/package.json; then
    echo "✅ Found"
else
    echo "❌ Missing or incorrect"
    exit 1
fi

echo -n "🚀 Checking start script... "
if grep -q '"start": "node dist/index.js"' api/package.json; then
    echo "✅ Found"
else
    echo "❌ Missing or incorrect"
    exit 1
fi

echo ""
echo "🐳 Docker Commands Available:"
echo "  docker build -t flashot-api ./api"
echo "  docker run -p 8080:8080 flashot-api"
echo "  docker-compose up -d"
echo ""

echo "📋 Required GitHub Secrets:"
echo "  DOCKERHUB_USERNAME - Your Docker Hub username"
echo "  DOCKERHUB_TOKEN - Docker Hub access token"
echo ""

echo "🎯 Container Registries:"
echo "  📦 GitHub: ghcr.io/thuongtruong109/flashot-api"
echo "  🐳 Docker Hub: thuongtruong109/flashot-api"
echo ""

echo "✅ All deployment files are properly configured!"
echo "🚀 Ready for Docker deployment!"

echo ""
read -p "🔨 Would you like to test the local Docker build? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🏗️ Building Docker image..."
    cd api
    if docker build -t flashot-api-test .; then
        echo "✅ Docker build successful!"
        echo "🧪 You can now run: docker run -p 8080:8080 flashot-api-test"
    else
        echo "❌ Docker build failed!"
        exit 1
    fi
fi
