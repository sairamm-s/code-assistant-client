@~/.claude/skills/react.md

# DevDoc AI — Web Client

## Stack
Vite + React + TypeScript + Redux Toolkit + React Router + SCSS + lucide-react + react-markdown
API base: http://localhost:5050/api/v1

## Source structure
src/
  screens/            # one subfolder per screen: screens/{name}/{name}.screen.tsx + .screen.scss
  components/common/  # one subfolder per component: {name}/{name}.component.tsx + .component.scss
  models/             # {name}.model.ts — all API calls via axios.utils instance
  store/
    store.ts          # configureStore — add slices here as features are built
    store.hooks.ts    # useAppDispatch, useAppSelector
  interfaces/         # {name}.interface.ts per domain
  validations/        # Yup schemas per form
  themes/
    theme.scss        # design system CSS custom properties (imported once in main.tsx)
  utils/
    axios.utils.ts    # shared axios instance with token injection + error interceptors
    functions.utils.ts # pure reusable helpers
  constants/
    strings.constant.ts  # all UI strings — never hardcode in JSX
  imports/
    assets.imports.ts    # all asset imports — never import assets directly in screens

## Screens
screens/landing/landing.screen.tsx — route `/` — hero + CTAs, navigates to /ingest with a tab hint query param; also fetches + lists recent repositories (recent-repositories.component.tsx), selecting one dispatches repository state and navigates to /chat/:id (ready) or /indexing/:id (in progress/failed)
screens/ingest/ingest.screen.tsx — route `/ingest` — tabbed GitHub URL (Yup-validated) / ZIP upload form, POSTs to repository model, navigates to /indexing/:id on success
screens/indexing/indexing.screen.tsx — route `/indexing/:repositoryId` — polls GET /repository/:id every 2s, renders pipeline timeline from real status, auto-navigates to /chat/:id on 'ready', shows retry on 'failed'
screens/chat/chat.screen.tsx — route `/chat/:repositoryId` — loads history on mount; also re-fetches repository details (name/status/fileCount) if store.repository.id doesn't match the URL param, since a page refresh lands here with empty Redux state (chat itself still works on refresh — only the header badge needed this fix); file tree derived from citation file paths seen in the conversation (no separate file-listing endpoint exists), sends messages, shows retrieval context panel for the last assistant response

## Components
components/common/nav-bar/nav-bar.component.tsx — static top nav, brand only
components/common/button/button.component.tsx — primary/secondary variants, extends native button props
components/common/tabs/tabs.component.tsx — props: tabs, activeTab, onChange
components/common/repo-url-form/repo-url-form.component.tsx — props: onSubmit, submitting — Yup-validated via validations/ingest.validation.ts
components/common/file-upload/file-upload.component.tsx — props: onSubmit, maxSizeMB, submitting — drag/drop + click-to-select, client-side type/size validation
components/common/sidebar-nav/sidebar-nav.component.tsx — props: items ({icon, label, active}[]) — used on indexing screen (dashboard-shell aesthetic per design)
components/common/pipeline-step/pipeline-step.component.tsx — props: label, description, state ('done'|'active'|'pending'|'failed'), durationMs?
components/common/stat-tile/stat-tile.component.tsx — props: label, value — generic stat display, real numbers only
components/common/file-tree/file-tree.component.tsx — props: filePaths, selectedPath?, onSelect
components/common/chat-message/chat-message.component.tsx — props: role, content, citations — renders markdown via react-markdown, embeds citation-card per citation
components/common/citation-card/citation-card.component.tsx — props: filePath, startLine, endLine, snippet — collapsible <details>, no similarityScore prop (API doesn't return one — see retrieval-context-panel note)
components/common/chat-input/chat-input.component.tsx — props: onSend, disabled
components/common/retrieval-context-panel/retrieval-context-panel.component.tsx — props: citations — shows source count + file:line list only; token usage/latency/similarity are logged server-side (observability feature) but NOT returned by POST /chat/:id/message, so they're intentionally absent here, not a bug
components/common/repo-summary-badge/repo-summary-badge.component.tsx — props: name, fileCount — no chunkCount (GET /repository/:id doesn't return one)
components/common/recent-repositories/recent-repositories.component.tsx — props: repositories, onSelect — used on landing screen so users can navigate back to an already-ingested repo (was Post-MVP in docs/PLAN.md, added ahead of schedule since re-ingesting during testing was expensive against the free-tier API quota)

## Models
models/repository.model.ts — ingestGithub(url), ingestUpload(file), getRepository(id), listRepositories()
models/chat.model.ts — sendMessage(repositoryId, message), getHistory(repositoryId)

## Store slices
store/repository.slice.ts — { id, name, status, errorMessage, fileCount } — setRepository, setStatus, resetRepository
store/chat.slice.ts — { messages, sending } — setMessages, appendMessage, setSending, resetChat

## Validations
validations/ingest.validation.ts — githubUrlValidation (Yup) — used by repo-url-form.component.tsx

## Design system
themes/theme.scss — CSS custom properties from design/design.md ("Forge Protocol"): dark neutral surfaces (#0a0a0a base), --primary #3b82f6, Inter/JetBrains Mono fonts (loaded via Google Fonts in index.html), 8px/12px radii, 4px spacing scale. No shadows — hierarchy via 1px borders only.

## Known scope simplifications (deliberate, not oversights)
- Repository Dashboard, API Explorer, Dependency Explorer screens from design/ are NOT built — see docs/PLAN.md Section 11
- Retrieval context panel shows citations only, no token/latency/similarity — API doesn't expose them (client-only scope decision, not a backend gap left unfixed)
- Chat screen's file tree is derived client-side from citations seen so far, not a real repo file listing — no endpoint for that exists

## Validation commands
npx tsc -b
npm run dev
npm run build
