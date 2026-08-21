(async ()=>{
  try{
    const fetch = globalThis.fetch || (await import('node-fetch')).default;
    const loginRes = await fetch('https://odaa-blog-family-8.onrender.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'galataaomer@gmail.com', password: 'Gelata8709' })
    });
    const loginJson = await loginRes.json();
    console.log('LOGIN_RESPONSE:', JSON.stringify(loginJson));
    if (loginJson.token) {
      const meRes = await fetch('https://odaa-blog-family-8.onrender.com/api/auth/me', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${loginJson.token}` },
      });
      const meJson = await meRes.json();
      console.log('ME_RESPONSE:', JSON.stringify(meJson));
    }
  }catch(err){
    console.error('ERROR:', err);
  }
})();
