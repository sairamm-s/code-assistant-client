import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../store/store.hooks';
import { setRepository } from '../../store/repository.slice';
import NavBarComponent from '../../components/common/nav-bar/nav-bar.component';
import TabsComponent from '../../components/common/tabs/tabs.component';
import RepoUrlFormComponent from '../../components/common/repo-url-form/repo-url-form.component';
import FileUploadComponent from '../../components/common/file-upload/file-upload.component';
import repositoryModel from '../../models/repository.model';
import { STRINGS } from '../../constants/strings.constant';
import './ingest.screen.scss';

const MAX_UPLOAD_SIZE_MB = 200;

const IngestScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') === 'github' ? 'github' : 'upload');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleIngested = (repositoryId: string) => {
    dispatch(setRepository({ id: repositoryId }));
    navigate(`/indexing/${repositoryId}`);
  };

  const handleGithubSubmit = async (url: string) => {
    setSubmitting(true);
    setError(null);
    try {
      const { repositoryId } = await repositoryModel.ingestGithub(url);
      handleIngested(repositoryId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start ingestion');
    } finally {
      setSubmitting(false);
    }
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
          <TabsComponent
            tabs={[
              { id: 'upload', label: STRINGS.ingest.tabUpload },
              { id: 'github', label: STRINGS.ingest.tabGithub },
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
          {activeTab === 'upload' ? (
            <FileUploadComponent onSubmit={handleUploadSubmit} maxSizeMB={MAX_UPLOAD_SIZE_MB} submitting={submitting} />
          ) : (
            <RepoUrlFormComponent onSubmit={handleGithubSubmit} submitting={submitting} />
          )}
          {error && <p className="ingest-screen__error">{error}</p>}
        </div>
      </main>
    </div>
  );
};

export default IngestScreen;
