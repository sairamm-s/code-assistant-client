import { Check, CircleDashed, Loader2, X } from 'lucide-react';
import './pipeline-step.component.scss';

type PipelineStepState = 'done' | 'active' | 'pending' | 'failed';

interface PipelineStepProps {
  label: string;
  description: string;
  state: PipelineStepState;
  durationMs?: number;
}

const ICONS: Record<PipelineStepState, React.ReactNode> = {
  done: <Check size={16} strokeWidth={2} />,
  active: <Loader2 size={16} strokeWidth={2} className="pipeline-step__spin" />,
  pending: <CircleDashed size={16} strokeWidth={1.5} />,
  failed: <X size={16} strokeWidth={2} />,
};

const PipelineStepComponent = ({ label, description, state, durationMs }: PipelineStepProps) => (
  <div className={`pipeline-step pipeline-step--${state}`}>
    <div className="pipeline-step__icon">{ICONS[state]}</div>
    <div className="pipeline-step__body">
      <div className="pipeline-step__label">{label}</div>
      <div className="pipeline-step__description">{description}</div>
    </div>
    {durationMs !== undefined && <div className="pipeline-step__duration">{(durationMs / 1000).toFixed(1)}s</div>}
  </div>
);

export default PipelineStepComponent;
