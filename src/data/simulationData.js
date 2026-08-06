export const challengeSteps = [
  { id: "start", number: 1, title: "Start", skill: "Research setup" },
  { id: "sprint", number: 2, title: "SHINE Sprint", skill: "Fast fluency" },
  { id: "ido", number: 3, title: "I Do", skill: "Worked example" },
  { id: "wedo", number: 4, title: "We Do", skill: "Guided practice" },
  { id: "youdo", number: 5, title: "You Do", skill: "Bivariate table" },
  { id: "brief", number: 6, title: "QR Brief", skill: "Evidence claim" }
];

export const progressByRoute = {
  start: 15,
  sprint: 30,
  ido: 45,
  wedo: 65,
  youdo: 85,
  brief: 100
};

export const bossQuestions = [
  {
    question: "What is 25% of 80?",
    options: ["10", "20", "25", "40"],
    correct: 1,
    explanation: "25% is one fourth, and one fourth of 80 is 20."
  },
  {
    question: "50 of 200 students reported high stress. What percentage is this?",
    options: ["20%", "25%", "40%", "50%"],
    correct: 1,
    explanation: "50 divided by 200 times 100 = 25%."
  },
  {
    question: "30 of 120 exercisers have elevated blood pressure. What row percentage is this?",
    options: ["20%", "25%", "30%", "40%"],
    correct: 1,
    explanation: "30 divided by 120 times 100 = 25%."
  },
  {
    question: "Which denominator should be used for the percentage of non-exercisers with elevated blood pressure?",
    options: ["All students", "All students with elevated BP", "All non-exercisers", "All exercisers"],
    correct: 2,
    explanation: "Use the total for the group named in the question: all non-exercisers."
  },
  {
    question: "A two-way table compares exercise status and blood-pressure category. What type of variables are these?",
    options: ["Two categorical variables", "Two continuous variables", "One of each", "No variables"],
    correct: 0,
    explanation: "Both exercise status and blood-pressure category are categorical variables."
  },
  {
    question: "Which table best compares blood-pressure categories within each exercise group?",
    options: ["Grand-total percentages", "Row percentages", "Column totals", "Student IDs"],
    correct: 1,
    explanation: "Row percentages compare outcomes within each exercise group."
  },
  {
    question: "75% of exercisers and 50% of non-exercisers have normal BP. What is the percentage-point difference?",
    options: ["15", "20", "25", "50"],
    correct: 2,
    explanation: "75 - 50 = 25 percentage points."
  },
  {
    question: "Which claim is supported by the table?",
    options: [
      "Exercise definitely causes normal BP",
      "The variables appear associated in this sample",
      "BP causes exercise",
      "No comparison is possible"
    ],
    correct: 1,
    explanation: "The table may provide evidence of association, but it does not prove causation."
  },
  {
    question: "30 of 70 students in a column exercise regularly. What column percentage is this?",
    options: ["30%", "42.9%", "50%", "70%"],
    correct: 1,
    explanation: "30 divided by 70 times 100 is approximately 42.9%."
  },
  {
    question: "Which limitation is appropriate for a campus health survey?",
    options: [
      "Percentages cannot be calculated",
      "Self-reported data may be inaccurate",
      "Tables prove causation",
      "Totals must equal zero"
    ],
    correct: 1,
    explanation: "Self-reported information can contain reporting errors or bias."
  }
];

export const bloodPressureTable = [
  { exercise: "Yes", normal: 90, elevated: 30, total: 120 },
  { exercise: "No", normal: 40, elevated: 40, total: 80 },
  { exercise: "Total", normal: 130, elevated: 70, total: 200 }
];

export const rowPercentTable = [
  { exercise: "Yes", normal: "75%", elevated: "25%", total: "100%" },
  { exercise: "No", normal: "50%", elevated: "50%", total: "100%" }
];

export const beaconMessages = {
  start: "Start by naming the pattern you expect. I will keep nudging you back to evidence instead of guesses.",
  sprint: "Sprint mode is for fast practice. Watch the denominator in every percentage question.",
  ido: "In I Do, focus on the group named by the question. That group gives you the denominator.",
  wedo: "We are working together now. Choose the row total for students who do not exercise regularly.",
  youdo: "Build the table first, then compare row percentages so the group sizes are fair.",
  brief: "Wrap the investigation with a clear claim, evidence, and a limitation."
};

export const beaconQuickActions = {
  "Explain the data": "This dataset compares exercise habits with blood-pressure categories. The key move is comparing percentages within each exercise group, not just raw counts.",
  "Give me a hint": "Look for the exact group named in the question. Its total is the denominator for the percentage.",
  "Check my thinking": "A strong answer names the group, uses the correct denominator, includes a percentage, and explains what that percentage means in context.",
  "Connect to the big picture": "Health teams use tables like this to notice patterns, ask better questions, and decide where more evidence is needed."
};
