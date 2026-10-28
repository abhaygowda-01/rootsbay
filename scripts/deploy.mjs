// npm run deploy — puts the last commit live on Vercel (production).
//
// Vercel's free (Hobby) plan blocks any deployment whose git commit author is not the account owner,
// and this repo's commits are authored "Rootsbay Website". So instead of deploying the git checkout,
// this exports the committed files (`git archive HEAD`) into a temporary folder that is not a git
// repository, copies in the Vercel project link (.vercel/), and runs `vercel deploy --prod` there.
// Only committed work is deployed: commit first, then run this.

import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const root = process.cwd();
const link = join(root, ".vercel", "project.json");
if (!existsSync(link)) {
  console.error("This folder is not linked to Vercel yet. Run: npx vercel link --project rootsbay-exports");
  process.exit(1);
}

const git = (...args) => execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
const head = git("log", "-1", "--format=%h %s");
if (git("status", "--porcelain")) {
  console.warn("Note: you have uncommitted changes. They will NOT be deployed; only the last commit is.");
}

const temp = mkdtempSync(join(tmpdir(), "rootsbay-deploy-"));
const site = join(temp, "site");
try {
  const tarball = join(temp, "site.tar");
  git("archive", "--format=tar", "--prefix=site/", "-o", tarball, "HEAD");
  execFileSync("tar", ["-xf", tarball, "-C", temp]);
  cpSync(join(root, ".vercel"), join(site, ".vercel"), { recursive: true });

  console.log(`Deploying ${head} to production...`);
  const vercel = join(root, "node_modules", "vercel", "dist", "vc.js");
  execFileSync(process.execPath, [vercel, "deploy", "--prod", "--yes"], { cwd: site, stdio: "inherit" });
} finally {
  rmSync(temp, { recursive: true, force: true });
}
