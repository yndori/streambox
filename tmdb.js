// TMDB API helper functions
const TMDB_API_KEY = "YOUR_TMDB_API_KEY";
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

function buildTMDBUrl(path, params = {}) {
  const url = new URL(`${TMDB_BASE_URL}${path}`);
  url.searchParams.set("api_key", TMDB_API_KEY);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value);
    }
  });

  return url.toString();
}

async function requestTMDB(path, params = {}) {
  const response = await fetch(buildTMDBUrl(path, params));
  if (!response.ok) {
    throw new Error(`TMDB request failed (${response.status}): ${response.statusText}`);
  }
  return response.json();
}

async function fetchPopularMovies(page = 1) {
  return requestTMDB("/movie/popular", {
    language: "en-US",
    page,
  });
}

async function searchMovies(query, page = 1) {
  return requestTMDB("/search/movie", {
    query,
    language: "en-US",
    page,
    include_adult: false,
  });
}

function getTMDBImagePath(path, size = "w342") {
  return path ? `${TMDB_IMAGE_BASE}/${size}${path}` : "";
}

window.TMDB_API_KEY = TMDB_API_KEY;
window.fetchPopularMovies = fetchPopularMovies;
window.searchMovies = searchMovies;
window.getTMDBImagePath = getTMDBImagePath;
