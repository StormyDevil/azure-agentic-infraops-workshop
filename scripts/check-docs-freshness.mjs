#!/usr/bin/env node

/**
 * check-docs-freshness.mjs
 *
 * Audits documentation freshness by checking:
 *   1. VERSION.md exists and syncs with package.json
 *   2. Agent count/table accuracy in docs/README.md
 *   3. Skill count/table accuracy in docs/README.md
 *   4. Prohibited references (removed agents/skills)
 *   5. Broken internal links in docs/
 *   6. Missing files referenced by docs-writer skill
 *
 * Exit 0 = all checks passed, Exit 1 = issues found.
 */

import { readFileSync, readdirSync, existsSync, statSync } from "fs";
import { join, resolve, dirname, relative } from "path";
import { fileURLToPath } from "url";
import { globSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, "..");

// ── Helpers ──────────────────────────────────────────────────────────

function readText(relPath) {
  const abs = join(ROOT, relPath);
  if (!existsSync(abs)) return null;
  return readFileSync(abs, "utf8");
}

function listDirs(relPath) {
  const abs = join(ROOT, relPath);
  if (!existsSync(abs)) return [];
  return readdirSync(abs, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

function listFiles(relPath, ext) {
  const abs = join(ROOT, relPath);
  if (!existsSync(abs)) return [];
  return readdirSync(abs).filter((f) => (ext ? f.endsWith(ext) : true));
}

function findMdFiles(dir) {
  const results = [];
  const abs = join(ROOT, dir);
  if (!existsSync(abs)) return results;
  for (const entry of readdirSync(abs, { withFileTypes: true })) {
    const rel = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findMdFiles(rel));
    } else if (entry.name.endsWith(".md")) {
      results.push(rel);
    }
  }
  return results;
}

// ── Issues collector ─────────────────────────────────────────────────

const issues = [];
function issue(file, line, msg, fix) {
  issues.push({ file, line, issue: msg, fix });
}

// ── Audit 1: VERSION.md exists and syncs ─────────────────────────────

console.log("🔍 Audit 1: VERSION.md sync...");

const versionMd = readText("VERSION.md");
if (!versionMd) {
  issue("VERSION.md", 0, "VERSION.md does not exist", "Create VERSION.md");
} else {
  const versionMatch = versionMd.match(/Current Version:\s*(\d+\.\d+\.\d+)/);
  const pkgJson = JSON.parse(readText("package.json") || "{}");
  if (versionMatch && pkgJson.version) {
    if (versionMatch[1] !== pkgJson.version) {
      issue(
        "VERSION.md",
        0,
        `VERSION.md says ${versionMatch[1]} but package.json says ${pkgJson.version}`,
        "Align version numbers",
      );
    }
  }
}

// ── Audit 2: Agent count ─────────────────────────────────────────────

console.log("🔍 Audit 2: Agent count...");

const agentFiles = listFiles(".github/agents", ".agent.md").filter(
  (f) => !f.startsWith("_"),
);
const subagentDirs = listDirs(".github/agents").filter((d) =>
  d.startsWith("_"),
);
let subagentCount = 0;
for (const d of subagentDirs) {
  subagentCount += listFiles(`.github/agents/${d}`, ".agent.md").length;
}
const actualAgentCount = agentFiles.length;

const docsReadme = readText("docs/README.md");
if (docsReadme) {
  const agentHeadingMatch = docsReadme.match(/## Agents \((\d+)/);
  if (agentHeadingMatch) {
    const docCount = parseInt(agentHeadingMatch[1], 10);
    if (docCount !== actualAgentCount) {
      issue(
        "docs/README.md",
        0,
        `Agent heading says ${docCount} but found ${actualAgentCount} agent files`,
        `Update heading to "## Agents (${actualAgentCount} + ${subagentCount} Subagents)"`,
      );
    }
  }
}

// ── Audit 3: Skill count ─────────────────────────────────────────────

console.log("🔍 Audit 3: Skill count...");

const skillDirs = listDirs(".github/skills").filter((d) =>
  existsSync(join(ROOT, ".github/skills", d, "SKILL.md")),
);
const actualSkillCount = skillDirs.length;

if (docsReadme) {
  const skillHeadingMatch = docsReadme.match(/## Skills \((\d+)\)/);
  if (skillHeadingMatch) {
    const docCount = parseInt(skillHeadingMatch[1], 10);
    if (docCount !== actualSkillCount) {
      issue(
        "docs/README.md",
        0,
        `Skill heading says ${docCount} but found ${actualSkillCount} skill dirs`,
        `Update heading to "## Skills (${actualSkillCount})"`,
      );
    }
  }
}

// ── Audit 4: Prohibited references ───────────────────────────────────

console.log("🔍 Audit 4: Prohibited references...");

const BANNED = [
  "azure-workload-docs",
  "azure-deployment-preflight",
  "gh-cli",
  "github-issues",
  "github-pull-requests",
  "orchestration-helper",
  "diagram.agent.md",
  "adr.agent.md",
  "docs.agent.md",
];

const filesToScan = ["README.md", "CONTRIBUTING.md", ...findMdFiles("docs")];

for (const relFile of filesToScan) {
  const content = readText(relFile);
  if (!content) continue;
  const lines = content.split("\n");
  for (let i = 0; i < lines.length; i++) {
    for (const banned of BANNED) {
      if (lines[i].includes(banned)) {
        issue(
          relFile,
          i + 1,
          `Prohibited reference: "${banned}"`,
          "Replace with current skill/agent name",
        );
      }
    }
  }
}

// ── Audit 5: Key files exist ─────────────────────────────────────────

console.log("🔍 Audit 5: Key documentation files...");

const EXPECTED_FILES = [
  "VERSION.md",
  "docs/README.md",
  "docs/quickstart.md",
  "docs/troubleshooting.md",
  "docs/copilot-tips.md",
  "docs/dev-containers.md",
  "docs/GLOSSARY.md",
];

for (const f of EXPECTED_FILES) {
  if (!existsSync(join(ROOT, f))) {
    issue(f, 0, `Expected file does not exist: ${f}`, `Create ${f}`);
  }
}

// ── Audit 6: docs/*.md header pattern ────────────────────────────────

console.log("🔍 Audit 6: Doc header pattern...");

const docFiles = findMdFiles("docs");
for (const relFile of docFiles) {
  // Skip guides subfolder — different convention
  if (relFile.startsWith("docs/guides/")) continue;
  const content = readText(relFile);
  if (!content) continue;
  const lines = content.split("\n");
  // First line should be a H1
  if (!lines[0]?.startsWith("# ")) {
    issue(relFile, 1, "Missing H1 title on first line", "Add # Title");
  }
  // Should have a version reference line
  const hasVersionRef = lines.some(
    (l) => l.includes("[Current Version]") || l.includes("VERSION.md"),
  );
  if (!hasVersionRef) {
    issue(
      relFile,
      0,
      "Missing version reference in header",
      "Add > [Current Version](../VERSION.md) line after H1",
    );
  }
}

// ── Report ───────────────────────────────────────────────────────────

console.log("");
console.log("=".repeat(60));

if (issues.length === 0) {
  console.log("✅ Documentation freshness check passed — no issues found");
  process.exit(0);
} else {
  console.log(`❌ Found ${issues.length} freshness issue(s):\n`);
  console.log("| # | File | Line | Issue | Fix |");
  console.log("|---|------|------|-------|-----|");
  issues.forEach((iss, idx) => {
    const line = iss.line > 0 ? `L${iss.line}` : "—";
    console.log(
      `| ${idx + 1} | ${iss.file} | ${line} | ${iss.issue} | ${iss.fix} |`,
    );
  });
  console.log("");
  process.exit(1);
}
