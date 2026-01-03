# Development Guide

Guide for developers working on the AI Portfolio project.

## Development Workflow

### Setting Up Development Environment

1. **Clone and Install:**
   ```bash
   git clone <repo-url>
   cd resume
   cd apps/api && npm install
   cd ../web && npm install
   ```

2. **Configure Environment:**
   ```bash
   # API
   cd apps/api
   cp .env.example .env
   # Edit .env with your keys

   # Web
   cd apps/web
   cp .env.example .env
   # Edit .env with API URL
   ```

3. **Start Development Servers:**
   ```bash
   # Terminal 1
   cd apps/api
   npm run dev

   # Terminal 2
   cd apps/web
   npm run dev
   ```

## Code Structure

### Frontend Structure

```
apps/web/src/
├── pages/           # Route-level components
├── components/       # Reusable components
│   ├── chat/        # Chat-related
│   ├── cards/       # Card components
│   └── cursor/      # Cursor animation
├── hooks/           # Custom React hooks
├── types/           # TypeScript types
├── routes/          # Router configuration
└── lib/             # Utilities
```

### Backend Structure

```
apps/api/src/
├── controllers/     # Request handlers
├── routes/          # Express routes
├── services/        # Business logic
├── schemas/         # Validation schemas
├── data/            # Static data
└── types/           # TypeScript types
```

## Coding Standards

### TypeScript

- **Strict Mode:** Always enabled
- **Types:** Explicit types, no `any`
- **Interfaces:** Use interfaces for object shapes
- **Enums:** Use enums for constants

**Example:**
```typescript
interface User {
  name: string;
  age: number;
}

function greetUser(user: User): string {
  return `Hello, ${user.name}!`;
}
```

### React Components

- **Functional Components:** Use function components
- **Hooks:** Prefer hooks over class components
- **Props:** Define prop types/interfaces
- **Naming:** PascalCase for components

**Example:**
```typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
}

export default function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}
```

### File Naming

- **Components:** PascalCase (`ChatWindow.tsx`)
- **Utilities:** camelCase (`utils.ts`)
- **Types:** camelCase (`portfolio.ts`)
- **Constants:** UPPER_SNAKE_CASE (`API_URL.ts`)

## Git Workflow

### Branch Strategy

- **main:** Production-ready code
- **develop:** Development branch
- **feature/***: Feature branches
- **fix/***: Bug fix branches

### Commit Messages

Follow conventional commits:

```
feat: add new card component
fix: resolve CORS issue
docs: update API documentation
refactor: simplify chat hook
test: add unit tests for service
```

### Pull Request Process

1. Create feature branch
2. Make changes
3. Write/update tests
4. Update documentation
5. Create PR with description
6. Request review
7. Address feedback
8. Merge after approval

## Testing

### Unit Tests

**Frontend:**
```typescript
import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renders button with label', () => {
  render(<Button label="Click me" onClick={() => {}} />);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

**Backend:**
```typescript
import { loadUserInfo } from './context.service';

test('loads user info', () => {
  const info = loadUserInfo();
  expect(info.personalInfo.name).toBeDefined();
});
```

### Integration Tests

Test API endpoints:

```typescript
import request from 'supertest';
import app from './app';

test('POST /api/chat returns 200', async () => {
  const response = await request(app)
    .post('/api/chat')
    .send({ message: 'Hello' });
  
  expect(response.status).toBe(200);
});
```

## Debugging

### Frontend Debugging

1. **React DevTools:**
   - Install browser extension
   - Inspect component tree
   - Check props and state

2. **Browser DevTools:**
   - Console for errors
   - Network tab for API calls
   - React DevTools for components

3. **VS Code Debugging:**
   ```json
   {
     "type": "chrome",
     "request": "launch",
     "url": "http://localhost:5173"
   }
   ```

### Backend Debugging

1. **Console Logging:**
   ```typescript
   console.log('Debug:', variable);
   console.error('Error:', error);
   ```

2. **VS Code Debugging:**
   ```json
   {
     "type": "node",
     "request": "launch",
     "program": "${workspaceFolder}/apps/api/src/server.ts"
   }
   ```

3. **Node Inspector:**
   ```bash
   node --inspect apps/api/src/server.ts
   ```

## Code Review Checklist

### Frontend

- [ ] TypeScript types are correct
- [ ] Components are reusable
- [ ] No console.logs in production code
- [ ] Error handling is implemented
- [ ] Loading states are shown
- [ ] Responsive design works
- [ ] Accessibility considerations

### Backend

- [ ] Input validation is present
- [ ] Error handling is comprehensive
- [ ] Environment variables are used
- [ ] No hardcoded values
- [ ] Logging is appropriate
- [ ] Security considerations
- [ ] Performance optimized

## Performance Optimization

### Frontend

1. **Code Splitting:**
   ```typescript
   const Chat = lazy(() => import('./pages/Chat'));
   ```

2. **Memoization:**
   ```typescript
   const MemoizedComponent = memo(Component);
   ```

3. **Virtual Scrolling:**
   - For long lists
   - Use react-window or similar

### Backend

1. **Caching:**
   ```typescript
   let cachedUserInfo: PortfolioData | null = null;
   
   function getUserInfo() {
     if (!cachedUserInfo) {
       cachedUserInfo = loadUserInfo();
     }
     return cachedUserInfo;
   }
   ```

2. **Connection Pooling:**
   - For database connections (future)

3. **Response Compression:**
   ```typescript
   import compression from 'compression';
   app.use(compression());
   ```

## Adding Features

### Adding a New Card Type

See [Structured Outputs Guide](./06-structured-outputs.md) for detailed steps.

### Adding a New API Endpoint

1. **Create Controller:**
   ```typescript
   export async function newController(req: Request, res: Response) {
     // Implementation
   }
   ```

2. **Create Route:**
   ```typescript
   router.post('/new', newController);
   ```

3. **Add to App:**
   ```typescript
   app.use('/api/new', newRoutes);
   ```

### Adding a New Page

1. **Create Page Component:**
   ```typescript
   export default function NewPage() {
     return <div>New Page</div>;
   }
   ```

2. **Add Route:**
   ```typescript
   {
     path: '/new',
     element: <NewPage />,
   }
   ```

## Documentation

### Code Documentation

Use JSDoc for functions:

```typescript
/**
 * Sends a chat message and streams the response.
 * 
 * @param message - The user's message
 * @param conversationHistory - Previous messages for context
 * @returns Async generator yielding response chunks
 */
async function* streamChatResponse(
  message: string,
  conversationHistory: Message[]
): AsyncGenerator<ResponseChunk> {
  // Implementation
}
```

### README Updates

Update README when:
- Adding new features
- Changing setup process
- Adding dependencies
- Changing configuration

## Dependencies

### Adding Dependencies

**Frontend:**
```bash
cd apps/web
npm install package-name
```

**Backend:**
```bash
cd apps/api
npm install package-name
```

### Updating Dependencies

```bash
npm outdated
npm update
```

### Security Audits

```bash
npm audit
npm audit fix
```

## Best Practices

### General

1. **Keep it simple** - Don't over-engineer
2. **DRY** - Don't repeat yourself
3. **SOLID** - Follow SOLID principles
4. **Test** - Write tests for critical paths
5. **Document** - Document complex logic

### React

1. **Component composition** - Compose small components
2. **Custom hooks** - Extract reusable logic
3. **Props drilling** - Avoid deep prop drilling
4. **State management** - Keep state local when possible
5. **Performance** - Optimize re-renders

### Node.js

1. **Async/await** - Prefer over callbacks
2. **Error handling** - Always handle errors
3. **Environment variables** - Use for configuration
4. **Logging** - Use structured logging
5. **Security** - Validate all inputs

## Troubleshooting

### Common Development Issues

**Port already in use:**
```bash
# Find process
lsof -i :4000
# Kill process
kill -9 <PID>
```

**TypeScript errors:**
```bash
# Clear cache
rm -rf node_modules/.cache
# Rebuild
npm run build
```

**Dependencies issues:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

## See Also

- [Getting Started](./01-getting-started.md)
- [Architecture](./02-architecture.md)
- [API Documentation](./03-api-documentation.md)
- [Troubleshooting](./10-troubleshooting.md)

