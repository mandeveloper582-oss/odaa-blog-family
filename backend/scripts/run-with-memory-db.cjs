const { MongoMemoryServer } = require('mongodb-memory-server');
const { spawn } = require('child_process');
const bcrypt = require('bcrypt');

(async () => {
  try {
    console.log('Starting in-memory MongoDB...');
    const mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    console.log('In-memory MongoDB URI:', uri);

    // Use a known test admin password for local testing
    const ADMIN_PASSWORD_PLAINTEXT = process.env.TEST_ADMIN_PASSWORD || 'testadmin123';
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
