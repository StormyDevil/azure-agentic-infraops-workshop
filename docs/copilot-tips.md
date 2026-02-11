# Copilot Tips

> [Current Version](../VERSION.md) | Prompting best practices for Agentic InfraOps agents

## General Prompting

### Be specific

Bad: "Create some infrastructure"

Good: "Create a hub-spoke network in swedencentral with Application Gateway,
two spoke VNets, and a shared Key Vault. Budget: €300/month."

### Reference artifacts

Agents work best when pointed at existing context:

```text
Read 01-requirements.md and create a WAF architecture assessment
```

### One step at a time

Use the **InfraOps Conductor** for multi-step workflows.
For targeted work, invoke agents directly:

```text
@requirements — Capture requirements for a static web app
@architect — Assess the requirements in 01-requirements.md
@bicep-plan — Create an implementation plan from 02-architecture-assessment.md
```

## Agent-Specific Tips

### Requirements Agent (📜 Scribe)

- Describe the **business problem**, not the technical solution
- Mention compliance needs early (GDPR, ISO 27001, etc.)
- Specify budget constraints — the agent factors them into recommendations

### Architect Agent (🏛️ Oracle)

- Always let it read `01-requirements.md` first
- Ask for specific WAF pillar focus if needed: "Focus on reliability"
- Request cost estimates explicitly — it uses Azure Pricing MCP

### Design Agent (🎨 Artisan)

- Request diagrams after architecture assessment exists
- For ADRs, describe the decision context clearly
- Diagrams use Python's `diagrams` library — install Graphviz if running locally

### Bicep Code Agent (⚒️ Forge)

- It prefers Azure Verified Modules (AVM) over raw Bicep
- Always let it read the implementation plan (`04-implementation-plan.md`) first
- Ask it to validate with `bicep build` and `bicep lint` after generation

### Deploy Agent (🚀 Envoy)

- Ensure `az login` is active before invoking
- It runs `what-if` before actual deployment — review the preview
- Specify the target resource group or let it create one

## Skill Usage

Skills are auto-invoked based on keywords in your prompt:

| Keyword | Skill Triggered |
| --- | --- |
| "create diagram" | `azure-diagrams` |
| "create ADR", "document decision" | `azure-adr` |
| "commit", "git commit" | `git-commit` |
| "create issue", "create PR" | `github-operations` |
| "update docs", "check freshness" | `docs-writer` |
| "azure defaults", "naming convention" | `azure-defaults` |

## Common Patterns

### Full workflow

```text
@InfraOps Conductor
Build an e-commerce platform on Azure with App Service, Azure SQL,
Redis Cache, and Application Gateway. Budget: €500/month. Region: swedencentral.
```

### Diagnose an existing resource

```text
@diagnose
Check the health of my App Service named "myapp-prod" in resource group "rg-prod"
```

### Generate documentation only

```text
@design
Generate an architecture diagram for the infrastructure defined in
02-architecture-assessment.md
```

## Troubleshooting Agent Issues

See [Troubleshooting](troubleshooting.md#copilot-agents) for common
agent problems and fixes.
