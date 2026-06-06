const movieGrid = document.getElementById("movieGrid");
const searchInput = document.getElementById("search");
const genreFilter = document.getElementById("genreFilter");
const emptyMessage = document.getElementById("emptyMessage");
const pagination = document.getElementById("pagination");
const prevPage = document.getElementById("prevPage");
const nextPage = document.getElementById("nextPage");
const pageNumber = document.getElementById("pageNumber");
const pageButtons = document.getElementById("pageButtons");

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
let currentPage = 1;
let totalPages = 1;
let currentSearchTerm = "";
let currentGenreId = "";

async function initializeMovies() {
  if (!hasApiKey()) {
    showEmptyMessage(
      "Configure your TMDB API key in config.js to load popular movies."
    );
    return;
  }

  await loadGenres();
  await loadMovies();
}

async function loadGenres() {
  try {
    const genres = await fetchMovieGenres();
    renderGenreOptions(genres);
  } catch (error) {
    console.error(error);
  }
}

async function loadMovies() {
  if (!hasApiKey()) {
    showEmptyMessage(
      "Configure your TMDB API key in config.js to load movies."
    );
    return;
  }

  const requestId = ++activeRequestId;
  const loadingLabel = getLoadingMessage();

  setLoading(true, loadingLabel);

  try {
    const data = await fetchCurrentMovieData();

    if (requestId === activeRequestId) {
      totalPages = Math.min(data.total_pages || 1, 500);
      renderCards(data.results || []);
      updatePagination();
    }
  } catch (error) {
    console.error(error);
    showEmptyMessage("Could not load movies. Please check your API key.");
    updatePagination();
  } finally {
    if (requestId === activeRequestId) {
      setLoading(false);
    }
  }
}

async function fetchCurrentMovieData() {
  if (currentSearchTerm) {
    return fetchMovieSearchResults(currentSearchTerm, currentPage);
  }

  if (currentGenreId) {
    return fetchMoviesByGenre(currentGenreId, currentPage);
  }

  return fetchPopularMovies(currentPage);
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

function renderGenreOptions(genres) {
  genres.forEach((genre) => {
    const option = document.createElement("option");
    option.value = genre.id;
    option.textContent = genre.name;
    genreFilter.appendChild(option);
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
  pagination.style.display = "none";
}

function setLoading(isLoading, message = "") {
  searchInput.disabled = isLoading && !hasApiKey();

  if (isLoading) {
    emptyMessage.textContent = message;
    emptyMessage.style.display = "block";
  }
}

function handleSearchInput() {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    currentSearchTerm = searchInput.value.trim();
    currentPage = 1;

    if (currentSearchTerm) {
      currentGenreId = "";
      genreFilter.value = "";
    }

    loadMovies();
  }, 400);
}

function handleGenreChange() {
  currentGenreId = genreFilter.value;
  currentPage = 1;

  if (currentGenreId) {
    currentSearchTerm = "";
    searchInput.value = "";
  }

  loadMovies();
}

function goToPreviousPage() {
  if (currentPage <= 1) return;

  currentPage -= 1;
  loadMovies();
}

function goToNextPage() {
  if (currentPage >= totalPages) return;

  currentPage += 1;
  loadMovies();
}

function goToPage(page) {
  if (page === currentPage || page < 1 || page > totalPages) return;

  currentPage = page;
  loadMovies();
}

function updatePagination() {
  const hasPages = totalPages > 1 && movieGrid.children.length > 0;

  pagination.style.display = hasPages ? "flex" : "none";
  pageNumber.textContent = `Page ${currentPage} of ${totalPages}`;
  prevPage.disabled = currentPage <= 1;
  nextPage.disabled = currentPage >= totalPages;
  renderPageButtons();
}

function renderPageButtons() {
  pageButtons.innerHTML = "";

  const pages = getVisiblePageNumbers();

  pages.forEach((page) => {
    if (page === "...") {
      const separator = document.createElement("span");
      separator.className = "page-ellipsis";
      separator.textContent = "...";
      pageButtons.appendChild(separator);
      return;
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = "page-number";
    button.textContent = page;
    button.setAttribute("aria-label", `Go to page ${page}`);

    if (page === currentPage) {
      button.classList.add("active");
      button.setAttribute("aria-current", "page");
    }

    button.addEventListener("click", () => {
      goToPage(page);
    });

    pageButtons.appendChild(button);
  });
}

function getVisiblePageNumbers() {
  const pages = [];
  const maxButtons = 5;

  if (totalPages <= maxButtons) {
    for (let page = 1; page <= totalPages; page += 1) {
      pages.push(page);
    }

    return pages;
  }

  pages.push(1);

  const startPage = Math.max(2, currentPage - 1);
  const endPage = Math.min(totalPages - 1, currentPage + 1);

  if (startPage > 2) {
    pages.push("...");
  }

  for (let page = startPage; page <= endPage; page += 1) {
    pages.push(page);
  }

  if (endPage < totalPages - 1) {
    pages.push("...");
  }

  pages.push(totalPages);

  return pages;
}

function getLoadingMessage() {
  if (currentSearchTerm) return `Searching for "${currentSearchTerm}"...`;
  if (currentGenreId) return "Loading genre movies...";
  return "Loading popular movies...";
}

searchInput.addEventListener("input", handleSearchInput);
genreFilter.addEventListener("change", handleGenreChange);
prevPage.addEventListener("click", goToPreviousPage);
nextPage.addEventListener("click", goToNextPage);

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

initializeMovies();
