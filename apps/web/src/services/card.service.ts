import type { StructuredOutput, ChatMessage } from '@/types/structured-outputs';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

export type CardType = 'me' | 'projects' | 'skills' | 'contact' | 'resume' | 'fun';

export async function fetchCardData(cardType: CardType): Promise<{ structuredData: StructuredOutput; message: string; projects?: any[] }> {
  const response = await fetch(`${API_URL}/api/cards/${cardType}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${cardType} card data`);
  }

  const data = await response.json();
  return {
    structuredData: data.structuredData,
    message: data.message,
    projects: data.projects,
  };
}

