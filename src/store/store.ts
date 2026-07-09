import { configureStore, combineReducers } from '@reduxjs/toolkit';
import repositoryReducer from './repository.slice';
import chatReducer from './chat.slice';

const rootReducer = combineReducers({
  repository: repositoryReducer,
  chat: chatReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
