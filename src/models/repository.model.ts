import api from '../utils/axios.utils';
import { IngestResponseData, RepositorySummary } from '../interfaces/repository.interface';

interface ApiEnvelope<T> {
  status: string;
  data: T;
  message?: string;
}

const repository = {
  ingestGithub: (url: string): Promise<IngestResponseData> =>
    api
      .post<ApiEnvelope<IngestResponseData>>('/repository/ingest', { source: 'github', url })
      .then((r) => r.data.data),

  ingestUpload: (file: File): Promise<IngestResponseData> => {
    const formData = new FormData();
    formData.append('file', file);
    return api
      .post<ApiEnvelope<IngestResponseData>>('/repository/ingest/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((r) => r.data.data);
  },

  getRepository: (id: string): Promise<RepositorySummary> =>
    api.get<ApiEnvelope<RepositorySummary>>(`/repository/${id}`).then((r) => r.data.data),

  listRepositories: (): Promise<RepositorySummary[]> =>
    api
      .get<ApiEnvelope<{ repositories: RepositorySummary[] }>>('/repository')
      .then((r) => r.data.data.repositories),
};

export default repository;
