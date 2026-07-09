import './citation-card.component.scss';

interface CitationCardProps {
  filePath: string;
  startLine: number;
  endLine: number;
  snippet: string;
}

const CitationCardComponent = ({ filePath, startLine, endLine, snippet }: CitationCardProps) => (
  <details className="citation-card">
    <summary className="citation-card__summary">
      {filePath}:{startLine}-{endLine}
    </summary>
    <pre className="citation-card__snippet">
      <code>{snippet}</code>
    </pre>
  </details>
);

export default CitationCardComponent;
