import { ChatCitation } from '../../../interfaces/chat.interface';
import './retrieval-context-panel.component.scss';

interface RetrievalContextPanelProps {
  citations: ChatCitation[];
}

// Similarity score, token usage, and latency are logged server-side for
// observability but not returned by the chat API response — this panel
// only shows what's actually available to the client (see docs/PLAN.md
// Section 11 and this feature's plan for why).
const RetrievalContextPanelComponent = ({ citations }: RetrievalContextPanelProps) => (
  <div className="retrieval-context-panel">
    <div className="retrieval-context-panel__title">Retrieval Context</div>
    <div className="retrieval-context-panel__stat">
      <span>Sources used</span>
      <strong>{citations.length}</strong>
    </div>
    {citations.map((citation) => (
      <div key={`${citation.filePath}-${citation.startLine}`} className="retrieval-context-panel__chunk">
        {citation.filePath}:{citation.startLine}-{citation.endLine}
      </div>
    ))}
  </div>
);

export default RetrievalContextPanelComponent;
