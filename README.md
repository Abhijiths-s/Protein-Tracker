# 🥗 Protein & Calorie Tracker

A full-stack web application that helps users track their daily protein and calorie intake, analyze nutrition trends, and maintain a healthy lifestyle.

---

## 🚀 Features

### 🔍 Food Search

* Search foods using real-time data from USDA API
* Automatic caching for faster future queries

### 🍽️ Meal Logging

* Log food intake with quantity
* Dynamic calculation of calories & protein

### 📊 Daily Analytics

* Track total daily intake
* Graphical visualization (frontend)

### ⚖️ Health Metrics

* BMI calculation
* Personalized protein & calorie goals

---

## 🧠 Key Concepts Implemented

* REST API design
* Clean architecture (Controller → Service → DB)
* External API integration
* Caching strategy
* Dynamic aggregation (no redundant storage)

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* PostgreSQL
* Prisma ORM

### Frontend (in progress)

* React (Vite)
* Tailwind CSS
* Framer Motion
* Chart.js / Recharts

---

## 📡 API Endpoints

### Food

* `GET /api/foods?query=egg`

### Logs

* `POST /api/logs`
* `GET /api/logs/total?userId=1&date=YYYY-MM-DD`

### Health

* `POST /api/health/bmi`
* `POST /api/health/goal`

---

## 🧪 Example Request

```json
POST /api/logs

{
  "userId": 1,
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

### Configure environment

Create `.env` file:

```env
DATABASE_URL=your_postgres_url
USDA_API_KEY=your_api_key
```

---

### Run backend

```bash
npx prisma migrate dev
node src/app.js
```

---

## 📌 Future Improvements

* Authentication system
* Multi-user support
* Advanced nutrition recommendations
* Mobile responsiveness
* AI-based food suggestions

---

## 👨‍💻 Author

Abhijith S

---

## ⭐ Project Goal

This project was built to demonstrate:

* Full-stack development skills
* Clean architecture design
* Real-world problem solving

---

## 📜 License

MIT License
