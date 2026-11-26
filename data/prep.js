export const PREP_TRACKS = {
  aptitude: {
    id: 'aptitude',
    label: 'Aptitude',
    subtitle: 'Quantitative Aptitude, Logical Reasoning & Verbal Ability notes with timed practice MCQs.',
    topics: [
      {
        id: 'apt-percent-profit',
        title: 'Percentages, Profit & Loss',
        tag: 'Quantitative',
        readTime: '8 min read',
        notes: [
          {
            heading: 'Core Percentage Equivalents (Must Memorize)',
            body: 'Converting fractions directly into percentages saves 30–40 seconds per question in TCS NQT, Infosys, and Accenture tests.',
            formula: '1/2 = 50%  |  1/3 = 33.33%  |  1/4 = 25%  |  1/5 = 20%\n1/6 = 16.67%  |  1/7 = 14.28%  |  1/8 = 12.5%  |  1/9 = 11.11%\n1/11 = 9.09%  |  1/12 = 8.33%  |  1/15 = 6.67%  |  1/16 = 6.25%'
          },
          {
            heading: 'Successive Percentage Change & Profit/Loss',
            body: 'When a value changes successively by a% and b% (e.g., markup followed by discount, or consecutive price hikes), use the net change formula.',
            formula: 'Net % Change = a + b + (a × b) / 100\nProfit % = ((SP - CP) / CP) × 100\nDiscount % = ((MP - SP) / MP) × 100\nCP : MP Ratio = (100 - Discount%) : (100 + Profit%)'
          },
          {
            heading: 'Solved Shortcut Example',
            body: 'A shopkeeper marks goods 40% above CP and gives a 20% discount. Net profit % = +40 - 20 + (40 × -20)/100 = 20 - 8 = 12% profit.'
          }
        ],
        quiz: [
          {
            id: 'q-pct-1',
            question: 'A trader marks his goods 50% above cost price and allows a discount of 20%. What is his net profit percentage?',
            options: ['20%', '25%', '30%', '15%'],
            correctIndex: 0,
            explanation: 'Using successive change: +50 - 20 + (50 × -20)/100 = 30 - 10 = 20% profit.'
          },
          {
            id: 'q-pct-2',
            question: 'If the price of sugar increases by 25%, by what percentage must a household reduce consumption to keep expenditure unchanged?',
            options: ['25%', '20%', '16.67%', '15%'],
            correctIndex: 1,
            explanation: '25% increase = +1/4. To neutralize, reduce by 1/(4+1) = 1/5 = 20%.'
          },
          {
            id: 'q-pct-3',
            question: 'By selling an article for ₹720, a person incurs a loss of 10%. At what price should he sell it to gain 15%?',
            options: ['₹880', '₹900', '₹920', '₹960'],
            correctIndex: 2,
            explanation: '90% of CP = 720 ⇒ CP = 800. For 15% gain: SP = 800 × 1.15 = ₹920.'
          }
        ]
      },
      {
        id: 'apt-time-work',
        title: 'Time, Work & Pipes',
        tag: 'Quantitative',
        readTime: '7 min read',
        notes: [
          {
            heading: 'LCM Efficiency Method (Zero Fractions)',
            body: 'Instead of solving with 1/A + 1/B fractions, assume Total Work = LCM(days taken). Then Daily Efficiency = Total Work / Days.',
            formula: 'Total Work = Efficiency × Time\nIf A takes 12 days and B takes 15 days:\nTotal Work = LCM(12, 15) = 60 units\nEff(A) = 5 units/day, Eff(B) = 4 units/day\nTogether = 60 / (5 + 4) = 6.67 days'
          },
          {
            heading: 'Chain Rule (MDH Formula)',
            body: 'For workforce scaling problems involving Men (M), Days (D), Hours/day (H), and Work (W):',
            formula: '(M1 × D1 × H1) / W1 = (M2 × D2 × H2) / W2'
          }
        ],
        quiz: [
          {
            id: 'q-tw-1',
            question: 'A can finish a task in 12 days and B in 18 days. They work together for 4 days, after which A leaves. How many more days will B take to finish the remaining work?',
            options: ['6 days', '8 days', '10 days', '12 days'],
            correctIndex: 1,
            explanation: 'Total Work = LCM(12,18) = 36 units. Eff(A)=3, Eff(B)=2. In 4 days together: 4×(3+2) = 20 units done. Remaining = 16 units. B alone takes 16 / 2 = 8 days.'
          },
          {
            id: 'q-tw-2',
            question: 'Pipe A fills a tank in 10 hours and Pipe B empties it in 15 hours. If both are opened together, in how many hours will the tank be full?',
            options: ['25 hours', '30 hours', '20 hours', '12 hours'],
            correctIndex: 1,
            explanation: 'LCM(10,15) = 30L. Net fill rate = +3 - 2 = 1L/hr. Time = 30 / 1 = 30 hours.'
          }
        ]
      },
      {
        id: 'apt-tsd-prob',
        title: 'Time, Speed, Distance & Probability',
        tag: 'Quantitative',
        readTime: '9 min read',
        notes: [
          {
            heading: 'Relative Speed & Average Speed',
            body: 'Always convert km/h to m/s by multiplying by 5/18 (and m/s to km/h by 18/5).',
            formula: 'Opposite directions: Relative Speed = S1 + S2\nSame direction: Relative Speed = |S1 - S2|\nEqual distances at S1 and S2: Avg Speed = (2 × S1 × S2) / (S1 + S2)'
          },
          {
            heading: 'Permutations, Combinations & Probability',
            body: 'Use nPr when order matters (arrangements, passwords) and nCr when only selection matters (committees, handshakes).',
            formula: 'P(A) = Favorable Outcomes / Total Outcomes\nP(at least one) = 1 - P(none)\nCircular arrangements of n distinct items = (n - 1)!'
          }
        ],
        quiz: [
          {
            id: 'q-tsd-1',
            question: 'A train 150 m long passes a pole in 15 seconds and another train of the same length travelling in the opposite direction in 12 seconds. What is the speed of the second train?',
            options: ['15 m/s', '10 m/s', '20 m/s', '12 m/s'],
            correctIndex: 0,
            explanation: 'Speed of Train 1 = 150/15 = 10 m/s. Combined distance = 150+150 = 300 m. Relative speed = 300/12 = 25 m/s. Speed of Train 2 = 25 - 10 = 15 m/s.'
          },
          {
            id: 'q-tsd-2',
            question: 'Two fair dice are thrown simultaneously. What is the probability that the sum of the two numbers is at least 10?',
            options: ['1/6', '1/9', '5/36', '1/12'],
            correctIndex: 0,
            explanation: 'Favorable sums ≥ 10: (4,6),(5,5),(6,4) [sum 10], (5,6),(6,5) [sum 11], (6,6) [sum 12] → 6 out of 36 = 1/6.'
          }
        ]
      },
      {
        id: 'apt-logical-verbal',
        title: 'Logical Reasoning & Verbal Mastery',
        tag: 'Reasoning & Verbal',
        readTime: '6 min read',
        notes: [
          {
            heading: 'Syllogisms via Venn Diagrams',
            body: 'Draw the minimal-overlap Venn diagram first. A conclusion is definitely true ONLY if it holds across all valid diagrams. Watch out for "Either-Or" complementary pairs (Some A are B + No A is B).'
          },
          {
            heading: 'Verbal Error Spotting Checklist',
            body: '80% of placement verbal errors fall into 4 buckets: Subject-Verb Agreement (collective nouns, either/or takes nearest subject), Tense Parallelism, Preposition pairs (prefer X to Y, comply with), and Modifier placement.'
          }
        ],
        quiz: [
          {
            id: 'q-log-1',
            question: 'Find the next number in the series: 3, 10, 29, 66, 127, ?',
            options: ['216', '218', '220', '214'],
            correctIndex: 1,
            explanation: 'Pattern is n³ + 2: 1³+2=3, 2³+2=10, 3³+2=29, 4³+2=66, 5³+2=127, 6³+2=218.'
          },
          {
            id: 'q-log-2',
            question: 'Statements: All servers are nodes. Some nodes are clusters. Conclusions: I. Some servers are clusters. II. All clusters are nodes.',
            options: ['Only I follows', 'Only II follows', 'Both I and II follow', 'Neither I nor II follows'],
            correctIndex: 3,
            explanation: 'Servers and clusters need not overlap, and only some (not necessarily all) nodes are clusters. Neither definitely follows.'
          }
        ]
      }
    ]
  },

  dsa: {
    id: 'dsa',
    label: 'DSA Concepts',
    subtitle: 'Pattern-based algorithmic intuition, complexity analysis & interactive code walkthroughs.',
    topics: [
      {
        id: 'dsa-complexity',
        title: 'Time & Space Complexity + Constraints Guide',
        tag: 'Foundations',
        readTime: '6 min read',
        notes: [
          {
            heading: 'Reading Input Constraints (N) to Guess the Algorithm',
            body: 'Most online judges execute ~10^8 basic operations per second. Use constraint N in the problem statement to immediately narrow down the intended time complexity.',
            formula: 'N ≤ 12       → O(N!) / Exponential Backtracking\nN ≤ 20       → O(2^N) Bitmask DP / Recursion\nN ≤ 500      → O(N³) Floyd-Warshall / 3-nested loops\nN ≤ 5,000    → O(N²) DP / Nested pairs\nN ≤ 10^5     → O(N log N) Sorting, Binary Search, Heap, SegTree\nN ≤ 10^6     → O(N) Two Pointers, Sliding Window, Prefix Sum, Hashing\nN ≤ 10^9+    → O(log N) or O(1) Binary Search / Math'
          },
          {
            heading: 'Amortized & Recursion Space',
            body: 'Dynamic arrays (vector/list) resize in O(1) amortized time. Recursive DFS takes O(H) auxiliary stack space where H is tree height (O(N) worst-case skewed tree, O(log N) balanced).'
          }
        ],
        quiz: [
          {
            id: 'q-dsa-1',
            question: 'If a problem gives N ≤ 10^5 and asks for the longest subarray with sum ≤ K (all positive integers), which complexity should you target?',
            options: ['O(N²)', 'O(N log N) or O(N)', 'O(2^N)', 'O(N³)'],
            correctIndex: 1,
            explanation: 'For N = 10^5, O(N²) requires 10^10 ops (TLE). Since elements are positive, Sliding Window solves it in O(N) time and O(1) space.'
          },
          {
            id: 'q-dsa-2',
            question: 'What is the time complexity of building a binary heap from an unsorted array of N elements using bottom-up heapify?',
            options: ['O(N log N)', 'O(N)', 'O(log N)', 'O(N²)'],
            correctIndex: 1,
            explanation: 'Bottom-up Floyd’s heap construction takes O(N) time because most nodes are near the leaves with small sift-down distances.'
          }
        ]
      },
      {
        id: 'dsa-sliding-window',
        title: 'Two Pointers & Sliding Window',
        tag: 'Core Pattern',
        readTime: '8 min read',
        notes: [
          {
            heading: 'When to Apply Sliding Window',
            body: 'Use Sliding Window for contiguous subarray or substring problems where expanding the right pointer monotonically affects a condition (or fixed window size K).',
            formula: 'Template:\nleft = 0\nfor right in range(n):\n    add(arr[right])\n    while window_invalid():\n        remove(arr[left])\n        left += 1\n    ans = max(ans, right - left + 1)'
          },
          {
            heading: 'Monotonicity Caveat',
            body: 'Standard shrinking sliding window fails when negative numbers exist in subarray-sum targets! In that case, switch to Prefix Sum + HashMap (for exact sum) or Prefix Sum + Monotonic Deque (for shortest subarray ≥ K).'
          }
        ],
        quiz: [
          {
            id: 'q-sw-1',
            question: 'Why does the standard two-pointer sliding window fail on "Longest Subarray with Sum = K" when negative numbers are present?',
            options: [
              'Pointers cannot move backwards',
              'Adding elements no longer guarantees the sum increases monotonically',
              'HashMaps do not support negative keys',
              'Space becomes O(N²)'
            ],
            correctIndex: 1,
            explanation: 'With negative numbers, shrinking from the left could increase or decrease the sum, breaking the greedy shrink invariant. Prefix Sum + HashMap handles negatives in O(N).'
          }
        ],
        codeSnippet: {
          title: 'Longest Substring Without Repeating Characters — O(N)',
          lang: 'python',
          code: `def length_of_longest_substring(s: str) -> int:
    last_seen = {}
    left = 0
    best = 0
    for right, ch in enumerate(s):
        if ch in last_seen and last_seen[ch] >= left:
            left = last_seen[ch] + 1
        last_seen[ch] = right
        best = max(best, right - left + 1)
    return best`
        }
      },
      {
        id: 'dsa-binary-search',
        title: 'Binary Search on Answer',
        tag: 'Core Pattern',
        readTime: '7 min read',
        notes: [
          {
            heading: 'Recognizing Binary Search on Monotonic Predicates',
            body: 'Whenever a problem asks to "minimize the maximum" or "maximize the minimum" over a continuous/integer search space [low, high], check if feasibility is monotonic (FFFTTTT or TTTTFFF).',
            formula: 'Examples: Koko Eating Bananas, Allocate Minimum Pages, Aggressive Cows, Capacity to Ship Packages.\nComplexity: O(N log(Range))'
          }
        ],
        quiz: [
          {
            id: 'q-bs-1',
            question: 'In "Aggressive Cows" (maximize minimum distance between C cows in N stalls), what is the search space for Binary Search on Answer?',
            options: [
              '0 to N-1',
              '1 to (max_stall - min_stall)',
              '0 to sum of stall positions',
              'C to N'
            ],
            correctIndex: 1,
            explanation: 'The minimum possible distance is 1 (distinct stalls) and maximum possible distance is between the first and last sorted stall.'
          }
        ],
        codeSnippet: {
          title: 'Binary Search on Answer Template',
          lang: 'python',
          code: `def binary_search_min_feasible(low: int, high: int, is_valid) -> int:
    ans = high
    while low <= high:
        mid = low + (high - low) // 2
        if is_valid(mid):
            ans = mid
            high = mid - 1  # try smaller valid answer
        else:
            low = mid + 1
    return ans`
        }
      },
      {
        id: 'dsa-graphs-dp',
        title: 'Graphs & Dynamic Programming Blueprint',
        tag: 'Advanced',
        readTime: '10 min read',
        notes: [
          {
            heading: 'Graph Algorithm Selector',
            body: 'Pick your shortest-path or traversal tool immediately from edge weights and graph structure:',
            formula: 'Unweighted Shortest Path → BFS  O(V + E)\nNon-negative Weights     → Dijkstra + Min-Heap  O((V + E) log V)\nNegative Weights         → Bellman-Ford  O(V × E)\nDAG Dependencies         → Kahn’s Topological Sort (BFS)  O(V + E)\nDynamic Connectivity     → Disjoint Set Union (Union by Rank + Path Compression)'
          },
          {
            heading: '4-Step DP Framework',
            body: '1) Define state dp[i][...] in plain English. 2) Write base cases. 3) Write transition choices (take vs skip, partition at k). 4) Optimize space using 1D rolling array if transition only depends on previous row.'
          }
        ],
        quiz: [
          {
            id: 'q-gd-1',
            question: 'Which algorithm detects negative weight cycles in a directed graph?',
            options: ['Dijkstra', 'Prim’s MST', 'Bellman-Ford', 'Kahn’s Algorithm'],
            correctIndex: 2,
            explanation: 'Bellman-Ford relaxes all edges V-1 times; if any edge can still be relaxed on the V-th iteration, a negative weight cycle exists.'
          }
        ]
      }
    ]
  },

  technical: {
    id: 'technical',
    label: 'Technical (CS Core)',
    subtitle: 'Operating Systems, DBMS & SQL, Computer Networks, OOP & System Design notes + MCQs.',
    topics: [
      {
        id: 'tech-os',
        title: 'Operating Systems (OS)',
        tag: 'CS Core',
        readTime: '9 min read',
        notes: [
          {
            heading: 'Process vs Thread',
            body: 'A Process is an independent program in execution with its own isolated virtual address space (Code, Data, Heap, Stack). A Thread is the smallest unit of CPU execution inside a process; threads share Code, Data, and Heap, while each thread has its own Stack and Registers.'
          },
          {
            heading: 'Deadlock: 4 Coffman Conditions',
            body: 'Deadlock occurs if and only if ALL four hold simultaneously: 1) Mutual Exclusion, 2) Hold and Wait, 3) No Preemption, 4) Circular Wait. Breaking any one prevents deadlock (e.g., ordering lock acquisition breaks Circular Wait).'
          },
          {
            heading: 'Virtual Memory, Paging & Thrashing',
            body: 'Paging divides physical memory into Frames and logical memory into Pages, eliminating external fragmentation. TLB caches recent page-table translations. Thrashing occurs when active processes spend more time swapping pages (page faults) than executing instructions.'
          }
        ],
        quiz: [
          {
            id: 'q-os-1',
            question: 'Which memory segment is NOT shared among threads of the same process?',
            options: ['Heap', 'Global Data', 'Code / Text segment', 'Thread Stack & CPU Registers'],
            correctIndex: 3,
            explanation: 'Threads share heap, code, global variables, and open file descriptors, but each thread maintains its own call stack and register state.'
          },
          {
            id: 'q-os-2',
            question: 'Enforcing a strict global ordering when acquiring multiple mutexes prevents deadlock by violating which Coffman condition?',
            options: ['Mutual Exclusion', 'Hold and Wait', 'Circular Wait', 'No Preemption'],
            correctIndex: 2,
            explanation: 'If locks are always acquired in increasing ID order, a cycle in the wait-for graph cannot form, breaking Circular Wait.'
          }
        ]
      },
      {
        id: 'tech-dbms',
        title: 'DBMS, ACID & SQL Mastery',
        tag: 'CS Core',
        readTime: '9 min read',
        notes: [
          {
            heading: 'ACID Properties & Isolation Levels',
            body: 'Atomicity (all-or-nothing via undo logs), Consistency (constraints preserved), Isolation (concurrent transactions don’t corrupt state), Durability (committed data survives crashes via WAL).',
            formula: 'Isolation Levels (weakest → strongest):\nRead Uncommitted → Dirty Reads possible\nRead Committed   → Prevents Dirty Reads (Non-repeatable reads possible)\nRepeatable Read  → Prevents Non-repeatable Reads (MySQL InnoDB default)\nSerializable     → Prevents Phantom Reads too'
          },
          {
            heading: 'Normalization & B+ Tree Indexing',
            body: '1NF (atomic values), 2NF (no partial dependency on composite key), 3NF (no transitive dependency on non-prime key), BCNF (every determinant is a superkey). B+ Trees keep all data pointers in leaf nodes linked sequentially, making range queries fast.'
          }
        ],
        quiz: [
          {
            id: 'q-db-1',
            question: 'Which SQL clause filters groups created by GROUP BY, whereas WHERE filters individual rows before grouping?',
            options: ['ORDER BY', 'HAVING', 'DISTINCT', 'OVER()'],
            correctIndex: 1,
            explanation: 'Execution order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY. HAVING filters aggregated groups.'
          },
          {
            id: 'q-db-2',
            question: 'Why do relational databases typically use B+ Trees instead of Hash Indexes as the default index structure?',
            options: [
              'B+ Trees take O(1) lookup always',
              'B+ Trees support efficient range queries (BETWEEN, >, <) and sorted scans',
              'Hash indexes cannot store strings',
              'B+ Trees require zero disk I/O'
            ],
            correctIndex: 1,
            explanation: 'Hash indexes only accelerate equality (=) lookups, whereas B+ Trees keep keys sorted and leaf nodes linked for fast range queries.'
          }
        ]
      },
      {
        id: 'tech-cn',
        title: 'Computer Networks & Web Protocols',
        tag: 'CS Core',
        readTime: '8 min read',
        notes: [
          {
            heading: 'What Happens When You Type a URL in the Browser?',
            body: '1) DNS Resolution (Browser cache → OS cache → Recursive Resolver → Root/TLD/Authoritative NS). 2) TCP 3-Way Handshake (SYN → SYN-ACK → ACK). 3) TLS Handshake (key exchange & cert verification for HTTPS). 4) HTTP Request/Response & DOM rendering.'
          },
          {
            heading: 'TCP vs UDP & HTTP Status Codes',
            body: 'TCP is connection-oriented, reliable, ordered with congestion control (used in HTTP, SSH, DB connections). UDP is connectionless, low-overhead (used in DNS, video streaming, gaming).',
            formula: '200 OK | 201 Created | 301 Permanent Redirect | 400 Bad Request\n401 Unauthorized (Unauthenticated) | 403 Forbidden | 404 Not Found\n429 Too Many Requests | 500 Internal Error | 503 Service Unavailable'
          }
        ],
        quiz: [
          {
            id: 'q-cn-1',
            question: 'Which HTTP status code specifically means the client IS authenticated, but lacks permission to access the requested resource?',
            options: ['401 Unauthorized', '403 Forbidden', '404 Not Found', '409 Conflict'],
            correctIndex: 1,
            explanation: '401 means missing or invalid authentication credentials; 403 means identity is known but authorization is denied.'
          }
        ]
      },
      {
        id: 'tech-oop-sd',
        title: 'OOP, SOLID & System Design Basics',
        tag: 'Design',
        readTime: '9 min read',
        notes: [
          {
            heading: 'SOLID Principles in Interviews',
            body: 'S: Single Responsibility (one reason to change). O: Open/Closed (open for extension, closed for modification). L: Liskov Substitution (subtypes safely replace base types). I: Interface Segregation (small focused interfaces). D: Dependency Inversion (depend on abstractions, not concrete classes).'
          },
          {
            heading: 'CAP Theorem, Caching & Load Balancing',
            body: 'In a distributed data store during a Network Partition (P), you must choose between Consistency (C - every read gets latest write) and Availability (A - every request gets a non-error response). Use Redis (Cache-Aside) for read-heavy hot paths and Consistent Hashing for distributed cache sharding.'
          }
        ],
        quiz: [
          {
            id: 'q-sd-1',
            question: 'Which caching strategy checks the cache first, loads from DB on a cache miss, and writes the fetched entry back to the cache?',
            options: ['Write-Through', 'Write-Back', 'Cache-Aside (Lazy Loading)', 'Read-Through Bypass'],
            correctIndex: 2,
            explanation: 'In Cache-Aside, the application manages both cache and DB: read cache → on miss, read DB → populate cache.'
          }
        ]
      }
    ]
  },

  hr: {
    id: 'hr',
    label: 'HR Interview',
    subtitle: 'Behavioral frameworks (STAR), strong vs weak answers, and interactive self-practice notes.',
    topics: [
      {
        id: 'hr-intro-star',
        title: 'Tell Me About Yourself & STAR Framework',
        tag: 'Core Behavioral',
        readTime: '6 min read',
        notes: [
          {
            heading: 'The Present–Past–Future Pitch (60–90 Seconds)',
            body: 'Never recite your entire resume chronologically from 10th grade. Structure your answer as: 1) Present (current degree/role & core stack), 2) Past (1–2 measurable projects/internships + key impact), 3) Future (why this exact company & role excite you).'
          },
          {
            heading: 'The STAR Storytelling Method',
            body: 'For any behavioral question ("Tell me about a time you failed / resolved a conflict / showed leadership"), spend 20% on Situation & Task, 60% on YOUR specific Actions, and 20% on measurable Results.',
            formula: 'S — Situation (1-2 sentences of context)\nT — Task (What goal or challenge did YOU own?)\nA — Action (Concrete technical/communication steps YOU took — say "I", not just "we")\nR — Result (Quantified outcome + what you learned)'
          }
        ],
        hrPrompts: [
          {
            id: 'hr-q1',
            question: 'Tell me about yourself.',
            strongTip: 'Highlight 1 flagship project with metrics (e.g., "reduced API latency by 35%"), your core stack, and connect directly to the role.',
            avoidTip: 'Avoid personal family history, hobbies list, or reading your resume line-by-line.'
          },
          {
            id: 'hr-q2',
            question: 'Describe a challenging technical bug or project failure and how you handled it.',
            strongTip: 'Pick a real bug/outage/deadline miss, show structured root-cause debugging, own the mistake without blaming teammates, and mention preventive tests/process added afterward.',
            avoidTip: 'Never say "I’ve never failed" or blame your teammates for breaking things.'
          }
        ]
      },
      {
        id: 'hr-fit-negotiation',
        title: 'Strengths, Weaknesses, Conflict & Why Us',
        tag: 'Situational',
        readTime: '7 min read',
        notes: [
          {
            heading: 'Answering "What is your biggest weakness?" Authentically',
            body: 'Skip fake humblebrags ("I work too hard / I’m a perfectionist"). Pick a genuine, non-fatal skill gap (e.g., initially spending too long over-polishing UI details before validating requirements) and explain the concrete system you built to manage it (time-boxing + early PR feedback).'
          },
          {
            heading: 'Researching "Why This Company?"',
            body: 'Mention 1 specific engineering blog post, product architecture, scale challenge, or company value—not generic praise like "You are a big MNC with good culture."'
          }
        ],
        hrPrompts: [
          {
            id: 'hr-q3',
            question: 'Tell me about a time you disagreed with a teammate or mentor.',
            strongTip: 'Show data-driven empathy: listened to their constraints, ran a quick benchmark/prototype, agreed on objective metrics, and committed once decided.',
            avoidTip: 'Avoid sounding stubborn or escalating immediately without trying to resolve collaboratively.'
          },
          {
            id: 'hr-q4',
            question: 'Where do you see yourself in 3–5 years / Why should we hire you?',
            strongTip: 'Focus on deepening system ownership, mentoring junior engineers, and delivering reliable user impact at scale.',
            avoidTip: 'Avoid saying "I want to do an MBA in 1 year" or "I just need a job for experience."'
          },
          {
            id: 'hr-q5',
            question: 'Do you have any questions for us? (Always say YES!)',
            strongTip: 'Ask thoughtful questions: "What does success look like in the first 90 days for an engineer on this team?" or "What is the biggest technical bottleneck your team is tackling this quarter?"',
            avoidTip: 'Never say "No, everything was covered" or ask about salary/leaves in Round 1.'
          }
        ]
      }
    ]
  }
};
