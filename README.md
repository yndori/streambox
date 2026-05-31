# StreamBox

A simple responsive movie browsing web app built with HTML, CSS, and JavaScript.

## Files

- `index.html` — page structure
- `styles.css` — visual identity and responsive layout
- `script.js` — movie array, search filter, card rendering, and modal behavior

## How to run

# StreamBox Final Project

A responsive movie browsing web application upgraded with **TMDB API integration** and **Supabase Authentication** as part of the Final Exam Project for the **Introduction to Web Development** course at **DUNIS Dakar**.

---

# Team Members

| Name                       | Role                           |
| -------------------------- | ------------------------------ |
| Yoann Christ Joseph N'dori | Project Lead & UI/UX Developer |
| Awa Yaré Fall              | API Integration Developer      |
| Madjiguene Sow             | Authentication Developer       |
| Fatou Binetou Seck         | QA / Presenter                 |

---

# Features

## Authentication (Supabase)

- User Sign-Up
- User Sign-In
- User Sign-Out
- Session Detection
- Protected Application Access
- Logged-In User Email Display
- Password Confirmation Validation
- Error and Success Messages

## Movie Browsing (TMDB API)

- Fetch Popular Movies
- Search Movies
- Dynamic Movie Cards
- Movie Detail View
- Movie Posters
- Release Date Display
- Movie Ratings
- Movie Overview Information
- Genre Information (when available)
- Genre Filters
- Pagination
- Load More Button
- Enhanced Movie Detail Page
- Public Deployment

## User Experience

- Responsive Design
- Loading States
- Error States
- Empty States
- Mobile-Friendly Interface

---

# Technologies Used

| Technology   | Purpose           |
| ------------ | ----------------- |
| HTML5        | Structure         |
| CSS3         | Styling           |
| JavaScript   | Application Logic |
| Supabase     | Authentication    |
| TMDB API     | Movie Data        |
| Git & GitHub | Version Control   |
| Netlify      | Deployment        |

---

# How to Run Locally

## 1. Clone the Repository

```bash
git clone https://github.com/yndori/streambox.git
```

## 2. Open the Project

```bash
cd streambox
```

## 3. Configure API Credentials

Update the required configuration values in the project files before running the application.

## 4. Launch the Application

Open `index.html` in your browser or use a local development server.

Example:

```bash
npx live-server
```

or

```bash
python -m http.server
```

---

# Supabase Setup

## Step 1: Create a Supabase Project

1. Create an account on Supabase.
2. Create a new project.
3. Enable Email/Password Authentication.

## Step 2: Obtain Credentials

Retrieve:

- Supabase URL
- Supabase Anon Key

## Step 3: Configure the Application

Insert your credentials in the Supabase configuration section.

Example placeholders:

```javascript
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";
```

## Step 4: Email Confirmation

Enable email confirmation for Email/Password authentication if required.

---

# TMDB API Setup

## Step 1: Create a TMDB Developer Account

Create an account and request API access.

## Step 2: Generate an API Key

Obtain your TMDB API Key.

## Step 3: Configure the Application

Insert your API key into the TMDB configuration section.

Example placeholder:

```javascript
const TMDB_API_KEY = "YOUR_TMDB_API_KEY";
```

## Step 4: Test API Connectivity

Verify that movie data loads correctly before presenting the project.

---

# Screenshots

## Authentication Page

[Insert future Screenshot]

## Sign-Up Form

[Insert future Screenshot]

## Movie Listing Page

[Insert future Screenshot]

## Search Results

[Insert future Screenshot]

## Movie Detail Modal/Page

[Insert future Screenshot]

## Genre Filtering

[Insert future Screenshot]

## Mobile Responsive Layout

[Insert future Screenshot]

---

# Known Limitations

- TMDB API requests require an active internet connection.
- API rate limits are controlled by TMDB.
- Authentication depends on Supabase service availability.
- Frontend-only applications cannot fully hide public API keys.
- Some movie information may be unavailable if not provided by TMDB.

---

# Future Improvements

- Personalized movie recommendations.
- User watchlists.
- Favorite movies feature.
- User profiles.
- Advanced filtering options.
- Dark/Light theme switcher.
- Multi-language support.
- Trailer integration.
- Backend implementation for improved security.
- Progressive Web App (PWA) support.

---

# Deployment

Live Application:

https://streambox-inf.netlify.app/
