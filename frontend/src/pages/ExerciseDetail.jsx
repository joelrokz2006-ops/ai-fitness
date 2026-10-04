import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import exercise from "../data/exercise";
import "./ExerciseDetail.css";

function ExerciseDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const exercise = exercise.find((item) => item.slug === slug);

  const [currentStep, setCurrentStep] = useState(0);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!exercise) {
    return (
      <div className="exercise-not-found">
        <h1>Exercise Not Found</h1>

        <button onClick={() => navigate("/exercises")}>
          Back
        </button>
      </div>
    );
  }

  const speakStep = () => {
    speechSynthesis.cancel();

    const speech = new SpeechSynthesisUtterance(
      exercise.steps[currentStep]
    );

    speech.rate = 0.9;
    speech.pitch = 1;

    speech.onstart = () => setSpeaking(true);

    speech.onend = () => setSpeaking(false);

    speechSynthesis.speak(speech);
  };

  const stopVoice = () => {
    speechSynthesis.cancel();
    setSpeaking(false);
  };

  const nextStep = () => {
    if (currentStep < exercise.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="exercise-detail-page">

      <div className="detail-header">

        <button
          className="back-btn"
          onClick={() => navigate("/exercises")}
        >
          ← Back
        </button>

        <h1>{exercise.name}</h1>

        <span>{exercise.target}</span>

      </div>

      <div className="detail-grid">

        {/* LEFT */}

        <div className="left-panel">

          <img
            src={exercise.image}
            alt={exercise.name}
            className="exercise-image"
          />

          <div className="stats">

            <div>

              <h3>{exercise.sets}</h3>

              <p>SETS</p>

            </div>

            <div>

              <h3>{exercise.reps}</h3>

              <p>REPS</p>

            </div>

            <div>

              <h3>{exercise.rest}</h3>

              <p>REST</p>

            </div>

            <div>

              <h3>{exercise.calories}</h3>

              <p>CALORIES</p>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="right-panel">

          <h2>Description</h2>

          <p>{exercise.description}</p>

          <div className="progress">

            <div
              className="progress-fill"
              style={{
                width: `${
                  ((currentStep + 1) /
                    exercise.steps.length) *
                  100
                }%`,
              }}
            ></div>

          </div>

          <h2>

            Step {currentStep + 1} / {exercise.steps.length}

          </h2>

          <div className="step-card">

            {exercise.steps[currentStep]}

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

              {exercise.tips.map((tip, index) => (

                <li key={index}>{tip}</li>

              ))}

            </ul>

          </div>

          <div className="mistake-box">

            <h2>Common Mistakes</h2>

            <ul>

              {exercise.mistakes.map((mistake, index) => (

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