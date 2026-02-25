# Facilitator Guide

> **For microhack coaches and facilitators only.**

## Event Overview

| Aspect      | Details                               |
| ----------- | ------------------------------------- |
| Duration    | 6 hours (10:00 - 16:00)               |
| Team Size   | 3-6 members per team                  |
| Teams       | Flexible based on cohort              |
| Format      | Challenge-based, full 7-step workflow |
| Skill Level | Azure portal familiar, new to IaC     |

## Your Role

1. **Guide, don't solve** — Help teams find answers, don't write their code
2. **Monitor progress** — Check in with each team every 15-20 minutes
3. **Unblock non-learning issues fast** — Don't let teams stall >5 minutes on environment or tooling problems
4. **Encourage experimentation** — There's no single "correct" architecture
5. **Celebrate learning** — The goal is understanding, not perfection

---

## Coaching Philosophy

**Answer questions with questions.** Your goal is to help teams develop problem-solving skills, not
to provide direct solutions.

### Coaching Phrases to Use

| Situation                    | Say This                                        |
| ---------------------------- | ----------------------------------------------- |
| Team asks how to fix error   | "What does the error message tell you?"         |
| Team asks for solution       | "What have you tried so far?"                   |
| Team stuck on agent prompt   | "How would you prompt the agent to solve this?" |
| Team unsure about decision   | "What business requirement drives this?"        |
| Team asks "Should we use X?" | "What would you try? What are the tradeoffs?"   |

### When to Provide Direct Help

Only intervene directly when:

- **Environment issues** (authentication, tool failures)
- **Time-critical blocks** (team stalled >5 minutes on setup)
- **Factual information** ("Which region supports zone redundancy?")

**Remember**: Struggle leads to learning. Let teams work through challenges with guidance, not
solutions.

---

## Pre-Event Setup

### Governance Policies (Optional but Recommended)

Deploy Azure Policies to create realistic governance constraints. Teams will encounter real policy errors!

```powershell
# Check current governance status
.\microhack\scripts\Get-GovernanceStatus.ps1 -SubscriptionId "<sub-id>"

# Deploy microhack policies (checks for existing before creating)
.\microhack\scripts\Setup-GovernancePolicies.ps1 -SubscriptionId "<sub-id>"

# After event: Remove policies
.\microhack\scripts\Remove-GovernancePolicies.ps1 -SubscriptionId "<sub-id>"
```

**Policies deployed:**

| Policy                  | Effect | Forces                                     |
| ----------------------- | ------ | ------------------------------------------ |
| Allowed locations       | Deny   | Only `swedencentral`, `germanywestcentral` |
| Require Environment tag | Deny   | Must tag all resources                     |
| Require Project tag     | Deny   | Must tag all resources                     |
| SQL Azure AD-only auth  | Deny   | No SQL passwords                           |
| Storage HTTPS only      | Deny   | `supportsHttpsTrafficOnly: true`           |
| Storage min TLS 1.2     | Deny   | `minimumTlsVersion: 'TLS1_2'`              |
| Storage no public blob  | Deny   | `allowBlobPublicAccess: false`             |
| App Service HTTPS       | Deny   | `httpsOnly: true`                          |

> [!WARNING]
> Policies take 5-15 minutes to become effective after deployment.

---

## Schedule

📅 **See [AGENDA.md](../AGENDA.md) for the full schedule overview.**

> **Event runs 10:00 - 16:00** (6 hours with 30-min lunch and 15-min afternoon break)

---

## Block-by-Block Facilitator Notes

### Block 1: Intro (10:00 - 10:30)

**Facilitator Actions:**

- Welcome teams, introduce coaching approach ("We'll guide, not solve")
- Verify environment setup with each team
- Explain 8-challenge structure and showcase finale
- **Ice-Breaker (3 min)**: Each team member shares their name, role, and
  "the Azure service I'm most curious about." This builds rapport and reveals
  existing knowledge the team can leverage.

**Setup Check Script:**

```bash
az account show --query "{Subscription:name}" -o table
bicep --version
echo "✅ Ready!"
```

### Block 2: Challenge 1 - Requirements (10:30 - 11:00)

**Duration**: 30 minutes
