# AI Fitness Project – Change Requirements for Antigravity

## Project Context

This document contains the requested changes for the existing **AI Fitness full-stack project**.

### Existing stack
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB
- Authentication: JWT
- AI integration: Gemini
- Frontend styling: Separate CSS files per component/page
- Backend module style: CommonJS (`require` / `module.exports`)

### Important implementation rule

Do **not** rebuild the project from scratch.

Modify the existing project and preserve the current working functionality unless a change below specifically requires it.

Do not use Tailwind CSS.

---

# CHANGE 1 — Integrate BMI With Diet Planning

## Goal

The Diet section must use the user's **BMI value as an important input for generating/recommending the diet plan**.

The current diet flow should be updated so that the user's BMI is automatically obtained from their fitness/profile information instead of asking for BMI separately.

## Required behavior

### 1. BMI calculation

Use the standard BMI formula:

```text
BMI = weight_kg / (height_m × height_m)
```

Example:

```text
Weight = 70 kg
Height = 175 cm = 1.75 m

BMI = 70 / (1.75 × 1.75)
BMI = 22.86
```

The calculated BMI should be available to the Diet feature.

### 2. BMI categories

For adult users, use these standard categories:

| BMI | Category |
|---|---|
| Below 18.5 | Underweight |
| 18.5 – 24.9 | Normal weight |
| 25.0 – 29.9 | Overweight |
| 30.0 and above | Obesity |

The exact category calculation should be implemented centrally so the frontend and backend do not calculate different results.

### 3. Diet must use BMI

When generating a diet plan, the system should consider:

- BMI
- BMI category
- Weight
- Height
- Gender
- Fitness goal
- Activity level
- Dietary preference
- Food preferences/restrictions if available

### 4. Remove AGE from Diet

**Age must NOT be used as an input field in the Diet section.**

Remove age from:

- Diet form
- Diet request payload
- Diet controller logic
- Diet generation prompt
- Diet UI
- Diet-specific validation

If age still exists in the Profile/User model for other parts of the application, it can remain there.

The requirement is specifically:

> **Diet planning should not depend on age.**

### 5. BMI-based diet strategy

The Diet module should adapt the plan according to BMI.

#### Underweight
Focus on:
- Nutrient-dense foods
- Adequate calories
- Protein
- Complex carbohydrates
- Healthy fats

#### Normal weight
Focus on:
- Balanced nutrition
- Adequate protein
- Balanced carbohydrates
- Healthy fats
- Maintenance/recomposition depending on the user's goal

#### Overweight
Focus on:
- Sustainable calorie control
- High-protein foods
- High-fiber foods
- Controlled carbohydrates
- Lower-calorie nutrient-dense foods

#### Obesity
Focus on:
- Sustainable calorie reduction
- High-protein meals
- High-fiber foods
- Nutrient-dense low-calorie foods
- Controlled portions

Do **not** generate unsafe crash diets or extreme calorie restrictions.

The UI should communicate that the diet is a fitness-oriented recommendation and that users with medical conditions should consult a qualified professional.

### 6. Display BMI in Diet Page

At the top of the Diet page, show a small BMI summary card:

```text
Your BMI
22.86

Normal Weight
```

The card can optionally include:

- BMI value
- BMI category
- Height
- Weight

Example:

```text
BMI: 27.4
Category: Overweight

Your diet plan is being adjusted based on your BMI and fitness goal.
```

### 7. Backend requirement

The backend should receive or calculate the BMI using trusted user data.

Preferred architecture:

```text
User/Profile data
      ↓
Height + Weight
      ↓
BMI calculation
      ↓
BMI category
      ↓
Diet generation logic
      ↓
AI Diet Plan
      ↓
Frontend
```

Do not rely only on a BMI value entered manually by the user.

### 8. Important consistency rule

Use **one reusable BMI utility/function** instead of duplicating BMI calculation in many files.

For example:

```text
calculateBMI(height, weight)
getBMICategory(bmi)
```

Use the same logic everywhere.

---

# CHANGE 2 — Add a New P & C Nutrition Explanation Section

## Goal

Create a new section explaining the two major macronutrients:

- **P = Protein**
- **C = Carbohydrates**

The section should be beginner-friendly and visually attractive.

---

## Section title

Suggested title:

```text
Understand Your Macros
```

Subtitle:

```text
Learn how Protein and Carbohydrates support your body, workout and fitness goals.
```

---

## Protein section

Display:

```text
P — Protein
```

Explain:

- What protein is
- Why the body needs protein
- How protein supports muscle repair
- How protein supports muscle growth
- Why protein is important during a fitness program
- Common protein-rich foods

### Example foods

Include examples such as:

- Eggs
- Chicken
- Fish
- Milk
- Curd / Greek yogurt
- Paneer
- Dal
- Soy
- Whey protein

### Beginner explanation

Use simple language.

Example concept:

```text
Protein is the building material your body uses to repair and maintain muscles.

When you train, your muscles experience stress.
Protein provides the amino acids needed for recovery and muscle maintenance.
```

---

## Carbohydrate section

Display:

```text
C — Carbohydrates
```

Explain:

- What carbohydrates are
- Why carbohydrates provide energy
- Why carbohydrates are useful before and after training
- Difference between better-quality carbohydrate sources and highly processed sources
- Common carbohydrate foods

### Example foods

Include examples such as:

- Rice
- Oats
- Whole grains
- Potatoes
- Sweet potatoes
- Fruits
- Idli
- Dosa
- Chapati

### Beginner explanation

Example concept:

```text
Carbohydrates are one of the body's main energy sources.

They help provide fuel for daily activity and exercise, especially during harder workouts.
```

---

## P vs C comparison

Add a simple comparison card/table:

| Nutrient | Main Role | Examples |
|---|---|---|
| Protein | Muscle repair & maintenance | Eggs, chicken, paneer, dal |
| Carbohydrates | Energy & workout fuel | Rice, oats, fruits, potatoes |

Optional additional row:

| Nutrient | Main Role | Examples |
|---|---|---|
| Protein | Muscle repair & maintenance | Eggs, chicken, paneer, dal |
| Carbohydrates | Energy & workout fuel | Rice, oats, fruits, potatoes |
| Healthy Fats | Hormone/cell support and energy | Nuts, seeds, olive oil |

If healthy fats are already supported by the existing UI, they may also be included as an additional explanation.

---

## Design requirement

The new nutrition section should match the existing application's design system.

Use:

- Separate CSS file
- Responsive layout
- Cards
- Icons where appropriate
- Clear headings
- Short readable paragraphs
- Mobile-friendly layout

Do not use Tailwind CSS.

---

# CHANGE 3 — Gym Planner Should Contain WORKOUTS ONLY

## Goal

The Gym Planner should be simplified so that it focuses only on workout planning.

Remove unrelated content from the Gym Planner.

The section should primarily show:

```text
Workout Plan
```

and not act as a combined workout + diet + general fitness planner.

---

## Gym Planner behavior

The planner should generate/display workouts based on available profile information such as:

- Fitness goal
- Experience level
- Training days
- Target muscle groups
- Workout preference
- Equipment availability

The exact existing inputs should be reused where possible instead of creating unnecessary duplicate forms.

---

## Workout plan structure

Each workout should show information like:

```text
Day 1 — Chest & Triceps

1. Bench Press
   4 sets × 8–12 reps

2. Incline Dumbbell Press
   3 sets × 8–12 reps

3. Cable Fly
   3 sets × 12–15 reps

4. Tricep Pushdown
   3 sets × 10–15 reps
```

The final structure should use the project's existing workout data model/components where possible.

---

# CHANGE 4 — Integrate Workout Videos

## Goal

Every workout/exercise displayed inside the Gym Planner should have an associated video.

The user should be able to click the workout/video and watch the exercise demonstration.

---

## Required UI

Each exercise card should include:

- Exercise name
- Sets
- Reps
- Target muscle
- Short instruction
- Video thumbnail/button
- Watch Video action

Example:

```text
┌──────────────────────────────┐
│ Bench Press                  │
│ Chest                        │
│ 4 Sets × 8–12 Reps           │
│                              │
│        ▶ Watch Exercise      │
└──────────────────────────────┘
```

---

## Video interaction

When the user clicks:

```text
Watch Exercise
```

open the workout video.

Preferred UX:

### Option A — Modal

Open a modal containing an embedded video.

```text
--------------------------------
| Bench Press Tutorial        X |
|                              |
|       [ Video Player ]        |
|                              |
--------------------------------
```

### Option B — Dedicated video view

Navigate to an Exercise Video page.

Either option is acceptable, but the interaction must be smooth and responsive.

---

## Video source

Use reliable exercise demonstration videos, preferably from YouTube or another legal/public video source.

Store video URLs/IDs in the exercise data.

Example:

```js
{
  name: "Bench Press",
  muscle: "Chest",
  sets: 4,
  reps: "8-12",
  videoUrl: "https://www.youtube.com/watch?v=VIDEO_ID"
}
```

For YouTube embeds, use the appropriate embed URL.

Example:

```text
https://www.youtube.com/embed/VIDEO_ID
```

Do not hardcode one video component for every exercise.

The video should come from the exercise's data.

---

## Exercise data structure

Where practical, extend the existing exercise model/data with:

```js
{
  name,
  slug,
  muscle,
  description,
  instructions,
  sets,
  reps,
  videoUrl
}
```

If the project already has an exercise model, modify it instead of creating a duplicate system.

---

# CHANGE 5 — Gender Option: Add Transgender

## Goal

The gender selection must include:

```text
Transgender
```

along with the existing gender options.

Example:

```text
Gender
○ Male
○ Female
○ Transgender
```

If the project already supports a flexible gender field, update the validation/options instead of replacing the existing architecture.

---

## Backend requirement

Make sure the backend schema/validation accepts the new value.

For example, if an enum exists:

```js
enum: ["Male", "Female", "Transgender"]
```

Adjust this according to the project's existing data format.

---

## Frontend requirement

Update all gender selectors used by:

- Registration
- Profile
- Fitness planner
- Diet planner
- Any other relevant form

The selected gender must be saved correctly and returned correctly from the backend.

---

# CHANGE 6 — Keep Data Flow Clean

The updated architecture should follow this general flow:

```text
USER PROFILE
     │
     ├── Height
     ├── Weight
     ├── Gender
     ├── Fitness Goal
     └── Activity / Training Information
             │
             ├──────────────────────┐
             │                      │
             ▼                      ▼
        BMI ENGINE             GYM PLANNER
             │                      │
             ▼                      ▼
        BMI CATEGORY           WORKOUT PLAN
             │                      │
             ▼                      ▼
        DIET ENGINE             EXERCISE DATA
             │                      │
             ▼                      ▼
        DIET PLAN              VIDEO LINK
             │                      │
             ▼                      ▼
        DIET PAGE              VIDEO PLAYER
```

---

# CHANGE 7 — Frontend Requirements

Follow the existing coding style.

### Required

- React + Vite
- Existing router
- Existing context/hooks where already available
- Axios for API requests where the project already uses Axios
- Separate CSS files
- Responsive design
- Reusable components
- Avoid duplicate logic

### Do not

- Introduce Tailwind CSS
- Rewrite the whole project
- Create unnecessary duplicate components
- Duplicate BMI calculations
- Hardcode user-specific diet values in the frontend
- Hardcode workout video logic separately for every exercise

---

# CHANGE 8 — Backend Requirements

Use the existing Express architecture.

Where possible:

```text
routes
  ↓
controllers
  ↓
services/utils
  ↓
models/database
```

### BMI

Create/reuse a utility such as:

```text
calculateBMI()
getBMICategory()
```

### Diet

The diet generation request should be able to use:

```text
BMI
BMI Category
Weight
Height
Gender
Fitness Goal
Activity Level
Diet Preference
```

Do not include:

```text
Age
```

in the diet request/generation logic.

### Gender

Update backend validation/schema to support:

```text
Transgender
```

### Workout

Exercise/workout data should support a video URL.

---

# CHANGE 9 — Security Requirement

While modifying the AI features, do not expose secret API keys in the React frontend.

If an AI API key currently exists inside frontend source code:

```text
VITE_GEMINI_API_KEY=...
```

or similar,

move the AI request to the backend and store the secret in backend environment variables.

Preferred flow:

```text
React
  ↓
Express API
  ↓
Gemini API
  ↓
Express response
  ↓
React
```

The frontend should never expose the secret Gemini API key to users.

---

# CHANGE 10 — UI/UX Requirements

The updated application should feel like one consistent product.

Use the project's existing:

- Font system
- Border radius
- Spacing
- Button style
- Card style
- Dark/light theme behavior
- Responsive breakpoints

Do not create completely different styling for the new sections.

---

# ACCEPTANCE CRITERIA

The implementation is complete only when all of the following work:

## BMI + Diet

- [x] BMI is calculated correctly.
- [x] BMI category is calculated consistently.
- [x] Diet page displays the user's BMI.
- [x] Diet recommendations use BMI category.
- [x] Age is removed from the Diet section.
- [x] Age is not included in the diet API request.
- [x] Age is not used in the diet-generation prompt.
- [x] Diet changes appropriately for different BMI categories.

## Nutrition Explanation

- [x] New P — Protein section exists.
- [x] New C — Carbohydrates section exists.
- [x] Beginner-friendly explanations are provided.
- [x] Food examples are displayed.
- [x] P vs C comparison is visible.
- [x] Section is responsive.

## Gym Planner

- [x] Gym Planner focuses only on workouts.
- [x] Workout plan is displayed clearly.
- [x] Exercises display sets and reps.
- [x] Exercise cards include video access.
- [x] Clicking Watch Exercise opens the correct video.
- [x] Videos are data-driven.
- [x] Video UI works on desktop and mobile.

## Gender

- [x] Transgender option appears in gender selection.
- [x] Frontend accepts it.
- [x] Backend accepts it.
- [x] User data saves it correctly.
- [x] User data loads it correctly.

## Code Quality

- [x] Existing functionality remains working.
- [x] No Tailwind CSS added.
- [x] Separate CSS files are maintained.
- [x] BMI logic is reusable.
- [x] Workout video logic is reusable.
- [x] No duplicated API logic.
- [x] No frontend secret API keys.
- [x] No unnecessary project rewrite.

---

# Suggested Implementation Order

Implement in this order:

1. Inspect existing User/Profile/BMI flow.
2. Create/reuse BMI calculation utility.
3. Integrate BMI into the Diet backend.
4. Remove Age from Diet form/API/prompt.
5. Update Diet UI with BMI card.
6. Add the P & C nutrition education section.
7. Simplify Gym Planner to workout-only.
8. Add `videoUrl` to exercise data/model.
9. Add reusable Exercise Video/Modal component.
10. Integrate videos into all workout cards.
11. Add Transgender to frontend and backend gender options.
12. Test registration/profile persistence.
13. Test BMI → Diet flow.
14. Test workout video flow.
15. Test responsive UI.
16. Fix any existing route/import/API issues discovered during integration.

---

# Final Requirement

The final result should feel like a single AI Fitness application where:

```text
PROFILE
   ↓
BMI
   ↓
PERSONALIZED DIET

PROFILE
   ↓
FITNESS GOAL
   ↓
GYM PLANNER
   ↓
WORKOUTS
   ↓
EXERCISE VIDEOS

NUTRITION EDUCATION
   ↓
PROTEIN (P)
CARBOHYDRATES (C)
```

Implement these changes in the existing project architecture and avoid breaking any currently working feature.
