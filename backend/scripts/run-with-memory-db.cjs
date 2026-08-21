const { MongoMemoryServer } = require('mongodb-memory-server');
const { spawn } = require('child_process');
const bcrypt = require('bcrypt');
const path = require('path');

async function wait(ms) { return new Promise((r) => setTimeout(r, ms)); }

async function createWithRetries(opts = {}, maxAttempts = 6) {
  let attempt = 0;
  while (attempt < maxAttempts) {
    attempt += 1;
    try {
      console.log(`Attempt ${attempt} to start MongoMemoryServer...`);
      const mongod = await MongoMemoryServer.create(opts);
      console.log('MongoMemoryServer started.');
      return mongod;
    } catch (err) {
      console.error(`MongoMemoryServer start failed (attempt ${attempt}):`, err && err.message ? err.message : err);
      if (attempt >= maxAttempts) throw err;
      const backoff = 2000 * attempt;
      console.log(`Waiting ${backoff}ms before retrying...`);
      await wait(backoff);
    }
  }
}

(async () => {
  try {
    console.log('Starting in-memory MongoDB with debug and retries...');

    const downloadDir = path.join(__dirname, '..', 'tmp', 'mongodb-binaries');
    const fs = require('fs');
    if (!fs.existsSync(downloadDir)) fs.mkdirSync(downloadDir, { recursive: true });

    const mongod = await createWithRetries({
      debug: true,
      binary: {
        downloadDir,
      },
    }, 6);

    const uri = mongod.getUri();
    console.log('In-memory MongoDB URI:', uri);

    // Use a known test admin password for local testing. Accepts env var, override, or CLI arg.
    const ADMIN_PASSWORD_PLAINTEXT = process.env.TEST_ADMIN_PASSWORD || process.env.TEST_ADMIN_PASSWORD_OVERRIDE || process.argv[2] || 'testadmin123';
    const ADMIN_PASSWORD_HASH = bcrypt.hashSync(ADMIN_PASSWORD_PLAINTEXT, 12);

    const env = Object.assign({}, process.env, {
      MONGO_URI: uri,
      ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'galataaomer@gmail.com',
      ADMIN_PASSWORD_HASH,
      JWT_SECRET: process.env.JWT_SECRET || 'dev-jwt-secret',
      FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
    });

    console.log('Spawning backend server with test env vars...');
    const child = spawn(process.execPath, ['server.js'], {
      cwd: __dirname + '/..',
      env,
      stdio: 'inherit',
    });

    child.on('exit', async (code) => {
      console.log('Backend process exited with', code, 'stopping in-memory MongoDB');
      try { await mongod.stop(); } catch (e) { /* ignore */ }
      process.exit(code);
    });
  } catch (err) {
    console.error('Failed to start in-memory MongoDB or backend:', err);
    process.exit(1);
  }
})();
