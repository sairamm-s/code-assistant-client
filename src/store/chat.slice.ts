import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatMessage } from '../interfaces/chat.interface';

interface ChatState {
  messages: ChatMessage[];
  sending: boolean;
}

const initialState: ChatState = {
  messages: [],
  sending: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<ChatMessage[]>) => {
      state.messages = action.payload;
    },
    appendMessage: (state, action: PayloadAction<ChatMessage>) => {
      state.messages.push(action.payload);
    },
    setSending: (state, action: PayloadAction<boolean>) => {
      state.sending = action.payload;
    },
    resetChat: () => initialState,
  },
});

export const { setMessages, appendMessage, setSending, resetChat } = chatSlice.actions;
export default chatSlice.reducer;
