# StreamBox

A simple responsive movie browsing web app built with HTML, CSS, and JavaScript.

## Files

- `index.html` — page structure
- `styles.css` — visual identity and responsive layout
- `script.js` — movie pagination, search, card rendering, and modal behavior
- `auth.js` — Supabase authentication, session handling, and Profile dropdown logic
- `tmdb.js` — TMDB API wrapper and serverless proxy router
- `netlify/functions/tmdb.js` — Netlify serverless function to proxy TMDB requests securely

## How to run

# StreamBox Final Project

A responsive movie browsing web application upgraded with **TMDB API integration**, **Supabase Authentication**, and **Netlify Serverless Functions** as part of the Final Exam Project for the **Introduction to Web Development** course at **DUNIS Dakar**.

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
- Profile Dropdown menu in header
- Auto-login transition on signup
- Unique sign-in and sign-up card messaging

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
- Secure serverless proxy (Netlify Functions)

## User Experience

- Responsive Design
- Loading States
- Error States
- Empty States
- Mobile-Friendly Interface
- Mobile-friendly Profile menu stacking
- Responsive auth layout for mobile
- Smooth pagination scrolling offset

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

Copy `config.example.js` to `config.js`, then add your TMDB API key.

Example:

```javascript
const TMDB_API_KEY = "YOUR_TMDB_API_KEY";
```

Do not commit `config.js`. It is ignored by Git because it contains a private key.

## Step 4: Test API Connectivity

Verify that movie data loads correctly before presenting the project.

---



# Screenshots

## Authentification Page
<img width="1440" height="900" alt="authenfication page" src="https://github.com/user-attachments/assets/b08ccf9e-6749-4435-be0e-b6d254e2fde1" />


## Sign-Up Form

<img width="1440" height="900" alt="Sign up form" src="https://github.com/user-attachments/assets/b29df561-30d0-4f60-9cde-94a3520641a5" />

## Movie Listing Page
<img width="1440" height="900" alt="Screenshot 2026-06-08 at 10 21 13 PM" src="https://github.com/user-attachments/assets/8806e03a-f5fd-497c-b748-758e0e8c89d1" />


Search Results
<img width="1440" height="900" alt="Screenshot 2026-06-08 at 10 13 07 PM" src="https://github.com/user-attachments/assets/7ec8c490-9437-4155-89ca-6488b5cb10d3" />


## Movie Detail Modal/Page
<img width="2360" height="1640" alt="Movie detail modal page" src="https://github.com/user-attachments/assets/5c81fdf9-cc3a-4eaf-b5ae-6148979397ed" />


## Genre Filtering
<img width="1440" height="900" alt="Genre filtering" src="https://github.com/user-attachments/assets/7abe8c46-155b-4e1f-a979-4631283adbc3" />



## Mobile Responsive Layout
<img width="1440" height="900" alt="Responsive Layout 1" src="https://github.com/user-attachments/assets/470f54da-cbfb-40e1-a623-4ae08deb40b1" />
<img width="2360" height="1640" alt="Responsive Layout 2" src="https://github.com/user-attachments/assets/79ef8e79-09e9-483e-a5df-1f09e2707b06" />
<img width="603" height="1311" alt="Responsive Layout 3" src="https://github.com/user-attachments/assets/1fe4f0ca-d072-4644-8c7f-7755d94a7024" />

---

# Known Limitations

- TMDB API requests require an active internet connection.
- API rate limits are controlled by TMDB.
- Authentication depends on Supabase service availability.
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
