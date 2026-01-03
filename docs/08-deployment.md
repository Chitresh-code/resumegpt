# Deployment Guide

Complete guide to deploying the AI Portfolio application to production.

## Pre-Deployment Checklist

- [ ] Environment variables configured
- [ ] User information updated
- [ ] API keys secured
- [ ] CORS configured for production domain
- [ ] Both apps built successfully
- [ ] Error handling tested
- [ ] Performance optimized

## Deployment Options

### Option 1: Separate Hosting (Recommended)

Deploy API and Web separately for better scalability.

#### API Deployment

**Platforms:**
- Railway
- Render
- Heroku
- AWS EC2
- DigitalOcean
- Fly.io

**Steps:**

1. **Build the API:**
   ```bash
   cd apps/api
   npm run build
   ```

2. **Set Environment Variables:**
   ```
   NODE_ENV=production
   PORT=4000
   OPENAI_API_KEY=your_production_key
   OPENAI_MODEL=gpt-4o
   FRONTEND_URL=https://yourdomain.com
   ```

3. **Deploy:**
   - Upload `dist/` directory
   - Upload `src/data/user-info.json`
   - Set environment variables
   - Start with: `npm run start:prod`

#### Web Deployment

**Platforms:**
- Vercel (recommended)
- Netlify
- Cloudflare Pages
- AWS S3 + CloudFront
- GitHub Pages

**Steps:**

1. **Build the Web App:**
   ```bash
   cd apps/web
   npm run build
   ```

2. **Set Environment Variables:**
   ```
   VITE_API_URL=https://api.yourdomain.com
   VITE_NODE_ENV=production
   ```

3. **Deploy:**
   - Upload `dist/` directory
   - Configure redirects for SPA routing
   - Set environment variables

### Option 2: Monolithic Deployment

Deploy both apps on the same server.

**Requirements:**
- Node.js server
- Process manager (PM2)
- Reverse proxy (Nginx)

**Steps:**

1. **Build Both Apps:**
   ```bash
   cd apps/api && npm run build
   cd ../web && npm run build
   ```

2. **Server Setup:**
   ```
   /var/www/ai-portfolio/
   ├── api/
   │   ├── dist/
   │   └── src/data/user-info.json
   └── web/
       └── dist/
   ```

3. **PM2 Configuration:**
   ```json
   {
     "name": "ai-portfolio-api",
     "script": "dist/server.js",
     "cwd": "/var/www/ai-portfolio/api",
     "env": {
       "NODE_ENV": "production",
       "PORT": 4000
     }
   }
   ```

4. **Nginx Configuration:**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       # API
       location /api {
           proxy_pass http://localhost:4000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }

       # Web App
       location / {
           root /var/www/ai-portfolio/web/dist;
           try_files $uri $uri/ /index.html;
       }
   }
   ```

## Platform-Specific Guides

### Vercel (Frontend)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   cd apps/web
   vercel
   ```

3. **Configure:**
   - Set `VITE_API_URL` in Vercel dashboard
   - Add build command: `npm run build`
   - Add output directory: `dist`

### Railway (Backend)

1. **Connect Repository:**
   - Link GitHub repo
   - Select `apps/api` as root

2. **Configure:**
   - Build command: `npm run build`
   - Start command: `npm run start:prod`
   - Set environment variables

3. **Deploy:**
   - Railway auto-deploys on push

### Render (Backend)

1. **Create Web Service:**
   - Connect repository
   - Root directory: `apps/api`
   - Build command: `npm run build`
   - Start command: `npm run start:prod`

2. **Environment Variables:**
   - Add all required variables
   - Mark as sensitive

### Netlify (Frontend)

1. **Deploy:**
   ```bash
   cd apps/web
   netlify deploy --prod
   ```

2. **Configuration:**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Add `_redirects` file for SPA routing

## Environment Setup

### Production Environment Variables

**Backend:**
```env
NODE_ENV=production
PORT=4000
OPENAI_API_KEY=sk-prod-...
OPENAI_MODEL=gpt-4o
FRONTEND_URL=https://yourdomain.com
```

**Frontend:**
```env
VITE_API_URL=https://api.yourdomain.com
VITE_NODE_ENV=production
```

## Domain Configuration

### Custom Domain

1. **API Domain:**
   - `api.yourdomain.com` → API server
   - SSL certificate required

2. **Web Domain:**
   - `yourdomain.com` → Web app
   - SSL certificate required

### DNS Configuration

```
A Record:     @ → Server IP
CNAME Record: api → api.yourdomain.com
```

## SSL/HTTPS

### Let's Encrypt (Free)

```bash
sudo certbot --nginx -d yourdomain.com -d api.yourdomain.com
```

### Cloudflare (Recommended)

1. Add domain to Cloudflare
2. Update nameservers
3. Enable SSL/TLS (Full)
4. Enable automatic HTTPS

## Monitoring

### Health Checks

The API includes a health endpoint:

```bash
GET /health
```

Use this for:
- Load balancer health checks
- Monitoring services
- Uptime monitoring

### Logging

**Production Logging:**
- Use structured logging (Winston, Pino)
- Log to external service (Datadog, LogRocket)
- Monitor error rates
- Track API usage

### Error Tracking

Consider adding:
- Sentry for error tracking
- LogRocket for session replay
- Datadog for APM

## Performance Optimization

### Backend

1. **Enable Compression:**
   ```typescript
   import compression from 'compression';
   app.use(compression());
   ```

2. **Add Caching:**
   - Cache user-info.json in memory
   - Cache LLM responses (if appropriate)

3. **Rate Limiting:**
   ```typescript
   import rateLimit from 'express-rate-limit';
   const limiter = rateLimit({ max: 100, windowMs: 60000 });
   app.use('/api/chat', limiter);
   ```

### Frontend

1. **Code Splitting:**
   - Already implemented with React Router
   - Consider lazy loading components

2. **Asset Optimization:**
   - Vite handles this automatically
   - Images should be optimized

3. **CDN:**
   - Use CDN for static assets
   - Cloudflare, CloudFront, etc.

## Security Hardening

### API Security

1. **Rate Limiting:**
   - Prevent abuse
   - Protect API keys

2. **Input Validation:**
   - Already implemented
   - Message length limits

3. **CORS:**
   - Restrict to production domain
   - No wildcards

4. **Headers:**
   - Security headers (Helmet.js)
   - X-Frame-Options
   - X-Content-Type-Options

### Frontend Security

1. **Environment Variables:**
   - Never expose API keys
   - Use build-time variables only

2. **Content Security Policy:**
   - Configure CSP headers
   - Restrict external resources

## Backup Strategy

### User Data

Backup `apps/api/src/data/user-info.json`:
- Version control (Git)
- Regular backups
- Multiple locations

### Database (Future)

If moving to database:
- Automated backups
- Point-in-time recovery
- Off-site backups

## Rollback Plan

1. **Keep Previous Versions:**
   - Tag releases in Git
   - Keep previous builds

2. **Quick Rollback:**
   ```bash
   git checkout <previous-tag>
   npm run build
   # Redeploy
   ```

3. **Database Migrations:**
   - Plan rollback migrations
   - Test rollback procedures

## Post-Deployment

### Verification

1. **Test All Features:**
   - Home page loads
   - Chat works
   - Structured outputs render
   - Links work

2. **Performance Check:**
   - Page load times
   - API response times
   - Error rates

3. **Monitor:**
   - Error logs
   - Usage metrics
   - Performance metrics

## Troubleshooting

### Common Issues

**API not responding:**
- Check server is running
- Verify PORT is correct
- Check firewall rules

**CORS errors:**
- Verify FRONTEND_URL matches
- Check CORS configuration
- Test with curl

**Build failures:**
- Check Node.js version
- Verify dependencies
- Check build logs

## See Also

- [Configuration Guide](./07-configuration.md)
- [Troubleshooting Guide](./10-troubleshooting.md)
- [Architecture Overview](./02-architecture.md)

