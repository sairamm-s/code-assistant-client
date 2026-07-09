import './repo-summary-badge.component.scss';

interface RepoSummaryBadgeProps {
  name: string;
  fileCount: number;
}

const RepoSummaryBadgeComponent = ({ name, fileCount }: RepoSummaryBadgeProps) => (
  <div className="repo-summary-badge">
    <span className="repo-summary-badge__name">{name}</span>
    <span className="repo-summary-badge__count">{fileCount} files</span>
  </div>
);

export default RepoSummaryBadgeComponent;
