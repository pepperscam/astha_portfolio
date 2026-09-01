import fs from 'fs';
import path from 'path';

const possibleSources = [
  path.resolve('artifacts/portfolio/dist/public'),
  path.resolve('artifacts/portfolio/dist')
];

let source = null;
for (const p of possibleSources) {
  if (fs.existsSync(path.join(p, 'index.html'))) {
    source = p;
    break;
  }
}

if (!source && fs.existsSync(possibleSources[0])) {
  source = possibleSources[0];
} else if (!source && fs.existsSync(possibleSources[1])) {
  source = possibleSources[1];
}

if (source) {
  const targets = [
    path.resolve('public'),
    path.resolve('dist')
  ];

  for (const target of targets) {
    if (path.resolve(source) !== path.resolve(target)) {
      fs.mkdirSync(target, { recursive: true });
      fs.cpSync(source, target, { recursive: true });
      console.log(`Synced build output to: ${target}`);
    }
  }
} else {
  console.warn('Warning: Could not find build output to sync.');
}
