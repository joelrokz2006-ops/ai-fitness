import { useNavigate } from "react-router-dom";
import "./ExerciseCard.css";

function ExerciseCard({
  name,
  target,
  sets,
  reps,
  image,
  slug,
}) {
  const navigate = useNavigate();

  const handleWorkout = () => {
    if (!slug) {
      console.error("Exercise slug is missing");
      return;
    }

    navigate(`/exercise/${slug}`);
  };

  return (
    <div className="exercise-card">

      {image && (
        <img
          src={image}
          alt={name}
          className="exercise-image"
        />
      )}

      <div className="exercise-content">

        <h2>{name}</h2>

        <p className="target">
          <strong>Target:</strong> {target}
        </p>

        <div className="exercise-info">

          <div>
            <h3>{sets}</h3>
            <span>SETS</span>
          </div>

          <div>
            <h3>{reps}</h3>
            <span>REPS</span>
          </div>

        </div>

        <button onClick={handleWorkout}>
          ▶ Start Workout
        </button>

      </div>

    </div>
  );
}

export default ExerciseCard;