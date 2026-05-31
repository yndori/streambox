const movies = [
  {
    id: 1,
    title: "Inception",
    year: 2010,
    genre: "Sci-Fi",
    rating: 8.8,
    watched: true,
    description:
      "A skilled thief enters people's dreams to steal secrets, but his biggest mission is to plant an idea instead."
  },
  {
    id: 2,
    title: "The Matrix",
    year: 1999,
    genre: "Sci-Fi",
    rating: 8.7,
    watched: true,
    description:
      "A hacker discovers that his world is a simulation and joins a rebellion against the machines controlling humanity."
  },
  {
    id: 3,
    title: "Parasite",
    year: 2019,
    genre: "Drama",
    rating: 8.6,
    watched: false,
    description:
      "A poor family slowly infiltrates a wealthy household, leading to a dark and unexpected social thriller."
  },
  {
    id: 4,
    title: "Knives Out",
    year: 2019,
    genre: "Comedy",
    rating: 7.9,
    watched: true,
    description:
      "A detective investigates the mysterious death of a famous crime novelist surrounded by a suspicious family."
  },
  {
    id: 5,
    title: "Get Out",
    year: 2017,
    genre: "Thriller",
    rating: 7.7,
    watched: false,
    description:
      "A young man visits his girlfriend's family and uncovers a terrifying secret hiding behind polite smiles."
  },
  {
    id: 6,
    title: "La La Land",
    year: 2016,
    genre: "Drama",
    rating: 8.0,
    watched: true,
    description:
      "A jazz musician and an aspiring actress fall in love while chasing their dreams in Los Angeles."
  },
  {
    id: 7,
    title: "Spider-Man: Into the Spider-Verse",
    year: 2018,
    genre: "Animation",
    rating: 8.4,
    watched: true,
    description:
      "Miles Morales becomes Spider-Man and discovers a multiverse filled with other Spider-heroes."
  },
  {
    id: 8,
    title: "Interstellar",
    year: 2014,
    genre: "Sci-Fi",
    rating: 8.7,
    watched: false,
    description:
      "A team of explorers travels through a wormhole in search of a new home for humanity."
  }
];

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

function renderCards(list) {
  movieGrid.innerHTML = "";

  if (list.length === 0) {
    emptyMessage.style.display = "block";
    return;
  }

  emptyMessage.style.display = "none";

  list.forEach((movie) => {
    const card = document.createElement("article");
    card.className = "card";
    card.dataset.movieId = movie.id;

    card.innerHTML = `
      <div class="card-poster">
        <span>${movie.genre}</span>
      </div>

      <h3>${movie.title}</h3>
      <p>${movie.year} · ${movie.genre}</p>

      <div class="card-meta">
        <span class="rating">★ ${movie.rating}</span>
        <span class="${movie.watched ? "watched" : "not-watched"}">
          ${movie.watched ? "Watched" : "Not watched"}
        </span>
      </div>
    `;

    card.addEventListener("click", () => {
      openMovieModal(movie.id);
    });

    movieGrid.appendChild(card);
  });
}

function filterMovies() {
  const searchTerm = searchInput.value.toLowerCase().trim();

  const filteredMovies = movies.filter((movie) => {
    return (
      movie.title.toLowerCase().includes(searchTerm) ||
      movie.genre.toLowerCase().includes(searchTerm) ||
      String(movie.year).includes(searchTerm)
    );
  });

  renderCards(filteredMovies);
}

function openMovieModal(movieId) {
  const movie = movies.find((item) => item.id === movieId);

  if (!movie) return;

  modalGenre.textContent = movie.genre;
  modalTitle.textContent = movie.title;
  modalDescription.textContent = movie.description;
  modalYear.textContent = `Year: ${movie.year}`;
  modalRating.textContent = `Rating: ${movie.rating}`;
  modalWatched.textContent = movie.watched ? "Watched" : "Not watched";

  modalPoster.style.background = getPosterGradient(movie.genre);

  movieModal.showModal();
}

function getPosterGradient(genre) {
  const gradients = {
    "Sci-Fi": "linear-gradient(135deg, #f97316, #14b8a6)",
    Drama: "linear-gradient(135deg, #f97316, #334155)",
    Comedy: "linear-gradient(135deg, #f97316, #facc15)",
    Thriller: "linear-gradient(135deg, #0f172a, #f97316)",
    Animation: "linear-gradient(135deg, #14b8a6, #f97316)"
  };

  return gradients[genre] || "linear-gradient(135deg, #f97316, #14b8a6)";
}

searchInput.addEventListener("input", filterMovies);

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

renderCards(movies);

console.log("StreamBox catalog loaded:", movies.length, "movies");
renderCards(movies);
filterMovies()
openMovieModal()
getPosterGradient()