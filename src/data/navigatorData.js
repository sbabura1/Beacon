export const learner = {
  name: "Maria",
  xp: 420,
  level: "Level 3",
  title: "Emerging Analyst",
  moduleProgress: 67
};

export const recommendedSkill = {
  title: "Build a Two-Way Table",
  description: "Recommended because your last attempt showed uncertainty choosing row totals versus grand totals.",
  tags: ["18 minutes", "Difficulty 3 of 5", "Health Care Example"]
};

export const skillGroups = [
  {
    title: "Foundations",
    skills: [
      {
        title: "Ratios",
        tags: ["Ratios", "Percentages", "Foundations"],
        description: "Compare two quantities before converting to percents.",
        progress: 96,
        status: "done"
      },
      {
        title: "Fractions",
        tags: ["Fractions", "Part-to-whole", "Foundations"],
        description: "Understand part-to-whole relationships before moving into percentages.",
        progress: 91,
        status: "done"
      },
      {
        title: "Percentages",
        tags: ["Percentages", "Denominator", "Row %"],
        description: "Calculate parts of a group using the correct denominator.",
        progress: 82,
        status: "active"
      },
      {
        title: "Percent Change",
        tags: ["Percent Change", "Increase", "Decrease"],
        description: "Describe increase or decrease from a starting value.",
        progress: 58,
        status: "active"
      }
    ]
  },
  {
    title: "Data Analysis",
    skills: [
      {
        title: "Two-Way Tables",
        tags: ["Categorical Data", "Row %", "Evidence"],
        description: "Compare two categorical variables using two-way tables.",
        progress: 67,
        status: "active"
      },
      {
        title: "Evidence-Based Claims",
        tags: ["Claim", "Evidence", "Limitations"],
        description: "Use percentages to support a claim while naming what the data cannot prove.",
        progress: 44,
        status: "locked"
      }
    ]
  }
];

export const careerPathways = [
  {
    title: "Exercise vs Blood Pressure",
    icon: "square",
    tags: ["Percentages", "Two-Way Tables", "Row %"],
    duration: "22 min",
    description: "This pathway uses health data to compare exercise habits and blood pressure outcomes."
  },
  {
    title: "Sleep and BMI",
    icon: "moon",
    tags: ["Scatterplots", "Correlation", "Limitations"],
    duration: "25 min",
    description: "This pathway explores sleep patterns and BMI using visual analysis and careful interpretation."
  },
  {
    title: "Stress by Major",
    icon: "gear",
    tags: ["Frequency Tables", "Bar Graphs", "Claims"],
    duration: "18 min",
    description: "This pathway compares stress levels across majors and helps students write evidence-based claims."
  },
  {
    title: "Smoking and Elevated BP",
    icon: "risk",
    tags: ["Two-Way Tables", "Risk", "Limitations"],
    duration: "24 min",
    description: "This pathway uses two-way tables to compare smoking status and elevated blood pressure."
  }
];

export const skillConstellation = [
  {
    title: "Statistics",
    tags: ["Statistics", "Data", "Claims"],
    description: "Use statistics to describe patterns and support evidence-based claims.",
    className: "top-node"
  },
  {
    title: "Percentages",
    tags: ["Ratios", "Fractions", "Row %"],
    description: "Practice calculating percentages using the denominator that matches the question.",
    className: "middle-node active"
  },
  {
    title: "Ratios",
    tags: ["Ratios", "Foundations", "Percentages"],
    description: "Compare two quantities before converting to percents.",
    className: "left-node done"
  },
  {
    title: "Graphs",
    tags: ["Graphs", "Visuals", "Trends"],
    description: "Use graphs to make patterns in health data easier to interpret.",
    className: "right-node"
  },
  {
    title: "Two-Way Tables",
    tags: ["Categorical Data", "Row %", "Evidence"],
    description: "Use two-way tables to compare groups and support claims with percentages.",
    className: "lower-node active wide"
  },
  {
    title: "Research",
    tags: ["Question", "Evidence", "Limitations"],
    description: "Connect statistical evidence to a research question and a clear limitation.",
    className: "bottom-node"
  }
];
