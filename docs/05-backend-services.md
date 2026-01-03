# Backend Services

Documentation for backend services and LangChain integration.

## Service Architecture

```
Request → Controller → Service → LangChain → OpenAI API
                ↓
         Context Service (user-info.json)
```

## Services

### LLM Service (`services/llm.service.ts`)

Core service for LangChain and OpenAI integration.

#### Functions

##### `streamChatResponse()`

Main function for streaming chat responses.

**Signature:**
```typescript
async function* streamChatResponse(
  input: string,
  chatHistory: Array<{ role: string; content: string }>
): AsyncGenerator<{ type: string; data: any }, void, unknown>
```

**Process:**
1. Determines if structured output is needed
2. Generates structured data (if applicable)
3. Streams message response
4. Yields chunks with type and data

**Returns:**
- `{ type: 'structuredData', data: StructuredOutput }` - Component data
- `{ type: 'message', data: string }` - Text chunks

#### Structured Output Detection

The service detects when to generate structured outputs based on query intent:

```typescript
function shouldGenerateStructuredOutput(input: string): string | null {
  // Returns: 'project' | 'skill' | 'contact' | 'resume' | null
}
```

**Triggers:**
- "project" → ProjectCard
- "skill" → SkillCard
- "contact" → ContactCard
- "resume" → ResumeCard

#### LangChain Configuration

**Models:**
- **Streaming Model**: For real-time text generation
- **Structured Model**: For structured output generation

**Prompt Template:**
```typescript
ChatPromptTemplate.fromMessages([
  ['system', systemPrompt],  // User context from user-info.json
  new MessagesPlaceholder('chat_history'),
  ['human', '{input}'],
])
```

**System Prompt:**
- Loaded from `context.service.ts`
- Contains formatted user information
- Includes instructions for structured outputs

### Context Service (`services/context.service.ts`)

Manages user information loading and formatting.

#### Functions

##### `loadUserInfo()`

Loads user information from JSON file.

**Signature:**
```typescript
function loadUserInfo(): PortfolioData
```

**Returns:**
- Complete portfolio data structure
- Throws error if file not found

##### `formatUserInfoForPrompt()`

Formats user information for LLM system prompt.

**Signature:**
```typescript
function formatUserInfoForPrompt(userInfo: PortfolioData): string
```

**Format:**
```
You are an AI assistant representing [Name].

Personal Information:
- Name: ...
- Bio: ...
...

Projects:
1. Project Name (Year)
   Description: ...
   Technologies: ...
...

[Additional sections...]

Instructions:
- Answer questions about [Name] based on the information above.
- Be friendly, professional, and engaging.
- When asked about projects, skills, contact info, or resume, provide structured data.
```

## LangChain Integration

### Model Setup

```typescript
const streamingModel = new ChatOpenAI({
  modelName: process.env.OPENAI_MODEL || 'gpt-4o',
  temperature: 0.7,
  streaming: true,
});

const structuredModel = new ChatOpenAI({
  modelName: process.env.OPENAI_MODEL || 'gpt-4o',
  temperature: 0.7,
  streaming: false,  // Structured outputs don't need streaming
});
```

### Chain Construction

**Streaming Chain:**
```typescript
const chain = prompt.pipe(streamingModel);
const stream = await chain.stream({ input, chat_history });
```

**Structured Output Chain:**
```typescript
const structuredChain = structuredPrompt.pipe(
  structuredModel.withStructuredOutput(StructuredOutputSchema)
);
const structuredData = await structuredChain.invoke({ input, chat_history });
```

### Structured Output Binding

Uses Zod schemas for validation:

```typescript
model.withStructuredOutput(StructuredOutputSchema)
```

**Benefits:**
- Type-safe outputs
- Automatic validation
- Consistent format

## Data Flow

### Request Processing

1. **Controller receives request**
   - Validates input
   - Sets up SSE headers

2. **Service processes query**
   - Checks for structured output need
   - Loads user context

3. **Structured output generation** (if needed)
   - Creates structured prompt
   - Calls structured model
   - Validates with Zod schema
   - Sends as first event

4. **Message streaming**
   - Creates streaming chain
   - Streams chunks
   - Sends as message events

5. **Response completion**
   - Sends [DONE] signal
   - Closes connection

## Error Handling

### Service-Level Errors

```typescript
try {
  // LangChain operations
} catch (error) {
  console.error('Error in streamChatResponse:', error);
  throw error;  // Propagated to controller
}
```

### Common Errors

1. **OpenAI API Errors**
   - Rate limiting
   - Invalid API key
   - Model not available

2. **Validation Errors**
   - Invalid structured output schema
   - Malformed user-info.json

3. **Streaming Errors**
   - Connection interrupted
   - Timeout

## Configuration

### Environment Variables

See [Configuration Guide](./07-configuration.md) for details.

**Required:**
- `OPENAI_API_KEY` - OpenAI API key
- `OPENAI_MODEL` - Model name (default: gpt-4o)

**Optional:**
- `NODE_ENV` - Environment (development/production)

### Model Selection

**Recommended Models:**
- `gpt-4o` - Best for structured outputs
- `gpt-4-turbo` - Good balance
- `gpt-3.5-turbo` - Faster, cheaper (may have issues with structured outputs)

## Performance Considerations

### Streaming

- **Chunk Size**: Small chunks for real-time feel
- **Buffering**: Disabled for immediate delivery
- **Connection**: Keep-alive for efficiency

### Structured Outputs

- **Caching**: Consider caching user-info.json in memory
- **Lazy Loading**: Load context only when needed
- **Validation**: Zod validation adds minimal overhead

## Testing

### Unit Tests

Test individual service functions:

```typescript
describe('loadUserInfo', () => {
  it('should load user info from JSON', () => {
    const info = loadUserInfo();
    expect(info.personalInfo.name).toBeDefined();
  });
});
```

### Integration Tests

Test LangChain integration:

```typescript
describe('streamChatResponse', () => {
  it('should stream responses', async () => {
    const generator = streamChatResponse('Hello', []);
    const first = await generator.next();
    expect(first.value.type).toBeDefined();
  });
});
```

## Best Practices

1. **Error Handling** - Always catch and handle errors
2. **Logging** - Log important events
3. **Validation** - Validate inputs and outputs
4. **Type Safety** - Use TypeScript types
5. **Resource Management** - Clean up connections

## Future Improvements

1. **Caching** - Cache user-info.json in memory
2. **Rate Limiting** - Add rate limiting middleware
3. **Retry Logic** - Automatic retries for API failures
4. **Monitoring** - Add metrics and monitoring
5. **Database** - Move user data to database

## See Also

- [API Documentation](./03-api-documentation.md)
- [Structured Outputs](./06-structured-outputs.md)
- [Configuration](./07-configuration.md)

