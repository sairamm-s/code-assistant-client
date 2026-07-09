import { useState } from 'react';
import * as yup from 'yup';
import ButtonComponent from '../button/button.component';
import { githubUrlValidation } from '../../../validations/ingest.validation';
import { STRINGS } from '../../../constants/strings.constant';
import './repo-url-form.component.scss';

interface RepoUrlFormProps {
  onSubmit: (url: string) => void;
  submitting: boolean;
}

const RepoUrlFormComponent = ({ onSubmit, submitting }: RepoUrlFormProps) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await githubUrlValidation.validate({ url: url.trim() });
      setError(null);
      onSubmit(url.trim());
    } catch (err) {
      if (err instanceof yup.ValidationError) setError(err.message);
    }
  };

  return (
    <form className="repo-url-form" onSubmit={handleSubmit}>
      <label className="repo-url-form__label" htmlFor="repo-url">
        {STRINGS.ingest.githubLabel}
      </label>
      <input
        id="repo-url"
        className="repo-url-form__input"
        type="text"
        placeholder={STRINGS.ingest.githubPlaceholder}
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      {error && <p className="repo-url-form__error">{error}</p>}
      <ButtonComponent type="submit" disabled={submitting || !url.trim()}>
        {submitting ? STRINGS.ingest.submitting : STRINGS.ingest.submit}
      </ButtonComponent>
    </form>
  );
};

export default RepoUrlFormComponent;
