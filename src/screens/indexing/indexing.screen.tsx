import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Compass, History, Search, Settings } from 'lucide-react';
import NavBarComponent from '../../components/common/nav-bar/nav-bar.component';
import SidebarNavComponent from '../../components/common/sidebar-nav/sidebar-nav.component';
import PipelineStepComponent from '../../components/common/pipeline-step/pipeline-step.component';
import StatTileComponent from '../../components/common/stat-tile/stat-tile.component';
import ButtonComponent from '../../components/common/button/button.component';
import { useAppDispatch, useAppSelector } from '../../store/store.hooks';
import { setStatus } from '../../store/repository.slice';
import repositoryModel from '../../models/repository.model';
import { RepositoryStatus } from '../../interfaces/repository.interface';
import { STRINGS } from '../../constants/strings.constant';
import './indexing.screen.scss';

const STAGE_ORDER: RepositoryStatus[] = ['queued', 'cloning', 'chunking', 'embedding', 'ready'];
const POLL_INTERVAL_MS = 2000;

const stepState = (stage: RepositoryStatus, currentStatus: RepositoryStatus): 'done' | 'active' | 'pending' | 'failed' => {
  if (currentStatus === 'failed') return stage === 'failed' ? 'failed' : 'pending';
  const stageIndex = STAGE_ORDER.indexOf(stage);
  const currentIndex = STAGE_ORDER.indexOf(currentStatus);
  if (stageIndex < currentIndex) return 'done';
  if (stageIndex === currentIndex) return 'active';
  return 'pending';
};

const IndexingScreen = () => {
  const { repositoryId } = useParams<{ repositoryId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const repository = useAppSelector((state) => state.repository);
  const [polling, setPolling] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!repositoryId) return;

    const poll = async () => {
      try {
        const data = await repositoryModel.getRepository(repositoryId);
        dispatch(setStatus({ status: data.status, name: data.name, fileCount: data.fileCount, errorMessage: data.errorMessage }));

        if (data.status === 'ready' || data.status === 'failed') {
          setPolling(false);
          if (intervalRef.current) clearInterval(intervalRef.current);
          if (data.status === 'ready') navigate(`/chat/${repositoryId}`);
        }
      } catch {
        setPolling(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    };

    poll();
    intervalRef.current = setInterval(poll, POLL_INTERVAL_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [repositoryId, dispatch, navigate]);

  const handleRetry = () => navigate('/ingest');

  return (
    <div className="indexing-screen">
      <NavBarComponent />
      <div className="indexing-screen__body">
        <SidebarNavComponent
          items={[
            { icon: Compass, label: 'Explorer', active: true },
            { icon: Search, label: 'Search' },
            { icon: History, label: 'History' },
            { icon: Settings, label: 'Settings' },
          ]}
        />
        <main className="indexing-screen__content">
          <h1 className="indexing-screen__title">{STRINGS.indexing.title}</h1>
          <p className="indexing-screen__subtitle">{STRINGS.indexing.subtitle}</p>

          <div className="indexing-screen__pipeline">
            <PipelineStepComponent
              label={STRINGS.indexing.stages.cloning}
              description="Cloning or extracting the repository"
              state={stepState('cloning', repository.status)}
            />
            <PipelineStepComponent
              label={STRINGS.indexing.stages.chunking}
              description="Splitting files into structure-aware chunks"
              state={stepState('chunking', repository.status)}
            />
            <PipelineStepComponent
              label={STRINGS.indexing.stages.embedding}
              description="Generating vector embeddings for retrieval"
              state={stepState('embedding', repository.status)}
            />
            <PipelineStepComponent
              label={STRINGS.indexing.stages.ready}
              description="Repository fully indexed and searchable"
              state={stepState('ready', repository.status)}
            />
          </div>

          {repository.status === 'failed' && (
            <div className="indexing-screen__failed">
              <p>{repository.errorMessage || 'Ingestion failed'}</p>
              <ButtonComponent onClick={handleRetry}>{STRINGS.indexing.retry}</ButtonComponent>
            </div>
          )}

          {!polling && repository.status === 'ready' && (
            <ButtonComponent onClick={() => navigate(`/chat/${repositoryId}`)}>{STRINGS.indexing.goToChat}</ButtonComponent>
          )}
        </main>
        <aside className="indexing-screen__stats">
          <div className="indexing-screen__stats-title">{STRINGS.indexing.statsTitle}</div>
          <StatTileComponent label={STRINGS.indexing.filesLabel} value={repository.fileCount} />
        </aside>
      </div>
    </div>
  );
};

export default IndexingScreen;
