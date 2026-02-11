# Team Role Cards

> **Print and distribute** to each team member (up to 5 per team).

---

## Team Structure

| Aspect          | Details                  |
| --------------- | ------------------------ |
| Team Size       | Up to 5 members per team |
| Number of Teams | Maximum 4 teams          |

> **Note**: If you have 5 team members, one person can take on a combined or floating role,
> or you can have two people share the Architect role (one focusing on security, one on cost).

---

## 🚗 Driver

**Primary Responsibility**: Hands on keyboard

### You Will:

- Type all commands and code
- Navigate VS Code and Azure Portal
- Execute agent prompts when team agrees
- Run deployments and tests

### Tips:

- Share your screen so team can follow
- Verbalize what you're doing: "I'm about to invoke the `architect` agent..."
- Pause before executing — wait for team consensus
- Ask "Should I run this?" before deployments
- In **Challenges 6-7** (Documentation/Diagnostics): Type documentation prompts, review generated docs

### Collaboration is Key:

- Don't make decisions alone — this is team-based discovery
- Embrace pauses for discussion — silence means thinking!
- When stuck, ask: "What question should I ask the agent?"

---

## 🧭 Navigator

**Primary Responsibility**: Guide strategy and next steps

### You Will:

- Read challenge instructions aloud
- Guide Driver on what to type/click next
- Watch for errors and typos
- Keep team focused on current task and time

### Tips:

- Have challenge doc open on your device
- Call out the next step before Driver finishes current one
- Catch mistakes early — "Wait, that should be..."
- Track time per challenge — we have 8 challenges in 6 hours!
- In **Challenge 4** (DR Curveball): Help team pivot quickly and update plan
- In **Challenges 6-7**: Identify what documentation audience needs most

### Coaching Mindset:

- When team is stuck, ask questions: "What are we trying to achieve?"
- Guide exploration: "Have we considered...?"
- Track learning: "We just discovered that..."

---

## 🏗️ Architect

**Primary Responsibility**: Technical decisions and quality

### You Will:

- Review agent suggestions before team approves
- Validate architecture against WAF pillars
- Make SKU and service choices
- Ensure security best practices

### Tips:

- Have the quick reference card handy
- Question each agent recommendation: "Why this service?"
- Check: "Does this meet our NFRs?"
- Watch the budget! (€500 → €700 after Challenge 4)
- In **Challenge 2**: Lead WAF alignment discussion
- In **Challenge 4**: Evaluate DR trade-offs (cost vs. RTO/RPO)
- In **Challenge 6**: Ensure docs match actual architecture

### Critical Questions to Ask:

- "Is this the right SKU for our SLA?"
- "Are we using managed identities?"
- "Does this handle the DR requirement?"
- "What's the cost impact of this choice?"

---

## 📝 Documenter

**Primary Responsibility**: Capture decisions and prepare showcase

### You Will:

- Note key decisions and rationale
- Track which challenges are complete
- Document blockers and solutions
- Prepare for **Challenge 8: Partner Showcase**

### Tips:

- Keep a running log in a text file or notepad
- Screenshot interesting outputs and architectures
- Note times for each challenge completion
- Prepare 2-minute summary for final presentation
- In **Challenge 4**: Document ADR (Architecture Decision Record) reasoning
- In **Challenges 6-7**: Lead documentation agent interactions — you know what's needed!

### Capture These Details:

- "We chose X because..." (business justification)
- "The agent suggested Y but we changed to Z because..."
- "We got stuck on... and solved it by..." (learning moments)
- "Our final architecture includes..." (for Challenge 8 showcase)

---

## Role Rotation (Optional)

For **8 challenges**, consider rotating every 2 challenges:

| Challenges | Driver | Navigator | Architect | Documenter |
| ---------- | ------ | --------- | --------- | ---------- |
| 1-2        | A      | B         | C         | D          |
| 3-4        | B      | C         | D         | A          |
| 5-6        | C      | D         | A         | B          |
| 7-8        | D      | A         | B         | C          |

**Suggested Lead Roles for New Challenges:**

- **Challenge 6 (Documentation)**: Documenter leads — they know what's missing!
- **Challenge 7 (Diagnostics)**: Architect leads — technical troubleshooting perspective
- **Challenge 8 (Showcase)**: Documenter presents, everyone supports

---

## Team Agreement

Before starting, agree on:

- [ ] Who plays which role initially
- [ ] Will we rotate roles? After which challenges?
- [ ] How do we make decisions when we disagree? (Vote? Discuss? Architect decides?)
- [ ] Break strategy (together or staggered? Lunch 12:10-12:40)
- [ ] How do we support each other when stuck? (Ask questions, not give answers)

---

**Team Name**: **\*\*\*\***\_**\*\*\*\***

| Role              | Name |
| ----------------- | ---- |
| 🚗 Driver         |      |
| 🧭 Navigator      |      |
| 🏗️ Architect      |      |
| 📝 Documenter     |      |
| 🔄 Floater (opt.) |      |

**Coaching Philosophy**: We discover solutions together through questions, not by following prescriptive steps!
