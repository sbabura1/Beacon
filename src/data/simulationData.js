export const challengeSteps = [
  { id: "start", number: 1, title: "Start", skill: "Research setup" },
  { id: "sprint", number: 2, title: "SHINE Sprint", skill: "Fast fluency" },
  { id: "ido", number: 3, title: "I Do", skill: "Worked example" },
  { id: "wedo", number: 4, title: "We Do", skill: "Guided practice" },
  { id: "youdo", number: 5, title: "You Do", skill: "Bivariate table" },
  { id: "brief", number: 6, title: "QR Brief", skill: "Evidence claim" }
];

const rivertonSnapshotRows = [
  ["Total population", "12,500", "100%"],
  ["Below poverty line", "4,250", "Calculate"],
  ["Uninsured residents", "2,125", "17%"],
  ["No primary care provider", "3,000", "24%"]
];

const avoidableVisitRows = [
  ["Emergency department", "900", "$1,250"],
  ["Urgent care", "600", "$310"],
  ["Community clinic", "1,500", "$145"]
];

const providerAccessRows = [
  ["Insured", "680 with provider", "120 without"],
  ["Uninsured", "70 with provider", "130 without"],
  ["Total", "750 with provider", "250 without"]
];

const grantDecisionRows = [
  ["Insurance enrollment", "$120,000", "900 residents"],
  ["Prevention workshops", "$80,000", "1,400 residents"],
  ["Data and evaluation", "$50,000", "Community-wide"],
  ["Available grant", "$500,000", "Total"]
];

const evidenceSummaryRows = [
  ["Economic need", "34%", "Below poverty line"],
  ["Access gap", "65%", "Uninsured without provider"],
  ["Cost pressure", "$509.50", "Weighted average visit cost"],
  ["Available grant", "$500,000", "Intervention funding"]
];

export const challengePathSkills = [
  { id: "percentages-rates", title: "Percentages & Rates", description: "Calculate part-to-whole rates and compare percentages." },
  { id: "averages-totals", title: "Averages & Totals", description: "Combine totals and calculate representative values." },
  { id: "data-relationships", title: "Data Relationships", description: "Read tables and compare groups fairly." },
  { id: "budgeting-tradeoffs", title: "Budgeting & Trade-offs", description: "Use numbers to reason about funding decisions." },
  { id: "evidence-reasoning", title: "Evidence & Reasoning", description: "Choose evidence and connect it to a recommendation." }
];

export const challengePathData = [
  {
    id: "community-need",
    title: "Community Need",
    description: "Understand who is most affected before Riverton spends its grant.",
    questions: [
      {
        skillId: "percentages-rates",
        skill: "Percentages & Rates",
        prompt: "What percentage of Riverton residents live below the poverty line?",
        helper: "Divide 4,250 by 12,500 and multiply by 100.",
        expected: 34,
        suffix: "%",
        datasetTitle: "Riverton Community Snapshot",
        rows: rivertonSnapshotRows,
        feedback: "Correct. 4,250 divided by 12,500 equals 0.34, or 34%."
      },
      {
        skillId: "averages-totals",
        skill: "Averages & Totals",
        prompt: "What is the average number of residents across the three need groups listed?",
        helper: "Add 4,250, 2,125, and 3,000, then divide by 3.",
        expected: 3125,
        datasetTitle: "Riverton Community Snapshot",
        rows: rivertonSnapshotRows,
        feedback: "Correct. The average across the three listed need groups is 3,125 residents."
      },
      {
        skillId: "data-relationships",
        skill: "Data Relationships",
        prompt: "How many more residents have no primary care provider than are uninsured?",
        helper: "Subtract 2,125 uninsured residents from 3,000 residents with no provider.",
        expected: 875,
        datasetTitle: "Riverton Community Snapshot",
        rows: rivertonSnapshotRows,
        feedback: "Correct. 3,000 minus 2,125 equals 875 residents."
      },
      {
        skillId: "budgeting-tradeoffs",
        skill: "Budgeting & Trade-offs",
        prompt: "If outreach costs $40 for each resident with no provider, what is the total outreach cost?",
        helper: "Multiply 3,000 residents with no provider by $40.",
        expected: 120000,
        prefix: "$",
        datasetTitle: "Riverton Community Snapshot",
        rows: rivertonSnapshotRows,
        feedback: "Correct. 3,000 times $40 equals $120,000."
      },
      {
        skillId: "evidence-reasoning",
        skill: "Evidence & Reasoning",
        prompt: "Which rate is larger: uninsured residents or residents without a provider? Enter the larger percentage.",
        helper: "Compare 17% uninsured with 24% without a provider.",
        expected: 24,
        suffix: "%",
        datasetTitle: "Riverton Community Snapshot",
        rows: rivertonSnapshotRows,
        feedback: "Correct. 24% is larger, so provider access is the bigger rate in this snapshot."
      }
    ]
  },
  {
    id: "cost-analysis",
    title: "Cost Analysis",
    description: "Estimate the cost pressure created by avoidable visits.",
    questions: [
      {
        skillId: "percentages-rates",
        skill: "Percentages & Rates",
        prompt: "What percentage of the 3,000 avoidable visits were emergency department visits?",
        helper: "Divide 900 emergency department visits by 3,000 total visits and multiply by 100.",
        expected: 30,
        suffix: "%",
        datasetTitle: "Annual Avoidable Visits",
        rows: avoidableVisitRows,
        feedback: "Correct. 900 divided by 3,000 equals 30%."
      },
      {
        skillId: "averages-totals",
        skill: "Averages & Totals",
        prompt: "What is the weighted average cost per visit?",
        helper: "Divide the total cost, $1,528,500, by 3,000 visits.",
        expected: 509.5,
        prefix: "$",
        datasetTitle: "Annual Avoidable Visits",
        rows: avoidableVisitRows,
        feedback: "Correct. The weighted average is $509.50 per visit."
      },
      {
        skillId: "data-relationships",
        skill: "Data Relationships",
        prompt: "How many more community clinic visits were there than emergency department visits?",
        helper: "Subtract 900 emergency department visits from 1,500 community clinic visits.",
        expected: 600,
        datasetTitle: "Annual Avoidable Visits",
        rows: avoidableVisitRows,
        feedback: "Correct. There were 600 more community clinic visits than emergency department visits."
      },
      {
        skillId: "budgeting-tradeoffs",
        skill: "Budgeting & Trade-offs",
        prompt: "If 100 emergency department visits moved to community clinics, how much cost would be avoided?",
        helper: "Subtract $145 from $1,250, then multiply the savings by 100 visits.",
        expected: 110500,
        prefix: "$",
        datasetTitle: "Annual Avoidable Visits",
        rows: avoidableVisitRows,
        feedback: "Correct. Each shifted visit saves $1,105, so 100 visits save $110,500."
      },
      {
        skillId: "evidence-reasoning",
        skill: "Evidence & Reasoning",
        prompt: "Rounded to the nearest dollar, what cost figure best summarizes the average visit burden?",
        helper: "Round the weighted average cost of $509.50 to the nearest whole dollar.",
        expected: 510,
        prefix: "$",
        datasetTitle: "Annual Avoidable Visits",
        rows: avoidableVisitRows,
        feedback: "Correct. $509.50 rounds to $510 as a clear evidence figure."
      }
    ]
  },
  {
    id: "access-pattern",
    title: "Access Pattern",
    description: "Compare insurance status with provider access.",
    questions: [
      {
        skillId: "percentages-rates",
        skill: "Percentages & Rates",
        prompt: "What percent of uninsured residents lack a primary care provider?",
        helper: "Use 130 uninsured residents without a provider out of 200 uninsured residents.",
        expected: 65,
        suffix: "%",
        datasetTitle: "Insurance and Provider Access",
        rows: providerAccessRows,
        feedback: "Correct. 130 divided by 200 equals 65%."
      },
      {
        skillId: "averages-totals",
        skill: "Averages & Totals",
        prompt: "What is the average number of residents without a provider across the insured and uninsured groups?",
        helper: "Add 120 and 130, then divide by 2 groups.",
        expected: 125,
        datasetTitle: "Insurance and Provider Access",
        rows: providerAccessRows,
        feedback: "Correct. The average without-provider count is 125 residents per group."
      },
      {
        skillId: "data-relationships",
        skill: "Data Relationships",
        prompt: "How many more uninsured residents lack a provider than uninsured residents with a provider?",
        helper: "Subtract 70 uninsured residents with a provider from 130 uninsured residents without one.",
        expected: 60,
        datasetTitle: "Insurance and Provider Access",
        rows: providerAccessRows,
        feedback: "Correct. 130 minus 70 equals 60 residents."
      },
      {
        skillId: "budgeting-tradeoffs",
        skill: "Budgeting & Trade-offs",
        prompt: "If navigation support costs $75 for each uninsured resident without a provider, what is the total support cost?",
        helper: "Multiply 130 uninsured residents without a provider by $75.",
        expected: 9750,
        prefix: "$",
        datasetTitle: "Insurance and Provider Access",
        rows: providerAccessRows,
        feedback: "Correct. 130 times $75 equals $9,750."
      },
      {
        skillId: "evidence-reasoning",
        skill: "Evidence & Reasoning",
        prompt: "Enter the percentage that best shows the access gap for uninsured residents.",
        helper: "Use the uninsured group and the no-provider count.",
        expected: 65,
        suffix: "%",
        datasetTitle: "Insurance and Provider Access",
        rows: providerAccessRows,
        feedback: "Correct. 65% is strong evidence that uninsured residents face a provider access gap."
      }
    ]
  },
  {
    id: "grant-decision",
    title: "Grant Decision",
    description: "Use budget reasoning to decide what Riverton can fund.",
    questions: [
      {
        skillId: "percentages-rates",
        skill: "Percentages & Rates",
        prompt: "What percentage of the $500,000 grant would insurance enrollment use?",
        helper: "Divide $120,000 by $500,000 and multiply by 100.",
        expected: 24,
        suffix: "%",
        datasetTitle: "Program Options",
        rows: grantDecisionRows,
        feedback: "Correct. Insurance enrollment would use 24% of the grant."
      },
      {
        skillId: "averages-totals",
        skill: "Averages & Totals",
        prompt: "What is the average cost of the three listed activities?",
        helper: "Add $120,000, $80,000, and $50,000, then divide by 3.",
        expected: 83333.33,
        prefix: "$",
        datasetTitle: "Program Options",
        rows: grantDecisionRows,
        feedback: "Correct. The average listed activity cost is about $83,333.33."
      },
      {
        skillId: "data-relationships",
        skill: "Data Relationships",
        prompt: "How many more residents do workshops reach than enrollment support?",
        helper: "Subtract 900 enrollment residents from 1,400 workshop residents.",
        expected: 500,
        datasetTitle: "Program Options",
        rows: grantDecisionRows,
        feedback: "Correct. Workshops reach 500 more residents than enrollment support."
      },
      {
        skillId: "budgeting-tradeoffs",
        skill: "Budgeting & Trade-offs",
        prompt: "How much remains after funding enrollment, workshops, and evaluation?",
        helper: "Subtract $250,000 in planned spending from the $500,000 grant.",
        expected: 250000,
        prefix: "$",
        datasetTitle: "Program Options",
        rows: grantDecisionRows,
        feedback: "Correct. The remaining reserve is $250,000."
      },
      {
        skillId: "evidence-reasoning",
        skill: "Evidence & Reasoning",
        prompt: "What percentage of the grant remains as reserve after the listed activities?",
        helper: "Divide the $250,000 reserve by the $500,000 grant and multiply by 100.",
        expected: 50,
        suffix: "%",
        datasetTitle: "Program Options",
        rows: grantDecisionRows,
        feedback: "Correct. Half of the grant, or 50%, remains as reserve."
      }
    ]
  },
  {
    id: "recommendation",
    title: "Recommendation",
    description: "Select the strongest evidence for a final recommendation.",
    questions: [
      {
        skillId: "percentages-rates",
        skill: "Percentages & Rates",
        prompt: "What percentage in the evidence summary represents the access gap?",
        helper: "Find the Access gap row and use its percentage.",
        expected: 65,
        suffix: "%",
        datasetTitle: "Evidence Summary",
        rows: evidenceSummaryRows,
        feedback: "Correct. The access gap is 65%."
      },
      {
        skillId: "averages-totals",
        skill: "Averages & Totals",
        prompt: "What is the average of the economic need rate and access gap percentage?",
        helper: "Add 34 and 65, then divide by 2.",
        expected: 49.5,
        suffix: "%",
        datasetTitle: "Evidence Summary",
        rows: evidenceSummaryRows,
        feedback: "Correct. The average of 34% and 65% is 49.5%."
      },
      {
        skillId: "data-relationships",
        skill: "Data Relationships",
        prompt: "How many percentage points larger is the access gap than the economic need rate?",
        helper: "Subtract 34% from 65%.",
        expected: 31,
        suffix: "points",
        datasetTitle: "Evidence Summary",
        rows: evidenceSummaryRows,
        feedback: "Correct. 65 minus 34 equals a 31-point difference."
      },
      {
        skillId: "budgeting-tradeoffs",
        skill: "Budgeting & Trade-offs",
        prompt: "How much intervention funding is available?",
        helper: "Use the available grant value in the evidence summary.",
        expected: 500000,
        prefix: "$",
        datasetTitle: "Evidence Summary",
        rows: evidenceSummaryRows,
        feedback: "Correct. Riverton has $500,000 in intervention funding."
      },
      {
        skillId: "evidence-reasoning",
        skill: "Evidence & Reasoning",
        prompt: "If 65% is the access gap and 34% is the economic need rate, what is their combined evidence score?",
        helper: "Add 65 and 34.",
        expected: 99,
        datasetTitle: "Evidence Summary",
        rows: evidenceSummaryRows,
        feedback: "Correct. The combined evidence score is 99."
      }
    ]
  }
];

export const challengeQuestions = challengePathData.flatMap((path, pathIndex) =>
  path.questions.map((question, questionIndex) => ({
    ...question,
    id: `${path.id}-${questionIndex + 1}`,
    pathId: path.id,
    pathTitle: path.title,
    pathIndex,
    questionIndex
  }))
);

export const skillQuestionGroups = challengePathSkills.map((skill) => ({
  ...skill,
  questions: challengeQuestions.filter((question) => question.skillId === skill.id)
}));

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
