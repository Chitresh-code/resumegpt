# Testing Guide

Complete guide to testing the AI Portfolio application.

## Test Structure

### Backend Tests (API)

Located in `apps/api/src/__tests__/`

- **health.test.ts** - Health endpoint tests
- **chat.test.ts** - Chat API endpoint tests
- **services/context.service.test.ts** - Context service tests
- **schemas/structured-output.schema.test.ts** - Schema validation tests

### Frontend Tests (Web)

Located in `apps/web/src/__tests__/`

- **components/ChatInput.test.tsx** - Chat input component tests
- **components/PreviewCard.test.tsx** - Preview card component tests
- **components/cards/ProjectCard.test.tsx** - Project card component tests
- **hooks/useChat.test.ts** - Chat hook tests

## Running Tests

### Backend Tests

```bash
cd apps/api

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Frontend Tests

```bash
cd apps/web

# Run all tests
npm test

# Run tests in watch mode (default)
npm test

# Run tests once
npm run test:run

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Test Coverage

### Viewing Coverage

**Backend:**
```bash
cd apps/api
npm run test:coverage
# Open apps/api/coverage/lcov-report/index.html
```

**Frontend:**
```bash
cd apps/web
npm run test:coverage
# Open apps/web/coverage/index.html
```

### Coverage Goals

- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

## Writing Tests

### Backend Test Example

```typescript
import request from 'supertest';
import app from '../app';

describe('Endpoint Name', () => {
  it('should do something', async () => {
    const response = await request(app)
      .get('/endpoint')
      .expect(200);

    expect(response.body).toHaveProperty('field');
  });
});
```

### Frontend Test Example

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

## Test Best Practices

### Backend

1. **Test all endpoints** - Every route should have tests
2. **Test error cases** - Invalid input, missing fields
3. **Test validation** - Schema validation
4. **Mock external services** - Don't call real APIs in tests
5. **Isolate tests** - Each test should be independent

### Frontend

1. **Test user interactions** - Clicks, form submissions
2. **Test rendering** - Components render correctly
3. **Test props** - Different prop combinations
4. **Test edge cases** - Empty states, loading states
5. **Use React Testing Library** - Focus on user behavior

## CI/CD Integration

Tests run automatically in GitHub Actions:

- **On push** - All tests run
- **On PR** - All tests run
- **On merge to main** - Tests + deployment

See `.github/workflows/` for workflow definitions.

## Mocking

### Backend Mocking

Mock external services:

```typescript
jest.mock('../services/llm.service', () => ({
  streamChatResponse: jest.fn(),
}));
```

### Frontend Mocking

Mock API calls:

```typescript
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ data: 'test' }),
  })
);
```

## Debugging Tests

### Backend

```bash
# Run specific test file
npm test -- health.test.ts

# Run with verbose output
npm test -- --verbose

# Run specific test
npm test -- -t "should return 200"
```

### Frontend

```bash
# Run specific test file
npm test -- ChatInput.test.tsx

# Run with UI
npm run test:ui

# Debug in browser
# Tests run in jsdom, use console.log
```

## Common Issues

### Tests Failing in CI but Pass Locally

- Check Node.js version matches
- Verify environment variables
- Check for timing issues (use `waitFor`)

### Coverage Not Generating

- Ensure coverage provider is installed
- Check test configuration
- Verify test files are being found

### Slow Tests

- Mock external API calls
- Use `vi.useFakeTimers()` for time-dependent tests
- Parallelize tests when possible

## See Also

- [Development Guide](./docs/09-development.md)
- [CI/CD Workflows](./.github/workflows/README.md)

