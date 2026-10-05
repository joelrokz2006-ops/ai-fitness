# 🏋️ AI Fitness App

A full-stack AI-powered fitness application built with React, Node.js, Express, and MongoDB. Includes interactive workout routines, automated macronutrient & personalized diet plan generation, biometric dashboard, 3D/muscle anatomy visualization, and an AI trainer coach.

---

## ✨ Features

- **Personalized Diet Planner**: Automatically calculates BMR, TDEE, and macro ratios (Protein, Carbs, Fats) tailored to your fitness goals (Muscle Gain, Weight Loss, Maintenance). Generates complete structured 4-meal daily plans with vegetarian and non-vegetarian options.
- **Gym Workout AI Planner**: Generates full weekly exercise splits, exact sets and rep targets, cardio recommendations, warm-up/cool-down directives, and downloadable PDF reports.
- **Biometric Command Dashboard**: Real-time hydration tracker, dynamic macro progress gauges, daily workout logging, and interactive meal timeline checklists.
- **Interactive Anatomy & Exercise Library**: Video-guided demonstrations and target muscle anatomy maps.
- **AI Fitness Coach Chatbot**: Powered by Gemini for dynamic fitness and nutrition guidance.
- **Embedded Database Fallback**: Includes embedded in-memory MongoDB support (`mongodb-memory-server`) with automatic food and demo user seeding for frictionless zero-config startup.

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/joelrokz2006-ops/ai-fitness.git
cd ai-fitness
```

### 2. Install Dependencies
```bash
# Backend dependencies
cd backend && npm install

# Frontend dependencies
cd ../frontend && npm install
cd ..
```

### 3. Run the Application
Run both backend and frontend concurrently from the root directory:
```bash
npm start
```

* **Frontend**: [http://localhost:5174](http://localhost:5174)
* **Backend API**: [http://localhost:5000](http://localhost:5000)

---

## 🔑 Demo Login

* **Email**: `demo@fitness.com`
* **Password**: `password123`
*(Or click **"⚡ Quick Demo Login"** on the login screen for instant 1-click access.)*

---

## 🌐 Deploy Backend on Render

You can easily deploy the backend to [Render](https://render.com) using either the automatic blueprint or manual web service setup:

### Method A: Using Render Blueprint (Automatic)
1. Go to [Render Dashboard](https://dashboard.render.com/) and click **New +** -> **Blueprint**.
2. Select your repository: `joelrokz2006-ops/ai-fitness`.
3. Render will automatically detect [`render.yaml`](file:///home/joel/Documents/ai-fitness%20%283%29/ai-fitness/render.yaml) and configure the service.
4. Set your `MONGO_URI` (from MongoDB Atlas) in the environment variables (or leave it to use the built-in database).
5. Click **Apply**.

### Method B: Manual Web Service Setup
1. On Render, click **New +** -> **Web Service**.
2. Connect your GitHub repository `joelrokz2006-ops/ai-fitness`.
3. Configure settings:
   - **Name**: `ai-fitness-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
4. Under **Environment Variables**, add:
   - `NODE_ENV`: `production`
   - `JWT_SECRET`: `your_random_secret_jwt_key`
   - `MONGO_URI`: `your_mongodb_atlas_connection_string`
5. Click **Deploy Web Service**.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, React Router 7, Axios, jsPDF, React Markdown
- **Backend**: Node.js, Express 5, MongoDB / Mongoose, In-Memory Mongo Fallback, JWT, Bcrypt
- **AI**: Google Gen AI SDK
