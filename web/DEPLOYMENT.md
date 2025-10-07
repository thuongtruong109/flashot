# Deployment Guide

## Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications:

1. **Push to GitHub**:

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**:

   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Import your repository
   - Deploy with default settings

3. **Environment Variables** (if needed):
   - Set in Vercel dashboard under Settings > Environment Variables

## Netlify

1. **Build Settings**:

   - Build command: `npm run build`
   - Publish directory: `.next`

2. **Deploy**:
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify deploy --prod
   ```

## Self-Hosted

### Using PM2 (Production)

1. **Install PM2**:

   ```bash
   npm install -g pm2
   ```

2. **Build and Start**:
   ```bash
   npm run build
   pm2 start npm --name "flashot-web" -- start
   ```

### Using Docker

1. **Create Dockerfile**:

   ```dockerfile
   FROM node:18-alpine

   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production

   COPY . .
   RUN npm run build

   EXPOSE 3000
   CMD ["npm", "start"]
   ```

2. **Build and Run**:
   ```bash
   docker build -t flashot-web .
   docker run -p 3000:3000 flashot-web
   ```

## Domain Setup

1. **Custom Domain**: Configure in your hosting provider
2. **SSL Certificate**: Usually auto-configured by hosting providers
3. **CDN**: Consider using Cloudflare for better performance

## Performance Optimization

1. **Enable Compression**: Gzip/Brotli (usually handled by hosting)
2. **Image Optimization**: Next.js handles this automatically
3. **Caching**: Configure proper cache headers
4. **Analytics**: Add Google Analytics or similar

## SEO Checklist

- ✅ Meta tags configured
- ✅ Open Graph tags
- ✅ Twitter Cards
- ✅ Sitemap generated
- ✅ Robots.txt configured
- ✅ Update domain in `layout.tsx`
- ⚠️ Add Google Search Console verification
- ⚠️ Create favicon files

## Security

- ✅ Security headers configured
- ⚠️ Add rate limiting if needed
- ⚠️ Configure CSP headers
- ⚠️ Add HTTPS redirect
