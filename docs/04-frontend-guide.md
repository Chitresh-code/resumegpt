# Frontend Guide

Complete guide to the React frontend application.

## Project Structure

```
apps/web/src/
├── pages/              # Route pages
│   ├── Home.tsx        # Landing page
│   └── Chat.tsx        # Chat interface
├── components/
│   ├── chat/           # Chat components
│   ├── cards/           # Card components
│   └── cursor/          # Cursor animation
├── hooks/               # Custom React hooks
├── types/               # TypeScript types
├── routes/              # React Router config
└── lib/                 # Utilities
```

## Pages

### Home Page (`pages/Home.tsx`)

The landing page featuring:
- Profile section with name, bio, and avatar
- Preview cards (Me, Projects, Skills, Fun, Contact, Resume)
- Chat input field
- Cursor animation effect

**Features:**
- Cursor follows mouse movement
- Preview cards navigate to chat with predefined queries
- Responsive design

### Chat Page (`pages/Chat.tsx`)

Full-screen chat interface:
- Message history
- Streaming responses
- Structured component rendering
- Input field

**Query Parameters:**
- `?query=...` - Pre-fills chat with a query

## Components

### Chat Components

#### ChatWindow (`components/chat/ChatWindow.tsx`)

Main chat container component.

**Props:**
```typescript
interface ChatWindowProps {
  messages: ChatMessage[];
  onSend: (message: string) => void;
  isLoading: boolean;
}
```

**Features:**
- Auto-scroll to bottom
- Loading indicator
- Empty state message

#### ChatInput (`components/chat/ChatInput.tsx`)

Input field for sending messages.

**Props:**
```typescript
interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}
```

**Features:**
- Submit on Enter
- Disabled state during loading
- Send button

#### ChatMessage (`components/chat/ChatMessage.tsx`)

Renders individual messages.

**Props:**
```typescript
interface ChatMessageProps {
  message: ChatMessage;
}
```

**Rendering:**
- User messages: Right-aligned, gray background
- Assistant messages: Left-aligned with structured card (if exists) + streaming message

#### StreamingMessage (`components/chat/StreamingMessage.tsx`)

Uses ai-elements Message component for streaming markdown.

**Props:**
```typescript
interface StreamingMessageProps {
  content: string;
}
```

### Card Components

#### CardRenderer (`components/cards/CardRenderer.tsx`)

Routes to appropriate card component based on type.

**Supported Types:**
- `project` → ProjectCard
- `skill` → SkillCard
- `contact` → ContactCard
- `resume` → ResumeCard
- `info` → InfoCard

#### ProjectCard (`components/cards/ProjectCard.tsx`)

Displays project information.

**Props:**
```typescript
interface ProjectCardProps {
  data: ProjectCardData;
}
```

**Features:**
- Project title and year
- Description
- Technologies tags
- External links

#### SkillCard (`components/cards/SkillCard.tsx`)

Displays skills by category.

**Props:**
```typescript
interface SkillCardProps {
  data: SkillCardData;
}
```

**Features:**
- Category header
- Skill pills/tags

#### ContactCard (`components/cards/ContactCard.tsx`)

Displays contact information.

**Props:**
```typescript
interface ContactCardProps {
  data: ContactCardData;
}
```

**Features:**
- Email (clickable)
- Phone number
- Location
- Social media links

#### ResumeCard (`components/cards/ResumeCard.tsx`)

Resume download card.

**Props:**
```typescript
interface ResumeCardProps {
  data: ResumeCardData;
}
```

**Features:**
- Resume metadata
- Download button
- File size and format

#### InfoCard (`components/cards/InfoCard.tsx`)

General information card.

**Props:**
```typescript
interface InfoCardProps {
  data: InfoCardData;
}
```

### Cursor Component

#### SplashCursor (`components/cursor/SplashCursor.tsx`)

Fluid cursor animation that follows mouse.

**Features:**
- Smooth following animation
- Blend mode for visual effect
- Fixed positioning

## Hooks

### useChat (`hooks/useChat.ts`)

Manages chat state and SSE streaming.

**Returns:**
```typescript
{
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (message: string) => Promise<void>;
  clearMessages: () => void;
  stop: () => void;
}
```

**Features:**
- SSE connection management
- Message state updates
- Error handling
- Abort controller for cancellation

**Usage:**
```typescript
const { messages, isLoading, sendMessage } = useChat();

// Send a message
await sendMessage("Tell me about yourself");

// Messages are automatically updated
console.log(messages);
```

## Routing

### Router Configuration (`routes/index.tsx`)

```typescript
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/chat',
    element: <Chat />,
  },
]);
```

**Routes:**
- `/` - Home page
- `/chat` - Chat interface
- `/chat?query=...` - Chat with pre-filled query

## Type Definitions

### ChatMessage (`types/structured-outputs.ts`)

```typescript
interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  structuredData?: StructuredOutput;
  id?: string;
}
```

### StructuredOutput Types

See [Structured Outputs Documentation](./06-structured-outputs.md) for complete type definitions.

## Styling

### Tailwind CSS

The project uses Tailwind CSS v4 with:
- Custom color scheme
- Dark mode support
- Responsive utilities
- Custom animations

### Component Styling

Components use:
- Tailwind utility classes
- `cn()` utility for conditional classes
- Responsive breakpoints
- Dark mode variants

## State Management

### Local State

- React `useState` for component state
- `useChat` hook for chat state
- React Router for navigation state

### No Global State

Currently, no global state management (Redux, Zustand, etc.) is used. All state is local or passed via props.

## Performance Optimizations

1. **Code Splitting** - React.lazy for route-based splitting
2. **Memoization** - React.memo for expensive components
3. **Streaming** - Real-time updates without full re-renders
4. **Virtual Scrolling** - Consider for long message lists

## Development

### Running Development Server

```bash
cd apps/web
npm run dev
```

### Building for Production

```bash
npm run build
```

Output: `dist/` directory

### Preview Production Build

```bash
npm run preview
```

## Best Practices

1. **Component Organization** - Keep components focused and reusable
2. **Type Safety** - Use TypeScript types everywhere
3. **Error Boundaries** - Wrap routes in error boundaries
4. **Loading States** - Always show loading indicators
5. **Accessibility** - Use semantic HTML and ARIA labels

## Customization

### Adding New Card Types

1. Create card component in `components/cards/`
2. Add type to `types/structured-outputs.ts`
3. Update `CardRenderer.tsx` to handle new type
4. Update backend schema in `apps/api/src/schemas/`

### Modifying Styles

- Edit Tailwind config (if needed)
- Update component classes
- Use CSS variables for theming

## See Also

- [API Documentation](./03-api-documentation.md)
- [Structured Outputs](./06-structured-outputs.md)
- [Development Guide](./09-development.md)

