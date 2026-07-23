<div align="center">

# 🎬 CineStream

### A Modern Full-Stack Movie Discovery Platform

Discover trending movies, search thousands of titles, manage your personal watchlist and favorites, watch official trailers, and customize your profile—all in one beautiful, responsive application.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT-black)
![Cloudinary](https://img.shields.io/badge/Cloudinary-Image%20Hosting-3448C5)
![TMDB](https://img.shields.io/badge/API-TMDB-01B4E4)

</div>

---

# 📖 About

CineStream is a **full-stack MERN movie application** that provides a modern streaming-inspired experience.

Users can create an account, securely log in, search thousands of movies through the TMDB API, save favorites, build a personal watchlist, track viewing history, upload profile avatars, read reviews, and watch official YouTube trailers.

The project was built to strengthen full-stack development skills while following modern development practices and clean UI design.

---

# ✨ Features

## 🔐 Authentication

- Secure User Registration
- User Login
- JWT Authentication
- Password Hashing (bcrypt)
- Protected Routes
- Persistent Sessions
- Change Password

---

## 👤 User Profile

- Update Name
- Update Email
- Upload Avatar
- Cloudinary Image Storage
- Profile Statistics

---

## 🎥 Movie Discovery

- Trending Movies
- Popular Movies
- Top Rated Movies
- Upcoming Movies
- Search Movies
- Movie Details
- Genres
- Ratings
- Runtime
- Release Date
- Movie Overview

---

## ▶️ Trailers

- Watch Official YouTube Trailers
- Direct YouTube Integration

---

## ❤️ Favorites

- Save Favorite Movies
- Remove Favorites
- Persistent Storage

---

## 📚 Watchlist

- Add Movies
- Remove Movies
- Personal Collection

---

## 🕒 Watch History

- Automatically Track Viewed Movies
- Delete History
- Resume Browsing

---

## ⭐ Reviews

- Read Movie Reviews

---

## 📱 Responsive Design

- Desktop
- Tablet
- Mobile Friendly
- Modern Dark UI
- Netflix-inspired Layout

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- React Router DOM
- Axios
- Context API
- CSS3

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- Multer
- Cloudinary

---

## External APIs

- TMDB API
- YouTube

---

# 📂 Project Structure

```
CineStream
│
├── client
│   ├── public
│   ├── src
│   │
│   ├── components
│   ├── pages
│   ├── context
│   ├── services
│   ├── hooks
│   ├── assets
│   └── styles
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   └── server.js
│
└── README.md
```

---

# 🚀 Getting Started

## Clone the Repository

```bash
git clone https://github.com/yourusername/cinestream.git
```

---

## Install Frontend

```bash
cd client
npm install
npm run dev
```

---

## Install Backend

```bash
cd server
npm install
npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

TMDB_API_KEY=your_tmdb_api_key

</div>
