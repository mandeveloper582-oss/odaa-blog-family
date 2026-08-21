 (async () => {
  try {
    const fetch = globalThis.fetch || (await import('node-fetch')).default;
    const base = process.env.BASE || 'https://odaa-blog-family-8.onrender.com';

    console.log('Logging in...');
    const loginRes = await fetch(`${base}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'galataaomer@gmail.com', password: 'Gelata8709' })
    });
    const loginJson = await loginRes.json();
    console.log('LOGIN_RESPONSE:', JSON.stringify(loginJson));
    if (!loginJson.token) return console.error('Login failed — cannot continue');

    const token = loginJson.token;
    console.log('Creating a protected test post...');
    const postRes = await fetch(`${base}/api/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ title: 'TEST POST from CI', content: 'This is a test post created by automated test.', tags: ['ci','test'] })
    });
    const postJson = await postRes.json();
    console.log('CREATE_POST_RESPONSE:', JSON.stringify(postJson));

    console.log('Fetching posts to verify...');
    const listRes = await fetch(`${base}/api/posts`);
    const listJson = await listRes.json();
    console.log('POSTS_LIST length:', Array.isArray(listJson) ? listJson.length : 'unknown');
  } catch (err) {
    console.error('ERROR:', err);
  }
})();
