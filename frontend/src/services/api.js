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

/* ========================================
   USER PROFILE API
======================================== */

export const getUserProfile = async () => {
  const token = getToken();
  if (!token) return null;

  try {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) return null;
    const data = await response.json();
    return data.user;
  } catch (e) {
    return null;
  }
};

export const updateUserProfile = async (profileData) => {
  const token = getToken();
  if (!token) throw new Error("Session expired. Please log in again.");

  const response = await fetch(`${API_BASE_URL}/auth/profile`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(profileData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Failed to update profile");
  }

  // Update local user storage
  if (data.user) {
    localStorage.setItem("user", JSON.stringify(data.user));
  }

  return data.user;
};

/* ========================================
   GYM PLANNER API
======================================== */

export const getMyPlanner = async () => {
  const token = getToken();

  // Try authenticated /my-plan endpoint first
  if (token) {
    try {
      const response = await fetch(`${API_BASE_URL}/planner/my-plan`, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          return data.data;
        }
      }
    } catch (e) {
      console.warn("Could not fetch planner via /my-plan:", e.message);
    }
  }

  // Fallback to cached user ID endpoint
  const cachedUser = localStorage.getItem("user");
  let userId = null;
  if (cachedUser) {
    try {
      const u = JSON.parse(cachedUser);
      userId = u.id || u._id;
    } catch (e) {}
  }

  if (userId) {
    try {
      const response = await fetch(`${API_BASE_URL}/planner/${userId}`, {
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          return data.data;
        }
      }
    } catch (e) {
      console.warn("Could not fetch planner via userId:", e.message);
    }
  }

  // Fallback to localStorage userPlanner if present
  const localPlanner = localStorage.getItem("userPlanner");
  if (localPlanner) {
    try {
      return JSON.parse(localPlanner);
    } catch (e) {}
  }

  return null;
};

/* ========================================
   DAILY PROGRESS TRACKING API
======================================== */

export const getProgress = async (date, dietPlanId = null, plannerId = null) => {
  const token = getToken();
  if (!token) {
    // If not logged in, return null so local state can be used gracefully
    return null;
  }

  let url = `${API_BASE_URL}/progress?date=${encodeURIComponent(date)}`;
  if (dietPlanId) url += `&dietPlanId=${encodeURIComponent(dietPlanId)}`;
  if (plannerId) url += `&plannerId=${encodeURIComponent(plannerId)}`;

  const response = await fetch(url, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    if (response.status === 401) {
      clearAuthSession();
      throw new Error("Session expired. Please log in again.");
    }
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.message || "Failed to load daily progress");
  }

  const data = await response.json();
  return data.data;
};

export const toggleProgress = async ({ date, type, itemId, completed, planId }) => {
  const token = getToken();
  if (!token) {
    throw new Error("Session expired. Please log in again.");
  }

  const response = await fetch(`${API_BASE_URL}/progress/toggle`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      date,
      type,
      itemId,
      completed,
      planId,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    if (response.status === 401) {
      clearAuthSession();
      throw new Error("Session expired. Please log in again.");
    }
    throw new Error(data.message || "Failed to update item status");
  }

  return data.data;
};

export const updateProgressWater = async ({ date, waterGlasses }) => {
  const token = getToken();
  if (!token) return null;

  const response = await fetch(`${API_BASE_URL}/progress/water`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      date,
      waterGlasses,
    }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || "Failed to update water progress");
  }

  const data = await response.json();
  return data.data;
};