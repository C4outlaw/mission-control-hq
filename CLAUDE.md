# Project instructions

## Creating and editing skills

Whenever a skill is created, rewritten, or meaningfully changed, load the
`skill-creator` skill (`anthropic-skills:skill-creator`) first and follow its
process. Do not hand-write a `SKILL.md` from memory.

Apply Anthropic's skill-authoring best practices on every skill:

- **Frontmatter**: `name` in lowercase-hyphen form, and a `description` written
  in the third person that says both what the skill does and when to use it,
  including the phrases a user would actually say. The description is the only
  thing that decides whether the skill triggers.
- **Keep `SKILL.md` lean** (under about 500 lines). Only add what Claude does
  not already know.
- **Progressive disclosure**: put long reference material, examples, and
  schemas in separate files next to `SKILL.md`, linked one level deep, so they
  load only when needed.
- **Scripts for deterministic work**: bundle a tested script rather than asking
  Claude to regenerate the same code each run.
- **Explain the why** behind instructions rather than stacking rigid
  ALWAYS/NEVER rules, and match how strict the wording is to how fragile the
  task is.
- **Test before calling it done**: run the skill on realistic prompts, check
  that it triggers when it should and stays quiet when it should not, and
  revise from what the runs show.
