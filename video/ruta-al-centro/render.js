// Renderiza route.html cuadro por cuadro con Chromium y lo codifica a MP4 con ffmpeg.
// Uso: GOOGLE_MAPS_API_KEY=... node render.js [salida.mp4]
//      GOOGLE_MAPS_API_KEY=... node render.js prueba 1,5,13.5   (solo PNGs de esos segundos, para revisar)
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const { chromium } = require('playwright');

const key = process.env.GOOGLE_MAPS_API_KEY;
if (!key) { console.error('Falta GOOGLE_MAPS_API_KEY'); process.exit(1); }
const [out = 'ruta-al-centro.mp4', times] = process.argv.slice(2);
const route = JSON.parse(fs.readFileSync(path.join(__dirname, 'route.json'), 'utf8'));
const landmarks = JSON.parse(fs.readFileSync(path.join(__dirname, 'landmarks.json'), 'utf8'));

(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
  // 540×960 CSS a 2x = 1080×1920 (9:16); Google sirve tiles de alta densidad
  const page = await browser.newPage({ viewport: { width: 540, height: 960 }, deviceScaleFactor: 2 });
  page.on('pageerror', e => console.error('pageerror:', e.message));
  await page.goto('file://' + path.join(__dirname, 'route.html'));
  await page.evaluate(([k, r, l]) => window.boot(k, r, l), [key, route, landmarks]);
  const { FPS, DURATION } = await page.evaluate(() => window.META);

  if (times) {
    for (const t of times.split(',').map(Number)) {
      await page.evaluate(t => window.renderAt(t), t);
      await page.screenshot({ path: `${out}_${t}.png` });
    }
  } else {
    const ff = spawn('ffmpeg', ['-y', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
      '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-crf', '18', '-preset', 'slow',
      '-movflags', '+faststart', out], { stdio: ['pipe', 'ignore', 'inherit'] });
    const N = Math.round(FPS * DURATION);
    for (let f = 0; f < N; f++) {
      // renderAt espera a que estén los tiles: el tiempo del video no depende de la velocidad de la red
      await page.evaluate(t => window.renderAt(t), f / FPS);
      const buf = await page.screenshot({ type: 'jpeg', quality: 95 });
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      if (f % 30 === 0) console.log(`cuadro ${f}/${N}`);
    }
    ff.stdin.end();
    await new Promise(r => ff.on('close', r));
    console.log(`listo: ${out}`);
  }
  await browser.close();
})();
