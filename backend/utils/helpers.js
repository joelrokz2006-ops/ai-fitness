const roundNumber = (number, decimals = 2) => {
  return Number(number.toFixed(decimals));
};

const capitalize = (text) => {
  if (!text) return "";

  return text.charAt(0).toUpperCase() + text.slice(1);
};

const formatGoal = (goal) => {
  if (!goal) return "";

  return goal
    .split("_")
    .map((word) => capitalize(word))
    .join(" ");
};

module.exports = {
  roundNumber,
  capitalize,
  formatGoal,
};