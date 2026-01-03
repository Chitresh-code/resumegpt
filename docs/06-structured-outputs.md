# Structured Outputs

Complete guide to structured outputs and component rendering.

## Overview

Structured outputs allow the LLM to return both:
1. **Structured Data** - Component props (rendered as cards)
2. **Message** - Human-readable text (streamed below)

## Schema Definitions

All schemas are defined in `apps/api/src/schemas/structured-output.schema.ts` using Zod.

### Project Card Schema

```typescript
{
  type: "project",
  title: string,
  description: string,
  year: number,
  technologies: string[],
  links: { label: string, url: string }[]
}
```

**Example:**
```json
{
  "type": "project",
  "title": "AI Portfolio",
  "description": "A modern portfolio website powered by AI",
  "year": 2024,
  "technologies": ["React", "TypeScript", "LangChain"],
  "links": [
    { "label": "GitHub", "url": "https://github.com/..." },
    { "label": "Live Demo", "url": "https://..." }
  ]
}
```

### Skill Card Schema

```typescript
{
  type: "skill",
  category: string,
  skills: string[]
}
```

**Example:**
```json
{
  "type": "skill",
  "category": "Tech & Product",
  "skills": ["Product vision", "Startup", "Mobile App", "AI & AGI"]
}
```

### Contact Card Schema

```typescript
{
  type: "contact",
  email: string,
  phone?: string,
  location: string,
  socialLinks: { platform: string, url: string }[]
}
```

**Example:**
```json
{
  "type": "contact",
  "email": "your.email@example.com",
  "phone": "+1 (555) 123-4567",
  "location": "San Francisco, CA, USA",
  "socialLinks": [
    { "platform": "LinkedIn", "url": "https://linkedin.com/..." },
    { "platform": "GitHub", "url": "https://github.com/..." }
  ]
}
```

### Resume Card Schema

```typescript
{
  type: "resume",
  name: string,
  title: string,
  format: string,
  updatedDate: string,
  size: string,
  url?: string
}
```

**Example:**
```json
{
  "type": "resume",
  "name": "Your Name",
  "title": "Software Engineer",
  "format": "PDF",
  "updatedDate": "August 2024",
  "size": "0.5 MB",
  "url": "/resume.pdf"
}
```

### Info Card Schema

```typescript
{
  type: "info",
  title: string,
  content: string,
  metadata?: Record<string, any>
}
```

**Example:**
```json
{
  "type": "info",
  "title": "About Me",
  "content": "I'm a passionate developer...",
  "metadata": {}
}
```

## Triggering Structured Outputs

The LLM service detects query intent to determine when to generate structured outputs:

### Project Queries

**Triggers:**
- "Tell me about your projects"
- "Show me your projects"
- "What projects have you worked on?"

**Generated:**
- ProjectCard with project details

### Skill Queries

**Triggers:**
- "What are your skills?"
- "Tell me about your skills"
- "What skills do you have?"

**Generated:**
- SkillCard with categorized skills

### Contact Queries

**Triggers:**
- "How can I contact you?"
- "What's your contact information?"
- "Show me your contact details"

**Generated:**
- ContactCard with contact information

### Resume Queries

**Triggers:**
- "Show me your resume"
- "Can I see your CV?"
- "Resume"

**Generated:**
- ResumeCard with resume metadata

## Rendering Flow

### Frontend Rendering

```
1. Receive structuredData event
   ↓
2. CardRenderer determines type
   ↓
3. Render appropriate card component
   ↓
4. Receive message chunks
   ↓
5. Stream message below card
```

### Component Hierarchy

```
ChatMessage
├── CardRenderer (if structuredData exists)
│   ├── ProjectCard
│   ├── SkillCard
│   ├── ContactCard
│   ├── ResumeCard
│   └── InfoCard
└── StreamingMessage (message content)
```

## Adding New Card Types

### 1. Define Schema

Add to `apps/api/src/schemas/structured-output.schema.ts`:

```typescript
export const NewCardSchema = z.object({
  type: z.literal('newcard'),
  field1: z.string(),
  field2: z.number(),
});

export const StructuredOutputSchema = z.discriminatedUnion('type', [
  // ... existing schemas
  NewCardSchema,
]);
```

### 2. Update TypeScript Types

Add to `apps/web/src/types/structured-outputs.ts`:

```typescript
export interface NewCardData {
  type: 'newcard';
  field1: string;
  field2: number;
}

export type StructuredOutput = 
  | ProjectCardData
  // ... existing types
  | NewCardData;
```

### 3. Create Component

Create `apps/web/src/components/cards/NewCard.tsx`:

```typescript
import { NewCardData } from '@/types/structured-outputs';

interface NewCardProps {
  data: NewCardData;
}

export default function NewCard({ data }: NewCardProps) {
  return (
    <div className="...">
      {/* Component implementation */}
    </div>
  );
}
```

### 4. Update CardRenderer

Update `apps/web/src/components/cards/CardRenderer.tsx`:

```typescript
import NewCard from './NewCard';

export default function CardRenderer({ data }: CardRendererProps) {
  switch (data.type) {
    // ... existing cases
    case 'newcard':
      return <NewCard data={data} />;
    default:
      return null;
  }
}
```

### 5. Update Detection Logic

Update `apps/api/src/services/llm.service.ts`:

```typescript
function shouldGenerateStructuredOutput(input: string): string | null {
  const lowerInput = input.toLowerCase();
  // ... existing checks
  if (lowerInput.includes('newcard')) {
    return 'newcard';
  }
  return null;
}
```

## Best Practices

### Schema Design

1. **Keep it simple** - Don't over-complicate schemas
2. **Be specific** - Use clear field names
3. **Validate** - Always validate with Zod
4. **Version** - Consider versioning for future changes

### Component Design

1. **Consistent styling** - Match existing card styles
2. **Responsive** - Work on all screen sizes
3. **Accessible** - Use semantic HTML
4. **Interactive** - Add hover states and animations

### Trigger Detection

1. **Multiple triggers** - Support various phrasings
2. **Context aware** - Consider conversation history
3. **Fallback** - Default to text-only if unsure

## Examples

### Complete Flow Example

**User Query:**
```
"Tell me about your projects"
```

**Backend Response:**
```json
// Event 1: Structured data
{"type": "structuredData", "data": {
  "type": "project",
  "title": "AI Portfolio",
  "description": "...",
  "year": 2024,
  "technologies": ["React", "TypeScript"],
  "links": [...]
}}

// Event 2-N: Message chunks
{"type": "message", "data": "Here are my projects"}
{"type": "message", "data": ":"}
{"type": "message", "data": "\n\n"}
...
```

**Frontend Rendering:**
1. ProjectCard renders with project details
2. StreamingMessage renders below with text

## Troubleshooting

### Structured Output Not Generated

- Check query intent detection
- Verify schema validation
- Review LLM response

### Component Not Rendering

- Check CardRenderer switch statement
- Verify type matches
- Check component import

### Schema Validation Errors

- Review Zod schema
- Check data format
- Validate against schema

## See Also

- [Frontend Guide](./04-frontend-guide.md)
- [Backend Services](./05-backend-services.md)
- [API Documentation](./03-api-documentation.md)

