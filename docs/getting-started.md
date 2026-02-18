# Getting Started

> [Current Version](../VERSION.md) | Everything you need to set up and run Agentic InfraOps

## Who This Is For

- **Microhack participants**: Complete the setup checklist and read "What to Expect"
  before event day.
- **Self-guided learners**: Follow the same steps to explore the agentic workflow
  at your own pace.

---

## What to Expect

### The Microhack in 60 Seconds

Your team will build real Azure infrastructure — from business requirements through
deployed resources — using AI agents instead of manual coding. You'll use GitHub Copilot
custom agents that understand Azure best practices, the Well-Architected Framework, and
Bicep Infrastructure as Code.

**The flow**: Requirements → Architecture → Bicep Code → Deploy → Documentation

**The twist**: Midway through, facilitators announce a curveball requirement
(multi-region disaster recovery) that forces you to adapt your architecture.

### What You'll Actually Do

| Block                   | You Will...                                                 |
| ----------------------- | ----------------------------------------------------------- |
| Intro (30 min)          | Meet your team, verify setup, learn the workflow            |
| Challenges 1-2 (60 min) | Capture requirements and design architecture with AI agents |
| Challenge 3 (45 min)    | Generate and deploy Bicep templates                         |
| Challenge 4 (45 min)    | Adapt to new DR requirements (the curveball!)               |
| Challenges 5-7 (50 min) | Load test, document, and diagnose                           |
| Challenge 8 (60 min)    | Present your solution to the group                          |

> [!TIP]
> See the full schedule in [AGENDA.md](../microhack/AGENDA.md).

### Mindset Tips

1. **Let the agents drive** — Resist the urge to write Bicep manually.
2. **Be specific in your prompts** — "Create a hub-spoke network in swedencentral
   with Application Gateway" beats "Create some infrastructure."
3. **Iterate, don't restart** — Refine in the same conversation rather than starting over.
4. **Read the artifacts** — Review `agent-output/{project}/` before the next challenge.
5. **Rotate roles** — Each team member should drive at least one challenge.

---

## Prerequisites

### Software

#### Docker Desktop

GitHub Copilot custom agents run inside a Dev Container. You need Docker.

**Install:**

- **Windows/Mac**: [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- **Linux**: [Docker Engine](https://docs.docker.com/engine/install/)

**Verify:**

```bash
docker --version
# Expected: Docker version 24.x or newer
```

**Alternatives** (if Docker Desktop licensing is an issue):

- [Rancher Desktop](https://rancherdesktop.io/)
- [Podman Desktop](https://podman-desktop.io/)
- [Colima](https://github.com/abiosoft/colima) (macOS/Linux)

#### Visual Studio Code

**Install:** [VS Code](https://code.visualstudio.com/) (version 1.100+)

**Required Extensions:**

| Extension           | ID                                   | Purpose                |
| ------------------- | ------------------------------------ | ---------------------- |
| Dev Containers      | `ms-vscode-remote.remote-containers` | Run Dev Container      |
| GitHub Copilot      | `github.copilot`                     | AI assistance          |
| GitHub Copilot Chat | `github.copilot-chat`                | Agent interactions     |
| Bicep               | `ms-azuretools.vscode-bicep`         | Bicep language support |
| Azure Account       | `ms-vscode.azure-account`            | Azure authentication   |

**Install all at once:**

```bash
code --install-extension ms-vscode-remote.remote-containers
code --install-extension github.copilot
code --install-extension github.copilot-chat
code --install-extension ms-azuretools.vscode-bicep
code --install-extension ms-vscode.azure-account
```

#### Git

**Install:**

- **Windows**: [Git for Windows](https://gitforwindows.org/)
- **Mac**: `brew install git` or Xcode Command Line Tools
- **Linux**: `sudo apt install git` or equivalent

**Verify:**

```bash
git --version
# Expected: git version 2.40 or newer
```

### Accounts

#### GitHub with Copilot Pro+ or Enterprise

> [!WARNING]
> This microhack requires **GitHub Copilot Pro+** or **GitHub Copilot Enterprise**.
> Custom agents are **NOT available** on Copilot Free, Copilot Pro, or Copilot Business.

| Plan                   | Custom Agents | Compatible |
| ---------------------- | ------------- | ---------- |
| Copilot Free           | No            | No         |
| Copilot Pro            | No            | No         |
| Copilot Business       | No            | No         |
| **Copilot Pro+**       | **Yes**       | **Yes**    |
| **Copilot Enterprise** | **Yes**       | **Yes**    |

Compare plans: [GitHub Copilot Plans](https://github.com/features/copilot/plans)

**Verify:**

1. Go to [github.com/settings/copilot](https://github.com/settings/copilot)
2. Confirm your subscription shows **Pro+** or **Enterprise**
3. Ensure "Copilot Chat in the IDE" is enabled

Setup guide: [VS Code Copilot Setup](https://code.visualstudio.com/docs/copilot/setup)

#### Azure Subscription

> [!WARNING]
> This is a **Bring-Your-Own-Subscription** event. No Azure subscriptions
> will be provided.

**Compatible subscription types:**

| Subscription Type                     | Compatible |
| ------------------------------------- | ---------- |
| Azure in CSP                          | Yes        |
| Enterprise Agreement (EA)             | Yes        |
| Pay As You Go                         | Yes        |
| Visual Studio subscription            | Yes        |
| Azure Free Account (with Credit Card) | Yes        |
| **Azure Pass**                        | **No**     |

**Requirements:**

- **Owner** access on the subscription (required for Azure Policy in governance challenges)
- Sufficient quota — see [Azure Quota Requirements](#azure-quota-requirements) below
- A subscription can be shared across teams if quota permits

> [!TIP]
> See [Azure subscription limits][azure-limits] when planning shared subscriptions.

**Verify:**

```bash
az login
az account list --output table
```

---

## Dev Container

The repo includes a Dev Container with all tools pre-installed. It works with
**VS Code Dev Containers** (local Docker) and **GitHub Codespaces** (cloud).

### Tools Included

| Tool              | Version | Purpose                        |
| ----------------- | ------- | ------------------------------ |
| Azure CLI (`az`)  | Latest  | Azure resource management      |
| Bicep CLI         | Latest  | Infrastructure as Code         |
| GitHub CLI (`gh`) | Latest  | Repository and PR management   |
| Node.js + npm     | 20.x    | Linting, validation scripts    |
| Python 3 + pip    | 3.12+   | Diagram generation, MCP server |
| PowerShell        | 7.x     | Microhack scripts, deployment  |
| Git               | Latest  | Version control                |

### Configuration Files

| File                              | Purpose                                   |
| --------------------------------- | ----------------------------------------- |
| `.devcontainer/devcontainer.json` | Container definition and VS Code settings |
| `.vscode/extensions.json`         | Recommended VS Code extensions            |
| `.vscode/mcp.json`                | MCP server configuration                  |

### Customization

**Add a VS Code extension** — append to `.vscode/extensions.json`:

```jsonc
{
  "recommendations": ["your-publisher.your-extension"],
}
```

**Install additional tools** — add to `postCreateCommand` in `devcontainer.json`:

```jsonc
{
  "postCreateCommand": "npm install && pip install -r requirements.txt",
}
```

**Pass environment variables:**

```jsonc
{
  "remoteEnv": {
    "AZURE_SUBSCRIPTION_ID": "${localEnv:AZURE_SUBSCRIPTION_ID}",
  },
}
```

### GitHub Codespaces

1. Go to the repository on GitHub
2. Click **Code** → **Codespaces** → **Create codespace on main**
3. Wait for the container to build (first time takes 2-3 minutes)

---

## Setup Steps

Complete these **before** the microhack to avoid network congestion on the day.

### 1. Clone and Open

```bash
git clone https://github.com/jonathan-vella/azure-agentic-infraops-workshop.git
cd azure-agentic-infraops-workshop
code .
```

When VS Code opens, accept the **"Reopen in Container"** prompt.

### 2. Build the Dev Container

Building takes 3-5 minutes. Do this ahead of time:

1. Press `F1` → type "Dev Containers: Reopen in Container"
2. Wait for the container to build (watch progress in the terminal)
3. Once complete, verify tools:

```bash
az version        # Expected: 2.50+
bicep --version   # Expected: 0.20+
pwsh --version    # Expected: 7+
```

### 3. Authenticate with Azure

```bash
az login
az account set --subscription "<your-subscription-id>"
az account show --query "{Name:name, SubscriptionId:id, TenantId:tenantId}" -o table
```

### 4. Enable Custom Agents

Open VS Code Settings (`Ctrl+,`) and add:

```json
{
  "github.copilot.chat": {
    "customAgentInSubagent": {
      "enabled": true
    }
  }
}
```

### 5. Verify Prerequisites

```powershell
pwsh scripts/check-prerequisites.ps1
```

This validates Azure CLI, Bicep CLI, Node.js, npm, and GitHub CLI.

### 6. Start the Workflow

Open Copilot Chat (`Ctrl+Shift+I`) and select **InfraOps Conductor**:

```text
Describe the Azure infrastructure project you want to build.
```

The Conductor guides you through all 7 steps with approval gates:

1. **Requirements** — capture what you need
2. **Architecture** — WAF assessment and cost estimate
3. **Design** — diagrams and ADRs (optional)
4. **Planning** — Bicep implementation plan with governance
5. **Code** — AVM-first Bicep templates
6. **Deploy** — Azure provisioning with what-if preview
7. **Documentation** — as-built suite

Explore complete sample artifacts in [`agent-output/_sample/`](../agent-output/_sample/).

### Network Requirements

Ensure your network allows outbound HTTPS to:

| Service        | Domains                                                       |
| -------------- | ------------------------------------------------------------- |
| GitHub         | `github.com`, `api.github.com`                                |
| GitHub Copilot | `copilot.github.com`, `*.githubusercontent.com`               |
| Azure          | `*.azure.com`, `*.microsoft.com`, `login.microsoftonline.com` |
| Docker         | `docker.io`, `registry-1.docker.io`                           |

---

## Azure Quota Requirements

> ⚠️ **Verify your subscription has sufficient quota BEFORE the microhack.**

### Per-Team Resource Requirements

| Resource Type           | Quantity | SKU/Tier     | Region         |
| ----------------------- | -------- | ------------ | -------------- |
| Resource Groups         | 1-2      | N/A          | Sweden Central |
| App Service Plans       | 1        | P1v4 or S1   | Sweden Central |
| App Services (Web Apps) | 1-2      | N/A          | Sweden Central |
| Azure SQL Server        | 1        | N/A          | Sweden Central |
| Azure SQL Database      | 1        | S0 or Basic  | Sweden Central |
| Storage Accounts        | 1-2      | Standard_LRS | Sweden Central |
| Key Vault               | 1        | Standard     | Sweden Central |
| Application Insights    | 1        | N/A          | Sweden Central |
| Log Analytics Workspace | 1        | Per-GB       | Sweden Central |

### Optional Advanced Resources

| Resource Type                  | Quantity | SKU/Tier              | Region         |
| ------------------------------ | -------- | --------------------- | -------------- |
| Azure Front Door               | 1        | Standard or Premium   | Global         |
| Application Gateway            | 1        | Standard_v2 or WAF_v2 | Sweden Central |
| Web Application Firewall (WAF) | 1        | N/A (part of AppGW)   | Sweden Central |
| Traffic Manager                | 1        | N/A                   | Global         |
| Azure Container Registry       | 1        | Basic or Standard     | Sweden Central |

### Challenge 4 — DR Additional Resources

| Resource Type                | Quantity | SKU/Tier     | Region               |
| ---------------------------- | -------- | ------------ | -------------------- |
| Resource Groups              | 1        | N/A          | Germany West Central |
| App Service Plans            | 1        | P1v4 or S1   | Germany West Central |
| App Services (Web Apps)      | 1        | N/A          | Germany West Central |
| Azure SQL Database (replica) | 1        | S0 or Basic  | Germany West Central |
| Storage Accounts (GRS)       | 1        | Standard_GRS | Sweden Central       |

### Multi-Team Shared Subscription (4 teams)

| Resource Type            | Total |
| ------------------------ | ----- |
| Resource Groups          | 8-12  |
| App Service Plans        | 8     |
| App Services (Web Apps)  | 8-12  |
| Azure SQL Servers        | 4     |
| Azure SQL Databases      | 8     |
| Storage Accounts         | 8-12  |
| Key Vaults               | 4     |
| Application Insights     | 4     |
| Log Analytics Workspaces | 4     |

### Checking and Increasing Quotas

**Azure Portal**: Search "Quotas" → filter by region → review per resource type.

**Azure CLI:**

```bash
az vm list-usage --location swedencentral --output table
az storage account list --query "length(@)"
```

**Common issues:**

| Issue                         | Solution                                         |
| ----------------------------- | ------------------------------------------------ |
| "Subscription not registered" | `az provider register --namespace Microsoft.Web` |
| "Quota exceeded"              | Request increase via Azure Portal → Quotas       |
| "Region not available"        | Use alternative region or request access         |
| "SKU not available in region" | Try a different SKU tier                         |

> ⚠️ **Request quota increases at least 1 week before the microhack** to ensure approval.

### Estimated Event Costs

| Configuration         | Estimated Cost (~8 hours) |
| --------------------- | ------------------------- |
| Single team (basic)   | €5-10                     |
| Single team (with DR) | €10-20                    |
| 4 teams (shared sub)  | €30-50                    |

> Delete all resources immediately after the microhack.
> Use: `scripts/microhack/Cleanup-MicrohackResources.ps1`

### Pre-Microhack Verification

```powershell
az login
az account set --subscription "<your-subscription-id>"
az group create --name rg-quota-test --location swedencentral
az group delete --name rg-quota-test --yes --no-wait
```

---

## Event-Day Checklist

- [ ] **Docker Desktop** installed and running
- [ ] **VS Code** 1.100+ with required extensions
- [ ] **Git** installed (2.40+)
- [ ] **GitHub account** with Copilot Pro+ or Enterprise
- [ ] **Azure subscription** with Owner access
- [ ] **Repository cloned** locally
- [ ] **Dev Container built** (F1 → Reopen in Container)
- [ ] **Azure CLI authenticated** (`az login` successful)
- [ ] **Custom agents enabled** (VS Code setting)
- [ ] **Network access** verified (no proxy issues)
- [ ] **Quota verified** for Sweden Central

## First 10 Minutes on Event Day

1. Open VS Code → Reopen in Container (if not already running)
2. Verify Azure auth: `az account show`
3. Open Copilot Chat (`Ctrl+Alt+I`) → confirm agents appear in the dropdown
4. Read the [Workshop Prep](workshop-prep.md) to understand the scenario and team roles
5. Assign team roles using the role cards in [Workshop Prep](workshop-prep.md)

---

## Troubleshooting Quick Fixes

| Problem                   | Fix                                                                                   |
| ------------------------- | ------------------------------------------------------------------------------------- |
| Docker won't start        | **Windows**: ensure WSL 2 is enabled. **Mac**: check virtualization. Restart Docker.  |
| Copilot not working       | Sign out and back in with the correct GitHub account. Reload VS Code.                 |
| Azure CLI login fails     | Use device code flow: `az login --use-device-code`                                    |
| Dev Container build fails | `F1` → "Dev Containers: Rebuild Container Without Cache". Check Docker has 4 GB+ RAM. |
| Agents not in dropdown    | Verify `customAgentInSubagent` is enabled. Reload VS Code window.                     |

See [Troubleshooting](troubleshooting.md) for a complete reference.

---

## Next Steps

- [Copilot Guide](copilot-guide.md) — agents, skills, and prompting best practices
- [Workshop Prep](workshop-prep.md) — scenario brief and team role cards
- [Hints & Tips](hints-and-tips.md) — challenge-specific guidance
- [Troubleshooting](troubleshooting.md) — common issues and fixes

[azure-limits]: https://learn.microsoft.com/azure/azure-resource-manager/management/azure-subscription-service-limits
