import type { APIRoute } from 'astro';

const client_id = import.meta.env.SPOTIFY_CLIENT_ID;
const client_secret = import.meta.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = import.meta.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=1`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  if (!client_id || !client_secret || !refresh_token || refresh_token.includes('...')) {
    return null;
  }
  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token,
      }),
    });

    if (!response.ok) return null;
    return response.json();
  } catch (e) {
    return null;
  }
};

export const GET: APIRoute = async () => {
  const tokenData = await getAccessToken();

  if (!tokenData || !tokenData.access_token) {
    return new Response(
      JSON.stringify({ isPlaying: false, configured: false }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const { access_token } = tokenData;

  try {
    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (response.status === 204 || response.status > 400) {
      const recentRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      if (recentRes.ok) {
        const recentData = await recentRes.json();
        const lastItem = recentData.items?.[0]?.track;
        if (lastItem) {
          return new Response(
            JSON.stringify({
              isPlaying: false,
              title: lastItem.name,
              artist: lastItem.artists.map((a: any) => a.name).join(', '),
              album: lastItem.album.name,
              albumImageUrl: lastItem.album.images[0]?.url,
              songUrl: lastItem.external_urls.spotify,
              configured: true
            }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
          );
        }
      }
      return new Response(
        JSON.stringify({ isPlaying: false, configured: true }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const song = await response.json();

    if (!song.item) {
      return new Response(
        JSON.stringify({ isPlaying: false, configured: true }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const isPlaying = song.is_playing;
    const title = song.item.name;
    const artist = song.item.artists.map((_artist: any) => _artist.name).join(', ');
    const album = song.item.album.name;
    const albumImageUrl = song.item.album.images[0]?.url;
    const songUrl = song.item.external_urls.spotify;
    const progressMs = song.progress_ms;
    const durationMs = song.item.duration_ms;

    return new Response(
      JSON.stringify({
        isPlaying,
        title,
        artist,
        album,
        albumImageUrl,
        songUrl,
        progressMs,
        durationMs,
        configured: true
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ isPlaying: false, error: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
