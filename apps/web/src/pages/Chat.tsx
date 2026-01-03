import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useChat } from '@/hooks/useChat';
import ChatWindow from '@/components/chat/ChatWindow';
import { fetchCardData, type CardType } from '@/services/card.service';

export default function Chat() {
  const location = useLocation();
  const { messages, isLoading, sendMessage, addCardMessage } = useChat();
  const locationState = location.state as { initialQuery?: string; cardType?: CardType } | null;
  const initialQuery = locationState?.initialQuery;
  const cardType = locationState?.cardType;
  const hasSentInitialRequest = useRef(false);

  useEffect(() => {
    if (hasSentInitialRequest.current) return;
    
    if (cardType && messages.length === 0) {
      hasSentInitialRequest.current = true;
      // Fetch card data from API
      fetchCardData(cardType)
        .then(({ structuredData, message, projects }) => {
          // For projects, use the projects array if available, otherwise use structuredData
          if (cardType === 'projects' && projects && projects.length > 0) {
            // Create a custom message with all projects
            addCardMessage(structuredData, message, projects);
          } else {
            addCardMessage(structuredData, message);
          }
        })
        .catch((error) => {
          console.error('Error fetching card data:', error);
          // Fallback to regular chat
          sendMessage(`Tell me about ${cardType}`);
        });
    } else if (initialQuery && messages.length === 0) {
      hasSentInitialRequest.current = true;
      sendMessage(initialQuery);
    }
  }, [cardType, initialQuery, messages.length, sendMessage, addCardMessage]);

  return (
    <div className="h-screen">
      <ChatWindow
        messages={messages}
        onSend={sendMessage}
        isLoading={isLoading}
      />
    </div>
  );
}

