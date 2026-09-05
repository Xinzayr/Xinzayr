import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ redirect }) => {
  const client_id = import.meta.env.SPOTIFY_CLIENT_ID || '09273698406c49eb98057922bd22df22';
  const redirect_uri = 'http://127.0.0.1:4321/api/spotify-callback';
  const scopes = 'user-read-currently-playing user-read-recently-played user-read-playback-state';

  const spotifyAuthUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${client_id}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirect_uri)}`;

  return redirect(spotifyAuthUrl);
};
