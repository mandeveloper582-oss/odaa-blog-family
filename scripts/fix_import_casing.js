const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', 'frontend', 'src');
const EXT_CANDIDATES = ['.jsx', '.js', '.tsx', '.ts'];

function walk(dir) {
  const files = [];
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) files.push(...walk(full));
    else if (/\.(jsx|js|tsx|ts)$/.test(name)) files.push(full);
  }
  return files;
}

function findActualPathSegments(startDir, segments) {
  // startDir is absolute path
  let cur = startDir;
  const actualSegments = [];
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i];
    // handle .. and .
    if (seg === '..' || seg === '.') {
      actualSegments.push(seg);
      cur = path.resolve(cur, seg);
      continue;
    }
    // list entries in cur
    let entries;
    try {
      entries = fs.readdirSync(cur);
    } catch (e) {
      return null;
    }
    // try to find exact match case-insensitive for seg
    const match = entries.find(e => e.toLowerCase() === seg.toLowerCase());
    if (match) {
      actualSegments.push(match);
      cur = path.join(cur, match);
      continue;
    }
    // If not found, but this might be last segment without extension (pointing to a file)
    if (i === segments.length - 1) {
      // look for file in cur with name starting with seg (without ext)
      const fileMatch = entries.find(e => {
        const base = path.parse(e).name;
        return base.toLowerCase() === seg.toLowerCase() && EXT_CANDIDATES.includes(path.extname(e));
      });
      if (fileMatch) {
        actualSegments.push(fileMatch.replace(path.extname(fileMatch), ''));
        cur = path.join(cur, fileMatch);
        continue;
      }
    }
    return null;
  }
  return actualSegments;
}

function makePosixPath(p) {
  return p.split(path.sep).join('/');
}

const files = walk(ROOT);
const importRegex = /from\s+['\"](\.\.?[\/\\][^'\"]+)['\"]|import\(\s*['\"](\.\.?[\/\\][^'\"]+)['\"]\s*\)/g;
let totalFixes = 0;
const edits = [];
for (const file of files) {
  const relFile = path.relative(ROOT, file);
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;
  const dir = path.dirname(file);
  let m;
  // reset regex lastIndex
  importRegex.lastIndex = 0;
  while ((m = importRegex.exec(content))) {
    const imp = m[1] || m[2];
    if (!imp) continue;
    // only handle imports that reference frontend/src
    const impPath = imp.replace(/\\/g, '/');
    const segs = impPath.split('/');
    // resolve actual segments relative to dir
    const actual = findActualPathSegments(dir, segs);
    if (!actual) continue;
    const corrected = makePosixPath(actual.join('/'));
    if (corrected !== impPath) {
      // replace only this occurrence
      const before = content.slice(0, m.index);
      const matched = m[0];
      // build replacement string preserving "from" or import()
      const quote = matched.includes('from') ? 'from' : 'import(';
      // simpler: replace imp within matched
      const newMatched = matched.replace(imp, corrected);
      content = content.slice(0, m.index) + newMatched + content.slice(m.index + matched.length);
      importRegex.lastIndex = m.index + newMatched.length;
      modified = true;
      totalFixes++;
      edits.push({file: relFile, from: impPath, to: corrected});
    }
  }
  if (modified) fs.writeFileSync(file, content, 'utf8');
}

console.log('Total fixes:', totalFixes);
for (const e of edits) console.log(e.file, e.from, '=>', e.to);

if (totalFixes === 0) process.exit(0);
else process.exit(0);
