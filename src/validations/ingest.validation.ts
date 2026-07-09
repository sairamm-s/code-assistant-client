import * as yup from 'yup';

export const githubUrlValidation = yup.object({
  url: yup
    .string()
    .required('A GitHub repository URL is required')
    .matches(/^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/?$/, 'Must be a valid GitHub repository URL (https://github.com/owner/repo)'),
});
