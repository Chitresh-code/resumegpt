# Testing and CI/CD Setup

Complete guide to testing and continuous integration for the AI Portfolio project.

## 📦 Postman Collection

### Location
`postman/` directory contains:

- **AI-Portfolio.postman_collection.json** - Complete API collection
- **Development.postman_environment.json** - Development environment
- **Production.postman_environment.json** - Production environment
- **README.md** - Postman usage guide

### Importing

1. Open Postman
2. Click **Import**
3. Select `postman/AI-Portfolio.postman_collection.json`
4. Select environment file (Development or Production)
5. Start testing!

### Collection Includes

- Health check endpoint
- Chat API endpoints
- Error handling tests
- Structured output tests
- Automated test scripts

## 🧪 Test Suite

### Backend Tests (Jest)

**Location:** `apps/api/src/__tests__/`

**Test Files:**
- `health.test.ts` - Health endpoint tests
- `chat.test.ts` - Chat API tests
- `services/context.service.test.ts` - Service tests
- `schemas/structured-output.schema.test.ts` - Schema validation

**Run Tests:**
```bash
cd apps/api
npm test                 # Run all tests
npm run test:watch      # Watch mode
npm run test:coverage   # With coverage
```

### Frontend Tests (Vitest)

**Location:** `apps/web/src/__tests__/`

**Test Files:**
- `components/ChatInput.test.tsx` - Chat input tests
- `components/PreviewCard.test.tsx` - Preview card tests
- `components/cards/ProjectCard.test.tsx` - Project card tests
- `hooks/useChat.test.ts` - Chat hook tests

**Run Tests:**
```bash
cd apps/web
npm test                 # Run in watch mode
npm run test:run        # Run once
npm run test:ui         # UI mode
npm run test:coverage   # With coverage
```

## 🔄 CI/CD Pipelines

### GitHub Actions Workflows

Located in `.github/workflows/`

#### 1. CI Workflow (`ci.yml`)

**Triggers:**
- Push to `main` or `develop`
- Pull requests

**Jobs:**
- Lint and test API
- Lint and test Web
- Build both applications
- Type check both applications

#### 2. Test Workflow (`test.yml`)

**Triggers:**
- Push to `main` or `develop`
- Pull requests
- Manual dispatch

**Features:**
- Matrix testing (Node.js 18 & 20)
- Coverage reporting
- Codecov integration

#### 3. Lint Workflow (`lint.yml`)

**Triggers:**
- Push to `main` or `develop`
- Pull requests

**Jobs:**
- Lint API code
- Lint Web code

#### 4. Deploy Workflow (`deploy.yml`)

**Triggers:**
- Push to `main` branch
- Manual dispatch

**Jobs:**
- Deploy API to production
- Deploy Web to production

## 🔐 Required Secrets

Add these in GitHub repository settings:

### Required
- `OPENAI_API_KEY` - For API tests (can use test key)

### Optional
- `VITE_API_URL` - Production API URL (for web builds)
- `CODECOV_TOKEN` - For coverage reporting

## 📊 Coverage Reports

### Viewing Coverage

**Backend:**
```bash
cd apps/api
npm run test:coverage
open coverage/lcov-report/index.html
```

**Frontend:**
```bash
cd apps/web
npm run test:coverage
open coverage/index.html
```

### Coverage Goals

- Statements: > 80%
- Branches: > 75%
- Functions: > 80%
- Lines: > 80%

## 🚀 Running Tests Locally

### Before Committing

```bash
# Backend
cd apps/api
npm test
npm run lint

# Frontend
cd apps/web
npm run test:run
npm run lint
```

### Full Test Suite

```bash
# Run all backend tests
cd apps/api && npm test && cd ../..

# Run all frontend tests
cd apps/web && npm run test:run && cd ../..
```

## 📝 Writing New Tests

### Backend Test Template

```typescript
import request from 'supertest';
import app from '../app';

describe('Feature Name', () => {
  it('should do something', async () => {
    const response = await request(app)
      .post('/endpoint')
      .send({ data: 'test' })
      .expect(200);

    expect(response.body).toHaveProperty('field');
  });
});
```

### Frontend Test Template

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Component from '@/components/Component';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />);
    expect(screen.getByText('Text')).toBeInTheDocument();
  });
});
```

## 🔍 Debugging Tests

### Backend

```bash
# Run specific test
npm test -- health.test.ts

# Run with verbose output
npm test -- --verbose

# Debug specific test
npm test -- -t "should return 200"
```

### Frontend

```bash
# Run specific test file
npm test -- ChatInput.test.tsx

# Run with UI
npm run test:ui

# Debug in browser
# Use console.log in tests
```

## ✅ Test Checklist

Before pushing code:

- [ ] All tests pass locally
- [ ] New features have tests
- [ ] Coverage meets goals
- [ ] Linting passes
- [ ] Type checking passes
- [ ] No console.logs in production code

## 📚 Additional Resources

- [Testing Guide](./TESTING.md) - Detailed testing documentation
- [Postman README](./postman/README.md) - Postman collection guide
- [CI/CD Workflows](./.github/workflows/README.md) - Workflow documentation
- [Development Guide](./docs/09-development.md) - Development best practices

## 🐛 Troubleshooting

### Tests Failing in CI

1. Check Node.js version matches
2. Verify environment variables
3. Check for timing issues
4. Review CI logs

### Coverage Not Uploading

1. Verify Codecov token (if using)
2. Check coverage files are generated
3. Review workflow configuration

### Postman Tests Failing

1. Verify environment variables
2. Check API is running
3. Review request/response format
4. Check test scripts

