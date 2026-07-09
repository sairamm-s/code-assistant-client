import { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import ButtonComponent from '../button/button.component';
import { STRINGS } from '../../../constants/strings.constant';
import './file-upload.component.scss';

interface FileUploadProps {
  onSubmit: (file: File) => void;
  maxSizeMB: number;
  submitting: boolean;
}

const FileUploadComponent = ({ onSubmit, maxSizeMB, submitting }: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.zip')) {
      setError('Only .zip files are supported');
      return;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`File exceeds ${maxSizeMB}MB limit`);
      return;
    }
    setError(null);
    onSubmit(file);
  };

  return (
    <div
      className={`file-upload${dragOver ? ' file-upload--drag' : ''}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        handleFile(e.dataTransfer.files[0]);
      }}
    >
      <div className="file-upload__icon">
        <Upload size={24} strokeWidth={1.5} />
      </div>
      <p className="file-upload__title">{STRINGS.ingest.dropZoneTitle}</p>
      <p className="file-upload__hint">{STRINGS.ingest.dropZoneHint}</p>
      {error && <p className="file-upload__error">{error}</p>}
      <input
        ref={inputRef}
        type="file"
        accept=".zip"
        hidden
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      <ButtonComponent variant="secondary" disabled={submitting} onClick={() => inputRef.current?.click()}>
        {STRINGS.ingest.selectFile}
      </ButtonComponent>
    </div>
  );
};

export default FileUploadComponent;
