import request from 'supertest';
import app from '../app';

describe('Chat Endpoint', () => {
  it('should return 400 if message is missing', async () => {
    const response = await request(app)
      .post('/api/chat')
      .send({ conversationHistory: [] })
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toContain('Message is required');
  });

  it('should return 400 if message is not a string', async () => {
    const response = await request(app)
      .post('/api/chat')
      .send({ message: 123, conversationHistory: [] })
      .expect(400);

    expect(response.body).toHaveProperty('error');
  });

  it('should return 400 if message is too long', async () => {
    const longMessage = 'a'.repeat(5001);
    const response = await request(app)
      .post('/api/chat')
      .send({ message: longMessage, conversationHistory: [] })
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toContain('too long');
  });

  it('should return 400 if conversation history is too long', async () => {
    const longHistory = Array(51).fill({ role: 'user', content: 'test' });
    const response = await request(app)
      .post('/api/chat')
      .send({ message: 'test', conversationHistory: longHistory })
      .expect(400);

    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toContain('too long');
  });

  it('should accept valid message', async () => {
    // Note: This test requires OPENAI_API_KEY to be set
    // It may fail in CI if key is not available
    if (!process.env.OPENAI_API_KEY) {
      console.log('Skipping chat test - OPENAI_API_KEY not set');
      return;
    }

    const response = await request(app)
      .post('/api/chat')
      .send({ message: 'Hello', conversationHistory: [] })
      .expect(200);

    expect(response.headers['content-type']).toContain('text/event-stream');
  });

  it('should accept conversation history', async () => {
    if (!process.env.OPENAI_API_KEY) {
      console.log('Skipping chat test - OPENAI_API_KEY not set');
      return;
    }

    const response = await request(app)
      .post('/api/chat')
      .send({
        message: 'Tell me more',
        conversationHistory: [
          { role: 'user', content: 'Hello' },
          { role: 'assistant', content: 'Hi there!' },
        ],
      })
      .expect(200);

    expect(response.headers['content-type']).toContain('text/event-stream');
  });
});

