export const STRINGS = {
  brand: {
    name: 'DevDoc AI',
  },
  landing: {
    badge: 'AI-Powered Code Understanding',
    heading: 'Understand Any',
    headingAccent: 'Codebase',
    headingSuffix: 'with AI',
    subtitle:
      'Upload a ZIP of your codebase and instantly ask questions about the code. Navigate complex logic, find where things are implemented, and understand dependencies in seconds.',
    uploadCta: 'Upload Repository',
  },
  ingest: {
    title: 'Index New Repository',
    subtitle: 'Upload your codebase to start generating documentation.',
    dropZoneTitle: 'Drop your ZIP here',
    dropZoneHint: 'Max file size 200MB. Only .zip archives supported.',
    selectFile: 'Select File',
    githubLabel: 'GitHub repository URL',
    githubPlaceholder: 'https://github.com/owner/repo',
    submit: 'Start Indexing',
    submitting: 'Starting...',
  },
  indexing: {
    title: 'Indexing Repository',
    subtitle: 'Cloning, chunking, and embedding your codebase.',
    stages: {
      queued: 'Queued',
      cloning: 'Cloning repository',
      chunking: 'Chunking source files',
      embedding: 'Generating embeddings',
      ready: 'Ready',
      failed: 'Failed',
    },
    statsTitle: 'Live Statistics',
    filesLabel: 'Files indexed',
    retry: 'Try again',
    goToChat: 'Open chat',
  },
  chat: {
    placeholder: 'Ask about your codebase...',
    send: 'Send',
    emptyState: 'Ask a question about this codebase to get started.',
    citationsTitle: 'Sources',
    filesTitle: 'Files',
  },
};
