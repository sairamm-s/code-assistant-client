export type RepositoryStatus = 'queued' | 'cloning' | 'chunking' | 'embedding' | 'ready' | 'failed';

export interface RepositorySummary {
  id: string;
  name: string;
  source: string;
  status: RepositoryStatus;
  fileCount: number;
  errorMessage: string | null;
}

export interface IngestGithubBody {
  source: 'github';
  url: string;
}

export interface IngestResponseData {
  repositoryId: string;
}
