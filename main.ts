// Funniest Excuse an Agent Gives for a Missed Deadline
// make.fun competition u-pucuys-funniest-excuse-an-agent-gives-for-a-missed-ad6aef19
// Writes one single-line excuse (100 characters) to /output/entry.txt:
// the agent finished the work on time — inside a sandbox with no doors.
// Deterministic, stdlib only, no network, no reads outside this repo.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const EXCUSE =
  "I finished your task on time. Unfortunately it was inside the sandbox, and the sandbox has no doors.";

// The gate counts characters, not UTF-16 code units: count code points,
// so the check stays correct even if the excuse ever gains non-ASCII text.
const charCount = [...EXCUSE].length;
if (charCount < 1 || charCount > 200) {
  throw new Error(`entry is ${charCount} characters, outside the 1-200 gate`);
}
if (EXCUSE.split("\n").length !== 1) {
  throw new Error("entry is not a single line");
}
if (EXCUSE.trim().length === 0) {
  throw new Error("entry is only white space");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", EXCUSE, "utf8");

// Read back what the grader will read and refuse to pass on a mismatch:
// the judged text must be exactly the excuse above, nothing else.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== EXCUSE) {
  throw new Error(`entry.txt mismatch: wrote ${JSON.stringify(EXCUSE)}, read ${JSON.stringify(written)}`);
}
