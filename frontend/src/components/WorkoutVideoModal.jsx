import React, { useEffect } from "react";
import "./WorkoutVideoModal.css";

const WorkoutVideoModal = ({ exercise, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!exercise) return null;

  const rawVideo = exercise.videoUrl || exercise.video || "";
  const isMp4 =
    rawVideo.endsWith(".mp4") ||
    rawVideo.startsWith("/videos/") ||
    (!rawVideo.startsWith("http://") && !rawVideo.startsWith("https://") && rawVideo.includes(".mp4"));

  const videoSrc = isMp4
    ? rawVideo.startsWith("/")
      ? rawVideo
      : `/videos/${rawVideo}`
    : rawVideo;

  return (
    <div className="workout-video-overlay" onClick={onClose}>
      <div
        className="workout-video-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          className="video-modal-close-btn"
          onClick={onClose}
          aria-label="Close video player"
        >
          ×
        </button>

        <div className="workout-modal-grid">
          {/* MEDIA PLAYER PANEL */}
          <div className="workout-modal-player-panel">
            {isMp4 ? (
              <video
                className="workout-modal-video-player"
                controls
                autoPlay
                playsInline
                key={videoSrc}
              >
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <iframe
                title={exercise.name}
                src={videoSrc}
                className="workout-modal-video-player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
            <div className="video-player-badge">
              🎥 Exercise Demonstration Tutorial
            </div>
          </div>

          {/* EXERCISE DETAILS PANEL */}
          <div className="workout-modal-info-panel">
            <span className="workout-muscle-tag">
              {exercise.muscle || exercise.target || "Target Muscle"}
            </span>

            <h2>{exercise.name}</h2>

            <div className="workout-modal-metrics">
              <div className="metric-chip">
                <span>SETS</span>
                <strong>{exercise.sets || "3-4"}</strong>
              </div>
              <div className="metric-chip">
                <span>REPS</span>
                <strong>{exercise.reps || "8-12"}</strong>
              </div>
              <div className="metric-chip">
                <span>INTENSITY</span>
                <strong>OPTIMAL</strong>
              </div>
            </div>

            <div className="workout-instruction-box">
              <h4>Execution Guidance:</h4>
              <p>
                {exercise.instructions ||
                  exercise.description ||
                  "Execute repetitions with controlled cadence. Focus on strict form, proper breathing, and mind-muscle contraction."}
              </p>
            </div>

            <div className="workout-pro-tips">
              <h4>Safety & Form Cue:</h4>
              <ul>
                <li>Control the eccentric (lowering) phase for 2-3 seconds.</li>
                <li>Avoid locking joints abruptly under peak load.</li>
                <li>Exhale during exertion and inhale during reset.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutVideoModal;
