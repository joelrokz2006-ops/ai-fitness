import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import BMI from "./pages/BMI";
import Exercises from "./pages/Exercises";
import Diet from "./pages/Diet";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Anatomy from "./pages/Anatomy";
import ExerciseDetail from "./pages/ExerciseDetail";
import AITrainer from "./pages/AITrainer";
import AIPlanner from "./pages/AIPlanner";

import ProtectedRoute from "./pages/ProtectedRoute";

function App() {

  const location = useLocation();

  return (
    <>
      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bmi"
          element={
            <ProtectedRoute>
              <BMI />
            </ProtectedRoute>
          }
        />

        <Route
          path="/exercises"
          element={
            <ProtectedRoute>
              <Exercises />
            </ProtectedRoute>
          }
        />

        <Route
          path="/diet"
          element={
            <ProtectedRoute>
              <Diet />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/anatomy"
          element={
            <ProtectedRoute>
              <Anatomy />
            </ProtectedRoute>
          }
        />

        <Route
          path="/exercise"
          element={
            <ProtectedRoute>
              <ExerciseDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ai-trainer"
          element={
            <ProtectedRoute>
              <AITrainer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ai-planner"
          element={
            <ProtectedRoute>
              <AIPlanner />
            </ProtectedRoute>
          }
        />

      </Routes>

      {/* Home page-la mattum Footer */}
      {location.pathname === "/" && <Footer />}

    </>
  );
}

export default App;