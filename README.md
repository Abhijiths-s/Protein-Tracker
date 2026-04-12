# 🥗 VitaFlux

A full-stack web application for tracking daily protein and calorie intake, designed to help users monitor nutrition, visualize progress, and maintain a healthier lifestyle.

---

## 🚀 Features

### 🔐 Authentication

* Secure login using **Firebase Authentication**
* Supports email/password (Google optional)
* Backend verification using Firebase JWT

---

### 🔍 Smart Food Search

* Real-time food search using **USDA API**
* Intelligent caching in database for faster repeated queries
* Dynamic suggestions as user types

---

### 🍽️ Meal Logging

* Log food intake with quantity (grams)
* Automatic calculation of:

  * Protein
  * Calories
* Swipe-to-delete (mobile) and delete button (desktop)

---

### 📊 Dashboard Analytics

* Daily protein & calorie tracking
* Percentage-based progress visualization
* Circular and linear progress indicators

---

### 📅 Daily Log System

* View all logs for the current day
* Dynamic updates without page reload
* Persistent storage for historical analysis

---

### ⚖️ Health Metrics

* Personalized protein & calorie goals
* Goal-based nutrition calculation:

  * Gain / Maintain / Loss

---

## 🧠 Architecture & Concepts

* Clean Architecture:

  ```
  Controller → Service → Database (Prisma)
  ```
* JWT-based authentication (Firebase Admin SDK)
* External API integration (USDA FoodData Central)
* Caching strategy (DB-first, API fallback)
* Real-time UI updates (no page reloads)
* Responsive UI with modern UX patterns

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* PostgreSQL
* Prisma ORM
* Firebase Admin SDK

### Frontend

* React (Vite)
* Tailwind CSS
* Framer Motion
* Recharts / Chart.js

---

## 📡 API Endpoints

### 🔍 Food

* `GET /api/foods/search?query=egg`

---

### 🍽️ Logs

* `POST /api/logs`
* `DELETE /api/logs/:id`
* `GET /api/dashboard` (daily aggregated stats + logs)

---

### 👤 Users

* `POST /api/users/create`
* `POST /api/users/setup`

---

## 🧪 Example Request

```json
POST /api/logs

{
  "foodId": 1,
  "quantity": 150
}
```

---

## ⚙️ Setup Instructions

```bash
git clone <repo-url>
cd server
npm install
```

---

### 🔐 Environment Variables

Create a `.env` file:

```env
DATABASE_URL=your_postgres_url
USDA_API_KEY=your_api_key
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_PRIVATE_KEY=your_private_key
```

⚠️ Never commit `.env` files to GitHub.

---

### ▶️ Run Backend

```bash
npx prisma migrate dev
node src/app.js
```

---

### ▶️ Run Frontend

```bash
cd client
npm install
npm run dev
```

---

## 📌 Future Improvements

* Edit logs functionality
* Undo delete (toast/snackbar)
* Weekly & monthly analytics
* AI-based food recommendations
* Offline support (PWA)
* Accessibility improvements

---

## 👨‍💻 Author

**Abhijith S**

* GitHub: https://github.com/Abhijiths-s
* LinkedIn: https://www.linkedin.com/in/abhijiths-s

---

## ⭐ Project Highlights

This project demonstrates:

* Full-stack system design
* Secure authentication with Firebase
* Real-time data-driven UI
* Clean and scalable backend architecture
* Strong focus on UX (mobile + desktop)

---

## 📜 License

MIT License
