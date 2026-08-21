(async ()=>{
  try{
    const fetch = globalThis.fetch || (await import('node-fetch')).default;
    const base = process.env.BASE || 'http://localhost:5000';
    const res = await fetch(`${base}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'galataaomer@gmail.com', password: 'Gelata8709' })
    });
    const json = await res.json();
    console.log('LOCAL_LOGIN_RESPONSE:', JSON.stringify(json));
  }catch(err){
    console.error('ERROR:', err);
  }
})();
