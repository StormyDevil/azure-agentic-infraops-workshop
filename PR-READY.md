# Pull Request Ready for Creation

## Status: ✅ ALL VALIDATIONS PASSED

All changes have been committed and pushed to branch `copilot/upstream-sync-2026-02-11`.

## Branch Information

- **Source Branch**: `copilot/upstream-sync-2026-02-11`
- **Target Branch**: `main`
- **Commits**: 2 (sync + workshop adaptations)

## What Was Done

### 1. Upstream Sync (8 files)
- ✅ `.gitignore` - Removed workflow-generator/output/ and SYNC-MANIFEST.md exclusions
- ✅ `CONTRIBUTING.md` - Updated workflow.md references
- ✅ `mcp/azure-pricing-mcp/src/azure_pricing_mcp/services/pricing.py` - Enhanced pricing service
- ✅ `scripts/check-docs-freshness.mjs` - Improved freshness validation
- ✅ `scripts/fix-artifact-h2.mjs` - Enhanced artifact H2 fix logic
- ✅ `scripts/validate-artifact-templates.mjs` - Added 04-preflight-check.md support
- ✅ `scripts/validate-cost-estimate-templates.mjs` - Template validation improvements
- ✅ `scripts/validate-no-deprecated-refs.mjs` - Added checks for removed dirs/skills

### 2. Workshop Adaptations (5 files)
- ✅ `.devcontainer/post-create.sh` - Changed scenarios/ → hackathon/
- ✅ `.devcontainer/README.md` - Changed scenarios/ → hackathon/, updated doc links
- ✅ `.github/instructions/agents-definitions.instructions.md` - Changed scenarios/ → hackathon/
- ✅ `.github/instructions/docs.instructions.md` - Updated table row for workshop challenges
- ✅ `CONTRIBUTING.md` - Fixed repo URLs to point to workshop repo

### 3. Validation Results
- ✅ `npm run lint:md` - 120 files, 0 errors
- ✅ `npm run lint:agent-frontmatter` - 10 agents, 3 subagents validated
- ✅ `npm run lint:skills-format` - 8 skills validated
- ✅ No deprecated references found
- ✅ All stale scenarios/ references removed/adapted

### 4. Protected Files (Verified Not Modified)
- ✅ `hackathon/**` - Workshop challenge materials
- ✅ `.github/skills/docs-writer/**` - Workshop-customized skill
- ✅ `docs/**` - Workshop documentation
- ✅ `README.md`, `VERSION.md`, `CHANGELOG.md`, `CONTRIBUTORS.md` - Workshop identity
- ✅ `package.json` - Workshop version

## Next Step: Create the PR

The PR body is ready in `/tmp/pr-body.md`.

### Option 1: Via GitHub Web UI (Recommended)

1. Go to: https://github.com/jonathan-vella/azure-agentic-infraops-workshop/compare/main...copilot/upstream-sync-2026-02-11
2. Click "Create pull request"
3. Use title: `chore(sync): upstream sync 2026-02-11`
4. Copy/paste the content from below into the PR body
5. Check "Create draft pull request"
6. Add label: `upstream-sync`
7. Click "Create pull request"

### Option 2: Via gh CLI

```bash
gh pr create \
  --base main \
  --head copilot/upstream-sync-2026-02-11 \
  --title "chore(sync): upstream sync 2026-02-11" \
  --body-file /tmp/pr-body.md \
  --draft \
  --label upstream-sync
```

---

## PR Body Content

```markdown
## Upstream Sync: 2026-02-11

### Source
- **Repository**: `jonathan-vella/azure-agentic-infraops`
- **Commit**: `88c0a98`
- **Date**: 2026-02-11
- **Files synced**: 8

### Validation Results ✅

All validation checks passed:

- ✅ **Markdown lint**: 120 files, 0 errors
- ✅ **Agent frontmatter**: 10 agents, 3 subagents validated
- ✅ **Skills format**: 8 skills validated
- ✅ **Deprecated references**: No issues found
- ✅ **Stale scenarios/ references**: Removed/adapted

### Workshop-Specific Adaptations

The following files were adapted for workshop context:

| File | Change | Rationale |
|------|--------|-----------|
| `.devcontainer/post-create.sh` | `scenarios/` → `hackathon/` | Workshop uses hackathon/ folder for challenges |
| `.devcontainer/README.md` | `scenarios/` → `hackathon/`, updated doc links | Workshop-specific structure and navigation |
| `.github/instructions/agents-definitions.instructions.md` | `scenarios/` → `hackathon/` | Workshop agents context |
| `.github/instructions/docs.instructions.md` | Updated table row | Workshop challenges vs source scenarios |
| `CONTRIBUTING.md` | Fixed repo URLs | Point to workshop repo, not source repo |

### Files Synced from Upstream (8)

| File | Summary of Changes |
|------|-------------------|
| `.gitignore` | Removed `workflow-generator/output/` and `SYNC-MANIFEST.md` exclusions |
| `CONTRIBUTING.md` | Updated references to `docs/workflow.md`, fixed file paths |
| `mcp/azure-pricing-mcp/src/azure_pricing_mcp/services/pricing.py` | Enhanced pricing service functionality |
| `scripts/check-docs-freshness.mjs` | Improved documentation freshness validation logic |
| `scripts/fix-artifact-h2.mjs` | Enhanced artifact H2 heading fix logic |
| `scripts/validate-artifact-templates.mjs` | Added `04-preflight-check.md` support, enhanced validation, added References sections |
| `scripts/validate-cost-estimate-templates.mjs` | Template validation improvements |
| `scripts/validate-no-deprecated-refs.mjs` | Added checks for removed `_shared/` dirs and deprecated skills |

### Protected Files (Not Modified)

The following workshop-specific files were NOT modified (as expected):

- ✅ `hackathon/**` - Workshop challenge materials
- ✅ `.github/skills/docs-writer/**` - Workshop-customized skill
- ✅ `docs/**` - Workshop documentation
- ✅ `README.md`, `VERSION.md`, `CHANGELOG.md`, `CONTRIBUTORS.md` - Workshop identity
- ✅ `package.json` - Workshop version

### Review Checklist

- [x] All validations passing
- [x] Workshop-specific references adapted
- [x] No protected files modified
- [x] Stale scenarios/ references removed
- [x] CONTRIBUTING.md points to workshop repo
- [x] Devcontainer references hackathon/ folder

### Next Steps

1. Review the changes
2. Approve if all looks good
3. Merge to main

---

**Note**: This PR is opened as a **draft** for human review before merging.
```

---

## Summary

✅ **All work complete** - Branch is ready for PR creation
✅ **All validations passed** - No issues found
✅ **Workshop adaptations done** - All scenarios/ references fixed
✅ **Protected files untouched** - Workshop-specific content preserved

The upstream sync has been successfully validated and is ready for human review!
