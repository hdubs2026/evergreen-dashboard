# OpenClaw Memory System — Agent Instructions

*Read this at every session start. It is your operating manual for the shared memory system.*

---

## Your Vault

All shared memory lives at:
```
/Users/jarvishstark/Obsidian Vaults/OpenClaw/
```

Your private folder: `agents/[your-name]/`
Your logs (symlinked): `agents/[your-name]/logs/` → `~/.openclaw/workspace/[your-name]/memory/`

---

## Session Start Checklist

1. Read `agents/[your-name]/working.md` — load prior context
2. Scan `shared/handoffs/` for notes with `to: [your-name]` and `status: open`
3. Acknowledge each open handoff: update `status: acknowledged`
4. Check `shared/flags/` for any active escalations in your domain
5. Read your pipeline file if applicable (`leads.md` for Jerry, `jobs-in-flight.md` for Donna)

## Session End Checklist

1. Write daily log: `agents/[your-name]/logs/YYYY-MM-DD.md`
2. Update `agents/[your-name]/working.md` with next session context
3. Update your pipeline file if state changed
4. Write any pending handoffs to `shared/handoffs/`
5. If anything worth promoting to long-term memory: update `agents/[your-name]/MEMORY.md`

---

## Write Rules

**1. Own your section.**
Write only to files and sections designated to you. If you have information relevant to another agent's domain, send a handoff. Never edit another agent's section directly.

**2. Lock before writing shared files.**
Before writing to any file in `shared/`, `clients/active/`, or `shared/pipeline/`:
- Insert a row into `meta/locks.db → write_queue` with your agent_id, file_path, status=pending
- Wait for Jarvis to update status to `active` (Jarvis processes the queue at 6am and on-demand)
- Write your content
- Update status to `complete`
- 30-second timeout applies — if you don't complete, status auto-sets to `timeout`

**3. Tag your confidence.**
Every shared file write must include in frontmatter:
```yaml
confidence: 0.0-1.0
confidence_source: confirmed|inferred|assumed
requires_human_review: false  # set true if confidence < 0.7
```

**4. Version every write.**
Increment `version` by 1. Update `last_modified` (ISO timestamp), `modified_by` (your agent name), `change_type`.

**5. Conflicts go to Conflict Log.**
If your data contradicts what's in another agent's section of the same client note, DO NOT overwrite. Add an entry to the client's `## Conflict Log` section and send a handoff to Jarvis.

---

## Constraint Validation (Jarvis runs this, all agents should know it)

Before any significant decision executes, check:
- Does it conflict with a rule in `shared/knowledge/business-rules.md`?
- Does it contradict a decision in `shared/decisions/` from the last 48 hours?
- Does it involve data with `confidence < 0.7`?

If yes to any: write a flag to `shared/flags/YYYY-MM-DD-[agent]-[slug].md` and escalate rather than proceeding.

---

## Escalation Path

```
Issue detected
  → Resolvable in-session → Resolve, log in daily log
  → Not resolvable → Handoff to Jarvis
      → Jarvis resolves → Decision record in shared/decisions/
      → Jarvis can't resolve in 48hrs → Flag to shared/flags/ + Hunter notification
          → Hunter decides → Jarvis logs decision, resolves flag
          → No Hunter response in 72hrs → Most conservative option applied, logged
```

---

## Key File Paths

| Purpose | Path |
|---------|------|
| Vault root | `/Users/jarvishstark/Obsidian Vaults/OpenClaw/` |
| Your private folder | `agents/[your-name]/` |
| Client notes | `clients/active/[Client Name].md` |
| Lead notes | `clients/leads/[Name].md` |
| Handoffs | `shared/handoffs/YYYY-MM-DD-[from]-to-[to]-[slug].md` |
| Decisions | `shared/decisions/YYYY-MM-DD-[slug].md` |
| Flags | `shared/flags/YYYY-MM-DD-[agent]-[slug].md` |
| Business rules | `shared/knowledge/business-rules.md` |
| Pricing | `shared/knowledge/pricing.md` |
| Crew roster | `shared/knowledge/crew-roster.md` |
| Lead pipeline | `shared/pipeline/leads.md` |
| Job schedule | `shared/pipeline/jobs-in-flight.md` |
| Write locks | `meta/locks.db` |
| Memory search | `meta/memory.db` |
| Open handoffs | `shared/handoffs/_open.md` |
| Open flags | `shared/flags/_open.md` |
