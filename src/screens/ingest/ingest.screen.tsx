import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/store.hooks';
import { setRepository } from '../../store/repository.slice';
import NavBarComponent from '../../components/common/nav-bar/nav-bar.component';
import FileUploadComponent from '../../components/common/file-upload/file-upload.component';
import repositoryModel from '../../models/repository.model';
import { STRINGS } from '../../constants/strings.constant';
import './ingest.screen.scss';

const MAX_UPLOAD_SIZE_MB = 200;

const IngestScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleIngested = (repositoryId: string) => {
    dispatch(setRepository({ id: repositoryId }));
    navigate(`/indexing/${repositoryId}`);
  };

  const handleUploadSubmit = async (file: File) => {
    setSubmitting(true);
    setError(null);
    try {
      const { repositoryId } = await repositoryModel.ingestUpload(file);
      handleIngested(repositoryId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start ingestion');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="ingest-screen">
      <NavBarComponent />
      <main className="ingest-screen__content">
        <div className="ingest-screen__card">
          <h1 className="ingest-screen__title">{STRINGS.ingest.title}</h1>
          <p className="ingest-screen__subtitle">{STRINGS.ingest.subtitle}</p>
          <FileUploadComponent onSubmit={handleUploadSubmit} maxSizeMB={MAX_UPLOAD_SIZE_MB} submitting={submitting} />
          {error && <p className="ingest-screen__error">{error}</p>}
        </div>
      </main>
    </div>
  );
};

export default IngestScreen;
