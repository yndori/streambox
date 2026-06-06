const activeTmdbApiKey =
  typeof TMDB_API_KEY === "undefined" ? "" : TMDB_API_KEY;

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const POSTER_FALLBACK_TEXT = "No poster available";

function hasApiKey() {
  return Boolean(activeTmdbApiKey);
}

async function fetchFromTmdb(endpoint, params = {}) {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);

  url.search = new URLSearchParams({
    api_key: activeTmdbApiKey,
    language: "en-US",
    ...params
  }).toString();

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`TMDB request failed with status ${response.status}`);
  }

  return response.json();
}

async function fetchPopularMovies(page = 1) {
  return fetchFromTmdb("/movie/popular", { page: String(page) });
}

async function fetchMovieSearchResults(query, page = 1) {
  return fetchFromTmdb("/search/movie", {
    query,
    include_adult: "false",
    page: String(page)
  });
}

async function fetchMovieGenres() {
  const data = await fetchFromTmdb("/genre/movie/list");
  return data.genres || [];
}

async function fetchMoviesByGenre(genreId, page = 1) {
  return fetchFromTmdb("/discover/movie", {
    with_genres: genreId,
    sort_by: "popularity.desc",
    include_adult: "false",
    page: String(page)
  });
}

async function fetchMovieDetails(movieId) {
  return fetchFromTmdb(`/movie/${movieId}`);
}

function getPosterUrl(path) {
  return `${TMDB_IMAGE_BASE_URL}${path}`;
}

function formatReleaseDate(date) {
  if (!date) return "Release date unavailable";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(new Date(date));
}

function formatRating(rating) {
  if (rating === null || rating === undefined) return "N/A";

  return `${rating.toFixed(1)}/10`;
}
