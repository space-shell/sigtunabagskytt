const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'https://www.sigtunabagskytte.se';

const PAGES = [
  { slug: '00-hem',                url: '/' },
  { slug: '01-nyheter',            url: '/nyheter/' },
  { slug: '02-prova-pa',           url: '/prova-pa/' },
  { slug: '03-pilbagar',           url: '/prova-pa/pilbagar/' },
  { slug: '04-pilbagar-recurve',   url: '/prova-pa/pilbagar/recurve/' },
  { slug: '05-pilbagar-langbage',  url: '/prova-pa/pilbagar/langbage/' },
  { slug: '06-pilbagar-compound',  url: '/prova-pa/pilbagar/compound/' },
  { slug: '07-grenar',             url: '/prova-pa/grenar/' },
  { slug: '08-grenar-3d',          url: '/prova-pa/grenar/3d/' },
  { slug: '09-grenar-jakt',        url: '/prova-pa/grenar/jakt/' },
  { slug: '10-grenar-falt',        url: '/prova-pa/grenar/falt/' },
  { slug: '11-grenar-monterad',    url: '/prova-pa/grenar/monterad/' },
  { slug: '12-grenar-clout',       url: '/prova-pa/grenar/clout/' },
  { slug: '13-om-oss',             url: '/om-sigtuna-bagskytteklubb/' },
  { slug: '14-om-oss-medlemskap',  url: '/om-sigtuna-bagskytteklubb/medlemskap/' },
  { slug: '15-om-oss-traning',     url: '/om-sigtuna-bagskytteklubb/traning/' },
  { slug: '16-om-oss-tavling',     url: '/om-sigtuna-bagskytteklubb/tavling/' },
  { slug: '17-om-oss-styrelse',    url: '/om-sigtuna-bagskytteklubb/styrelse/' },
  { slug: '18-kontakt',            url: '/kontakt/' },
  { slug: '19-hitta-till-oss',     url: '/hitta-till-oss/' },
];

const MOBILE_PAGES = [
  { slug: '00-hem-mobile',         url: '/' },
  { slug: '01-nyheter-mobile',     url: '/nyheter/' },
  { slug: '02-prova-pa-mobile',    url: '/prova-pa/' },
  { slug: '13-om-oss-mobile',      url: '/om-sigtuna-bagskytteklubb/' },
  { slug: '18-kontakt-mobile',     url: '/kontakt/' },
];

const OUTPUT_DIR = path.join(__dirname, '..', 'original');

async function capture(page, url, outputPath, viewport) {
  await page.setViewportSize(viewport);
  try {
    // Use 'load' (not 'networkidle') so external font/CDN failures don't block us
    await page.goto(BASE_URL + url, { waitUntil: 'load', timeout: 45000 });
    // Extra wait for lazy-loaded content and CSS paint
    await page.waitForTimeout(2000);
    // Dismiss any cookie banners if present
    try {
      const cookieBtn = page.locator('button:has-text("Acceptera"), button:has-text("Accept"), button:has-text("OK"), .cookie-accept');
      if (await cookieBtn.first().isVisible({ timeout: 2000 })) {
        await cookieBtn.first().click();
        await page.waitForTimeout(1000);
      }
    } catch {}
    // Screenshot with explicit timeout override — bypass font-wait deadlock
    await page.screenshot({ path: outputPath, fullPage: true, timeout: 60000 });
    console.log(`✓ ${outputPath.split('/').slice(-2).join('/')}`);
  } catch (err) {
    console.error(`✗ ${url} — ${err.message.split('\n')[0]}`);
  }
}

(async () => {
  const browser = await chromium.launch({
    args: [
      '--disable-web-security',
      '--no-sandbox',
      '--disable-setuid-sandbox',
    ],
  });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('\n── Desktop (1440×900) ──');
  for (const { slug, url } of PAGES) {
    await capture(page, url, path.join(OUTPUT_DIR, 'desktop', `${slug}.png`), { width: 1440, height: 900 });
  }

  console.log('\n── Mobile (390×844) ──');
  for (const { slug, url } of MOBILE_PAGES) {
    await capture(page, url, path.join(OUTPUT_DIR, 'mobile', `${slug}.png`), { width: 390, height: 844 });
  }

  await browser.close();
  console.log('\nAll screenshots saved to original/\n');
})();
