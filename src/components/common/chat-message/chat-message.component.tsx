import ReactMarkdown from 'react-markdown';
import CitationCardComponent from '../citation-card/citation-card.component';
import { ChatCitation } from '../../../interfaces/chat.interface';
import { STRINGS } from '../../../constants/strings.constant';
import './chat-message.component.scss';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  citations: ChatCitation[] | null;
}

const ChatMessageComponent = ({ role, content, citations }: ChatMessageProps) => (
  <div className={`chat-message chat-message--${role}`}>
    <div className="chat-message__role">{role === 'user' ? 'You' : STRINGS.brand.name}</div>
    <div className="chat-message__content">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
    {citations && citations.length > 0 && (
      <div className="chat-message__citations">
        <div className="chat-message__citations-title">{STRINGS.chat.citationsTitle}</div>
        {citations.map((citation) => (
          <CitationCardComponent
            key={`${citation.filePath}-${citation.startLine}`}
            filePath={citation.filePath}
            startLine={citation.startLine}
            endLine={citation.endLine}
            snippet={citation.snippet}
          />
        ))}
      </div>
    )}
  </div>
);

export default ChatMessageComponent;
