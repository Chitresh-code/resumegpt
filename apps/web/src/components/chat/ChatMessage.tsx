import type { ChatMessage as ChatMessageType } from '@/types/structured-outputs';
import CardRenderer from '@/components/cards/CardRenderer';
import StreamingMessage from './StreamingMessage';

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className="mb-6">
      {message.role === 'user' ? (
        <div className="flex justify-end mb-2">
          <div className="max-w-[75%] rounded-2xl rounded-br-md bg-gradient-to-br from-purple-500 to-purple-600 px-5 py-3 shadow-lg">
            <p className="text-sm text-white font-medium">{message.content}</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {message.structuredData && (
            <div className="max-w-full">
              <CardRenderer 
                data={message.structuredData} 
                projects={(message as any).projects}
              />
            </div>
          )}
          {message.content && (
            <div className="max-w-full">
              <div className="rounded-2xl rounded-tl-md bg-white border border-gray-200 shadow-sm px-5 py-4">
                <StreamingMessage content={message.content} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

