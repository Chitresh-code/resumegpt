import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts';
import { HumanMessage, AIMessage } from '@langchain/core/messages';
import { StructuredOutputSchema } from '../schemas/structured-output.schema';
import { loadUserInfo, formatUserInfoForPrompt } from './context.service';

const streamingModel = new ChatOpenAI({
  modelName: process.env.OPENAI_MODEL || 'gpt-4o',
  temperature: 0.7,
  streaming: true,
});

const structuredModel = new ChatOpenAI({
  modelName: process.env.OPENAI_MODEL || 'gpt-4o',
  temperature: 0.7,
  streaming: false,
});

const systemPrompt = formatUserInfoForPrompt(loadUserInfo());

const prompt = ChatPromptTemplate.fromMessages([
  ['system', systemPrompt],
  new MessagesPlaceholder('chat_history'),
  ['human', '{input}'],
]);

function shouldGenerateStructuredOutput(input: string): string | null {
  const lowerInput = input.toLowerCase();
  if (lowerInput.includes('project') || lowerInput.includes('show me') && lowerInput.includes('project')) {
    return 'project';
  }
  if (lowerInput.includes('skill') || lowerInput.includes('what are your skills')) {
    return 'skill';
  }
  if (lowerInput.includes('contact') || lowerInput.includes('how can i contact')) {
    return 'contact';
  }
  if (lowerInput.includes('resume') || lowerInput.includes('cv')) {
    return 'resume';
  }
  return null;
}

export async function* streamChatResponse(
  input: string,
  chatHistory: Array<{ role: string; content: string }>
): AsyncGenerator<{ type: string; data: any }, void, unknown> {
  const formattedHistory = chatHistory.map((msg) => {
    if (msg.role === 'user') {
      return new HumanMessage(msg.content);
    } else {
      return new AIMessage(msg.content);
    }
  });

  const structuredType = shouldGenerateStructuredOutput(input);
  let structuredData: any = null;

  // First, generate structured output if needed
  if (structuredType) {
    try {
      const structuredPrompt = ChatPromptTemplate.fromMessages([
        ['system', systemPrompt + '\n\nGenerate structured output for the user query. Return only valid JSON matching the schema.'],
        new MessagesPlaceholder('chat_history'),
        ['human', '{input}'],
      ]);

      const structuredChain = structuredPrompt.pipe(
        structuredModel.withStructuredOutput(StructuredOutputSchema)
      );

      structuredData = await structuredChain.invoke({
        input,
        chat_history: formattedHistory,
      });

      if (structuredData) {
        yield { type: 'structuredData', data: structuredData };
      }
    } catch (error) {
      console.error('Error generating structured output:', error);
      // Continue with regular streaming if structured output fails
    }
  }

  // Then stream the message response
  try {
    const chain = prompt.pipe(streamingModel);
    const stream = await chain.stream({
      input,
      chat_history: formattedHistory,
    });

    for await (const chunk of stream) {
      const content = chunk.content;
      if (content) {
        yield { type: 'message', data: content };
      }
    }
  } catch (error) {
    console.error('Error in streamChatResponse:', error);
    throw error;
  }
}

