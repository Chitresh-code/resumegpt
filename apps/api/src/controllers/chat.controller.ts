import { Request, Response } from 'express';
import { streamChatResponse } from '../services/llm.service';

export async function chatController(req: Request, res: Response) {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Validate message length
    if (message.length > 5000) {
      return res.status(400).json({ error: 'Message is too long (max 5000 characters)' });
    }

    // Validate conversation history length
    if (Array.isArray(conversationHistory) && conversationHistory.length > 50) {
      return res.status(400).json({ error: 'Conversation history is too long (max 50 messages)' });
    }

    // Set headers for SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no'); // Disable buffering in nginx
    // CORS headers for SSE
    const origin = req.headers.origin;
    if (origin) {
      res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    }

    const sendSSE = (type: string, data: any) => {
      res.write(`data: ${JSON.stringify({ type, data })}\n\n`);
    };

    try {
      for await (const chunk of streamChatResponse(message, conversationHistory)) {
        sendSSE(chunk.type, chunk.data);
      }
      
      // Send done signal
      res.write('data: [DONE]\n\n');
      res.end();
    } catch (error: any) {
      console.error('Error streaming response:', error);
      sendSSE('error', { message: error.message || 'An error occurred' });
      res.end();
    }
  } catch (error: any) {
    console.error('Error in chatController:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: error.message || 'Internal server error' });
    }
  }
}

