// The joke about the demo — make.fun program/v1 entry.
//
// Writes one one-line joke about working beside AI coding agents to
// entry.txt inside the directory given by MAKEFUN_OUTPUT_DIR
// (falling back to /output). No dependencies, no network.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "I asked my AI agent to fix one bug before the demo; it fixed the bug, then fixed the fix, then fixed the fix's fix — by showtime, the only thing still working was its confidence.";

const rawOutputDir = (process.env.MAKEFUN_OUTPUT_DIR || "").trim();
const outputDir = rawOutputDir.length > 0 ? rawOutputDir : "/output";

mkdirSync(outputDir, { recursive: true });
const target = join(outputDir, "entry.txt");
writeFileSync(target, JOKE, "utf8");

// Read the file back and confirm exactly what was written, so a
// silent or partial write can never pass as a valid entry.
const written = readFileSync(target, "utf8");
if (written !== JOKE) {
  throw new Error("entry.txt does not match the joke exactly");
}
