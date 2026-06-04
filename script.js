const movieGrid = document.getElementById("movieGrid");
const searchInput = document.getElementById("search");
const emptyMessage = document.getElementById("emptyMessage");

const movieModal = document.getElementById("movieModal");
const closeModal = document.getElementById("closeModal");

const modalPoster = document.getElementById("modalPoster");
const modalGenre = document.getElementById("modalGenre");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalYear = document.getElementById("modalYear");
const modalRating = document.getElementById("modalRating");
const modalWatched = document.getElementById("modalWatched");

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

let searchTimeout;
let activeRequestId = 0;

async function loadPopularMovies() {
  if (!hasApiKey()) {
    showEmptyMessage(
      "Configure your TMDB API key in config.js to load popular movies."
    );
    return;
  }

  setLoading(true, "Loading popular movies...");

  try {
    const movies = await fetchPopularMovies();
    renderCards(movies);
  } catch (error) {
    console.error(error);
    showEmptyMessage("Could not load popular movies. Please check your API key.");
  } finally {
    setLoading(false);
  }
}

async function searchMovies(query) {
  const requestId = ++activeRequestId;

  if (!hasApiKey()) {
    showEmptyMessage(
      "Configure your TMDB API key in config.js to search movies."
    );
    return;
  }

  if (!query) {
    await loadPopularMovies();
    return;
  }

  setLoading(true, `Searching for "${query}"...`);

  try {
    const movies = await fetchMovieSearchResults(query);

    if (requestId === activeRequestId) {
      renderCards(movies);
    }
  } catch (error) {
    console.error(error);
    showEmptyMessage("Search failed. Please try again.");
  } finally {
    if (requestId === activeRequestId) {
      setLoading(false);
    }
  }
}

function renderCards(movies) {
  movieGrid.innerHTML = "";

  if (movies.length === 0) {
    showEmptyMessage("No movies found.");
    return;
  }

  emptyMessage.style.display = "none";

  movies.forEach((movie) => {
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.movieId = movie.id;
    const safeTitle = escapeHtml(movie.title || "Untitled movie");

    const posterMarkup = movie.poster_path
      ? `<img src="${getPosterUrl(movie.poster_path)}" alt="${safeTitle} poster" loading="lazy" />`
      : `<span>${POSTER_FALLBACK_TEXT}</span>`;

    card.innerHTML = `
      <div class="card-poster">
        ${posterMarkup}
      </div>

      <h3>${safeTitle}</h3>
      <p>${formatReleaseDate(movie.release_date)}</p>

      <div class="card-meta">
        <span class="rating">Rating: ${formatRating(movie.vote_average)}</span>
        <span>${movie.vote_count || 0} votes</span>
      </div>
    `;

    card.addEventListener("click", () => {
      openMovieModal(movie.id);
    });

    movieGrid.appendChild(card);
  });
}

async function openMovieModal(movieId) {
  if (!hasApiKey()) return;

  modalGenre.textContent = "Loading";
  modalTitle.textContent = "Fetching movie details...";
  modalDescription.textContent = "";
  modalYear.textContent = "";
  modalRating.textContent = "";
  modalWatched.textContent = "";
  modalPoster.innerHTML = "";
  modalPoster.classList.add("poster-loading");

  movieModal.showModal();

  try {
    const movie = await fetchMovieDetails(movieId);
    const genres = movie.genres.map((genre) => genre.name).join(", ");

    modalGenre.textContent = genres || "Movie";
    modalTitle.textContent = movie.title;
    modalDescription.textContent = movie.overview || "No overview available.";
    modalYear.textContent = `Release: ${formatReleaseDate(movie.release_date)}`;
    modalRating.textContent = `Rating: ${formatRating(movie.vote_average)}`;
    modalWatched.textContent = `${movie.runtime || "N/A"} min`;

    modalPoster.classList.remove("poster-loading");
    modalPoster.innerHTML = movie.poster_path
      ? `<img src="${getPosterUrl(movie.poster_path)}" alt="${escapeHtml(movie.title)} poster" />`
      : `<span>${POSTER_FALLBACK_TEXT}</span>`;
  } catch (error) {
    console.error(error);
    modalGenre.textContent = "Error";
    modalTitle.textContent = "Movie details unavailable";
    modalDescription.textContent = "Please try again later.";
    modalPoster.classList.remove("poster-loading");
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showEmptyMessage(message) {
  movieGrid.innerHTML = "";
  emptyMessage.textContent = message;
  emptyMessage.style.display = "block";
}

function setLoading(isLoading, message = "") {
  searchInput.disabled = isLoading && !hasApiKey();

  if (isLoading) {
    emptyMessage.textContent = message;
    emptyMessage.style.display = "block";
  }
}

function handleSearchInput() {
  const searchTerm = searchInput.value.trim();

  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    searchMovies(searchTerm);
  }, 400);
}

searchInput.addEventListener("input", handleSearchInput);

closeModal.addEventListener("click", () => {
  movieModal.close();
});

movieModal.addEventListener("click", (event) => {
  const modalBox = movieModal.getBoundingClientRect();

  const clickedOutside =
    event.clientX < modalBox.left ||
    event.clientX > modalBox.right ||
    event.clientY < modalBox.top ||
    event.clientY > modalBox.bottom;

  if (clickedOutside) {
    movieModal.close();
  }
});

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

navLinks.addEventListener("click", () => {
  navLinks.classList.remove("show");
});

<<<<<<< HEAD
renderCards(movies);

console.log("StreamBox catalog loaded:", movies.length, "movies");
renderCards(movies);
filterMovies()
openMovieModal()
getPosterGradient()
=======
loadPopularMovies();
>>>>>>> main
