@~/.claude/skills/react.md

# Code Doc Assistant — Web Client

## Stack
Vite + React + TypeScript + Redux Toolkit + React Router + SCSS
API base: http://localhost:5000/api/v1

## Source structure
src/
  screens/            # one subfolder per screen: screens/{name}/{name}.screen.tsx + .screen.scss
  components/common/  # one subfolder per component: {name}/{name}.component.tsx + .component.scss
  models/             # {name}.model.ts — all API calls via axios.utils instance
  store/
    store.ts          # configureStore — add slices here as features are built
    store.hooks.ts    # useAppDispatch, useAppSelector
  interfaces/         # {name}.interface.ts per domain
  utils/
    axios.utils.ts    # shared axios instance with token injection + error interceptors
    functions.utils.ts # pure reusable helpers
  constants/
    strings.constant.ts  # all UI strings — never hardcode in JSX
  imports/
    assets.imports.ts    # all asset imports — never import assets directly in screens

## Screens (add one line per screen as features are built)
# none yet — add here as /feature creates them
[Planned per docs/PLAN.md Section 5: screens/ingest/ingest.screen.tsx, screens/chat/chat.screen.tsx]

## Components (add one line per component as features are built)
# none yet — add here as /feature creates them
[Planned per docs/PLAN.md Section 8: repo-url-form, file-upload, ingestion-progress, chat-message, citation-card, chat-input, repo-summary-badge]

## Models (add one line per model as features are built)
# none yet — add here as /feature creates them
[Planned: models/repository.model.ts, models/chat.model.ts]

## Store slices (add one line per slice as features are built)
# none yet — add here as /feature creates them
[Planned per docs/PLAN.md Section 6: store/repository.slice.ts, store/chat.slice.ts]

## Validation commands
npx tsc -b
npm run dev
npm run build
