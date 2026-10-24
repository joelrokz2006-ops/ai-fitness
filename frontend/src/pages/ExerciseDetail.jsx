import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import exercises, { getExerciseBySlug } from "../data/exercise";
import "./ExerciseDetail.css";

function ExerciseDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const currentExercise =
    getExerciseBySlug(slug) ||
    exercises.find((item) => item.slug === slug || item.id === slug) ||
    exercises[0];

  const [currentStep, setCurrentStep] = useState(0);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!currentExercise) {
    return (
      <div className="exercise-not-found">
        <h1>Exercise Not Found</h1>

        <button onClick={() => navigate("/exercises")}>
          ← Back to Exercises
        </button>
      </div>
    );
  }

  const stepsList = currentExercise.steps || [
    "Assume starting position with proper alignment.",
    "Execute movement through controlled range of motion.",
    "Squeeze target muscles at peak contraction.",
    "Return to starting point under control.",
  ];

  const speakStep = () => {
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(
      stepsList[currentStep] || currentExercise.name
    );

    speech.rate = 0.9;
    speech.pitch = 1;

    speech.onstart = () => setSpeaking(true);
    speech.onend = () => setSpeaking(false);

    speechSynthesis.speak(speech);
  };

  const stopVoice = () => {
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
    }
    setSpeaking(false);
  };

  const nextStep = () => {
    if (currentStep < stepsList.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/exercises");
    }
  };

  const videoSrc = currentExercise.video;

  return (
    <div className="exercise-detail-page">
      <div className="detail-header">
        <button className="back-btn" onClick={handleBack}>
          ← Back
        </button>

        <h1>{currentExercise.name}</h1>
        <span>{currentExercise.target} — {currentExercise.category}</span>
      </div>

      <div className="detail-grid">
        {/* LEFT PANEL */}
        <div className="left-panel">
          {/* EXERCISE VIDEO DEMONSTRATION */}
          <div className="exercise-video-box">
            <div className="video-box-header">
              <h3>▶ Exercise Video</h3>
              <span className="video-target-tag">{currentExercise.target}</span>
            </div>

            {videoSrc ? (
              videoSrc.endsWith(".mp4") ? (
                <video
                  key={videoSrc}
                  className="exercise-video-player"
                  controls
                  playsInline
                >
                  <source
                    src={
                      videoSrc.startsWith("/")
                        ? videoSrc
                        : `/videos/${videoSrc}`
                    }
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <iframe
                  title={currentExercise.name}
                  src={videoSrc}
                  className="exercise-video-player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ border: "none" }}
                />
              )
            ) : (
              <div className="no-video-placeholder">
                <p>Visual demonstration coming soon for this movement.</p>
              </div>
            )}
          </div>

          <div className="stats">
            <div>
              <h3>{currentExercise.sets}</h3>
              <p>SETS</p>
            </div>

            <div>
              <h3>{currentExercise.reps}</h3>
              <p>REPS</p>
            </div>

            <div>
              <h3>{currentExercise.rest || "60-90s"}</h3>
              <p>REST</p>
            </div>

            <div>
              <h3>{currentExercise.calories || "80 kcal"}</h3>
              <p>CALORIES</p>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="right-panel">
          <h2>Description</h2>
          <p>{currentExercise.description}</p>

          <div className="progress">
            <div
              className="progress-fill"
              style={{
                width: `${
                  ((currentStep + 1) / stepsList.length) * 100
                }%`,
              }}
            ></div>
          </div>

          <h2>
            Step {currentStep + 1} / {stepsList.length}
          </h2>

          <div className="step-card">
            {stepsList[currentStep]}
          </div>

          <div className="button-group">
            <button
              onClick={previousStep}
              disabled={currentStep === 0}
            >
              Previous
            </button>

            <button onClick={nextStep}>
              Next
            </button>
          </div>

          <div className="button-group">
            {!speaking ? (
              <button onClick={speakStep}>
                🔊 AI Coach
              </button>
            ) : (
              <button onClick={stopVoice}>
                ⏹ Stop Voice
              </button>
            )}
          </div>

          <div className="tips-box">
            <h2>Tips</h2>
            <ul>
              {(currentExercise.tips || []).map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </div>

          <div className="mistake-box">
            <h2>Common Mistakes</h2>
            <ul>
              {(currentExercise.mistakes || []).map((mistake, index) => (
                <li key={index}>{mistake}</li>
              ))}
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
}

export default ExerciseDetail;