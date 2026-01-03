import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useChat } from '@/hooks/useChat';
import ChatWindow from '@/components/chat/ChatWindow';

export default function Chat() {
  const [searchParams] = useSearchParams();
  const { messages, isLoading, sendMessage } = useChat();
  const initialQuery = searchParams.get('query');
  const hasSentInitialQuery = useRef(false);

  useEffect(() => {
    if (initialQuery && messages.length === 0 && !hasSentInitialQuery.current) {
      hasSentInitialQuery.current = true;
      sendMessage(initialQuery);
    }
  }, [initialQuery, messages.length, sendMessage]);

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

