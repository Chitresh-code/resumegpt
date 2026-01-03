# Troubleshooting Guide

Common issues and solutions for the AI Portfolio application.

## Installation Issues

### Dependencies Not Installing

**Problem:** `npm install` fails or hangs

**Solutions:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and lock file
rm -rf node_modules package-lock.json

# Try again
npm install

# If still failing, try with verbose output
npm install --verbose
```

### TypeScript Errors During Install

**Problem:** TypeScript compilation errors

**Solutions:**
```bash
# Check Node.js version (needs >= 18)
node --version

# Update TypeScript
npm install -D typescript@latest

# Clear TypeScript cache
rm -rf node_modules/.cache
```

## Runtime Issues

### API Server Won't Start

**Problem:** Server fails to start or crashes immediately

**Solutions:**

1. **Check Environment Variables:**
   ```bash
   cd apps/api
   cat .env
   # Verify OPENAI_API_KEY is set
   ```

2. **Check Port Availability:**
   ```bash
   # Check if port is in use
   lsof -i :4000
   # Or change PORT in .env
   ```

3. **Check Node.js Version:**
   ```bash
   node --version  # Should be >= 18
   ```

4. **Check Logs:**
   ```bash
   npm run dev
   # Look for error messages
   ```

### Web Server Won't Start

**Problem:** Vite dev server fails to start

**Solutions:**

1. **Check Port:**
   ```bash
   # Default is 5173, check if available
   lsof -i :5173
   ```

2. **Clear Vite Cache:**
   ```bash
   rm -rf node_modules/.vite
   npm run dev
   ```

3. **Check Environment Variables:**
   ```bash
   # Verify VITE_API_URL is set
   cat .env
   ```

### CORS Errors

**Problem:** Browser shows CORS errors in console

**Solutions:**

1. **Check API CORS Configuration:**
   ```typescript
   // apps/api/src/app.ts
   // Verify FRONTEND_URL matches your frontend URL
   ```

2. **Check Environment Variables:**
   ```bash
   # Backend
   echo $FRONTEND_URL
   # Should match frontend URL
   ```

3. **Test with curl:**
   ```bash
   curl -H "Origin: http://localhost:5173" \
        -H "Access-Control-Request-Method: POST" \
        -X OPTIONS \
        http://localhost:4000/api/chat
   ```

## API Issues

### OpenAI API Errors

**Problem:** API returns errors from OpenAI

**Common Errors:**

1. **Invalid API Key:**
   ```
   Error: Invalid API key
   ```
   **Solution:**
   - Verify API key in `.env`
   - Check for extra spaces
   - Regenerate key if needed

2. **Rate Limit Exceeded:**
   ```
   Error: Rate limit exceeded
   ```
   **Solution:**
   - Wait before retrying
   - Check OpenAI usage dashboard
   - Consider upgrading plan

3. **Insufficient Credits:**
   ```
   Error: Insufficient credits
   ```
   **Solution:**
   - Add credits to OpenAI account
   - Check billing settings

4. **Model Not Available:**
   ```
   Error: Model not found
   ```
   **Solution:**
   - Check model name in `.env`
   - Use valid model: `gpt-4o`, `gpt-4-turbo`, `gpt-3.5-turbo`

### Streaming Not Working

**Problem:** Messages don't stream, appear all at once

**Solutions:**

1. **Check SSE Headers:**
   ```typescript
   // Verify headers are set correctly
   res.setHeader('Content-Type', 'text/event-stream');
   res.setHeader('Cache-Control', 'no-cache');
   ```

2. **Check Frontend Implementation:**
   ```typescript
   // Verify EventSource or fetch with ReadableStream
   // Check useChat hook implementation
   ```

3. **Test with curl:**
   ```bash
   curl -N http://localhost:4000/api/chat \
     -H "Content-Type: application/json" \
     -d '{"message":"test"}'
   ```

### Structured Outputs Not Generated

**Problem:** No structured data in responses

**Solutions:**

1. **Check Query Intent:**
   ```typescript
   // Verify shouldGenerateStructuredOutput() logic
   // Try explicit queries: "Tell me about your projects"
   ```

2. **Check Model:**
   ```bash
   # Structured outputs work best with gpt-4o or gpt-4-turbo
   # Check OPENAI_MODEL in .env
   ```

3. **Check Schema Validation:**
   ```typescript
   // Verify Zod schema matches expected output
   // Check for validation errors in logs
   ```

## Frontend Issues

### Components Not Rendering

**Problem:** Cards or messages don't appear

**Solutions:**

1. **Check Console for Errors:**
   ```bash
   # Open browser DevTools
   # Check Console tab for errors
   ```

2. **Verify Data Structure:**
   ```typescript
   // Check if structuredData matches expected type
   console.log(message.structuredData);
   ```

3. **Check CardRenderer:**
   ```typescript
   // Verify switch statement handles all types
   // Check component imports
   ```

### Cursor Animation Not Working

**Problem:** Cursor doesn't follow mouse

**Solutions:**

1. **Check Component:**
   ```typescript
   // Verify SplashCursor is imported and used
   // Check z-index and positioning
   ```

2. **Check CSS:**
   ```css
   /* Verify pointer-events: none */
   /* Check mix-blend-difference */
   ```

### Routing Issues

**Problem:** Routes don't work or 404 errors

**Solutions:**

1. **Check Router Configuration:**
   ```typescript
   // Verify routes are defined correctly
   // Check React Router version
   ```

2. **Check Build Configuration:**
   ```bash
   # For production, ensure server handles SPA routing
   # Add redirect rules
   ```

## Data Issues

### User Info Not Loading

**Problem:** API can't load user-info.json

**Solutions:**

1. **Check File Path:**
   ```typescript
   // Verify path in context.service.ts
   // Check file exists: apps/api/src/data/user-info.json
   ```

2. **Check JSON Validity:**
   ```bash
   # Validate JSON
   cat apps/api/src/data/user-info.json | jq .
   ```

3. **Check File Permissions:**
   ```bash
   ls -la apps/api/src/data/user-info.json
   # Should be readable
   ```

### Data Not Updating

**Problem:** Changes to user-info.json not reflected

**Solutions:**

1. **Restart Server:**
   ```bash
   # Stop and restart API server
   # Data is loaded on startup
   ```

2. **Check File Save:**
   ```bash
   # Verify file was saved
   # Check for syntax errors
   ```

## Performance Issues

### Slow Response Times

**Problem:** API responses are slow

**Solutions:**

1. **Check Model:**
   ```bash
   # gpt-4o is faster than gpt-4
   # Consider using gpt-3.5-turbo for faster responses
   ```

2. **Check Network:**
   ```bash
   # Test API directly
   curl -w "@-" -o /dev/null -s http://localhost:4000/health
   ```

3. **Check Logs:**
   ```bash
   # Look for slow operations
   # Check OpenAI API response times
   ```

### Memory Issues

**Problem:** High memory usage

**Solutions:**

1. **Check for Memory Leaks:**
   ```bash
   # Use Node.js memory profiler
   node --inspect apps/api/src/server.ts
   ```

2. **Limit Conversation History:**
   ```typescript
   // Already limited to 50 messages
   // Consider reducing further
   ```

## Build Issues

### Build Fails

**Problem:** `npm run build` fails

**Solutions:**

1. **Check TypeScript Errors:**
   ```bash
   npm run build
   # Fix any TypeScript errors shown
   ```

2. **Check Dependencies:**
   ```bash
   # Ensure all dependencies installed
   npm install
   ```

3. **Clear Build Cache:**
   ```bash
   rm -rf dist node_modules/.cache
   npm run build
   ```

### Production Build Issues

**Problem:** Production build doesn't work

**Solutions:**

1. **Check Environment Variables:**
   ```bash
   # Ensure production env vars are set
   # VITE_API_URL should be production URL
   ```

2. **Check Build Output:**
   ```bash
   # Verify dist/ directory created
   ls -la dist/
   ```

3. **Test Production Build:**
   ```bash
   npm run preview
   # Test locally before deploying
   ```

## Debugging Tips

### Enable Verbose Logging

**Backend:**
```typescript
// Add to server.ts
process.env.DEBUG = 'true';
console.log('Debug mode enabled');
```

**Frontend:**
```typescript
// Add to useChat.ts
console.log('Chat state:', { messages, isLoading });
```

### Use Network Tab

1. Open browser DevTools
2. Go to Network tab
3. Filter by "Fetch/XHR"
4. Check request/response details

### Test API Directly

```bash
# Health check
curl http://localhost:4000/health

# Chat endpoint
curl -X POST http://localhost:4000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"test"}'
```

## Getting Help

### Check Logs

**Backend:**
```bash
# Check terminal where API is running
# Look for error messages
```

**Frontend:**
```bash
# Check browser console
# Look for errors or warnings
```

### Common Solutions

1. **Restart Everything:**
   ```bash
   # Stop both servers
   # Clear caches
   # Restart
   ```

2. **Clean Install:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Check Versions:**
   ```bash
   node --version  # >= 18
   npm --version   # >= 9
   ```

## Still Having Issues?

1. Check [Getting Started Guide](./01-getting-started.md)
2. Review [Configuration Guide](./07-configuration.md)
3. Check [Development Guide](./09-development.md)
4. Review error messages carefully
5. Check GitHub issues (if applicable)
6. Create detailed issue report with:
   - Error messages
   - Steps to reproduce
   - Environment details
   - Logs

