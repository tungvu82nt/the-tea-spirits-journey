# Deployment Guide

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Local Development](#local-development)
4. [Production Build](#production-build)
5. [Deployment Options](#deployment-options)
6. [Environment Variables](#environment-variables)
7. [Database Setup](#database-setup)
8. [Monitoring & Logging](#monitoring--logging)
9. [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying The Tea Spirits Journey application, ensure you have:

- **Node.js**: v18.x or higher
- **npm**: v9.x or higher (comes with Node.js)
- **Git**: For version control
- **Docker**: (Optional) For containerized deployment
- **Cloud Provider Account**: Vercel, Netlify, AWS, GCP, or Azure

## Environment Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/the-tea-spirits-journey.git
cd the-tea-spirits-journey
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api
VITE_API_TIMEOUT=30000

# Authentication
VITE_JWT_SECRET=your-super-secret-jwt-key
VITE_REFRESH_TOKEN_SECRET=your-super-secret-refresh-key

# CSRF Protection
VITE_CSRF_SECRET=your-csrf-secret-key

# Application
VITE_APP_NAME=The Tea Spirits Journey
VITE_APP_URL=http://localhost:5173

# Features
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_SENTRY=false
VITE_SENTRY_DSN=

# Payment Gateways
VITE_STRIPE_PUBLIC_KEY=pk_test_xxx
VITE_MOMO_PARTNER_CODE=
VITE_MOMO_ACCESS_KEY=

# Social Media
VITE_FACEBOOK_APP_ID=
VITE_GOOGLE_ANALYTICS_ID=
```

## Local Development

### Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Run Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test with coverage
npm run test:coverage
```

### Run Storybook

```bash
npm run storybook
```

Storybook will be available at `http://localhost:6006`

### Lint and Type Check

```bash
# Lint code
npm run lint

# Type check
npm run typecheck

# Fix linting issues
npm run lint:fix
```

## Production Build

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

Preview the production build locally at `http://localhost:4173`

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel provides the easiest deployment experience for React applications.

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Deploy

```bash
vercel
```

Follow the prompts to configure your deployment.

#### Step 3: Environment Variables

Add environment variables in Vercel dashboard:

1. Go to Project Settings → Environment Variables
2. Add all variables from `.env` (without `VITE_` prefix)
3. Redeploy to apply changes

#### Step 4: Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed

### Option 2: Netlify

Netlify offers continuous deployment and edge functions.

#### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli
```

#### Step 2: Build and Deploy

```bash
npm run build
netlify deploy --prod
```

#### Step 3: Configure netlify.toml

Create `netlify.toml` in root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

### Option 3: Docker

For containerized deployment using Docker.

#### Step 1: Create Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

#### Step 2: Create nginx.conf

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

#### Step 3: Build and Run

```bash
# Build image
docker build -t tea-spirits-journey .

# Run container
docker run -p 80:80 tea-spirits-journey
```

#### Step 4: Docker Compose (Optional)

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "80:80"
    environment:
      - VITE_API_BASE_URL=http://backend:3000/api
    depends_on:
      - backend

  backend:
    image: your-backend-image
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://...
      - JWT_SECRET=...
```

Run with:

```bash
docker-compose up -d
```

### Option 4: AWS S3 + CloudFront

For static site hosting on AWS.

#### Step 1: Build Application

```bash
npm run build
```

#### Step 2: Upload to S3

```bash
aws s3 sync dist/ s3://your-bucket-name --delete
```

#### Step 3: Configure CloudFront

1. Create CloudFront distribution
2. Set origin to S3 bucket
3. Configure cache behaviors
4. Add custom domain (optional)

#### Step 4: Invalidate Cache

```bash
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

### Option 5: GitHub Pages

For free static hosting.

#### Step 1: Configure vite.config.ts

```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // ... other config
})
```

#### Step 2: Create GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

#### Step 3: Enable GitHub Pages

1. Go to Repository Settings → Pages
2. Select GitHub Actions as source
3. Save changes

## Environment Variables

### Production Variables

Create `.env.production`:

```env
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_API_TIMEOUT=30000
VITE_APP_NAME=The Tea Spirits Journey
VITE_APP_URL=https://yourdomain.com
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_SENTRY=true
VITE_SENTRY_DSN=https://xxx@sentry.io/xxx
VITE_STRIPE_PUBLIC_KEY=pk_live_xxx
```

### Staging Variables

Create `.env.staging`:

```env
VITE_API_BASE_URL=https://staging-api.yourdomain.com
VITE_API_TIMEOUT=30000
VITE_APP_NAME=The Tea Spirits Journey (Staging)
VITE_APP_URL=https://staging.yourdomain.com
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_SENTRY=true
VITE_SENTRY_DSN=https://xxx@sentry.io/xxx
```

## Database Setup

### PostgreSQL (Recommended)

#### Step 1: Install PostgreSQL

```bash
# Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib

# macOS
brew install postgresql

# Windows
# Download from https://www.postgresql.org/download/windows/
```

#### Step 2: Create Database

```bash
sudo -u postgres psql
CREATE DATABASE tea_spirits_journey;
CREATE USER tea_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE tea_spirits_journey TO tea_user;
\q
```

#### Step 3: Run Migrations

```bash
npm run db:migrate
```

#### Step 4: Seed Database (Optional)

```bash
npm run db:seed
```

### MongoDB (Alternative)

#### Step 1: Install MongoDB

```bash
# Ubuntu/Debian
sudo apt-get install mongodb

# macOS
brew tap mongodb/brew
brew install mongodb-community

# Windows
# Download from https://www.mongodb.com/try/download/community
```

#### Step 2: Start MongoDB

```bash
# Linux/macOS
sudo systemctl start mongodb

# Windows
net start MongoDB
```

#### Step 3: Connect to MongoDB

```env
MONGODB_URI=mongodb://localhost:27017/tea_spirits_journey
```

## Monitoring & Logging

### Sentry Integration

#### Step 1: Install Sentry SDK

```bash
npm install @sentry/react
```

#### Step 2: Configure Sentry

Create `src/sentry.ts`:

```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});
```

#### Step 3: Wrap App

```typescript
import * as Sentry from "@sentry/react";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Sentry.ErrorBoundary fallback={<ErrorFallback />}>
      <App />
    </Sentry.ErrorBoundary>
  </React.StrictMode>
);
```

### Google Analytics

#### Step 1: Install gtag

```bash
npm install @gtag/js
```

#### Step 2: Initialize Analytics

```typescript
import { initializeGA } from '@/lib/analytics';

if (import.meta.env.VITE_ENABLE_ANALYTICS) {
  initializeGA(import.meta.env.VITE_GOOGLE_ANALYTICS_ID);
}
```

### Performance Monitoring

#### Step 1: Install Web Vitals

```bash
npm install web-vitals
```

#### Step 2: Track Web Vitals

```typescript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

## Troubleshooting

### Common Issues

#### Build Fails

**Problem**: Build fails with errors

**Solution**:
```bash
# Clear cache
rm -rf node_modules dist
npm install
npm run build

# Check for type errors
npm run typecheck

# Check for linting errors
npm run lint
```

#### Environment Variables Not Loading

**Problem**: Environment variables are undefined in production

**Solution**:
- Ensure all variables start with `VITE_` prefix
- Check that `.env.production` exists
- Verify variables are set in deployment platform
- Restart build server after adding variables

#### Images Not Loading

**Problem**: Images fail to load after deployment

**Solution**:
- Check image URLs are correct
- Ensure images are in `public/` directory
- Verify CDN configuration (if using)
- Check CORS settings for external images

#### API Requests Failing

**Problem**: API requests fail in production

**Solution**:
- Verify `VITE_API_BASE_URL` is correct
- Check CORS configuration on backend
- Ensure authentication tokens are valid
- Review browser console for errors

#### Performance Issues

**Problem**: Application is slow in production

**Solution**:
- Enable code splitting
- Implement lazy loading for images
- Use CDN for static assets
- Optimize bundle size
- Enable gzip compression
- Implement caching strategies

### Debug Mode

Enable debug mode by setting:

```env
VITE_DEBUG=true
```

This will:
- Show detailed error messages
- Log all API requests
- Display performance metrics
- Enable React DevTools

### Health Check

Create a health check endpoint:

```typescript
// src/lib/health.ts
export const checkHealth = async () => {
  try {
    const response = await fetch('/api/health');
    return response.ok;
  } catch {
    return false;
  }
};
```

## Security Best Practices

### 1. HTTPS Only

Ensure your application is served over HTTPS:

- Use SSL certificates (Let's Encrypt is free)
- Redirect HTTP to HTTPS
- Set secure cookies
- Use HSTS headers

### 2. Content Security Policy

Add CSP headers:

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self';
  connect-src 'self' https://api.yourdomain.com;
">
```

### 3. Secure Headers

Add security headers:

```nginx
add_header X-Frame-Options "SAMEORIGIN";
add_header X-Content-Type-Options "nosniff";
add_header X-XSS-Protection "1; mode=block";
add_header Referrer-Policy "strict-origin-when-cross-origin";
```

### 4. Environment Variables

- Never commit `.env` files
- Use different secrets for each environment
- Rotate secrets regularly
- Use secret management services (AWS Secrets Manager, etc.)

## Backup Strategy

### Database Backups

```bash
# PostgreSQL
pg_dump -U tea_user tea_spirits_journey > backup.sql

# MongoDB
mongodump --db tea_spirits_journey --out /backup
```

### Automated Backups

Set up cron jobs:

```bash
# Daily backup at 2 AM
0 2 * * * pg_dump -U tea_user tea_spirits_journey > /backups/daily_$(date +\%Y\%m\%d).sql
```

## Scaling

### Horizontal Scaling

- Load balancer (Nginx, HAProxy)
- Multiple application instances
- Shared session storage (Redis)
- CDN for static assets

### Vertical Scaling

- Increase server resources
- Optimize database queries
- Implement caching (Redis, Memcached)
- Use read replicas for database

## Maintenance

### Regular Tasks

- **Daily**: Monitor logs and errors
- **Weekly**: Review performance metrics
- **Monthly**: Update dependencies
- **Quarterly**: Security audit
- **Annually**: Disaster recovery testing

### Dependency Updates

```bash
# Check for outdated packages
npm outdated

# Update packages
npm update

# Audit for vulnerabilities
npm audit
npm audit fix
```

## Support

For deployment issues, contact:

- **Email**: support@teaspirits.com
- **Documentation**: https://docs.teaspirits.com
- **GitHub Issues**: https://github.com/your-username/the-tea-spirits-journey/issues

## Changelog

### Version 1.0.0 (2024-01-15)
- Initial deployment guide
- Support for Vercel, Netlify, Docker, AWS, GitHub Pages
- Database setup instructions
- Monitoring and logging configuration
- Security best practices
