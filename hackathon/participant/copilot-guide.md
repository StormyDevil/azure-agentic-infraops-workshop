# VS Code & GitHub Copilot Guide

> **Read time**: ~10 minutes | **When**: During the intro block (10:00-10:30)
>
> This guide explains the tools you'll use throughout the hackathon — VS Code, GitHub Copilot,
> custom agents, skills, instructions, and how they all connect.

## VS Code Essentials

Visual Studio Code is your development environment for the entire hackathon. Here are the key
features you'll use:

| Feature | Shortcut | What It Does |
|---------|----------|--------------|
| **Command Palette** | `Ctrl+Shift+P` | Run any VS Code command by name |
| **Integrated Terminal** | `` Ctrl+` `` | Run Azure CLI, Bicep, k6, and Git commands |
| **Explorer** | `Ctrl+Shift+E` | Browse files and folders |
| **Search** | `Ctrl+Shift+F` | Search across all files in the workspace |
| **Copilot Chat** | `Ctrl+Alt+I` | Open the AI assistant panel |
| **Inline Chat** | `Ctrl+I` | Quick AI help inside a file |

### Dev Container

This workshop runs inside a **Dev Container** — a Docker-based environment with all tools
pre-installed (Azure CLI, Bicep, k6, Node.js, Python). You don't need to install anything
on your local machine beyond Docker and VS Code.

When you open the repository, VS Code prompts you to "Reopen in Container." Accept this to
get the fully configured environment.

---

## GitHub Copilot Overview

GitHub Copilot is an AI coding assistant built into VS Code. For this hackathon, you need a
**Copilot Pro+** or **Copilot Enterprise** license (verified during
[pre-work setup](pre-work-checklist.md)).

Copilot works in three main modes, each suited to different tasks:

### Ask Mode

**What it does**: Quick Q&A — ask questions and get answers without making changes.

**When to use**: Research, exploration, understanding concepts.

**Example prompts**:

- "What's the difference between App Service and Container Apps?"
- "Explain Azure SQL Database geo-replication"
- "What WAF pillar covers backup and recovery?"

### Edit Mode

**What it does**: Make targeted changes to specific files. You select files and Copilot
proposes edits you can accept or reject.

**When to use**: Modifying existing files, fixing issues, small focused changes.

**Example prompts**:

- "Add a Key Vault module parameter to main.bicep"
- "Fix the naming convention in this storage account resource"

### Agent Mode

**What it does**: Autonomous multi-step work. The agent can read files, run terminal commands,
create files, search the codebase, and iterate until the task is complete.

**When to use**: Complex tasks that span multiple files and require tool use. **This is the
primary mode for this hackathon.**

**Example prompts**:

- "Capture requirements for a farm-to-table delivery platform using the requirements agent"
- "Generate Bicep templates for the FreshConnect architecture"
- "Deploy the infrastructure to Azure and summarize the results"

> **Hackathon tip**: Use **Agent mode** for most challenges. It can invoke custom agents,
> read templates, run Azure CLI commands, and generate documentation — all in a single
> conversation.

---

## Custom Agents

This workshop includes **8 specialized agents** that understand Azure infrastructure
patterns, best practices, and the hackathon workflow. Each agent has a focused role.

### How Agents Work

Agents are defined as markdown files in `.github/agents/`. When you select an agent from
the Chat dropdown, Copilot loads that agent's instructions — including what skills to read,
what output format to use, and what quality checks to perform.

### Selecting an Agent

1. Open Copilot Chat (`Ctrl+Alt+I`)
2. Click the **agent dropdown** at the top of the chat panel
3. Select the agent for your current challenge
4. Type your prompt

### Available Agents

| Agent | Purpose | Challenges |
|-------|---------|------------|
| **requirements** | Capture functional and non-functional requirements | 1 |
| **architect** | Design WAF-aligned architecture with cost estimates | 2 |
| **design** | Generate architecture diagrams and documentation | 2, 5, 6 |
| **bicep-plan** | Create implementation plans | 3, 4 |
| **bicep-code** | Generate Bicep templates | 3, 4 |
| **deploy** | Deploy infrastructure to Azure | 3, 4 |
| **diagnose** | Troubleshooting and diagnostic runbooks | 7 |
| **infraops-conductor** | Master orchestrator for the full 7-step workflow | Any |

### Subagents

Some agents delegate specialist tasks to **subagents** — smaller, focused agents that run
inside the parent agent's workflow:

| Subagent | Parent | Purpose |
|----------|--------|---------|
| **bicep-lint-subagent** | bicep-code | Runs `bicep build` and `bicep lint` validation |
| **bicep-review-subagent** | bicep-code | Reviews Bicep code for best practices |
| **bicep-whatif-subagent** | deploy | Runs `az deployment group what-if` analysis |

You don't select subagents directly — they're invoked automatically by their parent agent.

---

## Skills

Skills are **reusable knowledge modules** that agents read to get domain-specific context.
They're defined as `SKILL.md` files in `.github/skills/`.

### How Skills Work

When an agent starts working, it reads specific skill files to understand:

- What output format to use (H2 heading templates)
- What Azure best practices to follow
- What naming conventions to apply
- What tools are available (like the Azure Pricing MCP)

### Available Skills

| Skill | Purpose | Used By |
|-------|---------|---------|
| **azure-defaults** | Regions, tags, naming, security baselines | All agents |
| **azure-artifacts** | Output templates (H2 structures for each artifact) | All agents |
| **azure-diagrams** | Python architecture diagram generation | design |
| **azure-adr** | Architecture Decision Records format | design, bicep-plan |
| **docs-writer** | Documentation generation standards | design |
| **git-commit** | Commit message conventions | All agents |
| **github-operations** | Issues, PRs, GitHub CLI patterns | All agents |
| **make-skill-template** | Template for creating new skills | Meta |

### Skill Triggers

Agents read skills based on keyword matching. When you mention concepts like
"architecture diagram," "cost estimate," or "operations runbook," the relevant skill
is automatically loaded. You can also explicitly ask an agent to read a skill:

```
Read .github/skills/azure-diagrams/SKILL.md and generate an architecture diagram
for FreshConnect.
```

---

## Custom Instructions

Instructions are **rules that auto-load based on file type**. They ensure consistency
without you having to remember every convention.

### How Instructions Work

Each instruction file has an `applyTo` pattern in its frontmatter. When you work with files
matching that pattern, the instruction loads automatically:

```yaml
---
applyTo: "**/*.bicep"
description: "Infrastructure as Code best practices for Azure Bicep templates"
---
```

This means any time Copilot generates or edits a `.bicep` file, those rules apply.

### Key Instructions in This Workshop

| Instruction | Applies To | What It Does |
|-------------|-----------|--------------|
| `bicep-code-best-practices` | `**/*.bicep` | Bicep naming, modules, security patterns |
| `markdown.instructions` | `**/*.md` | Markdown formatting standards |
| `cost-estimate.instructions` | Cost estimate files | Cost documentation structure |
| `artifact-h2-reference` | Agent output files | Template compliance rules |

### The Global Instruction File

The file `.github/copilot-instructions.md` contains project-wide rules that apply to
**every** Copilot interaction. It defines:

- The 7-step workflow overview
- Default region (`swedencentral`)
- Required tags (`Environment`, `ManagedBy`, `Project`, `Owner`)
- Security baselines (TLS 1.2, HTTPS-only, managed identity)
- Available agents and skills

---

## MCP Servers (Model Context Protocol)

MCP servers extend Copilot's capabilities with external data sources and APIs.

### Azure Pricing MCP

This workshop includes an **Azure Pricing MCP server** that gives agents access to real-time
Azure pricing data. When the `architect` agent generates a cost estimate, it queries this
server for accurate per-service pricing.

**What it enables**:

- Accurate monthly cost estimates in EUR
- Per-service cost breakdowns
- Cost comparison between service tiers
- Budget validation against the €500/€700 constraints

You don't need to interact with the MCP server directly — agents use it automatically
when generating cost estimates.

---

## The Complete Picture

Here's how all the pieces connect:

```
You (prompt)
  └─→ Agent (e.g., architect)
        ├─→ Reads Skills (azure-defaults, azure-artifacts)
        ├─→ Follows Instructions (bicep-best-practices, markdown)
        ├─→ Uses MCP Server (Azure Pricing for cost estimates)
        ├─→ Reads Templates (H2 structures from azure-artifacts)
        ├─→ May invoke Subagents (bicep-lint, bicep-review)
        └─→ Generates Artifacts (agent-output/{project}/*.md)
```

### Workflow Through the Hackathon

```
Challenge 1 → requirements agent → 01-requirements.md
Challenge 2 → architect agent    → 02-architecture-assessment.md + cost estimate
              design agent       → architecture diagram (Python)
Challenge 3 → bicep-plan agent   → 04-implementation-plan.md
              bicep-code agent   → infra/bicep/{project}/*.bicep
              deploy agent       → 06-deployment-summary.md
Challenge 4 → (same as 3, adapted for DR)
Challenge 5 → design agent       → 05-load-test-results.md
Challenge 6 → design agent       → 07-ab-*.md documentation
Challenge 7 → diagnose agent     → troubleshooting card
Challenge 8 → (team presentation — no agent needed)
```

---

## Tips for Working with Agents

1. **Be specific about context** — Tell the agent what project, what audience, what
   constraints apply
2. **Reference previous outputs** — Say "based on agent-output/freshconnect/02-architecture-assessment.md"
3. **Iterate, don't restart** — If output isn't right, refine your prompt in the same
   conversation
4. **Check agent output files** — Agents save to `agent-output/{project}/` — review what
   was generated
5. **Use `#file` references** — Drag files into chat or use `#file:path` to give the agent
   explicit context

For more prompting techniques, see [Copilot Tips](../../docs/copilot-tips.md).

---

## Quick Reference

| Concept | Location | Purpose |
|---------|----------|---------|
| Agents | `.github/agents/*.agent.md` | Specialized AI assistants |
| Skills | `.github/skills/*/SKILL.md` | Reusable knowledge modules |
| Instructions | `.github/instructions/*.instructions.md` | Auto-loading file-type rules |
| Global config | `.github/copilot-instructions.md` | Project-wide defaults |
| Templates | `.github/skills/azure-artifacts/templates/` | Output structure definitions |
| MCP servers | `.vscode/mcp.json` | External data sources |
| Agent output | `agent-output/{project}/` | Generated artifacts |

---

## See Also

- [Pre-Work Checklist](pre-work-checklist.md) — Ensure your environment is ready
- [Quick Reference Card](quick-reference-card.md) — Printable one-page reference
- [Hints & Tips](hints-and-tips.md) — Challenge-specific guidance
- [Copilot Tips](../../docs/copilot-tips.md) — Advanced prompting techniques
