/**
 * Backend AI Coach Service
 * Keeps Gemini API keys strictly on the server side so client applications
 * never expose secret keys.
 */

const generateCoachResponse = async (userPrompt) => {
  const apiKey = process.env.GEMINI_API_KEY || "";

  if (!apiKey) {
    return "AI Coach configuration is pending. Please configure GEMINI_API_KEY on the backend server.";
  }

  // Use Gemini generateContent REST endpoint
  const models = ["gemini-2.5-flash", "gemini-1.5-flash"];
  let lastError = null;

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: userPrompt }],
            },
          ],
          systemInstruction: {
            parts: [
              {
                text: "You are an elite AI Fitness Trainer and Sports Nutritionist. Only answer fitness, workout, BMI, and diet related questions. Keep answers clear, structured, motivating, and friendly.",
              },
            ],
          },
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1000,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error?.message || `Gemini API error with status ${response.status}`
        );
      }

      const data = await response.json();
      const candidateText =
        data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (candidateText) {
        return candidateText;
      }
    } catch (err) {
      lastError = err;
      console.warn(`[AI Service] Attempt with ${model} failed:`, err.message);
    }
  }

  // Graceful fallback response for users
  console.error("[AI Service] All model calls failed:", lastError?.message);
  return "I'm currently unable to connect to the AI model right now. In the meantime, remember to stay consistent with your workout schedule, prioritize adequate protein, and drink plenty of water!";
};

module.exports = {
  generateCoachResponse,
};
