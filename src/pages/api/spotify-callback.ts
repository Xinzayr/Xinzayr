import type { APIRoute } from 'astro';
import fs from 'fs';
import path from 'path';

export const GET: APIRoute = async ({ url }) => {
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');

  if (error) {
    return new Response(`<h1>❌ Error: ${error}</h1>`, {
      status: 400,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  if (!code) {
    return new Response(`<h1>❌ No se recibió código de autorización</h1>`, {
      status: 400,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  const client_id = import.meta.env.SPOTIFY_CLIENT_ID || '09273698406c49eb98057922bd22df22';
  const client_secret = import.meta.env.SPOTIFY_CLIENT_SECRET || 'c66ea14a565d4909ba9e8e5e17566327';
  const redirect_uri = 'http://127.0.0.1:4321/api/spotify-callback';

  try {
    const basicAuth = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri,
      }),
    });

    const tokenData = await tokenRes.json();

    if (tokenData.refresh_token) {
      const refreshToken = tokenData.refresh_token;

      // Actualizar archivo .env
      const envPath = path.resolve(process.cwd(), '.env');
      if (fs.existsSync(envPath)) {
        let envContent = fs.readFileSync(envPath, 'utf-8');
        if (envContent.includes('SPOTIFY_REFRESH_TOKEN=')) {
          envContent = envContent.replace(/^SPOTIFY_REFRESH_TOKEN=.*$/m, `SPOTIFY_REFRESH_TOKEN=${refreshToken}`);
        } else {
          envContent += `\nSPOTIFY_REFRESH_TOKEN=${refreshToken}\n`;
        }
        fs.writeFileSync(envPath, envContent, 'utf-8');
      }

      return new Response(
        `
        <div style="font-family: system-ui, sans-serif; text-align: center; padding: 60px; background: #09090b; color: #22c55e;">
          <h1 style="font-size: 2rem;">🎉 ¡Spotify Vinculado con Éxito!</h1>
          <p style="color: #e4e4e7; font-size: 1.1rem;">El token de actualización se ha guardado en tu archivo <code>.env</code>.</p>
          <div style="background: #18181b; color: #4ade80; padding: 16px; border-radius: 12px; max-width: 600px; margin: 20px auto; font-family: monospace; word-break: break-all; border: 1px solid #27272a;">
            SPOTIFY_REFRESH_TOKEN=${refreshToken}
          </div>
          <a href="/projects" style="display: inline-block; margin-top: 20px; padding: 12px 24px; background: #22c55e; color: #000; font-weight: bold; border-radius: 8px; text-decoration: none;">Volver al Portafolio</a>
        </div>
        `,
        { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
      );
    } else {
      return new Response(
        `<h1>❌ Error al obtener token de Spotify</h1><pre>${JSON.stringify(tokenData, null, 2)}</pre>`,
        { status: 400, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
      );
    }
  } catch (err: any) {
    return new Response(`<h1>❌ Error de servidor: ${err.message}</h1>`, {
      status: 500,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }
};
