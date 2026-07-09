import api from '../utils/axios.utils';
import { ChatMessage, SendMessageResponseData } from '../interfaces/chat.interface';

interface ApiEnvelope<T> {
  status: string;
  data: T;
  message?: string;
}

const chat = {
  sendMessage: (repositoryId: string, message: string): Promise<SendMessageResponseData> =>
    api
      .post<ApiEnvelope<SendMessageResponseData>>(`/chat/${repositoryId}/message`, { message })
      .then((r) => r.data.data),

  getHistory: (repositoryId: string): Promise<ChatMessage[]> =>
    api
      .get<ApiEnvelope<{ messages: ChatMessage[] }>>(`/chat/${repositoryId}/history`)
      .then((r) => r.data.data.messages),
};

export default chat;
