export const personaLevels = {
  beginning: {
    title: "Beginning",
    description: "Build the routine with visible data-quality cues, formula prompts, and one-step calculations.",
    auditNeed: 3,
    auditPrompt: "Select the three obvious data-quality issues: one impossible value, one missing value, and one inconsistent category."
  },
  intermediate: {
    title: "Intermediate",
    description: "Apply the routine with fewer cues, multi-step calculations, and comparisons across variables.",
    auditNeed: 3,
    auditPrompt: "Select the three operational issues that could directly break a calculation: impossible value, missing value, and duplicate record."
  },
  advanced: {
    title: "Advanced",
    description: "Reason like a professional with ambiguous anomalies, trade-offs, and defensible recommendations.",
    auditNeed: 5,
    auditPrompt: "Select the five source-data issues that should be verified before analysis, leaving out the unrelated non-data option."
  }
};

const healthSheet = {
  headers: ["Patient ID", "Neighborhood", "Age", "Insurance", "ER Visits", "Annual Cost"],
  rows: [
    ["P-101", "East", "46", "Uninsured", "4", "$6,120"],
    ["P-102", "West", "31", "Medicaid", "1", "$980"],
    ["P-103", "East", "999", "Uninsured", "3", "$4,700"],
    ["P-104", "North", "58", "Medicare", "", "$2,450"],
    ["P-105", "east", "43", "Uninsured", "5", "$7,250"],
    ["P-105", "east", "43", "Uninsured", "5", "$7,250"],
    ["P-107", "South", "29", "Private", "0", "$0"],
    ["P-108", "West", "52", "Medicaid", "2", "2450"],
    ["P-110", "East", "41", "Uninsured", "12", "$18,900"]
  ],
  issues: [
    ["Impossible age", "P-103 has age 999."],
    ["Missing value", "P-104 has no ER Visits value."],
    ["Inconsistent category", "East and east should be standardized."],
    ["Possible duplicate", "P-105 appears twice."],
    ["Currency format", "2450 uses a different format."],
    ["Dashboard color", "The dashboard color is not part of the source data."]
  ],
  auditCorrectByLevel: {
    beginning: [0, 1, 2],
    intermediate: [0, 1, 2],
    advanced: [0, 1, 2, 3, 4]
  }
};

const crimeSheet = {
  headers: ["Case ID", "Date", "Precinct", "Type", "Hour", "Status"],
  rows: [
    ["C-201", "7/01/26", "South", "Burglary", "22", "Open"],
    ["C-202", "7/02/26", "South", "Theft", "14", "Closed"],
    ["C-203", "7/03/26", "North", "Burglary", "25", "Open"],
    ["C-204", "07-04-2026", "South", "Theft", "9", "Open"],
    ["C-205", "7/05/26", "", "Assault", "19", "Open"],
    ["C-206", "7/06/26", "North", "burglary", "23", "Closed"],
    ["C-206", "7/06/26", "North", "burglary", "23", "Closed"],
    ["C-208", "7/08/26", "South", "Theft", "8", "Open"]
  ],
  issues: [
    ["Impossible hour", "Hour 25 is invalid."],
    ["Date format", "Dates use multiple formats."],
    ["Missing precinct", "C-205 has no precinct."],
    ["Category format", "Burglary and burglary differ."],
    ["Possible duplicate", "C-206 appears twice."],
    ["Officer uniform", "Uniform color is not part of this dataset."]
  ],
  auditCorrectByLevel: {
    beginning: [0, 1, 2],
    intermediate: [0, 1, 2],
    advanced: [0, 1, 2, 3, 4]
  }
};

const environmentSheet = {
  headers: ["Meter ID", "Zone", "Households", "Daily Gallons", "Reading Date"],
  rows: [
    ["W-301", "Mesa", "800", "232000", "8/1/26"],
    ["W-302", "Canyon", "500", "155000", "8/1/26"],
    ["W-303", "Mesa", "0", "92000", "8/1/26"],
    ["W-304", "Valley", "620", "", "8/1/26"],
    ["W-305", "Canyon", "540", "1,620,000", "8/1/26"],
    ["W-306", "mesa", "760", "218000", "08-01-2026"],
    ["W-306", "mesa", "760", "218000", "08-01-2026"]
  ],
  issues: [
    ["Invalid denominator", "W-303 has 0 households."],
    ["Missing reading", "W-304 has no gallons value."],
    ["Potential outlier", "W-305 is much higher than similar readings."],
    ["Inconsistent zone", "Mesa and mesa differ."],
    ["Possible duplicate", "W-306 appears twice."],
    ["Map background", "The map background is not a row-level data issue."]
  ],
  auditCorrectByLevel: {
    beginning: [0, 1, 2],
    intermediate: [0, 1, 2],
    advanced: [0, 1, 2, 3, 4]
  }
};

const sportsSheet = {
  headers: ["Player", "Game", "Minutes", "FG Made", "FG Attempts", "Points"],
  rows: [
    ["Taylor", "1", "32", "8", "16", "21"],
    ["Taylor", "2", "34", "9", "17", "24"],
    ["Taylor", "3", "-5", "6", "14", "15"],
    ["Jordan", "1", "30", "7", "15", "18"],
    ["Jordan", "2", "31", "", "18", "22"],
    ["Jordan", "2", "31", "", "18", "22"],
    ["TAYLOR", "4", "36", "10", "19", "27"],
    ["Taylor", "5", "35", "8", "0", "21"]
  ],
  issues: [
    ["Impossible minutes", "Taylor game 3 has -5 minutes."],
    ["Missing value", "Jordan game 2 lacks FG Made."],
    ["Possible duplicate", "Jordan game 2 appears twice."],
    ["Name format", "Taylor and TAYLOR differ."],
    ["Invalid denominator", "21 points with 0 FG attempts needs investigation."],
    ["Jersey color", "Jersey color is not part of the recorded performance data."]
  ],
  auditCorrectByLevel: {
    beginning: [0, 1, 2],
    intermediate: [0, 1, 2],
    advanced: [0, 1, 2, 3, 4]
  }
};

function q(title, skill, scenario, prompt, answerType, expected, suffix, prefix, helper, feedback, options) {
  return { title, skill, scenario, prompt, answerType, expected, suffix, prefix, helper, feedback, options };
}

export const personaData = [
  {
    id: "health",
    icon: "Hospital",
    title: "Health Administrator",
    color: "#078f72",
    tag: "Improve access while controlling costs",
    challengeDescription: "Audit messy patient records, calculate access gaps, and choose the best care-investment plan.",
    skills: ["Data Quality", "Percentages", "Weighted Average", "Bivariate Tables", "Budgeting"],
    sheet: healthSheet,
    levels: {
      beginning: [
        q("Economic Need", "Percentages", "Riverton has 12,500 residents; 4,250 live below poverty.", "What percentage live below poverty?", "number", 34, "%", "", "4,250 divided by 12,500 times 100.", "34% live below poverty."),
        q("Access Gap", "Percentages", "130 of 200 uninsured residents lack a provider.", "What percentage lack a provider?", "number", 65, "%", "", "130 divided by 200 times 100.", "65% lack a provider."),
        q("Average Care Cost", "Weighted Average", "900 ER visits at $1,250; 600 urgent-care at $310; 1,500 clinic visits at $145.", "What is the weighted average cost per visit?", "number", 509.5, "", "$", "Find total cost and divide by 3,000.", "$509.50 per visit.")
      ],
      intermediate: [
        q("Compare Access Gaps", "Conditional Percentages", "Insured: 120 of 800 lack a provider. Uninsured: 130 of 200 lack one.", "How many percentage points higher is the uninsured rate?", "number", 50, " points", "", "Compute each percentage, then subtract.", "65% minus 15% equals 50 points."),
        q("Avoidable Spending", "Rates + Cost", "28% of 900 ER visits could shift from $1,250 ER care to $145 clinic care.", "How much could be saved?", "number", 278460, "", "$", "28% of 900 times ($1,250 - $145).", "$278,460 in estimated savings."),
        q("Program Reach", "Cost per Outcome", "Mobile clinic $280k/1,800 people; enrollment $120k/900; workshops $80k/1,400.", "Which has the lowest cost per person reached?", "choice", 2, "", "", "Divide cost by people reached.", "Workshops have the lowest cost per person.", ["Mobile clinic", "Enrollment support", "Prevention workshops"])
      ],
      advanced: [
        q("Evaluate an Outlier", "Data Judgment", "P-110 shows 12 ER visits and $18,900 cost.", "What is the best response?", "choice", 1, "", "", "Outlier does not automatically mean error.", "Verify it; it may represent a high-need patient.", ["Delete it", "Verify it and investigate the case", "Replace with average", "Ignore it"]),
        q("Optimize Grant", "Budget Optimization", "$500k budget. Mobile $280k/save $410k; enrollment $120k/save $185k; prevention $80k/save $96k; evaluation $50k.", "Which three-program package yields greatest projected savings within budget?", "choice", 0, "", "", "Compare package costs and projected savings.", "Mobile + enrollment + prevention costs $480k and projects $691k savings.", ["Mobile + Enrollment + Prevention", "Mobile + Enrollment + Evaluation", "Mobile + Prevention + Evaluation", "Enrollment + Prevention + Evaluation"]),
        q("Recommendation", "Evidence-Based Reasoning", "You found a 50-point provider-access gap and high avoidable ER costs.", "Which recommendation best integrates the evidence?", "choice", 1, "", "", "Connect disparity, cost, targeting, and measurement.", "Target uninsured residents with enrollment and primary-care access while preserving evaluation.", ["Spend equally", "Target uninsured access and evaluate", "Expand ER only", "Remove outliers"])
      ]
    }
  },
  {
    id: "crime",
    icon: "Detective",
    title: "Crime Detective",
    color: "#167fbd",
    tag: "Use evidence to identify patterns",
    challengeDescription: "Clean incident data, compare normalized crime rates, and decide where evidence supports action.",
    skills: ["Data Quality", "Rates", "Percent Change", "Conditional %", "Evidence Strength"],
    sheet: crimeSheet,
    levels: {
      beginning: [
        q("Incident Rate", "Rate per 1,000", "South has 12,000 residents and 312 incidents.", "What is the incident rate per 1,000?", "number", 26, " per 1,000", "", "312 divided by 12,000 times 1,000.", "26 incidents per 1,000."),
        q("Crime Percentage", "Percentage", "Northside had 75 thefts among 300 reports.", "What percentage were thefts?", "number", 25, "%", "", "75 divided by 300 times 100.", "25% were thefts."),
        q("Compare Precincts", "Rate Comparison", "North: 396/18,000. South: 312/12,000.", "Which has the higher rate?", "choice", 1, "", "", "Normalize both per 1,000.", "South has the higher rate.", ["North", "South"])
      ],
      intermediate: [
        q("Time Change", "Percent Change", "Incidents fell from 84 in May to 56 in August.", "What was the percent decrease?", "number", 33.33, "%", "", "(84 - 56) divided by 84 times 100.", "About 33.3%."),
        q("Description Pattern", "Conditional %", "Target area: 18/60 matches. Elsewhere: 24/180.", "How many percentage points more common is the description in target area?", "number", 16.67, " points", "", "Compute both rates and subtract.", "About 16.7 percentage points."),
        q("Interpret Pattern", "Association vs Causation", "Late-night burglaries and lighting failures increased together.", "What can you conclude?", "choice", 1, "", "", "Association is not causation.", "There is an association worth investigating.", ["Lighting caused burglaries", "Association worth investigating", "They are unrelated", "Every failure predicts burglary"])
      ],
      advanced: [
        q("Duplicate Record", "Data Integrity", "C-206 appears twice identically.", "What should you do before calculating rates?", "choice", 1, "", "", "Verify before deleting.", "Check source records to see whether it is a duplicate or two incidents.", ["Delete both", "Verify source records", "Count twice", "Replace one"]),
        q("Standardized Rates", "Rate Comparison", "A: 480/20k; B: 390/13k; C: 540/30k.", "Which has highest rate per 1,000?", "choice", 1, "", "", "Normalize all with same denominator.", "B is 30 per 1,000, highest.", ["A", "B", "C"]),
        q("Resource Decision", "Multi-Evidence Reasoning", "B has highest rate, concentrated in one property-crime type and time window.", "Best response?", "choice", 2, "", "", "Match intervention to specific pattern.", "Target the pattern, monitor, and reassess.", ["Move all staff permanently", "Ignore B", "Target pattern and reassess", "Use raw counts only"])
      ]
    }
  },
  {
    id: "environment",
    icon: "Globe",
    title: "Environmental Analyst",
    color: "#16937f",
    tag: "Balance resources and sustainability",
    challengeDescription: "Inspect water-use records, project demand, and recommend a sustainable resource strategy.",
    skills: ["Data Quality", "Unit Rates", "Projections", "Percent Change", "Optimization"],
    sheet: environmentSheet,
    levels: {
      beginning: [
        q("Household Use", "Unit Rate", "Mesa uses 232,000 gallons across 800 households.", "Gallons per household?", "number", 290, " gallons", "", "232,000 divided by 800.", "290 gallons per household."),
        q("Conservation", "Percent Change", "Use fell from 700,000 to 630,000 gallons.", "Percent decrease?", "number", 10, "%", "", "70,000 divided by 700,000 times 100.", "10% decrease."),
        q("Compare Zones", "Unit Rate", "Mesa 232k/800; Canyon 155k/500.", "Which uses more per household?", "choice", 1, "", "", "Compute both unit rates.", "Canyon: 310 vs Mesa: 290.", ["Mesa", "Canyon"])
      ],
      intermediate: [
        q("Project Demand", "Growth Projection", "Current use 700,000 gallons; projected growth 8%.", "Projected use?", "number", 756000, " gallons", "", "700,000 times 1.08.", "756,000 gallons."),
        q("Efficiency", "Savings per $1,000", "Rebates $80k save 22M; irrigation $120k save 39M; campaign $35k save 7M.", "Best gallons saved per $1,000?", "choice", 1, "", "", "Divide savings by cost in thousands.", "Irrigation is best.", ["Rebates", "Irrigation", "Campaign"]),
        q("Outlier", "Data Judgment", "W-305 is more than five times similar meters.", "What next?", "choice", 2, "", "", "Extreme does not equal wrong.", "Verify meter, units, and account conditions.", ["Delete", "Replace with median", "Verify first", "Use without question"])
      ],
      advanced: [
        q("Growth + Conservation", "Compounded Change", "Demand grows 8%, then conservation reduces resulting demand 6%. Current use 700,000.", "Resulting use?", "number", 710640, " gallons", "", "700,000 times 1.08 times .94.", "710,640 gallons."),
        q("Portfolio", "Budget Optimization", "$150k budget. Rebates $80k/save22M; irrigation $120k/save39M; campaign $35k/save7M.", "Which allowed option saves most?", "choice", 1, "", "", "Compare savings under budget.", "Irrigation alone saves 39M.", ["Rebates + Campaign", "Irrigation only", "Campaign only", "Rebates only"]),
        q("Recommendation", "Systems Reasoning", "Town faces growth and a verified high-use industrial account.", "Strongest recommendation?", "choice", 2, "", "", "Segment different sources of demand.", "Separate structural high-use accounts from household demand and target by segment.", ["Same target for all", "Ignore industrial account", "Segment and target", "Use totals only"])
      ]
    }
  },
  {
    id: "sports",
    icon: "Basketball",
    title: "Sports Performance Analyst",
    color: "#e98224",
    tag: "Turn player data into decisions",
    challengeDescription: "Check performance data, compare efficiency, and make a coaching recommendation under uncertainty.",
    skills: ["Data Quality", "Percentages", "Averages", "Efficiency", "Uncertainty"],
    sheet: sportsSheet,
    levels: {
      beginning: [
        q("Shooting %", "Percentage", "Taylor made 31 of 62 shots.", "Shooting percentage?", "number", 50, "%", "", "31 divided by 62 times 100.", "50%."),
        q("Scoring Average", "Mean", "Scores: 18, 24, 15, 27, 21.", "Average?", "number", 21, " points", "", "Add and divide by 5.", "21 points."),
        q("Net Rating", "Difference", "A: 112 offense, 108 defense. B: 109 offense, 101 defense.", "Better net rating?", "choice", 1, "", "", "Offense minus defense.", "B is +8 vs A +4.", ["A", "B"])
      ],
      intermediate: [
        q("Compare Shooters", "Percentage Points", "Taylor 31/62; Jordan 38/80.", "How many points higher is Taylor?", "number", 2.5, " points", "", "Compute both percentages.", "Taylor is 2.5 points higher."),
        q("Expected Points", "Rate Application", "1.12 points per possession over 75 possessions.", "Expected points?", "number", 84, " points", "", "1.12 times 75.", "84 points."),
        q("Small Sample", "Interpretation", "Reserve shot 70% on 10 attempts; starter 51% on 400.", "Most defensible conclusion?", "choice", 1, "", "", "Consider rate and sample size.", "Reserve was better in one game, but evidence is too small for a strong overall claim.", ["Reserve definitely better", "Promising but too small a sample", "Starter definitely worse", "Sample size irrelevant"])
      ],
      advanced: [
        q("Weighted Shooting", "Weighted Percentage", "55% on 40 twos and 40% on 30 threes.", "Combined FG percentage?", "number", 48.57, "%", "", "Find total makes over 70 attempts.", "34/70 is about 48.6%."),
        q("Lineup Trade-off", "Multi-Metric", "A: offense 116, defense 111. B: offense 111, defense 102.", "Which has stronger net rating?", "choice", 1, "", "", "Offense minus defense.", "B is +9 vs A +5.", ["A", "B"]),
        q("Coach Decision", "Decision Under Uncertainty", "B is +9 over 42 possessions; A is +5 over 620.", "Strongest recommendation?", "choice", 2, "", "", "Balance effect size with sample size.", "Test B more while treating current advantage as promising but uncertain.", ["Replace A permanently", "Ignore B", "Test B more", "Use offense only"])
      ]
    }
  }
];

function slug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const auditIssueIndexesByLevel = {
  beginning: [0, 1, 2, 5],
  intermediate: [0, 1, 3, 5],
  advanced: [0, 1, 2, 3, 4, 5]
};

function getAuditIssues(sheet, levelId) {
  return auditIssueIndexesByLevel[levelId].map((issueIndex) => sheet.issues[issueIndex]);
}

export const challengePathSkills = [
  { id: "data-quality", title: "Data Quality", description: "Inspect messy source data before analysis." },
  { id: "rates-percentages", title: "Rates & Percentages", description: "Calculate rates, percentages, and normalized comparisons." },
  { id: "averages-weighted", title: "Averages & Weighted Measures", description: "Use means, weighted averages, and expected values." },
  { id: "comparisons-change", title: "Comparisons & Change", description: "Compare groups, differences, percent change, and patterns." },
  { id: "decision-optimization", title: "Decision & Optimization", description: "Use evidence, trade-offs, and uncertainty to recommend action." }
];

function getSkillGroupId(skill) {
  const key = skill.toLowerCase();
  if (key.includes("quality") || key.includes("integrity") || key.includes("judgment") || key.includes("outlier")) return "data-quality";
  if (key.includes("percent") || key.includes("rate") || key.includes("conditional")) return "rates-percentages";
  if (key.includes("average") || key.includes("weighted") || key.includes("mean") || key.includes("expected")) return "averages-weighted";
  if (key.includes("comparison") || key.includes("compare") || key.includes("change") || key.includes("difference") || key.includes("association")) return "comparisons-change";
  return "decision-optimization";
}

export const challengePathData = personaData.map((persona) => ({
  id: persona.id,
  title: persona.title,
  description: persona.tag,
  color: persona.color,
  icon: persona.icon,
  skills: persona.skills,
  levels: persona.levels,
  sheet: persona.sheet,
  questions: [
    {
      id: `${persona.id}-beginning-data-lab`,
      activityType: "audit",
      levelId: "beginning",
      skillId: "data-quality",
      skill: "Data Quality",
      title: "Data Lab",
      prompt: personaLevels.beginning.auditPrompt,
      scenario: `Before making a decision as a ${persona.title}, inspect the raw spreadsheet for the level-specific data-quality issues.`,
      helper: "Check missing values, impossible values, inconsistent labels, duplicates, and suspicious outliers.",
      feedback: "Good. Data cleaning is a reasoning task.",
      expected: personaLevels.beginning.auditNeed,
      correctIssueIndexes: persona.sheet.auditCorrectByLevel.beginning,
      auditIssues: getAuditIssues(persona.sheet, "beginning"),
      sheet: persona.sheet
    },
    ...persona.levels.beginning
  ]
}));

export const personaActivities = personaData.flatMap((persona, personaIndex) =>
  Object.entries(personaLevels).flatMap(([levelId, level], levelIndex) => [
    {
      id: `${persona.id}-${levelId}-data-lab`,
      personaId: persona.id,
      personaIndex,
      levelId,
      levelIndex,
      activityIndex: 0,
      activityType: "audit",
      skillId: "data-quality",
      skill: "Data Quality",
      title: "Data Lab",
      prompt: level.auditPrompt,
      scenario: `Before making a decision as a ${persona.title}, inspect the raw spreadsheet for the ${level.title.toLowerCase()} data-quality target.`,
      helper: "Check missing values, impossible values, inconsistent labels, duplicates, and suspicious outliers.",
      feedback: `You flagged enough items for verification at the ${level.title} level. An anomaly is a reason to investigate, not automatic permission to delete.`,
      expected: level.auditNeed,
      correctIssueIndexes: persona.sheet.auditCorrectByLevel[levelId],
      auditIssues: getAuditIssues(persona.sheet, levelId),
      sheet: persona.sheet
    },
    ...persona.levels[levelId].map((question, index) => ({
      ...question,
      id: `${persona.id}-${levelId}-${index + 1}`,
      personaId: persona.id,
      personaIndex,
      levelId,
      levelIndex,
      activityIndex: index + 1,
      activityType: "question",
      skillId: getSkillGroupId(question.skill),
      sheet: persona.sheet
    }))
  ])
);

export const challengeQuestions = personaActivities;

export const skillQuestionGroups = challengePathSkills.map((skill) => ({
  ...skill,
  questions: personaActivities.filter((activity) => activity.skillId === skill.id)
}));

export const progressByRoute = {
  continue: 10,
  "challenge-paths": 10
};

export const beaconMessages = {
  start: "Beacon Persona Simulations: choose a role, inspect the data, then solve the problem.",
  continue: "Choose a role. Inspect the data. Solve the problem. A precise calculation on unreliable data can still produce a poor decision.",
  "challenge-paths": "Choose a persona path, then inspect evidence and reason through the professional decision."
};

export const beaconQuickActions = {
  "Explain the data": "Start by identifying what each row represents, which values look impossible or inconsistent, and whether the data can support the decision.",
  "Check my thinking": "A strong answer names the quantity, uses the right relationship, keeps units clear, and explains what the result means for the role.",
  "Connect to the big picture": "Numbers become useful when they inform action, reveal a trade-off, or tell you what evidence to collect next."
};

export const bossQuestions = [];
export const bloodPressureTable = [];
export const rowPercentTable = [];
export const challengeSteps = [];
