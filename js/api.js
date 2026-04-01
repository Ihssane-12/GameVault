const GAMES_URL = 'https://example.com/games.js';

export async function loadGamesFromUrl() {
  try {
    const response = await fetch(GAMES_URL);
    const text = await response.text();
    return text;
  } catch (_) {
    return null;
  }
}