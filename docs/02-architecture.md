# Architecture Overview

This document describes the high-level architecture of the AI Portfolio application.

## System Architecture

```
┌─────────────────┐         ┌─────────────────┐
│   React Frontend│         │  Express Backend│
│   (Vite + TS)   │◄───────►│  (Node.js + TS) │
│                 │  HTTP   │                 │
│  Port: 5173     │  SSE    │  Port: 4000     │
└─────────────────┘         └─────────────────┘
                                      │
                                      ▼
                            ┌─────────────────┐
                            │   OpenAI API    │
                            │  (LangChain)    │
                            └─────────────────┘
```

## Component Architecture

### Frontend (React)

```
apps/web/src/
├── pages/              # Route pages
│   ├── Home.tsx        # Landing page with cursor animation
│   └── Chat.tsx        # Chat interface page
├── components/
│   ├── chat/           # Chat-related components
│   │   ├── ChatWindow.tsx
│   │   ├── ChatInput.tsx
│   │   ├── ChatMessage.tsx
│   │   └── StreamingMessage.tsx
│   ├── cards/          # Structured output card components
│   │   ├── ProjectCard.tsx
│   │   ├── SkillCard.tsx
│   │   ├── ContactCard.tsx
│   │   ├── ResumeCard.tsx
│   │   ├── InfoCard.tsx
│   │   └── CardRenderer.tsx
│   └── cursor/         # Cursor animation
│       └── SplashCursor.tsx
├── hooks/
│   └── useChat.ts      # Chat state management with SSE
└── types/              # TypeScript type definitions
```

### Backend (Express)

```
apps/api/src/
├── controllers/        # Request handlers
│   └── chat.controller.ts
├── routes/             # Express routes
│   └── chat.routes.ts
├── services/           # Business logic
│   ├── llm.service.ts  # LangChain + OpenAI integration
│   └── context.service.ts  # User info loading
├── schemas/            # Zod validation schemas
│   └── structured-output.schema.ts
├── data/               # Static data
│   └── user-info.json  # Portfolio data
└── types/              # TypeScript types
```

## Data Flow

### Chat Request Flow

```
1. User types message in ChatInput
   ↓
2. useChat hook sends POST /api/chat
   ↓
3. chat.controller receives request
   ↓
4. llm.service processes with LangChain
   ↓
5. Context service loads user-info.json
   ↓
6. OpenAI API generates response
   ↓
7. Structured output detected (if applicable)
   ↓
8. Server-Sent Events stream response
   ↓
9. Frontend receives chunks
   ↓
10. Components render:
    - Structured card (if data exists)
    - Streaming message below
```

## Key Technologies

### Frontend Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **ai-elements** - Streaming markdown rendering
- **shadcn/ui** - UI component library

### Backend Stack

- **Node.js** - Runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **LangChain** - LLM orchestration
- **OpenAI API** - Language model
- **Zod** - Schema validation

## Design Patterns

### 1. Component-Based Architecture

Frontend uses React components with clear separation:
- **Pages** - Route-level components
- **Components** - Reusable UI elements
- **Hooks** - State management logic
- **Types** - Type definitions

### 2. Service Layer Pattern

Backend separates concerns:
- **Controllers** - Handle HTTP requests
- **Services** - Business logic
- **Routes** - URL routing
- **Schemas** - Data validation

### 3. Structured Output Pattern

LLM responses include:
- **Structured Data** - Component props (sent first)
- **Message** - Human-readable text (streamed)

### 4. Server-Sent Events (SSE)

Real-time streaming:
- Persistent connection
- Chunked responses
- Event-based communication

## State Management

### Frontend State

- **React Hooks** - Local component state
- **useChat Hook** - Chat state and SSE handling
- **React Router** - Navigation state

### Backend State

- **Stateless** - Each request is independent
- **Conversation History** - Passed in request body
- **User Context** - Loaded from JSON file

## Security Considerations

1. **API Keys** - Stored in environment variables, never committed
2. **CORS** - Configured for specific origins
3. **Input Validation** - Message length limits
4. **Error Handling** - Production-safe error messages
5. **Rate Limiting** - Consider adding for production

## Scalability

### Current Limitations

- Single instance
- File-based user data
- No caching
- No database

### Future Improvements

- Database for user data
- Redis for caching
- Load balancing
- CDN for static assets
- Rate limiting middleware

## Performance Optimizations

1. **Code Splitting** - React lazy loading
2. **Tree Shaking** - Remove unused code
3. **Streaming** - Real-time response delivery
4. **Dependency Hoisting** - Shared dependencies (if using workspaces)

## See Also

- [API Documentation](./03-api-documentation.md)
- [Frontend Guide](./04-frontend-guide.md)
- [Backend Services](./05-backend-services.md)
- [Deployment Guide](./08-deployment.md)

