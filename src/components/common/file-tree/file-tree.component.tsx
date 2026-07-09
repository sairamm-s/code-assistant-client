import { FileText } from 'lucide-react';
import { STRINGS } from '../../../constants/strings.constant';
import './file-tree.component.scss';

interface FileTreeProps {
  filePaths: string[];
  selectedPath?: string;
  onSelect: (path: string) => void;
}

const FileTreeComponent = ({ filePaths, selectedPath, onSelect }: FileTreeProps) => (
  <div className="file-tree">
    <div className="file-tree__title">{STRINGS.chat.filesTitle}</div>
    {filePaths.length === 0 && <p className="file-tree__empty">No files referenced yet</p>}
    {filePaths.map((path) => (
      <button
        key={path}
        type="button"
        className={`file-tree__item${path === selectedPath ? ' file-tree__item--active' : ''}`}
        onClick={() => onSelect(path)}
        title={path}
      >
        <FileText size={14} strokeWidth={1.5} />
        <span className="file-tree__item-label">{path}</span>
      </button>
    ))}
  </div>
);

export default FileTreeComponent;
