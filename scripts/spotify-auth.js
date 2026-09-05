import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const envPath = path.join(rootDir, '.env');

let envContent = '';
if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf-8');
}

const getEnvValue = (key) => {
  const match = envContent.match(new RegExp(`^${key}=(.*)$`, 'm'));
  return match ? match[1].trim() : '';
};

const CLIENT_ID = getEnvValue('SPOTIFY_CLIENT_ID') || '09273698406c49eb98057922bd22df22';
const CLIENT_SECRET = getEnvValue('SPOTIFY_CLIENT_SECRET') || 'c66ea14a565d4909ba9e8e5e17566327';
const PORT = 8889;
const REDIRECT_URI = `http://127.0.0.1:${PORT}/callback`;
const SCOPES = 'user-read-currently-playing user-read-recently-played user-read-playback-state';

const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${CLIENT_ID}&scope=${encodeURIComponent(SCOPES)}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;

console.log('\n======================================================');
console.log('🎵 SETUP TOOL: REFRESH TOKEN DE SPOTIFY 🎵');
console.log('======================================================\n');
console.log('1. Abre tu Dashboard de Spotify Developer: https://developer.spotify.com/dashboard');
console.log('2. En la configuración de tu App, edita "Redirect URIs" y agrega exactamente:');
console.log(`   👉 ${REDIRECT_URI}\n`);
console.log('3. Abre este enlace en tu navegador para autorizar:');
console.log(`   🔗 ${authUrl}\n`);
console.log(`Esperando respuesta del navegador en ${REDIRECT_URI} ...\n`);

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:${PORT}`);
  if (url.pathname === '/callback') {
    const code = url.searchParams.get('code');
    const error = url.searchParams.get('error');

    if (error) {
      res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(`<h1>❌ Error de autorización</h1><p>${error}</p>`);
      console.error('❌ Error recibido:', error);
      server.close();
      return;
    }

    if (code) {
      try {
        const bodyParams = new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: REDIRECT_URI,
        });

        const basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
        const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${basicAuth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: bodyParams,
        });

        const tokenData = await tokenRes.json();

        if (tokenData.refresh_token) {
          const refreshToken = tokenData.refresh_token;

          let newEnv = envContent;
          if (newEnv.includes('SPOTIFY_REFRESH_TOKEN=')) {
            newEnv = newEnv.replace(/^SPOTIFY_REFRESH_TOKEN=.*$/m, `SPOTIFY_REFRESH_TOKEN=${refreshToken}`);
          } else {
            newEnv += `\nSPOTIFY_REFRESH_TOKEN=${refreshToken}\n`;
          }
          fs.writeFileSync(envPath, newEnv, 'utf-8');

          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(`
            <div style="font-family: system-ui, sans-serif; text-align: center; padding: 50px; background: #121212; color: #1DB954;">
              <h1>🎉 ¡Refresh Token obtenido con éxito!</h1>
              <p style="color: #fff;">El archivo <code>.env</code> ha sido actualizado automáticamente.</p>
              <pre style="background: #282828; color: #1DB954; padding: 15px; border-radius: 8px; font-size: 14px;">SPOTIFY_REFRESH_TOKEN=${refreshToken}</pre>
              <p style="color: #aaa;">Ya puedes cerrar esta ventana y volver a tu portafolio.</p>
            </div>
          `);

          console.log('✅ ¡ÉXITO! SPOTIFY_REFRESH_TOKEN obtenido:');
          console.log(`\nSPOTIFY_REFRESH_TOKEN=${refreshToken}\n`);
          console.log('✅ El archivo .env ha sido actualizado automáticamente.');
        } else {
          res.writeHead(400, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(`<h1>❌ Error obteniendo token</h1><pre>${JSON.stringify(tokenData, null, 2)}</pre>`);
          console.error('❌ Respuesta de Spotify sin refresh token:', tokenData);
        }
      } catch (err) {
        console.error('❌ Error de red al solicitar token:', err);
        res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`<h1>❌ Error de servidor</h1><p>${err.message}</p>`);
      } finally {
        server.close();
      }
    }
  }
});

server.listen(PORT, '127.0.0.1');
