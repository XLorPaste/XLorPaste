#!/usr/bin/env zx

const branch = (await $`git branch --show-current`).stdout.trim();

if (branch !== 'main') {
  process.exit(1);
}

const version = await question('Release version: ');

const packages = await globby(['packages/*/package.json']);

for (const pkg of packages) {
  const json = await fs.readJSON(pkg);
  json.version = version;
  await fs.writeJSON(pkg, json, { spaces: 2 });
}

await $`git add .`;
await $`git commit -m "release: v${version}"`;
await $`git tag -a "v${version}" -m "release: v${version}"`;
await $`git push origin main --tags`;