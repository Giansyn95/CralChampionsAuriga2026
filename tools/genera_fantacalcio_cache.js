#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const http = require('http');
const { URL } = require('url');

let chromium;
try {
  chromium = require('playwright-chromium').chromium;
} catch (err) {
  try {
    chromium = require('playwright').chromium;
  } catch (err2) {
    console.error('Playwright non trovato. Installa con: npm install --no-save playwright-chromium');
    process.exit(1);
  }
}

const repoRoot = process.cwd();
const indexPath = path.join(repoRoot, 'index.html');
const dataDir = path.join(repoRoot, 'data');
const outPath = path.join(dataDir, 'fantacalcio_cache.json');

function walkCsvFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkCsvFiles(full));
    else if (entry.isFile() && /\.csv$/i.test(entry.name)) out.push(full);
  }
  return out.sort((a, b) => a.localeCompare(b, 'it'));
}

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.html') return 'text/html; charset=utf-8';
  if (ext === '.csv') return 'text/csv; charset=utf-8';
  if (ext === '.json') return 'application/json; charset=utf-8';
  if (ext === '.js') return 'application/javascript; charset=utf-8';
  if (ext === '.css') return 'text/css; charset=utf-8';
  if (ext === '.png') return 'image/png';
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.svg') return 'image/svg+xml';
  return 'application/octet-stream';
}

function createStaticServer(root) {
  return http.createServer((req, res) => {
    try {
      const reqUrl = new URL(req.url, 'http://127.0.0.1');
      let rel = decodeURIComponent(reqUrl.pathname.replace(/^\/+/, '')) || 'index.html';
      rel = rel.replace(/\\/g, '/');
      const full = path.resolve(root, rel);
      if (!full.startsWith(path.resolve(root) + path.sep) && full !== path.resolve(root)) {
        res.writeHead(403); res.end('Forbidden'); return;
      }
      if (!fs.existsSync(full) || !fs.statSync(full).isFile()) {
        res.writeHead(404); res.end('Not found'); return;
      }
      res.writeHead(200, { 'Content-Type': contentType(full), 'Cache-Control': 'no-store' });
      fs.createReadStream(full).pipe(res);
    } catch (err) {
      res.writeHead(500); res.end(String(err && err.message || err));
    }
  });
}

function listen(server) {
  return new Promise(resolve => server.listen(0, '127.0.0.1', () => resolve(server.address().port)));
}

async function main() {
  if (!fs.existsSync(indexPath)) throw new Error('index.html non trovato nella root del repository.');
  if (!fs.existsSync(dataDir)) throw new Error('Cartella data/ non trovata.');

  const csvFiles = walkCsvFiles(dataDir);
  if (!csvFiles.length) throw new Error('Nessun CSV trovato sotto data/.');

  const filesForBrowser = csvFiles.map(full => ({
    path: path.relative(dataDir, full).replace(/\\/g, '/'),
    text: fs.readFileSync(full, 'utf8')
  }));

  const server = createStaticServer(repoRoot);
  const port = await listen(server);
  const url = `http://127.0.0.1:${port}/index.html?buildFantacalcioCache=1`;

  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    page.on('console', msg => {
      if (msg.type() === 'error') console.error('[browser]', msg.text());
    });
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(() => typeof window.__cralIngestCsvBatchForCache === 'function' && typeof window.__cralBuildFantacalcioCache === 'function', null, { timeout: 30000 });

    const batchSize = 25;
    for (let i = 0; i < filesForBrowser.length; i += batchSize) {
      const batch = filesForBrowser.slice(i, i + batchSize);
      await page.evaluate(files => window.__cralIngestCsvBatchForCache(files), batch);
    }

    const payload = await page.evaluate(() => window.__cralBuildFantacalcioCache());
    if (!payload || !Array.isArray(payload.results) || !payload.results.length) {
      throw new Error('Cache Fantacalcio vuota: controlla listone, eventi e rose in data/.');
    }

    fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(outPath, JSON.stringify(payload, null, 2) + '\n', 'utf8');
    console.log(`Cache Fantacalcio generata: ${path.relative(repoRoot, outPath)}`);
    console.log(`Risultati: ${payload.results.length} righe - Rose: ${payload.rosterCount} - Giocatori: ${payload.playerCount}`);
    if (payload.issues && payload.issues.length) {
      console.log(`Avvisi: ${payload.issues.length}`);
    }
  } finally {
    await browser.close().catch(() => {});
    server.close();
  }
}

main().catch(err => {
  console.error(err && err.stack || err);
  process.exit(1);
});
