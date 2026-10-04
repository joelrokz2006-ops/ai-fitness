import React from "react";
import "./MealCard.css";

// Helper to resolve icon if not present on food object
const resolveFoodIcon = (food) => {
  if (food.icon) return food.icon;
  const name = (food.name || "").toLowerCase();
  if (name.includes("chicken")) return "🍗";
  if (name.includes("egg")) return "🥚";
  if (name.includes("fish") || name.includes("salmon") || name.includes("tuna")) return "🐟";
  if (name.includes("paneer") || name.includes("cheese")) return "🧀";
  if (name.includes("tofu")) return "🧊";
  if (name.includes("dal") || name.includes("lentil") || name.includes("soya")) return "🫘";
  if (name.includes("chana") || name.includes("chickpea")) return "🧆";
  if (name.includes("rice")) return "🍚";
  if (name.includes("oat")) return "🥣";
  if (name.includes("roti") || name.includes("chapati")) return "🫓";
  if (name.includes("sweet potato") || name.includes("potato")) return "🍠";
  if (name.includes("banana")) return "🍌";
  if (name.includes("apple")) return "🍎";
  if (name.includes("orange")) return "🍊";
  if (name.includes("broccoli")) return "🥦";
  if (name.includes("salad") || name.includes("greens")) return "🥗";
  if (name.includes("spinach")) return "🥬";
  if (name.includes("yogurt") || name.includes("curd") || name.includes("dahi")) return "🥛";
  if (name.includes("milk")) return "🥛";
  if (name.includes("peanut") || name.includes("almond") || name.includes("nut")) return "🥜";
  return "🥗";
};

const MealCard = ({ meal }) => {
  if (!meal) return null;

  return (
    <div className="meal-card">
      {/* Meal Header */}
      <div className="meal-header">
        <div>
          <h3>{meal.mealName}</h3>
          <p className="meal-time">🕒 {meal.recommendedTime}</p>
        </div>

        <div className="meal-calories">
          <strong>{meal.totalCalories || 0}</strong>
          <span>kcal</span>
        </div>
      </div>

      {/* Foods List */}
      <div className="meal-foods">
        <h4>Planned Foods & Servings</h4>

        {meal.foods && meal.foods.length > 0 ? (
          meal.foods.map((food, index) => {
            const icon = resolveFoodIcon(food);
            const portionText = food.portion || (food.quantity && food.unit ? `${food.quantity} × ${food.unit}` : food.unit || "1 serving");

            return (
              <div className="food-item" key={food._id || index}>
                <div className="food-left-box">
                  <span className="food-icon-badge" title={food.name}>
                    {icon}
                  </span>
                  <div className="food-details">
                    <h5 className="food-title">{food.name}</h5>
                    <span className="food-portion-tag">Portion: {portionText}</span>
                    <div className="food-micro-macros">
                      <span>🥩 {food.protein || 0}g P</span>
                      <span>🍚 {food.carbs || 0}g C</span>
                      <span>🥑 {food.fats || 0}g F</span>
                    </div>
                  </div>
                </div>

                <div className="food-calories-badge">
                  <span>🔥 {food.calories || 0}</span>
                  <small>kcal</small>
                </div>
              </div>
            );
          })
        ) : (
          <p className="no-food">No foods configured for this meal.</p>
        )}
      </div>

      {/* Meal Macros Summary Footer */}
      <div className="meal-macros">
        <div className="macro-stat-box protein-box">
          <span>Protein</span>
          <strong>{meal.totalProtein || 0}g</strong>
        </div>

        <div className="macro-stat-box carbs-box">
          <span>Carbs</span>
          <strong>{meal.totalCarbs || 0}g</strong>
        </div>

        <div className="macro-stat-box fats-box">
          <span>Fats</span>
          <strong>{meal.totalFats || 0}g</strong>
        </div>
      </div>
    </div>
  );
};

export default MealCard;