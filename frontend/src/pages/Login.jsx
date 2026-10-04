import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  // =====================================================
  // STATE
  // =====================================================

  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =====================================================
  // CLEAR FORM
  // =====================================================

  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  // =====================================================
  // SWITCH LOGIN / REGISTER
  // =====================================================

  const switchMode = () => {
    if (loading) return;

    setIsRegister((prev) => !prev);

    clearForm();

    setError("");
    setSuccess("");
  };

  // =====================================================
  // REGISTER
  // =====================================================

  const handleRegister = async () => {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    // -----------------------------
    // VALIDATION
    // -----------------------------

    if (!cleanName) {
      setError("Please enter your name.");
      return;
    }

    if (!cleanEmail) {
      setError("Please enter your email.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    try {
      console.log("=================================");
      console.log("REGISTER REQUEST");
      console.log("=================================");

      // IMPORTANT:
      // Do NOT use http://localhost:5000 here.
      // Vite proxy will forward /api to backend.
      const response = await fetch("/api/auth/register", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          password: password,
          role: "user",
        }),
      });

      console.log("Register Status:", response.status);

      // -----------------------------
      // READ RESPONSE
      // -----------------------------

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {
          message: "Invalid response from server.",
        };
      }

      console.log("Register Response:", data);

      // -----------------------------
      // ERROR RESPONSE
      // -----------------------------

      if (!response.ok) {
        setError(
          data.message ||
            "Registration failed. Please try again."
        );

        return;
      }

      // -----------------------------
      // SUCCESS
      // -----------------------------

      setSuccess(
        data.message ||
          "Account created successfully."
      );

      clearForm();

      // Automatically switch to login
      setTimeout(() => {
        setIsRegister(false);
        setSuccess("");
      }, 1500);

    } catch (error) {
      console.error(
        "Register Error:",
        error
      );

      setError(
        "Unable to connect to the server. Please make sure the backend is running."
      );
    }
  };

  // =====================================================
  // LOGIN
  // =====================================================

  const handleLogin = async () => {
    const cleanEmail = email.trim().toLowerCase();

    // -----------------------------
    // VALIDATION
    // -----------------------------

    if (!cleanEmail) {
      setError("Please enter your email.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      console.log("=================================");
      console.log("LOGIN REQUEST");
      console.log("=================================");

      // IMPORTANT:
      // Use relative API URL.
      // Vite proxy forwards this to localhost:5000.
      const response = await fetch("/api/auth/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({
          email: cleanEmail,
          password: password,
        }),
      });

      console.log("Login Status:", response.status);

      // -----------------------------
      // READ RESPONSE
      // -----------------------------

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {
          message: "Invalid response from server.",
        };
      }

      console.log("Login Response:", data);

      // -----------------------------
      // BACKEND ERROR
      // -----------------------------

      if (!response.ok) {
        setError(
          data.message ||
            "Login failed. Please check your credentials."
        );

        return;
      }

      // -----------------------------
      // TOKEN CHECK
      // -----------------------------

      if (!data.token) {
        setError(
          "Login failed: authentication token was not received."
        );

        return;
      }

      // -----------------------------
      // USER CHECK
      // -----------------------------

      if (!data.user) {
        setError(
          "Login failed: user information was not received."
        );

        return;
      }

      // =================================================
      // SAVE LOGIN DATA
      // =================================================

      localStorage.setItem(
        "token",
        data.token
      );

      // Keep both keys in case other components
      // use either one.
      localStorage.setItem(
        "userToken",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      console.log(
        "✅ Login successful"
      );

      console.log(
        "Logged User:",
        data.user
      );

      // =================================================
      // REDIRECT
      // =================================================

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }

    } catch (error) {
      console.error(
        "Login Error:",
        error
      );

      setError(
        "Unable to connect to the server. Please make sure the backend is running."
      );
    }
  };

  // =====================================================
  // QUICK DEMO LOGIN
  // =====================================================

  const handleDemoLogin = async () => {
    setName("Demo Athlete");
    setEmail("demo@fitness.com");
    setPassword("password123");
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: "demo@fitness.com",
          password: "password123",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.token) {
        setError(data.message || "Demo login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("userToken", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
    } catch (err) {
      setError("Unable to connect to the backend server.");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (isRegister) {
        await handleRegister();
      } else {
        await handleLogin();
      }
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="login-page-container">

      <div className="login-panel-box">

        {/* =================================================
            TITLE
        ================================================= */}

        <h2 className="login-main-title">

          {isRegister ? (
            "CREATE ACCOUNT"
          ) : (
            <>
              ACCESS <span>PORTAL</span>
            </>
          )}

        </h2>

        {/* =================================================
            SUBTITLE
        ================================================= */}

        <p className="login-subtitle-prompt">

          {isRegister
            ? "Register new athlete account"
            : "Enter credentials to authenticate connection."}

        </p>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div
            style={{
              color: "red",
              marginBottom: "15px",
              textAlign: "center",
              fontSize: "14px",
            }}
          >
            {error}
          </div>
        )}

        {/* =================================================
            SUCCESS
        ================================================= */}

        {success && (
          <div
            style={{
              color: "lime",
              marginBottom: "15px",
              textAlign: "center",
              fontSize: "14px",
            }}
          >
            {success}
          </div>
        )}

        {/* =================================================
            FORM
        ================================================= */}

        <form onSubmit={handleSubmit}>

          {/* =================================================
              NAME - REGISTER ONLY
          ================================================= */}

          {isRegister && (
            <div
              style={{
                marginBottom: "20px",
              }}
            >

              <label>Name</label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Your name"
                autoComplete="name"
                disabled={loading}
                required
              />

            </div>
          )}

          {/* =================================================
              EMAIL
          ================================================= */}

          <div
            style={{
              marginBottom: "20px",
            }}
          >

            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="athlete@ironai.com"
              autoComplete="email"
              disabled={loading}
              required
            />

          </div>

          {/* =================================================
              PASSWORD
          ================================================= */}

          <div
            style={{
              marginBottom: "30px",
            }}
          >

            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="••••••••"
              autoComplete={
                isRegister
                  ? "new-password"
                  : "current-password"
              }
              disabled={loading}
              required
            />

          </div>

          {/* =================================================
              SUBMIT BUTTON
          ================================================= */}

          <button
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Processing..."
              : isRegister
              ? "Create Account"
              : "Verify Identity"}

          </button>

          {!isRegister && (
            <button
              type="button"
              onClick={handleDemoLogin}
              disabled={loading}
              style={{
                marginTop: "12px",
                width: "100%",
                background: "rgba(59, 130, 246, 0.12)",
                border: "1px solid rgba(59, 130, 246, 0.4)",
                color: "#60a5fa",
                padding: "12px",
                borderRadius: "10px",
                fontWeight: "600",
                fontSize: "14px",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.2s ease"
              }}
            >
              ⚡ Quick Demo Login (Instant Access)
            </button>
          )}

        </form>

        {/* =================================================
            LOGIN / REGISTER SWITCH
        ================================================= */}

        <p
          style={{
            marginTop: "20px",
            cursor: loading
              ? "not-allowed"
              : "pointer",
            opacity: loading ? 0.6 : 1,
          }}
          onClick={switchMode}
        >

          {isRegister
            ? "Already have account? Login"
            : "New user? Create Account"}

        </p>

      </div>

    </div>
  );
};

export default Login;