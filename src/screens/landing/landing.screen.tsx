import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GitBranch, Upload } from 'lucide-react';
import NavBarComponent from '../../components/common/nav-bar/nav-bar.component';
import ButtonComponent from '../../components/common/button/button.component';
import RecentRepositoriesComponent from '../../components/common/recent-repositories/recent-repositories.component';
import { useAppDispatch } from '../../store/store.hooks';
import { setRepository, setStatus } from '../../store/repository.slice';
import repositoryModel from '../../models/repository.model';
import { RepositorySummary } from '../../interfaces/repository.interface';
import { STRINGS } from '../../constants/strings.constant';
import './landing.screen.scss';

const LandingScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [repositories, setRepositories] = useState<RepositorySummary[]>([]);

  useEffect(() => {
    repositoryModel.listRepositories().then(setRepositories).catch(() => undefined);
  }, []);

  const handleSelectRepository = (repository: RepositorySummary) => {
    dispatch(setRepository({ id: repository.id, name: repository.name }));
    dispatch(setStatus({ status: repository.status, fileCount: repository.fileCount, errorMessage: repository.errorMessage }));

    // 'failed' also routes to /indexing — that screen already shows the
    // error + retry action for that status.
    navigate(repository.status === 'ready' ? `/chat/${repository.id}` : `/indexing/${repository.id}`);
  };

  return (
    <div className="landing-screen">
      <NavBarComponent />
      <main className="landing-screen__hero">
        <span className="landing-screen__badge">{STRINGS.landing.badge}</span>
        <h1 className="landing-screen__heading">
          {STRINGS.landing.heading} <span className="landing-screen__heading-accent">{STRINGS.landing.headingAccent}</span>{' '}
          {STRINGS.landing.headingSuffix}
        </h1>
        <p className="landing-screen__subtitle">{STRINGS.landing.subtitle}</p>
        <div className="landing-screen__actions">
          <ButtonComponent onClick={() => navigate('/ingest?tab=upload')}>
            <Upload size={16} strokeWidth={1.5} />
            {STRINGS.landing.uploadCta}
          </ButtonComponent>
          <ButtonComponent variant="secondary" onClick={() => navigate('/ingest?tab=github')}>
            <GitBranch size={16} strokeWidth={1.5} />
            {STRINGS.landing.githubCta}
          </ButtonComponent>
        </div>
        <RecentRepositoriesComponent repositories={repositories} onSelect={handleSelectRepository} />
      </main>
    </div>
  );
};

export default LandingScreen;
