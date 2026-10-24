/**
 * SINGLE SOURCE OF TRUTH FOR ALL EXERCISES IN AI FITNESS
 * Used across Exercises Page, Exercise Details, and Gym Planner
 */

const exercises = [
  {
    "id": "c1",
    "slug": "bench-press",
    "name": "Bench Press",
    "category": "Chest",
    "target": "Middle Chest",
    "intensity": "High",
    "difficulty": "Advanced",
    "sets": "4 Sets",
    "reps": "8-12 Reps",
    "rest": "60-90 sec",
    "calories": "80 kcal",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    "video": "bench presst.mp4",
    "videoUrl": "/videos/bench presst.mp4",
    "description": "Targeted strength and hypertrophy movement for Middle Chest (Chest). Maintain strict posture, focus on mind-muscle connection, and adhere to recommended volume parameters.",
    "steps": [
      "Lie flat on the bench with your feet flat on the floor.",
      "Grip the bar slightly wider than shoulder-width.",
      "Lower the bar slowly to your mid-chest.",
      "Push the bar back up explosively while keeping your shoulders pinned back."
    ],
    "tips": [
      "Maintain continuous tension on Middle Chest throughout each rep.",
      "Breathe out during the concentric effort and inhale during the eccentric phase.",
      "Prioritize strict form over loading too much weight."
    ],
    "mistakes": [
      "Using body momentum or swinging to move the weight.",
      "Restricting range of motion and failing to get a full stretch.",
      "Rushing repetitions and losing control of the eccentric tempo."
    ]
  },
  {
    "id": "c2",
    "slug": "incline-dumbbell-press",
    "name": "Incline Dumbbell Press",
    "category": "Chest",
    "target": "Upper Chest",
    "intensity": "High",
    "difficulty": "Advanced",
    "sets": "4 Sets",
    "reps": "10-12 Reps",
    "rest": "60-90 sec",
    "calories": "80 kcal",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    "video": "upper chest.mp4",
    "videoUrl": "/videos/upper chest.mp4",
    "description": "Targeted strength and hypertrophy movement for Upper Chest (Chest). Maintain strict posture, focus on mind-muscle connection, and adhere to recommended volume parameters.",
    "steps": [
      "Set an incline bench to around 30-45 degrees.",
      "Raise the dumbbells above your chest with palms facing forward.",
      "Lower the weights slowly until they are in line with your upper chest.",
      "Press them back up to the starting position."
    ],
    "tips": [
      "Maintain continuous tension on Upper Chest throughout each rep.",
      "Breathe out during the concentric effort and inhale during the eccentric phase.",
      "Prioritize strict form over loading too much weight."
    ],
    "mistakes": [
      "Using body momentum or swinging to move the weight.",
      "Restricting range of motion and failing to get a full stretch.",
      "Rushing repetitions and losing control of the eccentric tempo."
    ]
  },
  {
    "id": "c3",
    "slug": "chest-fly",
    "name": "Chest Fly",
    "category": "Chest",
    "target": "Chest Stretch",
    "intensity": "Medium",
    "difficulty": "Intermediate",
    "sets": "3 Sets",
    "reps": "12-15 Reps",
    "rest": "60-90 sec",
    "calories": "80 kcal",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    "video": "flys chest.mp4",
    "videoUrl": "/videos/flys chest.mp4",
    "description": "Targeted strength and hypertrophy movement for Chest Stretch (Chest). Maintain strict posture, focus on mind-muscle connection, and adhere to recommended volume parameters.",
    "steps": [
      "Lie flat on a bench holding dumbbells above you with palms facing each other.",
      "With a slight bend in your elbows, open your arms wide in an arc.",
      "Feel the stretch in your chest at the bottom.",
      "Squeeze your chest muscles to bring the weights back up."
    ],
    "tips": [
      "Maintain continuous tension on Chest Stretch throughout each rep.",
      "Breathe out during the concentric effort and inhale during the eccentric phase.",
      "Prioritize strict form over loading too much weight."
    ],
    "mistakes": [
      "Using body momentum or swinging to move the weight.",
      "Restricting range of motion and failing to get a full stretch.",
      "Rushing repetitions and losing control of the eccentric tempo."
    ]
  },
  {
    "id": "c4",
    "slug": "cable-crossover",
    "name": "Cable Crossover",
    "category": "Chest",
    "target": "Chest Shape",
    "intensity": "Medium",
    "difficulty": "Intermediate",
    "sets": "3 Sets",
    "reps": "15 Reps",
    "rest": "60-90 sec",
    "calories": "80 kcal",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    "video": "chest cable fly.mp4",
    "videoUrl": "/videos/chest cable fly.mp4",
    "description": "Targeted strength and hypertrophy movement for Chest Shape (Chest). Maintain strict posture, focus on mind-muscle connection, and adhere to recommended volume parameters.",
    "steps": [
      "Set the cables to the high position and grab both handles.",
      "Step forward slightly and lean your torso into a slight angle.",
      "Bring your hands together in a downward arc in front of your waist.",
      "Slowly return to the start position under control."
    ],
    "tips": [
      "Maintain continuous tension on Chest Shape throughout each rep.",
      "Breathe out during the concentric effort and inhale during the eccentric phase.",
      "Prioritize strict form over loading too much weight."
    ],
    "mistakes": [
      "Using body momentum or swinging to move the weight.",
      "Restricting range of motion and failing to get a full stretch.",
      "Rushing repetitions and losing control of the eccentric tempo."
    ]
  },
  {
    "id": "c5",
    "slug": "dumbell-pull-over",
    "name": "Dumbell Pull Over",
    "category": "Chest",
    "target": "Chest",
    "intensity": "High",
    "difficulty": "Advanced",
    "sets": "3 Sets",
    "reps": "Failure",
    "rest": "60-90 sec",
    "calories": "80 kcal",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    "video": "chest tri.mp4",
    "videoUrl": "/videos/chest tri.mp4",
    "description": "Targeted strength and hypertrophy movement for Chest (Chest). Maintain strict posture, focus on mind-muscle connection, and adhere to recommended volume parameters.",
    "steps": [
      "Grip the dip bars and lift your body up.",
      "Lean your torso forward slightly to shift focus onto your lower chest.",
      "Lower yourself down until your elbows are at a 90-degree angle.",
      "Drive yourself up to the starting position without locking out your elbows."
    ],
    "tips": [
      "Maintain continuous tension on Chest throughout each rep.",
      "Breathe out during the concentric effort and inhale during the eccentric phase.",
      "Prioritize strict form over loading too much weight."
    ],
    "mistakes": [
      "Using body momentum or swinging to move the weight.",
      "Restricting range of motion and failing to get a full stretch.",
      "Rushing repetitions and losing control of the eccentric tempo."
    ]
  },
  {
    "id": "c6",
    "slug": "dips",
    "name": "Dips",
    "category": "Chest",
    "target": "Lower Chest",
    "intensity": "High",
    "difficulty": "Advanced",
    "sets": "3 Sets",
    "reps": "10-12 Reps",
    "rest": "60-90 sec",
    "calories": "80 kcal",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    "video": "dips chest.mp4",
    "videoUrl": "/videos/dips chest.mp4",
    "description": "Targeted strength and hypertrophy movement for Lower Chest (Chest). Maintain strict posture, focus on mind-muscle connection, and adhere to recommended volume parameters.",
    "steps": [
      "Secure your legs under the pads of a decline bench and lie back.",
      "Grip the barbell and unrack it directly over your lower chest.",
      "Lower the bar smoothly until it touches your lower sternum.",
      "Press the weight straight up to complete the rep."
    ],
    "tips": [
      "Maintain continuous tension on Lower Chest throughout each rep.",
      "Breathe out during the concentric effort and inhale during the eccentric phase.",
      "Prioritize strict form over loading too much weight."
    ],
    "mistakes": [
      "Using body momentum or swinging to move the weight.",
      "Restricting range of motion and failing to get a full stretch.",
      "Rushing repetitions and losing control of the eccentric tempo."
    ]
  },
  {
    "id": "b1",
    "slug": "pull-ups",
    "name": "Pull Ups",
    "category": "Back",
    "target": "Lats",
    "intensity": "High",
    "difficulty": "Advanced",
    "sets": "4 Sets",
    "reps": "Failure",
    "rest": "60-90 sec",
    "calories": "80 kcal",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    "video": "pull ups.mp4",
    "videoUrl": "/videos/pull ups.mp4",
    "description": "Targeted strength and hypertrophy movement for Lats (Back). Maintain strict posture, focus on mind-muscle connection, and adhere to recommended volume parameters.",
    "steps": [
      "Grip the pull-up bar with hands wider than shoulder-width apart.",
      "Hang fully, then pull your chest up towards the bar by driving your elbows down.",
      "Squeeze your lats at the peak of the movement.",
      "Lower yourself down slowly to full extension."
    ],
    "tips": [
      "Maintain continuous tension on Lats throughout each rep.",
      "Breathe out during the concentric effort and inhale during the eccentric phase.",
      "Prioritize strict form over loading too much weight."
    ],
    "mistakes": [
      "Using body momentum or swinging to move the weight.",
      "Restricting range of motion and failing to get a full stretch.",
      "Rushing repetitions and losing control of the eccentric tempo."
    ]
  },
  {
    "id": "b2",
    "slug": "lat-pulldown",
    "name": "Lat Pulldown",
    "category": "Back",
    "target": "Back Width",
    "intensity": "Medium",
    "difficulty": "Intermediate",
    "sets": "4 Sets",
    "reps": "12 Reps",
    "rest": "60-90 sec",
    "calories": "80 kcal",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    "video": "lat  pull down.mp4",
    "videoUrl": "/videos/lat  pull down.mp4",
    "description": "Targeted strength and hypertrophy movement for Back Width (Back). Maintain strict posture, focus on mind-muscle connection, and adhere to recommended volume parameters.",
    "steps": [
      "Sit at a pulldown station and adjust the knee pad.",
      "Pull the bar down toward your upper chest while leaning back very slightly.",
      "Focus on pulling with your elbows rather than your hands.",
      "Slowly let the bar return to the top position."
    ],
    "tips": [
      "Maintain continuous tension on Back Width throughout each rep.",
      "Breathe out during the concentric effort and inhale during the eccentric phase.",
      "Prioritize strict form over loading too much weight."
    ],
    "mistakes": [
      "Using body momentum or swinging to move the weight.",
      "Restricting range of motion and failing to get a full stretch.",
      "Rushing repetitions and losing control of the eccentric tempo."
    ]
  },
  {
    "id": "b4",
    "slug": "deadlift",
    "name": "Deadlift",
    "category": "Back",
    "target": "Full Back",
    "intensity": "Extreme",
    "difficulty": "Advanced",
    "sets": "5 Sets",
    "reps": "5 Reps",
    "rest": "60-90 sec",
    "calories": "80 kcal",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    "video": "deadlift.mp4",
    "videoUrl": "/videos/deadlift.mp4",
    "description": "Targeted strength and hypertrophy movement for Full Back (Back). Maintain strict posture, focus on mind-muscle connection, and adhere to recommended volume parameters.",
    "steps": [
      "Stand with feet hip-width apart, shins close to the barbell.",
      "Bend down with a flat spine to grip the bar.",
      "Drive through your legs to lift the weight while keeping the bar close to your shins.",
      "Lock out your hips and knees at the top before reversing the motion safely."
    ],
    "tips": [
      "Maintain continuous tension on Full Back throughout each rep.",
      "Breathe out during the concentric effort and inhale during the eccentric phase.",
      "Prioritize strict form over loading too much weight."
    ],
    "mistakes": [
      "Using body momentum or swinging to move the weight.",
      "Restricting range of motion and failing to get a full stretch.",
      "Rushing repetitions and losing control of the eccentric tempo."
    ]
  },
  {
    "id": "b5",
    "slug": "seated-cable-row",
    "name": "Seated Cable Row",
    "category": "Back",
    "target": "Mid Back",
    "intensity": "Medium",
    "difficulty": "Intermediate",
    "sets": "3 Sets",
    "reps": "12 Reps",
    "rest": "60-90 sec",
    "calories": "80 kcal",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    "video": "cable row.mp4",
    "videoUrl": "/videos/cable row.mp4",
    "description": "Targeted strength and hypertrophy movement for Mid Back (Back). Maintain strict posture, focus on mind-muscle connection, and adhere to recommended volume parameters.",
    "steps": [
      "Sit with your feet supported on the platform and hands gripping the handle attachment.",
      "Pull the handle back toward your lower ribs while keeping your spine straight.",
      "Squeeze your shoulder blades together.",
      "Extend your arms back fully without slouching forward."
    ],
    "tips": [
      "Maintain continuous tension on Mid Back throughout each rep.",
      "Breathe out during the concentric effort and inhale during the eccentric phase.",
      "Prioritize strict form over loading too much weight."
    ],
    "mistakes": [
      "Using body momentum or swinging to move the weight.",
      "Restricting range of motion and failing to get a full stretch.",
      "Rushing repetitions and losing control of the eccentric tempo."
    ]
  },
  {
    "id": "b6",
    "slug": "hyperextensions",
    "name": "Hyperextensions",
    "category": "Back",
    "target": "Lower Back",
    "intensity": "Low",
    "difficulty": "Beginner",
    "sets": "3 Sets",
    "reps": "15 Reps",
    "rest": "60-90 sec",
    "calories": "80 kcal",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    "video": "extention.mp4",
    "videoUrl": "/videos/extention.mp4",
    "description": "Targeted strength and hypertrophy movement for Lower Back (Back). Maintain strict posture, focus on mind-muscle connection, and adhere to recommended volume parameters.",
    "steps": [
      "Position your hips securely on the extension bench pad.",
      "Lower your upper body slowly by hinging at the waist.",
      "Engage your lower back and glutes to raise your torso back inline with your legs.",
      "Avoid hyperextending or arching your spine past a straight line."
    ],
    "tips": [
      "Maintain continuous tension on Lower Back throughout each rep.",
      "Breathe out during the concentric effort and inhale during the eccentric phase.",
      "Prioritize strict form over loading too much weight."
    ],
    "mistakes": [
      "Using body momentum or swinging to move the weight.",
      "Restricting range of motion and failing to get a full stretch.",
      "Rushing repetitions and losing control of the eccentric tempo."
    ]
  },
  {
    "id": "s1",
    "slug": "overhead-barbell-press",
    "name": "Overhead Barbell Press",
    "category": "Shoulders",
    "target": "Anterior Deltoid",
    "intensity": "High",
    "difficulty": "Advanced",
    "sets": "4 Sets",
    "reps": "8-10 Reps",
    "rest": "60-90 sec",
    "calories": "80 kcal",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    "video": "shoulder press.mp4",
    "videoUrl": "/videos/shoulder press.mp4",
    "description": "Targeted strength and hypertrophy movement for Anterior Deltoid (Shoulders). Maintain strict posture, focus on mind-muscle connection, and adhere to recommended volume parameters.",
    "steps": [
      "Rest the barbell on your front shoulders with hands just outside shoulder-width.",
      "Brace your core and press the bar straight overhead.",
      "Tilt your head slightly back as the bar passes, then bring it forward once locked out.",
      "Lower the bar back down to your upper chest safely."
    ],
    "tips": [
      "Maintain continuous tension on Anterior Deltoid throughout each rep.",
      "Breathe out during the concentric effort and inhale during the eccentric phase.",
      "Prioritize strict form over loading too much weight."
    ],
    "mistakes": [
      "Using body momentum or swinging to move the weight.",
      "Restricting range of motion and failing to get a full stretch.",
      "Rushing repetitions and losing control of the eccentric tempo."
    ]
  },
  {
    "id": "s2",
    "slug": "front-delt-upper-traps",
    "name": "front delt & upper traps",
    "category": "Shoulders",
    "target": "Lateral Deltoid",
    "intensity": "Medium",
    "difficulty": "Intermediate",
    "sets": "4 Sets",
    "reps": "15 Reps",
    "rest": "60-90 sec",
    "calories": "80 kcal",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    "video": "lat row show.mp4",
    "videoUrl": "/videos/lat row show.mp4",
    "description": "Targeted strength and hypertrophy movement for Lateral Deltoid (Shoulders). Maintain strict posture, focus on mind-muscle connection, and adhere to recommended volume parameters.",
    "steps": [
      "Stand straight holding dumbbells at your sides.",
      "Raise your arms out to the sides with a tiny, soft bend in your elbows.",
      "Lift until your arms are parallel to the floor, leading with your pinkies.",
      "Slowly lower them back down without resting at the bottom."
    ],
    "tips": [
      "Maintain continuous tension on Lateral Deltoid throughout each rep.",
      "Breathe out during the concentric effort and inhale during the eccentric phase.",
      "Prioritize strict form over loading too much weight."
    ],
    "mistakes": [
      "Using body momentum or swinging to move the weight.",
      "Restricting range of motion and failing to get a full stretch.",
      "Rushing repetitions and losing control of the eccentric tempo."
    ]
  },
  {
    "id": "s3",
    "slug": "cable-face-pull",
    "name": "cable face pull",
    "category": "Shoulders",
    "target": "Posterior Deltoid",
    "intensity": "Medium",
    "difficulty": "Intermediate",
    "sets": "3 Sets",
    "reps": "15 Reps",
    "rest": "60-90 sec",
    "calories": "80 kcal",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    "video": "face shoulder.mp4",
    "videoUrl": "/videos/face shoulder.mp4",
    "description": "Targeted strength and hypertrophy movement for Posterior Deltoid (Shoulders). Maintain strict posture, focus on mind-muscle connection, and adhere to recommended volume parameters.",
    "steps": [
      "Hinge forward at the waist keeping your spine straight and knees unlocked.",
      "Let dumbbells hang down below your chest.",
      "Raise your arms outwards to your sides using your rear shoulders.",
      "Lower the weights back down slowly, resisting gravity."
    ],
    "tips": [
      "Maintain continuous tension on Posterior Deltoid throughout each rep.",
      "Breathe out during the concentric effort and inhale during the eccentric phase.",
      "Prioritize strict form over loading too much weight."
    ],
    "mistakes": [
      "Using body momentum or swinging to move the weight.",
      "Restricting range of motion and failing to get a full stretch.",
      "Rushing repetitions and losing control of the eccentric tempo."
    ]
  },
  {
    "id": "s4",
    "slug": "dumbbell-front-raise",
    "name": "Dumbbell Front Raise",
    "category": "Shoulders",
    "target": "Front Deltoid",
    "intensity": "Low",
    "difficulty": "Beginner",
    "sets": "3 Sets",
    "reps": "12 Reps",
    "rest": "60-90 sec",
    "calories": "80 kcal",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    "video": "dumbell raise.mp4",
    "videoUrl": "/videos/dumbell raise.mp4",
    "description": "Targeted strength and hypertrophy movement for Front Deltoid (Shoulders). Maintain strict posture, focus on mind-muscle connection, and adhere to recommended volume parameters.",
    "steps": [
      "Stand straight with dumbbells resting on the front of your thighs.",
      "Raise one arm directly in front of you until it reaches eye level.",
      "Lower it under control, then immediately repeat the step on the other arm."
    ],
    "tips": [
      "Maintain continuous tension on Front Deltoid throughout each rep.",
      "Breathe out during the concentric effort and inhale during the eccentric phase.",
      "Prioritize strict form over loading too much weight."
    ],
    "mistakes": [
      "Using body momentum or swinging to move the weight.",
      "Restricting range of motion and failing to get a full stretch.",
      "Rushing repetitions and losing control of the eccentric tempo."
    ]
  },
  {
    "id": "s5",
    "slug": "arnold-press",
    "name": "Arnold Press",
    "category": "Shoulders",
    "target": "Full Shoulder",
    "intensity": "High",
    "difficulty": "Advanced",
    "sets": "3 Sets",
    "reps": "10-12 Reps",
    "rest": "60-90 sec",
    "calories": "80 kcal",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    "video": "dumbell press.mp4",
    "videoUrl": "/videos/dumbell press.mp4",
    "description": "Targeted strength and hypertrophy movement for Full Shoulder (Shoulders). Maintain strict posture, focus on mind-muscle connection, and adhere to recommended volume parameters.",
    "steps": [
      "Hold dumbbells at upper chest level with your palms facing your chest.",
      "As you press the weights overhead, rotate your wrists outwards.",
      "At the peak, your palms should face completely forward.",
      "Rotate your palms back inside as you lower the weights back down."
    ],
    "tips": [
      "Maintain continuous tension on Full Shoulder throughout each rep.",
      "Breathe out during the concentric effort and inhale during the eccentric phase.",
      "Prioritize strict form over loading too much weight."
    ],
    "mistakes": [
      "Using body momentum or swinging to move the weight.",
      "Restricting range of motion and failing to get a full stretch.",
      "Rushing repetitions and losing control of the eccentric tempo."
    ]
  },
  {
    "id": "s6",
    "slug": "dumbbell-shrugs",
    "name": "Dumbbell Shrugs",
    "category": "Shoulders",
    "target": "Upper Traps",
    "intensity": "Medium",
    "difficulty": "Intermediate",
    "sets": "4 Sets",
    "reps": "12-15 Reps",
    "rest": "60-90 sec",
    "calories": "80 kcal",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    "video": "traps.mp4",
    "videoUrl": "/videos/traps.mp4",
    "description": "Targeted strength and hypertrophy movement for Upper Traps (Shoulders). Maintain strict posture, focus on mind-muscle connection, and adhere to recommended volume parameters.",
    "steps": [
      "Stand with heavy dumbbells resting directly at your sides.",
      "Elevate your shoulders up toward your ears as high as possible without rolling them.",
      "Squeeze the trap muscles at the peak for a full second.",
      "Lower your shoulders back down slowly."
    ],
    "tips": [
      "Maintain continuous tension on Upper Traps throughout each rep.",
      "Breathe out during the concentric effort and inhale during the eccentric phase.",
      "Prioritize strict form over loading too much weight."
    ],
    "mistakes": [
      "Using body momentum or swinging to move the weight.",
      "Restricting range of motion and failing to get a full stretch.",
      "Rushing repetitions and losing control of the eccentric tempo."
    ]
  },
  {
    "id": "a1",
    "slug": "dumbell-bicep-curl",
    "name": "dumbell Bicep Curl",
    "category": "Arms",
    "target": "Bicep Brachii",
    "intensity": "Medium",
    "difficulty": "Intermediate",
    "sets": "4 Sets",
    "reps": "10-12 Reps",
    "rest": "60-90 sec",
    "calories": "80 kcal",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    "video": "bicep2.mp4",
    "videoUrl": "/videos/bicep2.mp4",
    "description": "Targeted strength and hypertrophy movement for Bicep Brachii (Arms). Maintain strict posture, focus on mind-muscle connection, and adhere to recommended volume parameters.",
    "steps": [
      "Stand straight holding a barbell with an underhand grip.",
      "Keep your elbows tucked into your sides.",
      "Curl the bar upward toward your shoulders by flexing your biceps.",
      "Lower the bar slowly back down to full arm extension."
    ],
    "tips": [
      "Maintain continuous tension on Bicep Brachii throughout each rep.",
      "Breathe out during the concentric effort and inhale during the eccentric phase.",
      "Prioritize strict form over loading too much weight."
    ],
    "mistakes": [
      "Using body momentum or swinging to move the weight.",
      "Restricting range of motion and failing to get a full stretch.",
      "Rushing repetitions and losing control of the eccentric tempo."
    ]
  },
  {
    "id": "a2",
    "slug": "rope-tricep-pushdowns",
    "name": "rope Tricep Pushdowns",
    "category": "Arms",
    "target": "Tricep Triceps",
    "intensity": "Medium",
    "difficulty": "Intermediate",
    "sets": "4 Sets",
    "reps": "12-15 Reps",
    "rest": "60-90 sec",
    "calories": "80 kcal",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    "video": "tricep3.mp4",
    "videoUrl": "/videos/tricep3.mp4",
    "description": "Targeted strength and hypertrophy movement for Tricep Triceps (Arms). Maintain strict posture, focus on mind-muscle connection, and adhere to recommended volume parameters.",
    "steps": [
      "Face a cable machine and grip the rope attachment firmly.",
      "Pin your elbows firmly against the sides of your torso.",
      "Extend your arms straight downward, flaring the rope out at the bottom.",
      "Return slowly back to the starting angle under control."
    ],
    "tips": [
      "Maintain continuous tension on Tricep Triceps throughout each rep.",
      "Breathe out during the concentric effort and inhale during the eccentric phase.",
      "Prioritize strict form over loading too much weight."
    ],
    "mistakes": [
      "Using body momentum or swinging to move the weight.",
      "Restricting range of motion and failing to get a full stretch.",
      "Rushing repetitions and losing control of the eccentric tempo."
    ]
  },
  {
    "id": "a3",
    "slug": "knee-biceps",
    "name": "knee biceps",
    "category": "Arms",
    "target": "Brachialis Thickness",
    "intensity": "Medium",
    "difficulty": "Intermediate",
    "sets": "3 Sets",
    "reps": "12 Reps",
    "rest": "60-90 sec",
    "calories": "80 kcal",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    "video": "bicep3.mp4",
    "videoUrl": "/videos/bicep3.mp4",
    "description": "Targeted strength and hypertrophy movement for Brachialis Thickness (Arms). Maintain strict posture, focus on mind-muscle connection, and adhere to recommended volume parameters.",
    "steps": [
      "Stand up straight holding dumbbells with your palms facing each other (neutral grip).",
      "Curl the weights upwards without twisting your wrists.",
      "Squeeze your outer arms at the top.",
      "Lower the dumbbells slowly back down."
    ],
    "tips": [
      "Maintain continuous tension on Brachialis Thickness throughout each rep.",
      "Breathe out during the concentric effort and inhale during the eccentric phase.",
      "Prioritize strict form over loading too much weight."
    ],
    "mistakes": [
      "Using body momentum or swinging to move the weight.",
      "Restricting range of motion and failing to get a full stretch.",
      "Rushing repetitions and losing control of the eccentric tempo."
    ]
  },
  {
    "id": "a4",
    "slug": "kick-back",
    "name": "kick back",
    "category": "Arms",
    "target": "Tricep Long Head",
    "intensity": "High",
    "difficulty": "Advanced",
    "sets": "3 Sets",
    "reps": "10-12 Reps",
    "rest": "60-90 sec",
    "calories": "80 kcal",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    "video": "tricep2.mp4",
    "videoUrl": "/videos/tricep2.mp4",
    "description": "Targeted strength and hypertrophy movement for Tricep Long Head (Arms). Maintain strict posture, focus on mind-muscle connection, and adhere to recommended volume parameters.",
    "steps": [
      "Lie flat on a bench holding an EZ bar over your chest.",
      "Hinge only at your elbows to lower the bar toward your forehead.",
      "Keep your upper arm locked vertically throughout.",
      "Use your triceps to press the bar back up to the ceiling."
    ],
    "tips": [
      "Maintain continuous tension on Tricep Long Head throughout each rep.",
      "Breathe out during the concentric effort and inhale during the eccentric phase.",
      "Prioritize strict form over loading too much weight."
    ],
    "mistakes": [
      "Using body momentum or swinging to move the weight.",
      "Restricting range of motion and failing to get a full stretch.",
      "Rushing repetitions and losing control of the eccentric tempo."
    ]
  },
  {
    "id": "a5",
    "slug": "incline-dumbbell-curl",
    "name": "Incline Dumbbell Curl",
    "category": "Arms",
    "target": "Bicep Long Head",
    "intensity": "Medium",
    "difficulty": "Intermediate",
    "sets": "3 Sets",
    "reps": "12 Reps",
    "rest": "60-90 sec",
    "calories": "80 kcal",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    "video": "bicep1.mp4",
    "videoUrl": "/videos/bicep1.mp4",
    "description": "Targeted strength and hypertrophy movement for Bicep Long Head (Arms). Maintain strict posture, focus on mind-muscle connection, and adhere to recommended volume parameters.",
    "steps": [
      "Sit back on an incline bench allowing your arms to hang completely straight down.",
      "Keep your elbows pulled back.",
      "Curl the weights upward while turning your palms to face the ceiling.",
      "Lower the weight slowly to feel a deep stretch at the bottom."
    ],
    "tips": [
      "Maintain continuous tension on Bicep Long Head throughout each rep.",
      "Breathe out during the concentric effort and inhale during the eccentric phase.",
      "Prioritize strict form over loading too much weight."
    ],
    "mistakes": [
      "Using body momentum or swinging to move the weight.",
      "Restricting range of motion and failing to get a full stretch.",
      "Rushing repetitions and losing control of the eccentric tempo."
    ]
  },
  {
    "id": "a6",
    "slug": "overhead-tricep-extension",
    "name": "Overhead Tricep Extension",
    "category": "Arms",
    "target": "Tricep Stretch",
    "intensity": "Medium",
    "difficulty": "Intermediate",
    "sets": "3 Sets",
    "reps": "12-15 Reps",
    "rest": "60-90 sec",
    "calories": "80 kcal",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    "video": "triep1.mp4",
    "videoUrl": "/videos/triep1.mp4",
    "description": "Targeted strength and hypertrophy movement for Tricep Stretch (Arms). Maintain strict posture, focus on mind-muscle connection, and adhere to recommended volume parameters.",
    "steps": [
      "Sit or stand, holding a single heavy dumbbell overhead with both hands forming a diamond grip.",
      "Lower the weight down behind your neck by bending your elbows.",
      "Keep your elbows tucked inward near your head.",
      "Press the weight straight back up to full extension."
    ],
    "tips": [
      "Maintain continuous tension on Tricep Stretch throughout each rep.",
      "Breathe out during the concentric effort and inhale during the eccentric phase.",
      "Prioritize strict form over loading too much weight."
    ],
    "mistakes": [
      "Using body momentum or swinging to move the weight.",
      "Restricting range of motion and failing to get a full stretch.",
      "Rushing repetitions and losing control of the eccentric tempo."
    ]
  },
  {
    "id": "l1",
    "slug": "squat",
    "name": "Squat",
    "category": "Legs",
    "target": "Leg Strength",
    "intensity": "High",
    "difficulty": "Advanced",
    "sets": "5 Sets",
    "reps": "8 Reps",
    "rest": "60-90 sec",
    "calories": "80 kcal",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    "video": "leg2.mp4",
    "videoUrl": "/videos/leg2.mp4",
    "description": "Targeted strength and hypertrophy movement for Leg Strength (Legs). Maintain strict posture, focus on mind-muscle connection, and adhere to recommended volume parameters.",
    "steps": [
      "Rest the barbell on your upper back traps and set your feet shoulder-width apart.",
      "Sit down into a deep squat by bending your hips and knees.",
      "Keep your back flat and drive your knees outward.",
      "Push through your heels explosively to stand back up."
    ],
    "tips": [
      "Maintain continuous tension on Leg Strength throughout each rep.",
      "Breathe out during the concentric effort and inhale during the eccentric phase.",
      "Prioritize strict form over loading too much weight."
    ],
    "mistakes": [
      "Using body momentum or swinging to move the weight.",
      "Restricting range of motion and failing to get a full stretch.",
      "Rushing repetitions and losing control of the eccentric tempo."
    ]
  },
  {
    "id": "l2",
    "slug": "leg-press",
    "name": "Leg Press",
    "category": "Legs",
    "target": "Quads Focus",
    "intensity": "High",
    "difficulty": "Advanced",
    "sets": "4 Sets",
    "reps": "12 Reps",
    "rest": "60-90 sec",
    "calories": "80 kcal",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    "video": "leg3.mp4",
    "videoUrl": "/videos/leg3.mp4",
    "description": "Targeted strength and hypertrophy movement for Quads Focus (Legs). Maintain strict posture, focus on mind-muscle connection, and adhere to recommended volume parameters.",
    "steps": [
      "Sit comfortably in the leg press machine and place your feet mid-width on the sled.",
      "Lower the heavy sled slowly down until your knees reach a 90-degree angle.",
      "Press the platform back up forcefully using your quads.",
      "Do not lock out your knees at the top."
    ],
    "tips": [
      "Maintain continuous tension on Quads Focus throughout each rep.",
      "Breathe out during the concentric effort and inhale during the eccentric phase.",
      "Prioritize strict form over loading too much weight."
    ],
    "mistakes": [
      "Using body momentum or swinging to move the weight.",
      "Restricting range of motion and failing to get a full stretch.",
      "Rushing repetitions and losing control of the eccentric tempo."
    ]
  },
  {
    "id": "l3",
    "slug": "squad-in-different-variation",
    "name": "squad in different variation",
    "category": "Legs",
    "target": "Leg Balance",
    "intensity": "Medium",
    "difficulty": "Intermediate",
    "sets": "3 Sets",
    "reps": "20 Steps",
    "rest": "60-90 sec",
    "calories": "80 kcal",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    "video": "leg1.mp4",
    "videoUrl": "/videos/leg1.mp4",
    "description": "Targeted strength and hypertrophy movement for Leg Balance (Legs). Maintain strict posture, focus on mind-muscle connection, and adhere to recommended volume parameters.",
    "steps": [
      "Take a large controlled step forward with one leg.",
      "Lower your hips until your back knee is just an inch off the floor.",
      "Ensure your front knee does not slide past your toes.",
      "Drive through your front heel to step forward into the next step."
    ],
    "tips": [
      "Maintain continuous tension on Leg Balance throughout each rep.",
      "Breathe out during the concentric effort and inhale during the eccentric phase.",
      "Prioritize strict form over loading too much weight."
    ],
    "mistakes": [
      "Using body momentum or swinging to move the weight.",
      "Restricting range of motion and failing to get a full stretch.",
      "Rushing repetitions and losing control of the eccentric tempo."
    ]
  },
  {
    "id": "l4",
    "slug": "sumo-squad",
    "name": "sumo squad",
    "category": "Legs",
    "target": "Hamstrings & Glutes",
    "intensity": "High",
    "difficulty": "Advanced",
    "sets": "4 Sets",
    "reps": "10 Reps",
    "rest": "60-90 sec",
    "calories": "80 kcal",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    "video": "leg4.mp4",
    "videoUrl": "/videos/leg4.mp4",
    "description": "Targeted strength and hypertrophy movement for Hamstrings & Glutes (Legs). Maintain strict posture, focus on mind-muscle connection, and adhere to recommended volume parameters.",
    "steps": [
      "Stand straight holding a barbell at your thighs.",
      "Push your hips far back while keeping your spine neutral and legs nearly straight.",
      "Lower the bar down along your shins until you feel a deep hamstring stretch.",
      "Drive your hips forward to snap back to the start position."
    ],
    "tips": [
      "Maintain continuous tension on Hamstrings & Glutes throughout each rep.",
      "Breathe out during the concentric effort and inhale during the eccentric phase.",
      "Prioritize strict form over loading too much weight."
    ],
    "mistakes": [
      "Using body momentum or swinging to move the weight.",
      "Restricting range of motion and failing to get a full stretch.",
      "Rushing repetitions and losing control of the eccentric tempo."
    ]
  },
  {
    "id": "l5",
    "slug": "leg-extensions",
    "name": "Leg Extensions",
    "category": "Legs",
    "target": "Isolated Quads",
    "intensity": "Low",
    "difficulty": "Beginner",
    "sets": "3 Sets",
    "reps": "15 Reps",
    "rest": "60-90 sec",
    "calories": "80 kcal",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    "video": "leg5.mp4",
    "videoUrl": "/videos/leg5.mp4",
    "description": "Targeted strength and hypertrophy movement for Isolated Quads (Legs). Maintain strict posture, focus on mind-muscle connection, and adhere to recommended volume parameters.",
    "steps": [
      "Sit back in the extension machine with the roller pad resting on your lower shins.",
      "Grip the seat handles and extend your legs fully until straight.",
      "Squeeze your quadriceps hard at the peak for a second.",
      "Lower your legs slowly back down under complete resistance."
    ],
    "tips": [
      "Maintain continuous tension on Isolated Quads throughout each rep.",
      "Breathe out during the concentric effort and inhale during the eccentric phase.",
      "Prioritize strict form over loading too much weight."
    ],
    "mistakes": [
      "Using body momentum or swinging to move the weight.",
      "Restricting range of motion and failing to get a full stretch.",
      "Rushing repetitions and losing control of the eccentric tempo."
    ]
  },
  {
    "id": "l6",
    "slug": "dead-lift",
    "name": "dead lift",
    "category": "Legs",
    "target": "Calf Muscles",
    "intensity": "Low",
    "difficulty": "Beginner",
    "sets": "4 Sets",
    "reps": "20 Reps",
    "rest": "60-90 sec",
    "calories": "80 kcal",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    "video": "deadlift.mp4",
    "videoUrl": "/videos/deadlift.mp4",
    "description": "Targeted strength and hypertrophy movement for Calf Muscles (Legs). Maintain strict posture, focus on mind-muscle connection, and adhere to recommended volume parameters.",
    "steps": [
      "Sit in the machine and place the knee pad comfortably across your lower thighs.",
      "Place the balls of your feet on the lower platform edge.",
      "Drop your heels down as far as possible for a full stretch.",
      "Drive up through your toes to contract your calf muscles completely."
    ],
    "tips": [
      "Maintain continuous tension on Calf Muscles throughout each rep.",
      "Breathe out during the concentric effort and inhale during the eccentric phase.",
      "Prioritize strict form over loading too much weight."
    ],
    "mistakes": [
      "Using body momentum or swinging to move the weight.",
      "Restricting range of motion and failing to get a full stretch.",
      "Rushing repetitions and losing control of the eccentric tempo."
    ]
  },
  {
    "id": "ab1",
    "slug": "hanging-knee-raises",
    "name": "Hanging Knee Raises",
    "category": "Abs",
    "target": "Lower Abs",
    "intensity": "High",
    "difficulty": "Advanced",
    "sets": "4 Sets",
    "reps": "15 Reps",
    "rest": "60-90 sec",
    "calories": "80 kcal",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    "video": "abs1.mp4",
    "videoUrl": "/videos/abs1.mp4",
    "description": "Targeted strength and hypertrophy movement for Lower Abs (Abs). Maintain strict posture, focus on mind-muscle connection, and adhere to recommended volume parameters.",
    "steps": [
      "Hang completely straight from a pull-up bar.",
      "Keep your torso steady to prevent excessive body swinging.",
      "Raise your knees up toward your chest by rolling your pelvis upward.",
      "Lower your legs slowly back down to return to a full hang."
    ],
    "tips": [
      "Maintain continuous tension on Lower Abs throughout each rep.",
      "Breathe out during the concentric effort and inhale during the eccentric phase.",
      "Prioritize strict form over loading too much weight."
    ],
    "mistakes": [
      "Using body momentum or swinging to move the weight.",
      "Restricting range of motion and failing to get a full stretch.",
      "Rushing repetitions and losing control of the eccentric tempo."
    ]
  },
  {
    "id": "ab2",
    "slug": "ab-wheel-rollout",
    "name": "Ab Wheel Rollout",
    "category": "Abs",
    "target": "Core Shield",
    "intensity": "Extreme",
    "difficulty": "Advanced",
    "sets": "3 Sets",
    "reps": "10 Reps",
    "rest": "60-90 sec",
    "calories": "80 kcal",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    "video": "abs2.mp4",
    "videoUrl": "/videos/abs2.mp4",
    "description": "Targeted strength and hypertrophy movement for Core Shield (Abs). Maintain strict posture, focus on mind-muscle connection, and adhere to recommended volume parameters.",
    "steps": [
      "Kneel on a soft pad and place the wheel on the floor directly beneath your chest.",
      "Roll the wheel out forward, extending your body into a straight alignment.",
      "Keep your lower core tightly braced without sagging your lower back.",
      "Pull yourself back to the knees position using your abs."
    ],
    "tips": [
      "Maintain continuous tension on Core Shield throughout each rep.",
      "Breathe out during the concentric effort and inhale during the eccentric phase.",
      "Prioritize strict form over loading too much weight."
    ],
    "mistakes": [
      "Using body momentum or swinging to move the weight.",
      "Restricting range of motion and failing to get a full stretch.",
      "Rushing repetitions and losing control of the eccentric tempo."
    ]
  },
  {
    "id": "ab3",
    "slug": "cable-crunches",
    "name": "Cable Crunches",
    "category": "Abs",
    "target": "Upper Abs",
    "intensity": "Medium",
    "difficulty": "Intermediate",
    "sets": "3 Sets",
    "reps": "15 Reps",
    "rest": "60-90 sec",
    "calories": "80 kcal",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    "video": "abs3.mp4",
    "videoUrl": "/videos/abs3.mp4",
    "description": "Targeted strength and hypertrophy movement for Upper Abs (Abs). Maintain strict posture, focus on mind-muscle connection, and adhere to recommended volume parameters.",
    "steps": [
      "Kneel below a cable pulley holding the rope attachment next to your ears.",
      "Flex your hips slightly and drop your head down.",
      "Crunch downward, bringing your elbows towards your thighs by flexing your spine.",
      "Slowly return back up to the top stretching position."
    ],
    "tips": [
      "Maintain continuous tension on Upper Abs throughout each rep.",
      "Breathe out during the concentric effort and inhale during the eccentric phase.",
      "Prioritize strict form over loading too much weight."
    ],
    "mistakes": [
      "Using body momentum or swinging to move the weight.",
      "Restricting range of motion and failing to get a full stretch.",
      "Rushing repetitions and losing control of the eccentric tempo."
    ]
  },
  {
    "id": "ab4",
    "slug": "russian-twists",
    "name": "Russian Twists",
    "category": "Abs",
    "target": "Obliques",
    "intensity": "Low",
    "difficulty": "Beginner",
    "sets": "3 Sets",
    "reps": "20 Reps",
    "rest": "60-90 sec",
    "calories": "80 kcal",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    "video": "abs4.mp4",
    "videoUrl": "/videos/abs4.mp4",
    "description": "Targeted strength and hypertrophy movement for Obliques (Abs). Maintain strict posture, focus on mind-muscle connection, and adhere to recommended volume parameters.",
    "steps": [
      "Sit on the floor with knees bent, tilting your torso back into a V-shape.",
      "Lift your feet off the floor slightly to balance.",
      "Twist your shoulders completely from side to side, tapping the weight or your hands on the ground.",
      "Keep your core engaged throughout."
    ],
    "tips": [
      "Maintain continuous tension on Obliques throughout each rep.",
      "Breathe out during the concentric effort and inhale during the eccentric phase.",
      "Prioritize strict form over loading too much weight."
    ],
    "mistakes": [
      "Using body momentum or swinging to move the weight.",
      "Restricting range of motion and failing to get a full stretch.",
      "Rushing repetitions and losing control of the eccentric tempo."
    ]
  },
  {
    "id": "ab5",
    "slug": "plank-hold",
    "name": "Plank Hold",
    "category": "Abs",
    "target": "Transverse Core",
    "intensity": "Medium",
    "difficulty": "Intermediate",
    "sets": "3 Sets",
    "reps": "60 Seconds",
    "rest": "60-90 sec",
    "calories": "80 kcal",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    "video": "abs5.mp4",
    "videoUrl": "/videos/abs5.mp4",
    "description": "Targeted strength and hypertrophy movement for Transverse Core (Abs). Maintain strict posture, focus on mind-muscle connection, and adhere to recommended volume parameters.",
    "steps": [
      "Support your body weight entirely on your forearms and toes.",
      "Keep your torso perfectly straight like a tabletop.",
      "Squeeze your glutes, quads, and abdominal wall tightly.",
      "Hold this static layout cleanly without letting your hips drop down."
    ],
    "tips": [
      "Maintain continuous tension on Transverse Core throughout each rep.",
      "Breathe out during the concentric effort and inhale during the eccentric phase.",
      "Prioritize strict form over loading too much weight."
    ],
    "mistakes": [
      "Using body momentum or swinging to move the weight.",
      "Restricting range of motion and failing to get a full stretch.",
      "Rushing repetitions and losing control of the eccentric tempo."
    ]
  },
  {
    "id": "ab6",
    "slug": "bicycle-crunches",
    "name": "Bicycle Crunches",
    "category": "Abs",
    "target": "Complete Core",
    "intensity": "Medium",
    "difficulty": "Intermediate",
    "sets": "3 Sets",
    "reps": "20 Reps",
    "rest": "60-90 sec",
    "calories": "80 kcal",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    "video": "abs6.mp4",
    "videoUrl": "/videos/abs6.mp4",
    "description": "Targeted strength and hypertrophy movement for Complete Core (Abs). Maintain strict posture, focus on mind-muscle connection, and adhere to recommended volume parameters.",
    "steps": [
      "Lie flat on your back and place your fingers gently behind your head.",
      "Lift your shoulder blades off the floor.",
      "Alternate driving your elbow across toward the opposite knee while extending the other leg straight out.",
      "Repeat smoothly back and forth."
    ],
    "tips": [
      "Maintain continuous tension on Complete Core throughout each rep.",
      "Breathe out during the concentric effort and inhale during the eccentric phase.",
      "Prioritize strict form over loading too much weight."
    ],
    "mistakes": [
      "Using body momentum or swinging to move the weight.",
      "Restricting range of motion and failing to get a full stretch.",
      "Rushing repetitions and losing control of the eccentric tempo."
    ]
  },
  {
    "id": "h1",
    "slug": "push-ups",
    "name": "Push Ups",
    "category": "Home Workout",
    "target": "Chest & Triceps",
    "intensity": "Medium",
    "difficulty": "Intermediate",
    "sets": "4 Sets",
    "reps": "15 Reps",
    "rest": "60-90 sec",
    "calories": "80 kcal",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    "video": "pushups.mp4",
    "videoUrl": "/videos/pushups.mp4",
    "description": "Targeted strength and hypertrophy movement for Chest & Triceps (Home Workout). Maintain strict posture, focus on mind-muscle connection, and adhere to recommended volume parameters.",
    "steps": [
      "Place your hands slightly wider than shoulder width.",
      "Keep your body straight from head to heels.",
      "Lower your chest close to the floor.",
      "Push yourself back up."
    ],
    "tips": [
      "Maintain continuous tension on Chest & Triceps throughout each rep.",
      "Breathe out during the concentric effort and inhale during the eccentric phase.",
      "Prioritize strict form over loading too much weight."
    ],
    "mistakes": [
      "Using body momentum or swinging to move the weight.",
      "Restricting range of motion and failing to get a full stretch.",
      "Rushing repetitions and losing control of the eccentric tempo."
    ]
  },
  {
    "id": "h2",
    "slug": "bodyweight-squats",
    "name": "Bodyweight Squats",
    "category": "Home Workout",
    "target": "Legs",
    "intensity": "Medium",
    "difficulty": "Intermediate",
    "sets": "4 Sets",
    "reps": "20 Reps",
    "rest": "60-90 sec",
    "calories": "80 kcal",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    "video": "bodyweight squat.mp4",
    "videoUrl": "/videos/bodyweight squat.mp4",
    "description": "Targeted strength and hypertrophy movement for Legs (Home Workout). Maintain strict posture, focus on mind-muscle connection, and adhere to recommended volume parameters.",
    "steps": [
      "Stand with feet shoulder-width apart.",
      "Lower your hips until thighs are parallel.",
      "Keep your chest up.",
      "Return to standing position."
    ],
    "tips": [
      "Maintain continuous tension on Legs throughout each rep.",
      "Breathe out during the concentric effort and inhale during the eccentric phase.",
      "Prioritize strict form over loading too much weight."
    ],
    "mistakes": [
      "Using body momentum or swinging to move the weight.",
      "Restricting range of motion and failing to get a full stretch.",
      "Rushing repetitions and losing control of the eccentric tempo."
    ]
  },
  {
    "id": "h3",
    "slug": "mountain-climbers",
    "name": "Mountain Climbers",
    "category": "Home Workout",
    "target": "Core",
    "intensity": "High",
    "difficulty": "Advanced",
    "sets": "3 Sets",
    "reps": "30 Seconds",
    "rest": "60-90 sec",
    "calories": "80 kcal",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    "video": "mountain climber.mp4",
    "videoUrl": "/videos/mountain climber.mp4",
    "description": "Targeted strength and hypertrophy movement for Core (Home Workout). Maintain strict posture, focus on mind-muscle connection, and adhere to recommended volume parameters.",
    "steps": [
      "Start in a plank position.",
      "Drive one knee toward your chest.",
      "Switch legs quickly.",
      "Maintain a straight back."
    ],
    "tips": [
      "Maintain continuous tension on Core throughout each rep.",
      "Breathe out during the concentric effort and inhale during the eccentric phase.",
      "Prioritize strict form over loading too much weight."
    ],
    "mistakes": [
      "Using body momentum or swinging to move the weight.",
      "Restricting range of motion and failing to get a full stretch.",
      "Rushing repetitions and losing control of the eccentric tempo."
    ]
  },
  {
    "id": "h4",
    "slug": "plank",
    "name": "Plank",
    "category": "Home Workout",
    "target": "Core",
    "intensity": "Medium",
    "difficulty": "Intermediate",
    "sets": "3 Sets",
    "reps": "60 Seconds",
    "rest": "60-90 sec",
    "calories": "80 kcal",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    "video": "plank.mp4",
    "videoUrl": "/videos/plank.mp4",
    "description": "Targeted strength and hypertrophy movement for Core (Home Workout). Maintain strict posture, focus on mind-muscle connection, and adhere to recommended volume parameters.",
    "steps": [
      "Rest on your forearms.",
      "Keep your body straight.",
      "Tighten your abs.",
      "Hold the position."
    ],
    "tips": [
      "Maintain continuous tension on Core throughout each rep.",
      "Breathe out during the concentric effort and inhale during the eccentric phase.",
      "Prioritize strict form over loading too much weight."
    ],
    "mistakes": [
      "Using body momentum or swinging to move the weight.",
      "Restricting range of motion and failing to get a full stretch.",
      "Rushing repetitions and losing control of the eccentric tempo."
    ]
  },
  {
    "id": "h5",
    "slug": "jumping-jacks",
    "name": "Jumping Jacks",
    "category": "Home Workout",
    "target": "Full Body",
    "intensity": "Medium",
    "difficulty": "Intermediate",
    "sets": "3 Sets",
    "reps": "40 Reps",
    "rest": "60-90 sec",
    "calories": "80 kcal",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    "video": "jumping jack.mp4",
    "videoUrl": "/videos/jumping jack.mp4",
    "description": "Targeted strength and hypertrophy movement for Full Body (Home Workout). Maintain strict posture, focus on mind-muscle connection, and adhere to recommended volume parameters.",
    "steps": [
      "Stand with feet together.",
      "Jump while spreading legs.",
      "Raise arms overhead.",
      "Return to starting position."
    ],
    "tips": [
      "Maintain continuous tension on Full Body throughout each rep.",
      "Breathe out during the concentric effort and inhale during the eccentric phase.",
      "Prioritize strict form over loading too much weight."
    ],
    "mistakes": [
      "Using body momentum or swinging to move the weight.",
      "Restricting range of motion and failing to get a full stretch.",
      "Rushing repetitions and losing control of the eccentric tempo."
    ]
  },
  {
    "id": "h6",
    "slug": "burpees",
    "name": "Burpees",
    "category": "Home Workout",
    "target": "Full Body",
    "intensity": "High",
    "difficulty": "Advanced",
    "sets": "3 Sets",
    "reps": "15 Reps",
    "rest": "60-90 sec",
    "calories": "80 kcal",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    "video": "burpees.mp4",
    "videoUrl": "/videos/burpees.mp4",
    "description": "Targeted strength and hypertrophy movement for Full Body (Home Workout). Maintain strict posture, focus on mind-muscle connection, and adhere to recommended volume parameters.",
    "steps": [
      "Squat down and place hands on the floor.",
      "Jump your feet back into a plank.",
      "Perform a push-up.",
      "Jump back up and reach overhead."
    ],
    "tips": [
      "Maintain continuous tension on Full Body throughout each rep.",
      "Breathe out during the concentric effort and inhale during the eccentric phase.",
      "Prioritize strict form over loading too much weight."
    ],
    "mistakes": [
      "Using body momentum or swinging to move the weight.",
      "Restricting range of motion and failing to get a full stretch.",
      "Rushing repetitions and losing control of the eccentric tempo."
    ]
  },
  {
    "id": "h7",
    "slug": "lunges",
    "name": "Lunges",
    "category": "Home Workout",
    "target": "Legs & Glutes",
    "intensity": "Medium",
    "difficulty": "Intermediate",
    "sets": "3 Sets",
    "reps": "15 Reps Each Leg",
    "rest": "60-90 sec",
    "calories": "80 kcal",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    "video": "lunges.mp4",
    "videoUrl": "/videos/lunges.mp4",
    "description": "Targeted strength and hypertrophy movement for Legs & Glutes (Home Workout). Maintain strict posture, focus on mind-muscle connection, and adhere to recommended volume parameters.",
    "steps": [
      "Step one foot forward.",
      "Lower until both knees reach 90 degrees.",
      "Push back to the starting position.",
      "Repeat with the opposite leg."
    ],
    "tips": [
      "Maintain continuous tension on Legs & Glutes throughout each rep.",
      "Breathe out during the concentric effort and inhale during the eccentric phase.",
      "Prioritize strict form over loading too much weight."
    ],
    "mistakes": [
      "Using body momentum or swinging to move the weight.",
      "Restricting range of motion and failing to get a full stretch.",
      "Rushing repetitions and losing control of the eccentric tempo."
    ]
  },
  {
    "id": "h8",
    "slug": "high-knees",
    "name": "High Knees",
    "category": "Home Workout",
    "target": "Cardio",
    "intensity": "High",
    "difficulty": "Advanced",
    "sets": "3 Sets",
    "reps": "30 Seconds",
    "rest": "60-90 sec",
    "calories": "80 kcal",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800",
    "video": "high knees.mp4",
    "videoUrl": "/videos/high knees.mp4",
    "description": "Targeted strength and hypertrophy movement for Cardio (Home Workout). Maintain strict posture, focus on mind-muscle connection, and adhere to recommended volume parameters.",
    "steps": [
      "Run in place.",
      "Lift your knees above your waist.",
      "Pump your arms.",
      "Maintain a fast pace."
    ],
    "tips": [
      "Maintain continuous tension on Cardio throughout each rep.",
      "Breathe out during the concentric effort and inhale during the eccentric phase.",
      "Prioritize strict form over loading too much weight."
    ],
    "mistakes": [
      "Using body momentum or swinging to move the weight.",
      "Restricting range of motion and failing to get a full stretch.",
      "Rushing repetitions and losing control of the eccentric tempo."
    ]
  }
];

const ALIASES = {
  "barbell-bench-press": "bench-press",
  "incline-bench-press": "incline-dumbbell-press",
  "cable-fly": "chest-fly",
  "barbell-row": "seated-cable-row",
  "seated-row": "seated-cable-row",
  "face-pull": "cable-face-pull",
  "overhead-press": "overhead-barbell-press",
  "dumbbell-lateral-raise": "front-delt-upper-traps",
  "lateral-raise": "front-delt-upper-traps",
  "lateral-raises": "front-delt-upper-traps",
  "rear-delt-fly": "cable-face-pull",
  "barbell-curl": "dumbell-bicep-curl",
  "bicep-curl": "dumbell-bicep-curl",
  "hammer-curl": "incline-dumbbell-curl",
  "triceps-pushdown": "rope-tricep-pushdowns",
  "tricep-pushdown": "rope-tricep-pushdowns",
  "triceps-rope-pushdown": "rope-tricep-pushdowns",
  "overhead-triceps-extension": "overhead-tricep-extension",
  "skull-crushers": "kick-back",
  "skull-crusher": "kick-back",
  "close-grip-bench-press": "bench-press",
  "chest-dips": "dips",
  "barbell-squat": "squat",
  "barbell-squats": "squat",
  "romanian-deadlift": "dead-lift",
  "leg-extension": "leg-extensions",
  "lying-leg-curl": "squad-in-different-variation",
  "hamstring-curls": "squad-in-different-variation",
  "standing-calf-raise": "squad-in-different-variation",
  "standing-calf-raises": "squad-in-different-variation",
  "calf-raise": "squad-in-different-variation",
  "hanging-leg-raise": "hanging-knee-raises",
  "hanging-leg-raises": "hanging-knee-raises",
  "plank": "plank-hold",
  "shrugs": "dumbbell-shrugs",
  "deadlift": "deadlift"
};

export const slugify = (name) => {
  return String(name || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const getExerciseBySlug = (slugOrIdentifier) => {
  if (!slugOrIdentifier) return null;
  const raw = String(slugOrIdentifier).trim();
  const cleanSlug = slugify(raw);

  // 1. Exact slug match
  let found = exercises.find((e) => e.slug === cleanSlug);
  if (found) return found;

  // 2. ID match
  found = exercises.find((e) => e.id === raw || e.id === cleanSlug);
  if (found) return found;

  // 3. Name match (case-insensitive)
  const lowerRaw = raw.toLowerCase();
  found = exercises.find((e) => e.name.toLowerCase() === lowerRaw);
  if (found) return found;

  // 4. Alias match
  const aliasSlug = ALIASES[cleanSlug];
  if (aliasSlug) {
    found = exercises.find((e) => e.slug === aliasSlug);
    if (found) return found;
  }

  // 5. Substring name match
  found = exercises.find((e) => e.name.toLowerCase().includes(lowerRaw) || lowerRaw.includes(e.name.toLowerCase()));
  if (found) return found;

  // Fallback to first exercise
  return exercises[0];
};

export const getExercisesByCategory = (category) => {
  if (!category || category === "All") return exercises;
  const cat = String(category).toLowerCase().trim();
  const map = {
    chest: "Chest",
    pecs: "Chest",
    back: "Back",
    lats: "Back",
    traps: "Back",
    shoulders: "Shoulders",
    deltoids: "Shoulders",
    arms: "Arms",
    biceps: "Arms",
    triceps: "Arms",
    forearms: "Arms",
    legs: "Legs",
    quads: "Legs",
    thighs: "Legs",
    calves: "Legs",
    glutes: "Legs",
    hamstrings: "Legs",
    abs: "Abs",
    core: "Abs",
    obliques: "Abs",
    "home workout": "Home Workout",
    home: "Home Workout",
  };
  const targetCategory = map[cat] || category;
  return exercises.filter((e) => e.category.toLowerCase() === targetCategory.toLowerCase());
};

export default exercises;
