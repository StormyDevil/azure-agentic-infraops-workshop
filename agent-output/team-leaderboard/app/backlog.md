# Team Leaderboard App — Backlog

![Type](https://img.shields.io/badge/Type-Backlog-blue)
![Status](https://img.shields.io/badge/Status-Active-brightgreen)

> Living backlog, roadmap, and task tracker for the Team Leaderboard application.
> Items are grouped by priority milestone.
> Check off tasks as they are completed; add new items at the bottom of the
> relevant section.

---

## Legend

| Symbol | Meaning         |
| ------ | --------------- |
| `[ ]`  | Not started     |
| `[~]`  | In progress     |
| `[x]`  | Done            |
| `[!]`  | Blocked         |
| 🔴     | High priority   |
| 🟡     | Medium priority |
| 🟢     | Low priority    |

---

## Milestone 1 — Dependency Hygiene & Security Hardening

> **Goal**: Zero deprecated dependencies; resolve all known security findings
> before any feature work begins.

### 1.1 — No Deprecated Packages or APIs 🔴

- [ ] Audit `api/package.json` — flag any packages with npm deprecation
      notices or beyond maintenance LTS
- [ ] Audit `package.json` (frontend) — same check
- [ ] Replace deprecated packages with supported alternatives
- [ ] Pin `"engines"` in both `package.json` files to Node.js 20 LTS
- [ ] Verify Azure Functions Extension Bundle range (`[4.*, 5.0.0)`)
      is current; update if a new stable range is available
- [ ] Confirm `@azure/data-tables` SDK version is latest stable
      (no pre-release or deprecated API surface)
- [ ] Run `npm audit` on both `api/` and root; resolve all
      high/critical advisories

### 1.2 — Security Remediation 🔴

- [ ] Audit `staticwebapp.config.json` — confirm only GitHub provider
      is enabled (Google/Twitter/AAD blocked with 404)
- [ ] Add `Content-Security-Policy` header in `globalHeaders`
- [ ] Add `Strict-Transport-Security` header (HSTS) in `globalHeaders`
- [ ] Validate all API functions enforce authentication before any
      data access (no anonymous fallback paths)
- [ ] Verify managed identity is used for Table Storage access
      (no shared-key or connection-string patterns)
- [ ] Add input validation / sanitization on all user-supplied fields
      (team names, attendee fields, JSON uploads)
- [ ] Ensure JSON upload endpoint validates payload size (max 256 KB)
- [ ] Add rate limiting guidance or SWA-native throttling config
- [ ] Review CORS settings — ensure no wildcard origins
- [ ] Add `X-XSS-Protection: 0` header (modern CSP replaces this;
      remove legacy header if present)
- [ ] Confirm all error responses use the standard error envelope
      (no stack traces or internal details leak)

---

## Milestone 2 — Attendee Management & Team Assignment

> **Goal**: Admin/facilitator can enter attendees, specify team count,
> and the app randomly assigns attendees to teams — with a GUI page to
> display the result.

### 2.1 — New Feature: Attendee Bulk Entry (Admin) 🔴

- [ ] Add a new admin-only page **Attendee Management**
- [ ] Provide a form where the admin enters attendee full names
      (one per line, or CSV paste)
- [ ] Each row captures: first name, surname
- [ ] On submit, create/upsert records in the Attendees table
- [ ] GitHub username column is initially **blank** — to be resolved
      later (see 2.3 below)

### 2.2 — New Feature: Random Team Assignment 🔴

- [ ] Add input field for **number of teams** (positive integer)
- [ ] "Assign Teams" button randomly distributes attendees across
      N teams using a Fisher-Yates shuffle
- [ ] Assignment creates/updates Teams table entries and sets
      `teamNumber` on each Attendee record
- [ ] Show confirmation dialog with preview before persisting
- [ ] Provide a "Re-shuffle" option that clears and re-assigns
      (with confirmation warning)
- [ ] Add new API endpoint `POST /api/teams/assign` (admin only):
  - Request: `{ "teamCount": 5 }`
  - Response: `{ "teams": [ { "teamName": "Team 1", "members": [...] }, ... ] }`

### 2.3 — GitHub Username ↔ Attendee Name Mapping 🟡

> **Open question**: How do we match attendee names entered by the
> admin with GitHub usernames that SWA authentication provides?

**Option A — Self-service claim (recommended)**:
After the admin seeds attendee names, each person logs in with GitHub
and "claims" their profile from a dropdown of unclaimed names on the
registration page. The app links `/.auth/me` → `gitHubUsername` to the
selected Attendee record. Admins can review/override claims.

**Option B — Admin pre-fills GitHub handles**:
Admin enters both name and GitHub username upfront. Requires knowing
handles in advance, which is often impractical for large events.

**Option C — Hybrid**:
Admin seeds names. During GitHub login, the app prompts users to
search and select their name. If no match, the user registers a new
attendee record (subject to admin approval).

**Decision**: TBD — resolve before implementation starts.

- [ ] Finalize mapping approach (A / B / C)
- [ ] Update `POST /api/attendees/me` to support "claim" flow if
      Option A or C is chosen
- [ ] Add admin override endpoint to reassign GitHub ↔ Attendee links
- [ ] Update F7 acceptance criteria in app-prd.md once decided

### 2.4 — Team Assignment Display Page 🔴

- [ ] Add new GUI page **Team Roster** (accessible to all authenticated
      users)
- [ ] Display a table/card grid showing every team and its assigned
      members (name + GitHub avatar if available)
- [ ] Admins see an "Edit" action to move attendees between teams
- [ ] Members see read-only view of their own team highlighted
- [ ] Add route `/teams/roster` and navigation link

---

## Milestone 3 — Phased TDD Implementation Plan

> **Goal**: Deliver the application in incremental, test-first phases.
> Each phase produces working, tested code before the next begins.

### Phase A — Project Bootstrap & Test Infrastructure

- [ ] Scaffold project from `app-scaffold.md` structure
- [ ] Configure test runner (Vitest or Jest) for API functions
- [ ] Configure test runner for frontend components
      (React Testing Library + Vitest)
- [ ] Add `npm test` script to both `api/` and root `package.json`
- [ ] Set up GitHub Actions CI/CD workflow (see 3.1 below)
- [ ] Create local mock data layer for offline development (see 3.2)
- [ ] Create data seeding scripts for dev/demo scenarios (see 3.3)
- [ ] Write smoke tests for SWA dev server startup

### Phase B — API Core (Auth + Teams CRUD)

- [ ] **Test first**: Write tests for `getClientPrincipal()` and
      `requireRole()` helpers
- [ ] Implement `api/shared/auth.js`
- [ ] **Test first**: Write tests for `GET /api/teams`, `POST /api/teams`
- [ ] Implement Teams CRUD functions
- [ ] **Test first**: Write tests for `PUT /api/teams`, `DELETE /api/teams`
- [ ] Implement remaining Teams endpoints
- [ ] All tests green before proceeding

### Phase C — API Scoring & Submissions

- [ ] **Test first**: `GET /api/scores` with and without filters
- [ ] Implement Scores endpoints
- [ ] **Test first**: `POST /api/upload` with valid/invalid payloads,
      team scope violation
- [ ] Implement Upload endpoint
- [ ] **Test first**: `GET /api/submissions`, `POST /api/submissions/validate`
- [ ] Implement Submissions + Validate endpoints
- [ ] All tests green

### Phase D — API Attendees, Awards & Team Assignment

- [ ] **Test first**: `GET/POST /api/attendees/me`, `GET /api/attendees`
- [ ] Implement Attendees endpoints
- [ ] **Test first**: `POST/GET /api/awards`
- [ ] Implement Awards endpoints
- [ ] **Test first**: `POST /api/teams/assign` (random assignment)
- [ ] Implement team assignment endpoint
- [ ] All tests green

### Phase E — Frontend Shell & Leaderboard (F2, F3)

- [ ] **Test first**: Render `LeaderboardTable` with mock data
- [ ] Implement Dashboard page with leaderboard table
- [ ] **Test first**: ChampionCard renders top-3 correctly
- [ ] Implement ChampionCard and StatCard components
- [ ] **Test first**: Grade badge renders correct tier and color
- [ ] Implement grading display logic
- [ ] **Test first**: Theme toggle persists to localStorage
- [ ] Implement theme system (light/dark)
- [ ] All tests green

### Phase F — Frontend Workflows (F1, F4, F6, F7, F8)

- [ ] **Test first**: ScoreEntryForm validates category subtotals
- [ ] Implement F1 score submission form
- [ ] **Test first**: JsonUploadPanel validates schema + team match
- [ ] Implement F6 JSON upload panel
- [ ] **Test first**: AdminReviewQueue renders pending items
- [ ] Implement F8 admin queue and manual override
- [ ] **Test first**: AttendeeProfileForm pre-fills GitHub username
- [ ] Implement F7 registration form
- [ ] **Test first**: AwardsPanel assignment and display
- [ ] Implement F4 awards panel
- [ ] All tests green

### Phase G — Team Roster & Attendee Management UI

- [ ] **Test first**: TeamRoster page renders team grid
- [ ] Implement Team Roster page (Milestone 2.4)
- [ ] **Test first**: Admin attendee entry form creates records
- [ ] Implement Attendee Management page (Milestone 2.1)
- [ ] **Test first**: Random assignment produces balanced teams
- [ ] Implement team assignment UI (Milestone 2.2)
- [ ] All tests green

### Phase H — Integration, E2E & Polish

- [ ] Write end-to-end tests (Playwright or Cypress) for critical
      user flows: login → submit score → admin approve → leaderboard
      updates
- [ ] Performance test: confirm < 2s page load, < 500ms API response
- [ ] Accessibility audit (axe-core automated + manual keyboard check)
- [ ] Responsive check across sm/md/lg/xl breakpoints
- [ ] Implement search bar and notification area in navbar (see 3.6)
- [ ] Final security scan (`npm audit`, dependency review)
- [ ] All tests green — ready for deployment

---

## Milestone 4 — Operational Readiness

> **Goal**: CI/CD, secrets, monitoring, onboarding, and cleanup —
> everything needed to run the app reliably during a live event.

### 3.1 — CI/CD Pipeline 🔴

- [ ] Create `.github/workflows/deploy-swa.yml` GitHub Actions workflow
- [ ] Workflow stages: install → lint → test → build → deploy
- [ ] Use `Azure/static-web-apps-deploy@v1` action
- [ ] Configure deployment token as repository secret
- [ ] Add PR preview environment (SWA staging environments)
- [ ] Add post-deploy smoke test step (curl health endpoint)

### 3.2 — Mock Data & Local Dev Mode 🔴

- [ ] Create `src/data/leaderboard.mock.ts` with realistic sample data
- [ ] Create mock data files for teams, attendees, scores, submissions,
      awards
- [ ] Add `USE_MOCK_DATA` environment flag to bypass API calls
- [ ] Implement `services/mockApiClient.ts` that returns mock data
- [ ] Document local dev setup in README.md (SWA CLI + mock mode)

### 3.3 — Data Seeding Scripts 🟡

- [ ] Create `scripts/seed-demo-data.js` that populates Table Storage
      with sample teams, attendees, and scores for demo/testing
- [ ] Support `--reset` flag to clear tables before seeding
- [ ] Support `--teams N --attendees M` parameters for variable sizes
- [ ] Document seed script usage in README.md

### 3.4 — Environment & Secrets Management 🔴

- [ ] Document all required secrets: `GITHUB_CLIENT_ID`,
      `GITHUB_CLIENT_SECRET`, Storage account connection info
- [ ] Add `.env.example` file listing all environment variables
- [ ] Configure SWA application settings via Azure Portal or CLI
- [ ] Verify local dev uses `swa start` with `--api-location api`
      and Azurite for local Table Storage emulation
- [ ] Add secrets rotation guidance for post-event cleanup

### 3.5 — SWA Role Invitation Workflow 🔴

- [ ] Document how to invite admins via Azure Portal
      (SWA → Role Management → Invite)
- [ ] Create a pre-event checklist for facilitator role setup
- [ ] Add `scripts/invite-admins.sh` helper using `az` CLI
      (or document manual steps if CLI does not support it)
- [ ] Test that invited users receive the `admin` role after login
- [ ] Document fallback if invitation email is not received

### 3.6 — Search & Notifications UI 🟡

- [ ] Implement search bar in navbar (filter teams/attendees by name)
- [ ] Implement notification area in navbar (submission status changes,
      award announcements)
- [ ] Use polling or optimistic UI for notification freshness
- [ ] Add notification badge count for admin (pending submissions)
- [ ] Persist dismissed notifications in localStorage

### 3.7 — Monitoring & Observability 🟡

- [ ] Enable Application Insights for managed Functions
      (`APPINSIGHTS_INSTRUMENTATIONKEY` in SWA settings)
- [ ] Add client-side telemetry (page views, click events, errors)
      via Application Insights JS SDK or lightweight alternative
- [ ] Add structured logging in API functions (request ID, user,
      operation, duration)
- [ ] Create Azure Monitor alert for API error rate > 5%
- [ ] Create dashboard showing: active users, submissions/hour,
      API latency p50/p95, error count

### 3.8 — OpenAPI / Swagger Documentation 🟡

- [ ] Generate OpenAPI 3.0 spec from API endpoint definitions
- [ ] Add `/api/docs` route serving Swagger UI (or external hosted page)
- [ ] Include request/response examples from `api-spec.md`
- [ ] Add schema validation middleware based on OpenAPI spec
- [ ] Keep spec in sync with implementation (CI lint check)

### 3.9 — Feature Flags 🟡

- [ ] Add `featureFlags` section to SWA app settings or a config table
- [ ] Implement flags: `SUBMISSIONS_ENABLED`, `LEADERBOARD_LOCKED`,
      `REGISTRATION_OPEN`, `AWARDS_VISIBLE`
- [ ] Admin panel toggle for each flag (persisted to config table)
- [ ] API respects flags (returns 503 when feature is disabled)
- [ ] Frontend hides/disables UI surfaces based on flag state
- [ ] Facilitator can lock leaderboard during curveball challenge

### 3.10 — Post-Event Cleanup 🟢

- [ ] Create `scripts/cleanup-app-data.js` to purge all 5 tables
- [ ] Support `--confirm` flag for safety (no accidental deletion)
- [ ] Remove PII (attendee names, GitHub usernames) from Table Storage
- [ ] Revoke SWA role invitations for event-specific admins
- [ ] Rotate `GITHUB_CLIENT_SECRET` after event
- [ ] Document retention policy (event + 30 days per PRD NFR)

---

## Milestone 5 — Future Enhancements 🟢

> Nice-to-have items for post-MVP iterations.

- [ ] Real-time leaderboard updates via WebSocket or Server-Sent Events
- [ ] Export leaderboard to CSV/PDF
- [ ] Attendee photo upload (GitHub avatar fallback)
- [ ] Historical score comparison across events
- [ ] Multi-language / i18n support
- [ ] Custom domain with SSL certificate

---

## References

- [Product Requirements (PRD)](./app-prd.md)
- [API Specification](./api-spec.md)
- [App Design](./app-design.md)
- [Scaffold Guide](./app-scaffold.md)
- [Handoff Checklist](./app-handoff-checklist.md)
- [Scoring Rubric](../../../hackathon/facilitator/scoring-rubric.md)
