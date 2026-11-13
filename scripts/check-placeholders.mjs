import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const note = /\[[A-Za-z][^\n\[\]]{0,120}\]/g;
const keywords = /(to be|confirm|I'll|I&#x27;ll|I&apos;ll|added|certificate|insurer|year)/i;
const leftover =
  /go here when|once they are supplied|once it is backed up|will be added as|I'll send|Hours and target|Usual ranges|Permission pending|keep this only/i;

let hits = 0;

const inspect = (path, extra) => {
  const text = readFileSync(path, "utf8");
  const notes = text.match(note) || [];
  notes.forEach((item) => {
    if (!keywords.test(item)) return;
    hits += 1;
    console.log(path, item);
  });
  if (extra) {
    const match = text.match(leftover);
    if (match) {
      hits += 1;
      console.log(path, match[0]);
    }
  }
};

const walk = (dir, test, extra) => {
  if (!existsSync(dir)) return;
  readdirSync(dir).forEach((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      if (name === "node_modules" || name === ".git") return;
      return walk(path, test, extra);
    }
    if (!test(name, path)) return;
    inspect(path, extra);
  });
};

const source = (name, path) =>
  /\.(ts|tsx|js|jsx)$/.test(name) && !path.includes(`${join("app", "admin")}`);

walk("app", source, true);
walk("components", source, true);
walk("lib", source, true);

const afterBuild = process.env.npm_lifecycle_event === "build" || process.argv.includes("--built");
if (afterBuild || !existsSync(join(".next", "dev"))) {
  walk(".next/server/app", (name) => /\.(html|rsc)$/.test(name), false);
}

if (hits) {
  console.error(`Found ${hits} drafting-note placeholder(s).`);
  process.exit(1);
}

console.log("No drafting-note placeholders found.");
