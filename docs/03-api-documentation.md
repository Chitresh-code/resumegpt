# API Documentation

Complete API reference for the AI Portfolio backend.

## Base URL

```
Development: http://localhost:4000
Production: https://your-api-domain.com
```

## Authentication

Currently, no authentication is required. In production, consider adding API keys or JWT tokens.

## Endpoints

### POST /api/chat

Streams AI chat responses with structured outputs.

#### Request

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "message": "Tell me about your projects",
  "conversationHistory": [
    {
      "role": "user",
      "content": "Hello"
    },
    {
      "role": "assistant",
      "content": "Hi! How can I help you?"
    }
  ]
}
```

**Parameters:**
- `message` (string, required) - User's message (max 5000 characters)
- `conversationHistory` (array, optional) - Previous messages for context (max 50 messages)

#### Response

**Content-Type:** `text/event-stream` (Server-Sent Events)

**Event Format:**
```
data: {"type": "structuredData", "data": {...}}
data: {"type": "message", "data": "chunk1"}
data: {"type": "message", "data": "chunk2"}
...
data: [DONE]
```

**Event Types:**

1. **structuredData** - Component data (sent first if applicable)
   ```json
   {
     "type": "structuredData",
     "data": {
       "type": "project",
       "title": "AI Portfolio",
       "description": "...",
       "year": 2024,
       "technologies": ["React", "TypeScript"],
       "links": [...]
     }
   }
   ```

2. **message** - Streaming text chunks
   ```json
   {
     "type": "message",
     "data": "Here are my projects..."
   }
   ```

3. **error** - Error message (if something goes wrong)
   ```json
   {
     "type": "error",
     "data": {
       "message": "Error description"
     }
   }
   ```

4. **[DONE]** - Signals end of stream

#### Example Request

```bash
curl -X POST http://localhost:4000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What are your skills?",
    "conversationHistory": []
  }'
```

#### Example Response (SSE)

```
data: {"type":"structuredData","data":{"type":"skill","category":"Tech & Product","skills":["Product vision","Startup","Mobile App","AI & AGI"]}}

data: {"type":"message","data":"Here are my skills"}

data: {"type":"message","data":" categorized"}

data: {"type":"message","data":" by area:"}

data: [DONE]
```

#### Status Codes

- `200` - Success (streaming)
- `400` - Bad Request (missing message, message too long, etc.)
- `500` - Internal Server Error

#### Error Responses

```json
{
  "error": "Message is required"
}
```

```json
{
  "error": "Message is too long (max 5000 characters)"
}
```

### GET /health

Health check endpoint.

#### Request

```bash
GET /health
```

#### Response

```json
{
  "status": "ok",
  "timestamp": "2024-01-03T12:00:00.000Z"
}
```

## Structured Output Types

The API can return different types of structured data based on the query:

### Project Card

Triggered by queries about projects.

```json
{
  "type": "project",
  "title": "Project Name",
  "description": "Project description",
  "year": 2024,
  "technologies": ["React", "TypeScript"],
  "links": [
    {
      "label": "GitHub",
      "url": "https://github.com/..."
    }
  ]
}
```

### Skill Card

Triggered by queries about skills.

```json
{
  "type": "skill",
  "category": "Tech & Product",
  "skills": ["Skill 1", "Skill 2", "Skill 3"]
}
```

### Contact Card

Triggered by queries about contact information.

```json
{
  "type": "contact",
  "email": "email@example.com",
  "phone": "+1 (555) 123-4567",
  "location": "San Francisco, CA",
  "socialLinks": [
    {
      "platform": "LinkedIn",
      "url": "https://linkedin.com/..."
    }
  ]
}
```

### Resume Card

Triggered by queries about resume.

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

### Info Card

General information card.

```json
{
  "type": "info",
  "title": "Title",
  "content": "Content here",
  "metadata": {}
}
```

## Rate Limiting

Currently not implemented. Consider adding rate limiting for production:

- Per IP: 100 requests per minute
- Per API key: 1000 requests per hour

## CORS Configuration

The API allows requests from:
- Development: `http://localhost:5173`, `http://localhost:3000`
- Production: Configured via `FRONTEND_URL` environment variable

## Request Validation

- **Message length**: Max 5000 characters
- **Conversation history**: Max 50 messages
- **Content-Type**: Must be `application/json`

## Streaming Behavior

1. **Connection**: Keep-alive connection
2. **Chunking**: Messages streamed in chunks
3. **Buffering**: Disabled for real-time delivery
4. **Timeout**: No timeout (connection stays open until complete)

## Error Handling

Errors are returned in two ways:

1. **HTTP Status Code** - For request-level errors (400, 500)
2. **SSE Error Event** - For streaming errors

```json
{
  "type": "error",
  "data": {
    "message": "OpenAI API error: Rate limit exceeded"
  }
}
```

## Best Practices

1. **Handle SSE properly** - Use EventSource or fetch with ReadableStream
2. **Error handling** - Always check for error events
3. **Connection management** - Close connections when done
4. **Retry logic** - Implement retry for failed requests
5. **Timeout handling** - Set reasonable timeouts

## Example Client Implementation

### JavaScript/TypeScript

```typescript
async function streamChat(message: string) {
  const response = await fetch('http://localhost:4000/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, conversationHistory: [] }),
  });

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value);
    const lines = chunk.split('\n');

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const data = line.slice(6);
        if (data === '[DONE]') continue;
        
        const parsed = JSON.parse(data);
        // Handle parsed.type and parsed.data
      }
    }
  }
}
```

## See Also

- [Backend Services](./05-backend-services.md)
- [Structured Outputs](./06-structured-outputs.md)
- [Configuration](./07-configuration.md)

