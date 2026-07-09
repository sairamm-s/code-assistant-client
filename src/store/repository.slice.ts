import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RepositoryStatus } from '../interfaces/repository.interface';

interface RepositoryState {
  id: string | null;
  name: string | null;
  status: RepositoryStatus;
  errorMessage: string | null;
  fileCount: number;
}

const initialState: RepositoryState = {
  id: null,
  name: null,
  status: 'queued',
  errorMessage: null,
  fileCount: 0,
};

const repositorySlice = createSlice({
  name: 'repository',
  initialState,
  reducers: {
    setRepository: (state, action: PayloadAction<{ id: string; name?: string }>) => {
      state.id = action.payload.id;
      state.name = action.payload.name ?? state.name;
      state.status = 'queued';
      state.errorMessage = null;
      state.fileCount = 0;
    },
    setStatus: (
      state,
      action: PayloadAction<{ status: RepositoryStatus; name?: string; fileCount?: number; errorMessage?: string | null }>,
    ) => {
      state.status = action.payload.status;
      if (action.payload.name !== undefined) state.name = action.payload.name;
      if (action.payload.fileCount !== undefined) state.fileCount = action.payload.fileCount;
      if (action.payload.errorMessage !== undefined) state.errorMessage = action.payload.errorMessage;
    },
    resetRepository: () => initialState,
  },
});

export const { setRepository, setStatus, resetRepository } = repositorySlice.actions;
export default repositorySlice.reducer;
