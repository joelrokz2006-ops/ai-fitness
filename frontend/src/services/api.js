const API_BASE_URL = "/api";

/* ========================================
   TOKEN EXPIRATION & SESSION HELPERS
======================================== */

export const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const raw = token.replace(/^Bearer\s+/i, "").trim();
    const parts = raw.split(".");
    if (parts.length !== 3) return true;
    const payload = JSON.parse(
      atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"))
    );
    if (!payload.exp) return false;
    return Date.now() >= payload.exp * 1000;
  } catch (e) {
    return true;
  }
};

export const clearAuthSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userToken");
  localStorage.removeItem("user");
};

/* ========================================
   GET AUTH TOKEN
======================================== */

export const getToken = () => {
  // Check both possible storage keys
  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("userToken");

  if (!token) {
    return null;
  }

  const cleanToken = token.replace(/^Bearer\s+/i, "").trim();

  // If token is expired, clear stale session immediately
  if (isTokenExpired(cleanToken)) {
    console.warn("⚠️ Authentication session expired. Clearing local token.");
    clearAuthSession();
    return null;
  }

  return cleanToken;
};

/* ========================================
   CREATE AUTH HEADERS
======================================== */

export const getAuthHeaders = () => {
  const token = getToken();

  return {
    "Content-Type": "application/json",
    ...(token && {
      Authorization: `Bearer ${token}`,
    }),
  };
};

/* ========================================
   GENERATE DIET PLAN
======================================== */

export const generateDietPlan = async (dietData) => {
  const token = getToken();

  if (!token) {
    throw new Error("Session expired. Please log in again to continue.");
  }

  const response = await fetch(
    `${API_BASE_URL}/diet/generate`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(dietData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("❌ Generate Diet Error:", data);

    if (
      response.status === 401 ||
      (data.message && /token|expired/i.test(data.message))
    ) {
      clearAuthSession();
      throw new Error("Session expired. Please log in again to continue.");
    }

    throw new Error(
      data.message || "Failed to generate diet plan"
    );
  }

  return data;
};

/* ========================================
   GET MY DIET PLAN
======================================== */

export const getMyDietPlan = async () => {
  const token = getToken();

  if (!token) {
    throw new Error("Session expired. Please log in again to continue.");
  }

  const response = await fetch(
    `${API_BASE_URL}/diet/my-plan`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("❌ Get Diet Plan Error:", data);

    if (
      response.status === 401 ||
      (data.message && /token|expired/i.test(data.message))
    ) {
      clearAuthSession();
      throw new Error("Session expired. Please log in again to continue.");
    }

    throw new Error(
      data.message || "Failed to get diet plan"
    );
  }

  return data;
};