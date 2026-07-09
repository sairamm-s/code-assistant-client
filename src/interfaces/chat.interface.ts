export interface ChatCitation {
  filePath: string;
  startLine: number;
  endLine: number;
  snippet: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  citations: ChatCitation[] | null;
  createdAt: string;
}

export interface SendMessageResponseData {
  answer: string;
  citations: ChatCitation[];
}
