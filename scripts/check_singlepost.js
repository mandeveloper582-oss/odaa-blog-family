const puppeteer = require('puppeteer');
(async () => {
  const url = process.env.URL || 'http://localhost:5173/post/abc';
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  try {
    const resp = await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    console.log('HTTP status:', resp.status());
    // wait for Comments heading or Comments count element
    const found = await page.waitForFunction(() => {
      const h3 = Array.from(document.querySelectorAll('h3')).find(e => /Comments/i.test(e.textContent));
      if (h3) return true;
      const el = Array.from(document.querySelectorAll('*')).find(e => /Comments/i.test(e.textContent));
      return !!el;
    }, { timeout: 10000 }).catch(() => null);
    if (found) {
      console.log('Comments section detected in DOM');
      await browser.close();
      process.exit(0);
    } else {
      console.error('Comments section NOT detected');
      await page.screenshot({ path: 'debug_singlepost.png', fullPage: true });
      await browser.close();
      process.exit(2);
    }
  } catch (err) {
    console.error('Error during check:', err);
    await page.screenshot({ path: 'debug_singlepost_error.png', fullPage: true }).catch(()=>{});
    await browser.close();
    process.exit(3);
  }
})();