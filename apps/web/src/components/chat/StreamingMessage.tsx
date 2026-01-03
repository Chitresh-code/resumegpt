import { Message, MessageContent, MessageResponse } from '@/components/ai-elements/message';

interface StreamingMessageProps {
  content: string;
}

export default function StreamingMessage({ content }: StreamingMessageProps) {
  return (
    <Message from="assistant">
      <MessageContent>
        <MessageResponse>{content}</MessageResponse>
      </MessageContent>
    </Message>
  );
}

