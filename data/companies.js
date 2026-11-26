export const COMPANIES = [
  {
    id: 'google',
    name: 'Google',
    category: 'Product / FAANG',
    hiringMode: 'On-Campus & Off-Campus',
    color: '#2563eb',
    ctcRange: '₹30 – 45 LPA (SWE L3)',
    difficulty: 'Hard',
    tagline: 'Algorithmic depth, clean code modularity & "Googliness" behavioral alignment.',
    eligibility: {
      cgpa: 'No strict cutoff off-campus (7.0+ recommended on-campus)',
      backlogs: 'No active backlogs at joining',
      branches: 'CS, IT, ECE, EE & relevant technical degrees',
      gradYear: '2025 / 2026 / 2027 (Interns)'
    },
    examPattern: [
      { section: 'Online Coding Assessment (OA)', questions: '2 Coding Problems', duration: '90 mins', marking: 'No negative marking', level: 'Medium–Hard' },
      { section: 'Technical Interview 1', questions: '1–2 DSA Problems + Follow-ups', duration: '45 mins', marking: 'Live Coding (Google Docs/IDE)', level: 'Medium–Hard' },
      { section: 'Technical Interview 2', questions: 'Graphs / DP / Trees + Edge Cases', duration: '45 mins', marking: 'Complexity & Code Quality', level: 'Hard' },
      { section: 'Technical + Googliness Round', questions: 'DSA + Behavioral Scenarios', duration: '45 mins', marking: 'Structured Rubric', level: 'Medium–Hard' }
    ],
    rounds: [
      { title: '1. Resume Shortlist & Online Assessment', desc: '2 algorithmic coding questions focused on Graphs, DP, Sliding Window, or Greedy.' },
      { title: '2. Technical Phone Screen (Off-Campus)', desc: '45-minute live coding interview evaluating problem decomposition and dry-running.' },
      { title: '3. Onsite / Virtual Loop (3–4 Rounds)', desc: 'Pure DSA + CS fundamentals + Googliness (ambiguity handling, collaboration, ethics).' },
      { title: '4. Team Matching & Hiring Committee', desc: 'Independent committee reviews interview packets before final offer extension.' }
    ],
    syllabus: {
      aptitude: ['Not tested separately in SWE rounds'],
      dsa: ['Graphs (BFS/DFS, Dijkstra, Union-Find, Topo Sort)', 'Dynamic Programming (Trees, Bitmask, 2D Grid)', 'Tries & Segment Trees', 'Sliding Window & Binary Search on Answer'],
      technical: ['Time/Space Complexity Proofs', 'Concurrency & Thread-safety basics', 'OOP & Clean Code Testing']
    },
    tips: [
      'Always clarify constraints (N size, negative numbers, duplicates) before coding.',
      'Think aloud continuously; Google interviewers score communication and edge-case testing heavily.',
      'Write bug-free, readable helper functions rather than cramming everything into one block.'
    ]
  },
  {
    id: 'amazon',
    name: 'Amazon',
    category: 'Product / FAANG',
    hiringMode: 'On-Campus & Off-Campus',
    color: '#ea580c',
    ctcRange: '₹24 – 34 LPA (SDE-1)',
    difficulty: 'Medium-Hard',
    tagline: 'DSA problem solving paired heavily with Amazon’s 16 Leadership Principles.',
    eligibility: {
      cgpa: '6.5+ CGPA (varies by campus)',
      backlogs: 'Zero active backlogs',
      branches: 'B.E./B.Tech/M.Tech (CS/IT/Circuit branches)',
      gradYear: '2025 / 2026 / 2027'
    },
    examPattern: [
      { section: 'OA Part 1: Coding', questions: '2 DSA Problems', duration: '70 mins', marking: 'Partial test case scoring', level: 'Medium–Hard' },
      { section: 'OA Part 2: Work Style Assessment', questions: 'Behavioral MCQs', duration: '20 mins', marking: 'LP Alignment', level: 'Behavioral' },
      { section: 'Technical Round 1', questions: '2 DSA Problems (Trees/Arrays/Heap)', duration: '60 mins', marking: 'Live Coding + LP (10m)', level: 'Medium' },
      { section: 'Technical Round 2', questions: 'DSA + CS Core + LLD', duration: '60 mins', marking: 'Code + LP (15m)', level: 'Medium–Hard' },
      { section: 'Bar Raiser Round', questions: 'Deep LP + 1 DSA / Design', duration: '60 mins', marking: 'Veto-level LP check', level: 'Hard' }
    ],
    rounds: [
      { title: '1. Online Assessment (HackerRank)', desc: '2 coding questions + Amazon Work Style & Work Simulation behavioral survey.' },
      { title: '2. Technical Interview 1 & 2', desc: 'DSA (BFS/DFS, Sliding Window, Heaps, Trees) + 2 STAR behavioral questions per round.' },
      { title: '3. Bar Raiser Interview', desc: 'Senior interviewer outside the hiring team evaluates long-term bar & Ownership/Bias for Action.' }
    ],
    syllabus: {
      aptitude: ['Work Simulation Scenarios (Prioritization & Trade-offs)'],
      dsa: ['Trees & BST (LCA, Views, Diameter)', 'Heaps & Priority Queue', 'Graphs (Number of Islands, Course Schedule)', 'Greedy & Intervals', 'Linked Lists & Stacks'],
      technical: ['OS (Threads, Deadlock, Virtual Memory)', 'DBMS (Indexing, Normalization, ACID)', 'OOP & Design Patterns']
    },
    tips: [
      'Prepare 6–8 real STAR stories mapped to Customer Obsession, Ownership, Dive Deep, and Disagree & Commit.',
      'For SDE-1, always propose brute force first, state complexity, then optimize.',
      'Practice LeetCode Amazon-tagged Mediums thoroughly.'
    ]
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    category: 'Product / FAANG',
    hiringMode: 'On-Campus & Off-Campus',
    color: '#0284c7',
    ctcRange: '₹28 – 42 LPA (SDE L59)',
    difficulty: 'Medium-Hard',
    tagline: 'Clean modular coding, CS fundamentals, and pragmatic system thinking.',
    eligibility: {
      cgpa: '7.0+ CGPA on-campus',
      backlogs: 'No standing backlogs',
      branches: 'CS, IT, ECE, EE, Math & Computing',
      gradYear: '2025 / 2026 / 2027'
    },
    examPattern: [
      { section: 'Codility Online Test', questions: '2–3 Coding Problems', duration: '90–110 mins', marking: 'Hidden correctness & perf tests', level: 'Medium' },
      { section: 'Technical Round 1', questions: '2 DSA Problems + Resume', duration: '45 mins', marking: 'Production-ready code', level: 'Medium' },
      { section: 'Technical Round 2', questions: 'DSA + OS/DBMS/LLD', duration: '45 mins', marking: 'System intuition', level: 'Medium–Hard' },
      { section: 'AA (As Appropriate) Round', questions: 'Design + Behavioral + Coding', duration: '45–60 mins', marking: 'Hiring Manager sign-off', level: 'Medium–Hard' }
    ],
    rounds: [
      { title: '1. Codility Assessment', desc: 'Focuses on edge cases (empty inputs, integer overflow, memory limits) — Codility hides test cases!' },
      { title: '2. Technical Rounds (2–3)', desc: 'Linked Lists, Trees, Strings, Binary Search, plus deep dives into internship/project architecture.' },
      { title: '3. Hiring Manager / AA Round', desc: 'Evaluates growth mindset, product thinking, and high-level design.' }
    ],
    syllabus: {
      aptitude: ['Not separate; logical clarity checked in coding'],
      dsa: ['Strings & Arrays', 'Linked Lists (Reverse K-group, Clone Random Ptr)', 'Trees & Traversals', 'DP & Backtracking', 'Binary Search'],
      technical: ['OS (Processes, Mutex vs Semaphore, Paging)', 'DBMS & SQL Queries', 'Computer Networks (TCP vs UDP, HTTP)', 'OOP Principles']
    },
    tips: [
      'On Codility, manually test boundary cases (n=0, n=1, negative values, max constraints) since only sample tests are shown.',
      'Be ready to explain every line of your resume projects including trade-offs.'
    ]
  },
  {
    id: 'tcs',
    name: 'TCS (NQT / Digital / Prime)',
    category: 'Service & Consulting',
    hiringMode: 'On-Campus & Off-Campus (NQT)',
    color: '#4f46e5',
    ctcRange: '₹3.36 LPA (Ninja) | ₹7 LPA (Digital) | ₹9–11.5 LPA (Prime)',
    difficulty: 'Easy-Medium',
    tagline: 'Structured National Qualifier Test (NQT) rewarding speed in Aptitude + clean coding.',
    eligibility: {
      cgpa: '60% or 6.0 CGPA in 10th, 12th, and Graduation',
      backlogs: 'Max 1 pending backlog at exam time (0 at joining); gap ≤ 24 months',
      branches: 'All Engineering, MCA, M.Sc (CS/IT)',
      gradYear: '2025 / 2026'
    },
    examPattern: [
      { section: 'Foundation: Numerical Ability', questions: '20 Questions', duration: '25 mins', marking: 'No negative marking', level: 'Easy–Medium' },
      { section: 'Foundation: Verbal Ability', questions: '25 Questions', duration: '25 mins', marking: 'No negative marking', level: 'Easy' },
      { section: 'Foundation: Reasoning Ability', questions: '20 Questions', duration: '25 mins', marking: 'No negative marking', level: 'Easy–Medium' },
      { section: 'Advanced: Quant + Reasoning', questions: '15 Questions', duration: '25 mins', marking: 'Determines Digital/Prime', level: 'Medium–Hard' },
      { section: 'Advanced: Coding', questions: '2 Coding Problems', duration: '90 mins (35 + 55)', marking: 'All test cases pass for Prime', level: 'Easy–Hard' }
    ],
    rounds: [
      { title: '1. TCS NQT Integrated Test', desc: 'Single adaptive-style online exam. Your Advanced score decides Ninja vs Digital vs Prime interview shortlist.' },
      { title: '2. Technical + Managerial + HR Interview', desc: 'Panel interview covering coding logic, SQL, OOP, final-year project, and relocation/shift readiness.' }
    ],
    syllabus: {
      aptitude: ['Percentages, Profit & Loss, Ratio', 'Time & Work, Pipes & Cisterns', 'Time, Speed & Distance', 'Permutations, Combinations & Probability', 'Number System & Divisibility', 'Syllogisms, Blood Relations, Seating Arrangement'],
      dsa: ['Arrays & Number Manipulation', 'Strings & Pattern Matching', 'Stacks/Queues Basics', 'Sorting, Hashing & Basic DP (for Prime)'],
      technical: ['OOPs (Java/C++/Python)', 'SQL Joins & Normalization', 'SDLC & Cloud Basics']
    },
    tips: [
      'Speed matters in Foundation NQT because sectional timers are strict and you cannot revisit prior sections.',
      'To unlock TCS Prime (₹9–11.5 LPA), aim to pass all test cases on both coding questions.'
    ]
  },
  {
    id: 'infosys',
    name: 'Infosys (SE / DSE / SP)',
    category: 'Service & Consulting',
    hiringMode: 'On-Campus & HackWithInfy',
    color: '#0369a1',
    ctcRange: '₹3.6 LPA (SE) | ₹6.25 LPA (DSE) | ₹9.5 LPA (SP)',
    difficulty: 'Easy-Hard (Role dependent)',
    tagline: 'Dual hiring track: Aptitude-driven SE and Competitive-Coding-driven DSE/SP.',
    eligibility: {
      cgpa: '60% across 10th, 12th, and Degree (6.0+ CGPA)',
      backlogs: 'No active backlogs',
      branches: 'B.E./B.Tech/M.E./M.Tech/MCA/M.Sc',
      gradYear: '2025 / 2026'
    },
    examPattern: [
      { section: 'Reasoning Ability', questions: '15 Questions', duration: '25 mins', marking: 'No negative marking', level: 'Medium' },
      { section: 'Mathematical Ability', questions: '10 Questions', duration: '35 mins', marking: 'No negative marking', level: 'Medium' },
      { section: 'Verbal Ability', questions: '20 Questions', duration: '20 mins', marking: 'No negative marking', level: 'Easy–Medium' },
      { section: 'Pseudocode & Puzzle Solving', questions: '5 + 4 Questions', duration: '20 mins', marking: 'Logical trace', level: 'Medium' },
      { section: 'SP / DSE Coding Round (HackWithInfy)', questions: '3 Coding Questions', duration: '180 mins', marking: 'Easy, Medium, Hard', level: 'Medium–Hard' }
    ],
    rounds: [
      { title: '1. Online Aptitude / HackWithInfy Test', desc: 'SE candidates take the 5-section aptitude + pseudocode test; SP/DSE take 3-hour coding.' },
      { title: '2. Technical + HR Interview', desc: 'Questions on your primary programming language, DBMS, project architecture, and behavioral fit.' }
    ],
    syllabus: {
      aptitude: ['Cryptarithmetic & Puzzles', 'Data Interpretation & Sufficiency', 'Time & Work, Probability', 'Reading Comprehension & Sentence Correction'],
      dsa: ['Greedy & Bit Manipulation', 'Dynamic Programming (SP Track)', 'Graphs & Trees', 'Two Pointers & Prefix Sums'],
      technical: ['DBMS & SQL', 'OOP Concepts', 'Basic Web/Cloud Concepts']
    },
    tips: [
      'Infosys loves Puzzles and Pseudocode tracing (bitwise operators, recursion output).',
      'For SP via HackWithInfy, solving 2+ problems cleanly puts you in contention for ₹9.5 LPA.'
    ]
  },
  {
    id: 'atlassian',
    name: 'Atlassian',
    category: 'Product / SaaS',
    hiringMode: 'On-Campus & Off-Campus',
    color: '#1d4ed8',
    ctcRange: '₹36 – 45 LPA (P30)',
    difficulty: 'Hard',
    tagline: 'Practical Machine Coding, Data Structures in real-world APIs, and Value alignment.',
    eligibility: {
      cgpa: '7.0+ CGPA (On-campus)',
      backlogs: 'Zero active backlogs',
      branches: 'CS / IT / Circuit branches',
      gradYear: '2025 / 2026'
    },
    examPattern: [
      { section: 'HackerRank OA', questions: '3 Coding Problems', duration: '90 mins', marking: 'Full test suite', level: 'Medium–Hard' },
      { section: 'Code Design Round', questions: 'Build working class/API (e.g. Rate Limiter)', duration: '60 mins', marking: 'Modularity, Tests, Extensibility', level: 'Medium–Hard' },
      { section: 'DSA / Problem Solving Round', questions: '1–2 Real-world Data Structure problems', duration: '60 mins', marking: 'Working code + unit tests', level: 'Medium–Hard' },
      { section: 'Values & Management Interview', questions: 'Behavioral & Teamwork Scenarios', duration: '45 mins', marking: '5 Atlassian Values', level: 'Behavioral' }
    ],
    rounds: [
      { title: '1. Online Assessment', desc: '3 algorithmic problems testing HashMaps, Graphs, Strings, and Intervals.' },
      { title: '2. Code Design (LLD)', desc: 'Design and implement a clean system like File System, Snake Game, or Rate Limiter with unit tests.' },
      { title: '3. Data Structures + Values Round', desc: 'Focuses on clean interfaces, edge-case testing, and "Open company, no bullshit" culture fit.' }
    ],
    syllabus: {
      aptitude: ['None'],
      dsa: ['HashMaps & Custom Data Structures', 'Graphs & BFS', 'Heaps & Rate Limiting Windows', 'Tries'],
      technical: ['Object-Oriented Design & SOLID', 'Unit Testing (JUnit/Pytest/Jest)', 'Concurrency & Thread Safety']
    },
    tips: [
      'Write actual unit tests during your Code Design interview — Atlassian heavily rewards testable design.',
      'Avoid over-engineering; focus on clean interfaces, readable naming, and extensibility.'
    ]
  },
  {
    id: 'flipkart',
    name: 'Flipkart',
    category: 'Product / E-Commerce',
    hiringMode: 'On-Campus & Flipkart GRiD',
    color: '#ca8a04',
    ctcRange: '₹26 – 32 LPA (SDE-1)',
    difficulty: 'Hard',
    tagline: 'Famous for its Machine Coding (90-min LLD) round alongside strong DSA.',
    eligibility: {
      cgpa: '7.0+ CGPA on-campus (No cutoff in GRiD)',
      backlogs: 'No active backlogs',
      branches: 'All Engineering branches via GRiD; CS/IT/ECE on-campus',
      gradYear: '2025 / 2026 / 2027'
    },
    examPattern: [
      { section: 'Online Coding Round', questions: '3 DSA Problems', duration: '90 mins', marking: 'All test cases', level: 'Medium–Hard' },
      { section: 'Machine Coding Round', questions: '1 End-to-End OOP Application', duration: '90 mins + 30m eval', marking: 'Runnable demo + Clean LLD', level: 'Hard' },
      { section: 'Problem Solving & DSA Round', questions: '2–3 DSA Problems', duration: '60 mins', marking: 'Optimal complexity', level: 'Medium–Hard' },
      { section: 'Hiring Manager Round', questions: 'Projects + Culture + Design', duration: '45 mins', marking: 'Ownership & Depth', level: 'Medium' }
    ],
    rounds: [
      { title: '1. Screening OA / GRiD Hackathon', desc: 'Timed DSA coding or team product build.' },
      { title: '2. Machine Coding (90 mins)', desc: 'Build a working CLI/in-memory app (e.g., Splitwise, Parking Lot, Cab Booking, Issue Tracker).' },
      { title: '3. Problem Solving + Hiring Manager', desc: 'Pure algorithmic problem-solving followed by deep project and product sense discussions.' }
    ],
    syllabus: {
      aptitude: ['None (MCQs in GRiD Round 1 cover CS & E-commerce tech)'],
      dsa: ['Graphs, Topological Sort, Shortest Path', 'Dynamic Programming', 'Monotonic Stack & Sliding Window', 'Trees'],
      technical: ['LLD / Machine Coding Patterns (Strategy, Factory, Observer)', 'Concurrency & Locking', 'DBMS Indexing']
    },
    tips: [
      'In Machine Coding, make sure your code compiles and runs end-to-end with a clean Driver/Main test script.',
      'Separate Models, Services, Repositories, and Exceptions cleanly.'
    ]
  },
  {
    id: 'goldman-sachs',
    name: 'Goldman Sachs',
    category: 'FinTech / Investment Bank',
    hiringMode: 'On-Campus & Engineering Campus Hiring Program',
    color: '#0f766e',
    ctcRange: '₹22 – 28 LPA (Analyst)',
    difficulty: 'Medium-Hard',
    tagline: 'Blends Algorithmic Coding with Mathematical Probability, Quant & CS Core.',
    eligibility: {
      cgpa: '7.0+ CGPA recommended',
      backlogs: 'No active backlogs',
      branches: 'All Engineering / Quantitative branches',
      gradYear: '2025 / 2026 / 2027'
    },
    examPattern: [
      { section: 'Section 1: Coding', questions: '2 Programming Questions', duration: '30 mins', marking: 'Full test cases', level: 'Medium' },
      { section: 'Section 2: Quantitative Aptitude', questions: '10–12 Math/Prob MCQs', duration: '25 mins', marking: '+5 / -2 negative marking', level: 'Hard' },
      { section: 'Section 3: CS Fundamentals', questions: '7–10 CS MCQs', duration: '20 mins', marking: '+5 / -2 negative marking', level: 'Medium' },
      { section: 'Section 4: Subjective / Advanced Coding', questions: '1 Hard Coding + 2 Essays', duration: '45 mins', marking: 'Evaluated manually', level: 'Hard' }
    ],
    rounds: [
      { title: '1. GS Aptitude + Coding OA', desc: 'Be cautious of negative marking in MCQ sections; accuracy beats blind guessing.' },
      { title: '2. Technical Interviews (2–3 Rounds)', desc: 'DSA (DP, Arrays, HashMaps) + Math Puzzles + OS/SQL/Java internals.' },
      { title: '3. MD / VP Final Round', desc: 'Motivation for finance-tech, past projects, and situational judgment.' }
    ],
    syllabus: {
      aptitude: ['Probability & Bayes Theorem', 'Permutations & Combinations', 'Expected Value & Statistics', 'Linear Algebra & Calculus Basics'],
      dsa: ['Dynamic Programming (Stock Buy/Sell, Knapsack)', 'Arrays & Prefix Sums', 'Trees & Graphs', 'Heap & Sliding Window'],
      technical: ['Java Collections & Multithreading', 'DBMS Transactions & Isolation Levels', 'OS Deadlocks & Memory']
    },
    tips: [
      'Practice standard quant/probability brainteasers (e.g., expected coin flips, conditional probability).',
      'Skip uncertain MCQs in the OA due to negative marking!'
    ]
  },
  {
    id: 'zoho',
    name: 'Zoho',
    category: 'Product / SaaS',
    hiringMode: 'On-Campus & Off-Campus Drives',
    color: '#dc2626',
    ctcRange: '₹7 – 12 LPA (Software Developer)',
    difficulty: 'Medium',
    tagline: 'Pure programming logic without library shortcuts — C/Java mastery shines.',
    eligibility: {
      cgpa: 'Flexible (often no strict CGPA cutoff)',
      backlogs: 'Graduated or final year with 0 backlogs at joining',
      branches: 'Any degree with strong coding fundamentals',
      gradYear: '2024 / 2025 / 2026'
    },
    examPattern: [
      { section: 'Round 1: Aptitude & C Output', questions: '20–30 MCQs', duration: '60 mins', marking: 'No negative marking', level: 'Medium' },
      { section: 'Round 2: Basic Programming', questions: '5–6 Coding Problems', duration: '90–120 mins', marking: 'In-person invigilated', level: 'Easy–Medium' },
      { section: 'Round 3: Advanced Programming (Module Design)', questions: '1 Console App (e.g. Railway/Taxi Booking)', duration: '120–180 mins', marking: 'OOP & Edge cases', level: 'Medium–Hard' },
      { section: 'Round 4 & 5: Tech + HR', questions: 'DB Design, Puzzles, HR', duration: '45 mins', marking: 'Overall clarity', level: 'Medium' }
    ],
    rounds: [
      { title: '1. Written Aptitude + C/Java Code Tracing', desc: 'Pointer arithmetic, loops, recursion traces, and quant aptitude.' },
      { title: '2. Short Coding Problems', desc: 'Solve array/string/matrix problems WITHOUT built-in sort/regex helpers if restricted.' },
      { title: '3. Console Application Design', desc: 'Build a multi-feature menu-driven console app (Lift system, Call Taxi Booking, Chess validator).' }
    ],
    syllabus: {
      aptitude: ['Time & Work, Speed & Distance', 'Puzzles & Number Series', 'Ratios & Profit/Loss'],
      dsa: ['2D Matrix Rotation & Spirals', 'String Parsing without built-ins', 'Recursion & Backtracking (Sudoku/N-Queens)', 'Custom Sorting'],
      technical: ['C Pointers & Memory', 'OOP Design', 'RDBMS Schema Design']
    },
    tips: [
      'Practice writing string manipulation and sorting logic from scratch without STL/Collections shortcuts.',
      'For Round 3, design clean classes and handle invalid user inputs gracefully.'
    ]
  },
  {
    id: 'accenture',
    name: 'Accenture',
    category: 'Service & Consulting',
    hiringMode: 'On-Campus & Off-Campus',
    color: '#7c3aed',
    ctcRange: '₹4.5 LPA (ASE) | ₹6.5 LPA (AASE)',
    difficulty: 'Easy-Medium',
    tagline: 'Cognitive, Technical MCQ & Coding elimination rounds with communication check.',
    eligibility: {
      cgpa: '65% or 6.5 CGPA (varies slightly by college)',
      backlogs: 'No active backlogs at the time of application',
      branches: 'All B.E./B.Tech, MCA, M.Sc (CS/IT)',
      gradYear: '2025 / 2026'
    },
    examPattern: [
      { section: 'Cognitive & Technical Assessment', questions: '90 Questions (Aptitude + Pseudo + Cloud/Net)', duration: '90 mins', marking: 'Elimination Round', level: 'Easy–Medium' },
      { section: 'Coding Assessment', questions: '2 Coding Problems', duration: '45 mins', marking: 'Unlocks after clearing Round 1', level: 'Easy–Medium' },
      { section: 'Communication Assessment', questions: 'Reading, Listening, Storytelling', duration: '25 mins', marking: 'AI-evaluated fluency', level: 'Easy' },
      { section: 'Final Interview (Tech + HR)', questions: 'Projects + Behavioral', duration: '25 mins', marking: 'Holistic evaluation', level: 'Easy–Medium' }
    ],
    rounds: [
      { title: '1. Cognitive & Technical Assessment', desc: 'Covers English, Critical Reasoning, Abstract Reasoning, Pseudocode, Common Apps (MS Office), and Cloud/Networking.' },
      { title: '2. Coding Round (Same Day)', desc: '2 straightforward array/string/math coding problems.' },
      { title: '3. Communication & Interview', desc: 'Speak clearly in a quiet environment for the automated voice test, followed by Tech+HR.' }
    ],
    syllabus: {
      aptitude: ['Syllogisms & Statement Assumptions', 'Flowcharts & Abstract Patterns', 'Grammar & Sentence Completion'],
      dsa: ['Basic Arrays & Strings', 'Number Theory (LCM/GCD, Prime, Palindrome)', 'Simple Hashing'],
      technical: ['Pseudocode (Bitwise XOR/AND, Loops)', 'Computer Networks & Security Basics', 'Cloud Computing Fundamentals']
    },
    tips: [
      'Round 1 is an immediate elimination gate—do not neglect Pseudocode and Networking MCQs.',
      'Use a wired headset in a quiet room for the Communication Assessment.'
    ]
  }
];
