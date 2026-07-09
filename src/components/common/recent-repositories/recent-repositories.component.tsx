import { FolderGit2 } from 'lucide-react';
import { RepositorySummary } from '../../../interfaces/repository.interface';
import './recent-repositories.component.scss';

interface RecentRepositoriesProps {
  repositories: RepositorySummary[];
  onSelect: (repository: RepositorySummary) => void;
}

const STATUS_LABEL: Record<RepositorySummary['status'], string> = {
  queued: 'Queued',
  cloning: 'Cloning',
  chunking: 'Chunking',
  embedding: 'Embedding',
  ready: 'Ready',
  failed: 'Failed',
};

const RecentRepositoriesComponent = ({ repositories, onSelect }: RecentRepositoriesProps) => {
  if (repositories.length === 0) return null;

  return (
    <div className="recent-repositories">
      <div className="recent-repositories__title">Recent Repositories</div>
      <div className="recent-repositories__list">
        {repositories.map((repository) => (
          <button
            key={repository.id}
            type="button"
            className="recent-repositories__item"
            onClick={() => onSelect(repository)}
          >
            <FolderGit2 size={16} strokeWidth={1.5} />
            <span className="recent-repositories__name">{repository.name}</span>
            <span className={`recent-repositories__status recent-repositories__status--${repository.status}`}>
              {STATUS_LABEL[repository.status]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecentRepositoriesComponent;
