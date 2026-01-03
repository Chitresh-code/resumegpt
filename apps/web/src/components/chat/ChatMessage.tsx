import { ChatMessage as ChatMessageType } from '@/types/structured-outputs';
import CardRenderer from '@/components/cards/CardRenderer';
import StreamingMessage from './StreamingMessage';

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className="mb-6">
      {message.role === 'user' ? (
        <div className="flex justify-end">
          <div className="max-w-[80%] rounded-lg bg-gray-200 dark:bg-gray-700 px-4 py-3">
            <p className="text-sm">{message.content}</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {message.structuredData && (
            <div className="max-w-4xl">
              <CardRenderer data={message.structuredData} />
            </div>
          )}
          {message.content && (
            <div className="max-w-4xl">
              <StreamingMessage content={message.content} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

