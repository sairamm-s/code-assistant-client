import { configureStore, combineReducers } from '@reduxjs/toolkit';

// slice reducers added by /feature (repository.slice.ts, chat.slice.ts per docs/PLAN.md Section 6)
const rootReducer = combineReducers({});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
