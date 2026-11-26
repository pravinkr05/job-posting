export const DSA_TOPICS = [
  {
    id: 'arrays-hashing',
    title: 'Arrays & Hashing',
    description: 'Prefix sums, frequency maps, Kadane’s algorithm, and in-place array tricks.',
    problems: [
      {
        id: 'dsa-two-sum',
        title: 'Two Sum',
        difficulty: 'Easy',
        pattern: 'HashMap Lookup',
        companies: ['Google', 'Amazon', 'Microsoft', 'Flipkart'],
        summary: 'Given an integer array nums and an integer target, return indices of the two numbers such that they add up to target.',
        brute: 'Check all pairs (i, j) with nested loops in O(N²) time and O(1) space.',
        optimal: 'Iterate once while storing num → index in a HashMap. For each num, check if (target - num) already exists in the map.',
        time: 'O(N)',
        space: 'O(N)',
        code: {
          python: `def two_sum(nums, target):
    seen = {}
    for i, x in enumerate(nums):
        need = target - x
        if need in seen:
            return [seen[need], i]
        seen[x] = i`,
          cpp: `vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen;
    for (int i = 0; i < nums.size(); ++i) {
        int need = target - nums[i];
        if (seen.count(need)) return {seen[need], i};
        seen[nums[i]] = i;
    }
    return {};
}`,
          js: `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
}`
        }
      },
      {
        id: 'dsa-max-subarray',
        title: 'Maximum Subarray (Kadane’s Algorithm)',
        difficulty: 'Medium',
        pattern: 'Kadane / Greedy',
        companies: ['Amazon', 'Microsoft', 'Goldman Sachs'],
        summary: 'Find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.',
        brute: 'Evaluate all O(N²) subarrays using running sums.',
        optimal: 'Maintain current running sum cur. If cur < 0, reset cur = 0 (or cur = max(x, cur + x)) and update global best.',
        time: 'O(N)',
        space: 'O(1)',
        code: {
          python: `def max_subarray(nums):
    cur = best = nums[0]
    for x in nums[1:]:
        cur = max(x, cur + x)
        best = max(best, cur)
    return best`,
          cpp: `int maxSubArray(vector<int>& nums) {
    int cur = nums[0], best = nums[0];
    for (int i = 1; i < nums.size(); ++i) {
        cur = max(nums[i], cur + nums[i]);
        best = max(best, cur);
    }
    return best;
}`,
          js: `function maxSubArray(nums) {
  let cur = nums[0], best = nums[0];
  for (let i = 1; i < nums.length; i++) {
    cur = Math.max(nums[i], cur + nums[i]);
    best = Math.max(best, cur);
  }
  return best;
}`
        }
      },
      {
        id: 'dsa-product-except-self',
        title: 'Product of Array Except Self',
        difficulty: 'Medium',
        pattern: 'Prefix & Suffix Product',
        companies: ['Amazon', 'Atlassian', 'Google'],
        summary: 'Return an array answer such that answer[i] equals the product of all elements of nums except nums[i], without using division.',
        brute: 'Compute left and right products separately for each index in O(N²).',
        optimal: 'First pass writes prefix products into output[i]. Second backward pass multiplies by a running suffix variable.',
        time: 'O(N)',
        space: 'O(1) extra',
        code: {
          python: `def product_except_self(nums):
    n = len(nums)
    res = [1] * n
    prefix = 1
    for i in range(n):
        res[i] = prefix
        prefix *= nums[i]
    suffix = 1
    for i in range(n - 1, -1, -1):
        res[i] *= suffix
        suffix *= nums[i]
    return res`,
          cpp: `vector<int> productExceptSelf(vector<int>& nums) {
    int n = nums.size(), pref = 1, suff = 1;
    vector<int> res(n, 1);
    for (int i = 0; i < n; ++i) { res[i] = pref; pref *= nums[i]; }
    for (int i = n - 1; i >= 0; --i) { res[i] *= suff; suff *= nums[i]; }
    return res;
}`,
          js: `function productExceptSelf(nums) {
  const res = Array(nums.length).fill(1);
  let pref = 1, suff = 1;
  for (let i = 0; i < nums.length; i++) { res[i] = pref; pref *= nums[i]; }
  for (let i = nums.length - 1; i >= 0; i--) { res[i] *= suff; suff *= nums[i]; }
  return res;
}`
        }
      },
      {
        id: 'dsa-subarray-sum-k',
        title: 'Subarray Sum Equals K',
        difficulty: 'Medium',
        pattern: 'Prefix Sum + HashMap',
        companies: ['Google', 'Goldman Sachs', 'TCS Prime'],
        summary: 'Count the total number of contiguous subarrays whose sum equals k (array can contain negative numbers).',
        brute: 'Check every subarray sum in O(N²).',
        optimal: 'Track prefix sum counts in a HashMap initialized with {0: 1}. At each index, add count[prefix - k] to the answer.',
        time: 'O(N)',
        space: 'O(N)',
        code: {
          python: `from collections import defaultdict
def subarray_sum(nums, k):
    counts = defaultdict(int, {0: 1})
    pref = ans = 0
    for x in nums:
        pref += x
        ans += counts[pref - k]
        counts[pref] += 1
    return ans`,
          cpp: `int subarraySum(vector<int>& nums, int k) {
    unordered_map<int, int> cnt{{0, 1}};
    int pref = 0, ans = 0;
    for (int x : nums) {
        pref += x;
        if (cnt.count(pref - k)) ans += cnt[pref - k];
        cnt[pref]++;
    }
    return ans;
}`,
          js: `function subarraySum(nums, k) {
  const cnt = new Map([[0, 1]]);
  let pref = 0, ans = 0;
  for (const x of nums) {
    pref += x;
    ans += cnt.get(pref - k) || 0;
    cnt.set(pref, (cnt.get(pref) || 0) + 1);
  }
  return ans;
}`
        }
      },
      {
        id: 'dsa-merge-intervals',
        title: 'Merge Overlapping Intervals',
        difficulty: 'Medium',
        pattern: 'Sorting + Intervals',
        companies: ['Atlassian', 'Amazon', 'Microsoft'],
        summary: 'Given an array of intervals [start, end], merge all overlapping intervals and return an array of non-overlapping intervals.',
        brute: 'Repeatedly compare pairs and merge until no overlaps remain in O(N²).',
        optimal: 'Sort intervals by start time. Append to result if non-overlapping, else extend result[-1][1] = max(result[-1][1], end).',
        time: 'O(N log N)',
        space: 'O(N)',
        code: {
          python: `def merge(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = []
    for s, e in intervals:
        if not merged or merged[-1][1] < s:
            merged.append([s, e])
        else:
            merged[-1][1] = max(merged[-1][1], e)
    return merged`,
          cpp: `vector<vector<int>> merge(vector<vector<int>>& iv) {
    sort(iv.begin(), iv.end());
    vector<vector<int>> res;
    for (auto& p : iv) {
        if (res.empty() || res.back()[1] < p[0]) res.push_back(p);
        else res.back()[1] = max(res.back()[1], p[1]);
    }
    return res;
}`,
          js: `function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const res = [];
  for (const [s, e] of intervals) {
    if (!res.length || res[res.length - 1][1] < s) res.push([s, e]);
    else res[res.length - 1][1] = Math.max(res[res.length - 1][1], e);
  }
  return res;
}`
        }
      },
      {
        id: 'dsa-longest-consecutive',
        title: 'Longest Consecutive Sequence',
        difficulty: 'Medium',
        pattern: 'HashSet Sequence Start',
        companies: ['Google', 'Amazon', 'Zoho'],
        summary: 'Find the length of the longest consecutive elements sequence in an unsorted array in O(N) time.',
        brute: 'Sort array in O(N log N) and scan streaks.',
        optimal: 'Put all elements in a HashSet. Only start counting streaks from numbers x where (x - 1) is NOT in the set.',
        time: 'O(N)',
        space: 'O(N)',
        code: {
          python: `def longest_consecutive(nums):
    s = set(nums)
    best = 0
    for x in s:
        if x - 1 not in s:
            cur = x
            while cur in s:
                cur += 1
            best = max(best, cur - x)
    return best`,
          cpp: `int longestConsecutive(vector<int>& nums) {
    unordered_set<int> s(nums.begin(), nums.end());
    int best = 0;
    for (int x : s) {
        if (!s.count(x - 1)) {
            int cur = x;
            while (s.count(cur)) cur++;
            best = max(best, cur - x);
        }
    }
    return best;
}`,
          js: `function longestConsecutive(nums) {
  const s = new Set(nums);
  let best = 0;
  for (const x of s) {
    if (!s.has(x - 1)) {
      let cur = x;
      while (s.has(cur)) cur++;
      best = Math.max(best, cur - x);
    }
  }
  return best;
}`
        }
      }
    ]
  },
  {
    id: 'two-pointers-window',
    title: 'Two Pointers & Sliding Window',
    description: 'Variable/fixed windows, 3Sum sorting pointers, and trapped water optimizations.',
    problems: [
      {
        id: 'dsa-3sum',
        title: '3Sum (Unique Triplets)',
        difficulty: 'Medium',
        pattern: 'Sorted Two Pointers',
        companies: ['Amazon', 'Microsoft', 'Flipkart'],
        summary: 'Return all unique triplets [a, b, c] in nums such that a + b + c == 0.',
        brute: 'Three nested loops + Set deduplication in O(N³).',
        optimal: 'Sort nums. Fix i (skipping duplicates) and run two pointers l = i+1, r = n-1 skipping duplicates on matches.',
        time: 'O(N²)',
        space: 'O(1) extra',
        code: {
          python: `def three_sum(nums):
    nums.sort()
    res = []
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i - 1]: continue
        l, r = i + 1, len(nums) - 1
        while l < r:
            s = nums[i] + nums[l] + nums[r]
            if s < 0: l += 1
            elif s > 0: r -= 1
            else:
                res.append([nums[i], nums[l], nums[r]])
                l += 1; r -= 1
                while l < r and nums[l] == nums[l - 1]: l += 1
    return res`,
          cpp: `vector<vector<int>> threeSum(vector<int>& nums) {
    sort(nums.begin(), nums.end());
    vector<vector<int>> res;
    for (int i = 0; i + 2 < nums.size(); ++i) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;
        int l = i + 1, r = nums.size() - 1;
        while (l < r) {
            int s = nums[i] + nums[l] + nums[r];
            if (s < 0) l++;
            else if (s > 0) r--;
            else {
                res.push_back({nums[i], nums[l++], nums[r--]});
                while (l < r && nums[l] == nums[l - 1]) l++;
            }
        }
    }
    return res;
}`,
          js: `function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const res = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let l = i + 1, r = nums.length - 1;
    while (l < r) {
      const s = nums[i] + nums[l] + nums[r];
      if (s < 0) l++;
      else if (s > 0) r--;
      else {
        res.push([nums[i], nums[l++], nums[r--]]);
        while (l < r && nums[l] === nums[l - 1]) l++;
      }
    }
  }
  return res;
}`
        }
      },
      {
        id: 'dsa-trapping-rain',
        title: 'Trapping Rain Water',
        difficulty: 'Hard',
        pattern: 'Two Pointers / Prefix-Max',
        companies: ['Google', 'Amazon', 'Goldman Sachs'],
        summary: 'Compute how much water can be trapped after raining given an elevation map of width 1 bars.',
        brute: 'For each bar, find max left and max right heights in O(N²).',
        optimal: 'Maintain l, r pointers and leftMax, rightMax. Always advance the smaller side since the opposite boundary guarantees support.',
        time: 'O(N)',
        space: 'O(1)',
        code: {
          python: `def trap(height):
    l, r = 0, len(height) - 1
    lmax = rmax = water = 0
    while l < r:
        if height[l] < height[r]:
            lmax = max(lmax, height[l])
            water += lmax - height[l]
            l += 1
        else:
            rmax = max(rmax, height[r])
            water += rmax - height[r]
            r -= 1
    return water`,
          cpp: `int trap(vector<int>& h) {
    int l = 0, r = h.size() - 1, lm = 0, rm = 0, ans = 0;
    while (l < r) {
        if (h[l] < h[r]) { lm = max(lm, h[l]); ans += lm - h[l++]; }
        else { rm = max(rm, h[r]); ans += rm - h[r--]; }
    }
    return ans;
}`,
          js: `function trap(h) {
  let l = 0, r = h.length - 1, lm = 0, rm = 0, ans = 0;
  while (l < r) {
    if (h[l] < h[r]) { lm = Math.max(lm, h[l]); ans += lm - h[l++]; }
    else { rm = Math.max(rm, h[r]); ans += rm - h[r--]; }
  }
  return ans;
}`
        }
      },
      {
        id: 'dsa-longest-substr',
        title: 'Longest Substring Without Repeating Characters',
        difficulty: 'Medium',
        pattern: 'Variable Sliding Window',
        companies: ['Amazon', 'Microsoft', 'Atlassian'],
        summary: 'Find the length of the longest substring without repeating characters.',
        brute: 'Check all O(N²) substrings for uniqueness.',
        optimal: 'Expand right pointer and store each character’s latest index. Jump left directly past any duplicate inside the active window.',
        time: 'O(N)',
        space: 'O(min(N, Σ))',
        code: {
          python: `def length_of_longest_substring(s):
    seen, l, best = {}, 0, 0
    for r, ch in enumerate(s):
        if ch in seen and seen[ch] >= l:
            l = seen[ch] + 1
        seen[ch] = r
        best = max(best, r - l + 1)
    return best`,
          cpp: `int lengthOfLongestSubstring(string s) {
    vector<int> seen(256, -1);
    int l = 0, best = 0;
    for (int r = 0; r < s.size(); ++r) {
        if (seen[s[r]] >= l) l = seen[s[r]] + 1;
        seen[s[r]] = r;
        best = max(best, r - l + 1);
    }
    return best;
}`,
          js: `function lengthOfLongestSubstring(s) {
  const seen = new Map();
  let l = 0, best = 0;
  for (let r = 0; r < s.length; r++) {
    if (seen.has(s[r]) && seen.get(s[r]) >= l) l = seen.get(s[r]) + 1;
    seen.set(s[r], r);
    best = Math.max(best, r - l + 1);
  }
  return best;
}`
        }
      },
      {
        id: 'dsa-min-window-substr',
        title: 'Minimum Window Substring',
        difficulty: 'Hard',
        pattern: 'Sliding Window + Frequency Match',
        companies: ['Google', 'Amazon', 'Flipkart'],
        summary: 'Find the minimum window in s which will contain all the characters in t.',
        brute: 'Inspect every substring and compare character histograms in O(N²·Σ).',
        optimal: 'Track required char counts and `have == need`. Shrink from left whenever valid to minimize window length.',
        time: 'O(|S| + |T|)',
        space: 'O(|T|)',
        code: {
          python: `from collections import Counter
def min_window(s, t):
    need = Counter(t)
    missing = len(t)
    l = best_l = 0
    best_len = float('inf')
    for r, ch in enumerate(s):
        if need[ch] > 0: missing -= 1
        need[ch] -= 1
        while missing == 0:
            if r - l + 1 < best_len:
                best_l, best_len = l, r - l + 1
            need[s[l]] += 1
            if need[s[l]] > 0: missing += 1
            l += 1
    return "" if best_len == float('inf') else s[best_l:best_l + best_len]`,
          cpp: `string minWindow(string s, string t) {
    vector<int> need(128, 0);
    for (char c : t) need[c]++;
    int missing = t.size(), l = 0, bestL = 0, bestLen = INT_MAX;
    for (int r = 0; r < s.size(); ++r) {
        if (need[s[r]]-- > 0) missing--;
        while (missing == 0) {
            if (r - l + 1 < bestLen) { bestL = l; bestLen = r - l + 1; }
            if (++need[s[l++]] > 0) missing++;
        }
    }
    return bestLen == INT_MAX ? "" : s.substr(bestL, bestLen);
}`,
          js: `function minWindow(s, t) {
  const need = new Map();
  for (const c of t) need.set(c, (need.get(c) || 0) + 1);
  let missing = t.length, l = 0, bestL = 0, bestLen = Infinity;
  for (let r = 0; r < s.length; r++) {
    const c = s[r];
    if ((need.get(c) || 0) > 0) missing--;
    need.set(c, (need.get(c) || 0) - 1);
    while (missing === 0) {
      if (r - l + 1 < bestLen) { bestL = l; bestLen = r - l + 1; }
      const lc = s[l++];
      need.set(lc, (need.get(lc) || 0) + 1);
      if (need.get(lc) > 0) missing++;
    }
  }
  return bestLen === Infinity ? "" : s.slice(bestL, bestL + bestLen);
}`
        }
      },
      {
        id: 'dsa-max-profit-stock',
        title: 'Best Time to Buy and Sell Stock',
        difficulty: 'Easy',
        pattern: 'Two Pointers / Running Min',
        companies: ['Amazon', 'Goldman Sachs', 'TCS'],
        summary: 'Maximize profit by choosing a single day to buy one stock and a future day to sell it.',
        brute: 'Compare all pairs (buy, sell) in O(N²).',
        optimal: 'Track minimum price seen so far while scanning left-to-right and update max profit.',
        time: 'O(N)',
        space: 'O(1)',
        code: {
          python: `def max_profit(prices):
    min_p = float('inf')
    best = 0
    for p in prices:
        min_p = min(min_p, p)
        best = max(best, p - min_p)
    return best`,
          cpp: `int maxProfit(vector<int>& prices) {
    int mn = INT_MAX, best = 0;
    for (int p : prices) { mn = min(mn, p); best = max(best, p - mn); }
    return best;
}`,
          js: `function maxProfit(prices) {
  let mn = Infinity, best = 0;
  for (const p of prices) { mn = Math.min(mn, p); best = Math.max(best, p - mn); }
  return best;
}`
        }
      }
    ]
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    description: 'Rotated arrays, peak finding, and Binary Search on Answer space.',
    problems: [
      {
        id: 'dsa-search-rotated',
        title: 'Search in Rotated Sorted Array',
        difficulty: 'Medium',
        pattern: 'Modified Binary Search',
        companies: ['Microsoft', 'Amazon', 'Google'],
        summary: 'Search for target in a sorted array rotated at an unknown pivot in O(log N) time.',
        brute: 'Linear scan in O(N).',
        optimal: 'At each mid, at least one half [l..mid] or [mid..r] is strictly sorted. Check if target falls inside the sorted half to discard half the space.',
        time: 'O(log N)',
        space: 'O(1)',
        code: {
          python: `def search(nums, target):
    l, r = 0, len(nums) - 1
    while l <= r:
        m = (l + r) // 2
        if nums[m] == target: return m
        if nums[l] <= nums[m]:
            if nums[l] <= target < nums[m]: r = m - 1
            else: l = m + 1
        else:
            if nums[m] < target <= nums[r]: l = m + 1
            else: r = m - 1
    return -1`,
          cpp: `int search(vector<int>& nums, int target) {
    int l = 0, r = nums.size() - 1;
    while (l <= r) {
        int m = l + (r - l) / 2;
        if (nums[m] == target) return m;
        if (nums[l] <= nums[m]) {
            if (nums[l] <= target && target < nums[m]) r = m - 1;
            else l = m + 1;
        } else {
            if (nums[m] < target && target <= nums[r]) l = m + 1;
            else r = m - 1;
        }
    }
    return -1;
}`,
          js: `function search(nums, target) {
  let l = 0, r = nums.length - 1;
  while (l <= r) {
    const m = (l + r) >> 1;
    if (nums[m] === target) return m;
    if (nums[l] <= nums[m]) {
      if (nums[l] <= target && target < nums[m]) r = m - 1;
      else l = m + 1;
    } else {
      if (nums[m] < target && target <= nums[r]) l = m + 1;
      else r = m - 1;
    }
  }
  return -1;
}`
        }
      },
      {
        id: 'dsa-koko-bananas',
        title: 'Koko Eating Bananas',
        difficulty: 'Medium',
        pattern: 'Binary Search on Answer',
        companies: ['Google', 'Flipkart', 'Infosys SP'],
        summary: 'Find the minimum integer eating speed k such that Koko can eat all banana piles within h hours.',
        brute: 'Try every speed k from 1 to max(piles).',
        optimal: 'Binary search speed k in [1, max(piles)]. Feasibility check computes sum(ceil(p / k)) <= h.',
        time: 'O(N log(maxP))',
        space: 'O(1)',
        code: {
          python: `def min_eating_speed(piles, h):
    l, r = 1, max(piles)
    while l < r:
        mid = (l + r) // 2
        hours = sum((p + mid - 1) // mid for p in piles)
        if hours <= h: r = mid
        else: l = mid + 1
    return l`,
          cpp: `int minEatingSpeed(vector<int>& piles, int h) {
    int l = 1, r = *max_element(piles.begin(), piles.end());
    while (l < r) {
        int m = l + (r - l) / 2;
        long long hrs = 0;
        for (int p : piles) hrs += (p + m - 1) / m;
        if (hrs <= h) r = m; else l = m + 1;
    }
    return l;
}`,
          js: `function minEatingSpeed(piles, h) {
  let l = 1, r = Math.max(...piles);
  while (l < r) {
    const m = Math.floor((l + r) / 2);
    const hrs = piles.reduce((acc, p) => acc + Math.ceil(p / m), 0);
    if (hrs <= h) r = m; else l = m + 1;
  }
  return l;
}`
        }
      },
      {
        id: 'dsa-median-two-sorted',
        title: 'Median of Two Sorted Arrays',
        difficulty: 'Hard',
        pattern: 'Partition Binary Search',
        companies: ['Google', 'Goldman Sachs', 'Microsoft'],
        summary: 'Find the median of two sorted arrays of sizes m and n in O(log(min(m, n))) time.',
        brute: 'Merge both arrays and pick the middle in O(m + n).',
        optimal: 'Binary search the partition index on the smaller array so left-half elements ≤ right-half elements.',
        time: 'O(log(min(m, n)))',
        space: 'O(1)',
        code: {
          python: `def find_median_sorted_arrays(a, b):
    if len(a) > len(b): a, b = b, a
    m, n = len(a), len(b)
    half = (m + n + 1) // 2
    l, r = 0, m
    while l <= r:
        i = (l + r) // 2
        j = half - i
        al = a[i - 1] if i > 0 else float('-inf')
        ar = a[i] if i < m else float('inf')
        bl = b[j - 1] if j > 0 else float('-inf')
        br = b[j] if j < n else float('inf')
        if al <= br and bl <= ar:
            if (m + n) % 2: return max(al, bl)
            return (max(al, bl) + min(ar, br)) / 2
        elif al > br: r = i - 1
        else: l = i + 1`,
          cpp: `double findMedianSortedArrays(vector<int>& a, vector<int>& b) {
    if (a.size() > b.size()) swap(a, b);
    int m = a.size(), n = b.size(), half = (m + n + 1) / 2;
    int l = 0, r = m;
    while (l <= r) {
        int i = (l + r) / 2, j = half - i;
        int al = i > 0 ? a[i-1] : INT_MIN, ar = i < m ? a[i] : INT_MAX;
        int bl = j > 0 ? b[j-1] : INT_MIN, br = j < n ? b[j] : INT_MAX;
        if (al <= br && bl <= ar) {
            if ((m + n) % 2) return max(al, bl);
            return (max(al, bl) + min(ar, br)) / 2.0;
        } else if (al > br) r = i - 1;
        else l = i + 1;
    }
    return 0.0;
}`,
          js: `function findMedianSortedArrays(a, b) {
  if (a.length > b.length) [a, b] = [b, a];
  const m = a.length, n = b.length, half = Math.floor((m + n + 1) / 2);
  let l = 0, r = m;
  while (l <= r) {
    const i = (l + r) >> 1, j = half - i;
    const al = i > 0 ? a[i - 1] : -Infinity, ar = i < m ? a[i] : Infinity;
    const bl = j > 0 ? b[j - 1] : -Infinity, br = j < n ? b[j] : Infinity;
    if (al <= br && bl <= ar) {
      return (m + n) % 2 ? Math.max(al, bl) : (Math.max(al, bl) + Math.min(ar, br)) / 2;
    } else if (al > br) r = i - 1;
    else l = i + 1;
  }
}`
        }
      },
      {
        id: 'dsa-allocate-books',
        title: 'Allocate Minimum Number of Pages',
        difficulty: 'Hard',
        pattern: 'Binary Search on Answer',
        companies: ['Google', 'Flipkart', 'Amazon'],
        summary: 'Allocate N books contiguously among M students so the maximum pages assigned to any student is minimized.',
        brute: 'Try all contiguous partitions recursively.',
        optimal: 'Binary search max pages allowed between max(pages) and sum(pages), greedily counting students needed.',
        time: 'O(N log(Sum))',
        space: 'O(1)',
        code: {
          python: `def find_pages(pages, m):
    if m > len(pages): return -1
    l, r = max(pages), sum(pages)
    while l < r:
        mid = (l + r) // 2
        students, cur = 1, 0
        for p in pages:
            if cur + p > mid:
                students += 1
                cur = p
            else:
                cur += p
        if students <= m: r = mid
        else: l = mid + 1
    return l`,
          cpp: `int findPages(vector<int>& pages, int m) {
    if (m > pages.size()) return -1;
    int l = *max_element(pages.begin(), pages.end());
    int r = accumulate(pages.begin(), pages.end(), 0);
    while (l < r) {
        int mid = l + (r - l) / 2, st = 1, cur = 0;
        for (int p : pages) {
            if (cur + p > mid) { st++; cur = p; }
            else cur += p;
        }
        if (st <= m) r = mid; else l = mid + 1;
    }
    return l;
}`,
          js: `function findPages(pages, m) {
  if (m > pages.length) return -1;
  let l = Math.max(...pages), r = pages.reduce((a, b) => a + b, 0);
  while (l < r) {
    const mid = Math.floor((l + r) / 2);
    let st = 1, cur = 0;
    for (const p of pages) {
      if (cur + p > mid) { st++; cur = p; } else cur += p;
    }
    if (st <= m) r = mid; else l = mid + 1;
  }
  return l;
}`
        }
      }
    ]
  },
  {
    id: 'linked-list',
    title: 'Linked Lists',
    description: 'Fast & slow pointers, pointer reversal, and LRU Cache architecture.',
    problems: [
      {
        id: 'dsa-reverse-ll',
        title: 'Reverse Linked List',
        difficulty: 'Easy',
        pattern: 'Iterative Pointer Flip',
        companies: ['Microsoft', 'Amazon', 'TCS', 'Zoho'],
        summary: 'Reverse a singly linked list in-place and return the new head.',
        brute: 'Copy values into an array and overwrite nodes.',
        optimal: 'Use prev, curr, next pointers in a single pass.',
        time: 'O(N)',
        space: 'O(1)',
        code: {
          python: `def reverse_list(head):
    prev, cur = None, head
    while cur:
        nxt = cur.next
        cur.next = prev
        prev = cur
        cur = nxt
    return prev`,
          cpp: `ListNode* reverseList(ListNode* head) {
    ListNode *prev = nullptr, *cur = head;
    while (cur) {
        ListNode* nxt = cur->next;
        cur->next = prev;
        prev = cur;
        cur = nxt;
    }
    return prev;
}`,
          js: `function reverseList(head) {
  let prev = null, cur = head;
  while (cur) {
    const nxt = cur.next;
    cur.next = prev;
    prev = cur;
    cur = nxt;
  }
  return prev;
}`
        }
      },
      {
        id: 'dsa-cycle-detect',
        title: 'Linked List Cycle II (Find Cycle Start)',
        difficulty: 'Medium',
        pattern: 'Floyd’s Tortoise & Hare',
        companies: ['Microsoft', 'Amazon', 'Goldman Sachs'],
        summary: 'Detect if a cycle exists and return the node where the cycle begins.',
        brute: 'Store visited node references in a HashSet in O(N) space.',
        optimal: 'Slow moves 1 step, fast moves 2 steps. When they collide, reset slow to head and advance both 1 step until they meet at cycle entry.',
        time: 'O(N)',
        space: 'O(1)',
        code: {
          python: `def detect_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            slow = head
            while slow != fast:
                slow = slow.next
                fast = fast.next
            return slow
    return None`,
          cpp: `ListNode* detectCycle(ListNode* head) {
    ListNode *slow = head, *fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) {
            slow = head;
            while (slow != fast) { slow = slow->next; fast = fast->next; }
            return slow;
        }
    }
    return nullptr;
}`,
          js: `function detectCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      slow = head;
      while (slow !== fast) { slow = slow.next; fast = fast.next; }
      return slow;
    }
  }
  return null;
}`
        }
      },
      {
        id: 'dsa-lru-cache',
        title: 'LRU Cache Design',
        difficulty: 'Medium',
        pattern: 'HashMap + Doubly Linked List',
        companies: ['Atlassian', 'Amazon', 'Flipkart', 'Google'],
        summary: 'Design a data structure supporting O(1) get(key) and O(1) put(key, value) with Least Recently Used eviction.',
        brute: 'Array scan to find LRU entry takes O(N) per operation.',
        optimal: 'Combine a HashMap (key → DLL node) with a Doubly Linked List ordered from Most Recent (head) to Least Recent (tail).',
        time: 'O(1) per op',
        space: 'O(Capacity)',
        code: {
          python: `from collections import OrderedDict
class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache = OrderedDict()
    def get(self, key: int) -> int:
        if key not in self.cache: return -1
        self.cache.move_to_end(key)
        return self.cache[key]
    def put(self, key: int, value: int) -> None:
        if key in self.cache: self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.cap:
            self.cache.popitem(last=False)`,
          cpp: `// Standard interview implementation uses unordered_map<int, list<pair<int,int>>::iterator> + std::list
class LRUCache {
    int cap;
    list<pair<int,int>> dll;
    unordered_map<int, list<pair<int,int>>::iterator> mp;
public:
    LRUCache(int c) : cap(c) {}
    int get(int k) {
        if (!mp.count(k)) return -1;
        dll.splice(dll.begin(), dll, mp[k]);
        return mp[k]->second;
    }
    void put(int k, int v) {
        if (mp.count(k)) { mp[k]->second = v; dll.splice(dll.begin(), dll, mp[k]); return; }
        if (dll.size() == cap) { mp.erase(dll.back().first); dll.pop_back(); }
        dll.emplace_front(k, v);
        mp[k] = dll.begin();
    }
};`,
          js: `class LRUCache {
  constructor(cap) { this.cap = cap; this.map = new Map(); }
  get(k) {
    if (!this.map.has(k)) return -1;
    const v = this.map.get(k);
    this.map.delete(k);
    this.map.set(k, v);
    return v;
  }
  put(k, v) {
    if (this.map.has(k)) this.map.delete(k);
    this.map.set(k, v);
    if (this.map.size > this.cap) this.map.delete(this.map.keys().next().value);
  }
}`
        }
      },
      {
        id: 'dsa-reverse-k-group',
        title: 'Reverse Nodes in k-Group',
        difficulty: 'Hard',
        pattern: 'Chunked Pointer Reversal',
        companies: ['Microsoft', 'Amazon', 'Flipkart'],
        summary: 'Reverse nodes of a linked list k at a time; leftover nodes (< k) remain as-is.',
        brute: 'Dump values to an array, reverse slices, rebuild list.',
        optimal: 'Check if k nodes remain ahead; reverse those k nodes in-place and stitch prevGroupTail to new group head.',
        time: 'O(N)',
        space: 'O(1)',
        code: {
          python: `def reverse_k_group(head, k):
    dummy = ListNode(0, head)
    group_prev = dummy
    while True:
        kth = group_prev
        for _ in range(k):
            kth = kth.next
            if not kth: return dummy.next
        group_next = kth.next
        prev, cur = group_next, group_prev.next
        while cur != group_next:
            nxt = cur.next
            cur.next = prev
            prev = cur
            cur = nxt
        tmp = group_prev.next
        group_prev.next = kth
        group_prev = tmp`,
          cpp: `ListNode* reverseKGroup(ListNode* head, int k) {
    ListNode dummy(0, head), *gp = &dummy;
    while (true) {
        ListNode* kth = gp;
        for (int i = 0; i < k && kth; ++i) kth = kth->next;
        if (!kth) break;
        ListNode *gn = kth->next, *prev = gn, *cur = gp->next;
        while (cur != gn) {
            ListNode* nxt = cur->next;
            cur->next = prev; prev = cur; cur = nxt;
        }
        ListNode* tmp = gp->next; gp->next = kth; gp = tmp;
    }
    return dummy.next;
}`,
          js: `function reverseKGroup(head, k) {
  const dummy = { next: head };
  let gp = dummy;
  while (true) {
    let kth = gp;
    for (let i = 0; i < k && kth; i++) kth = kth.next;
    if (!kth) break;
    const gn = kth.next;
    let prev = gn, cur = gp.next;
    while (cur !== gn) {
      const nxt = cur.next; cur.next = prev; prev = cur; cur = nxt;
    }
    const tmp = gp.next; gp.next = kth; gp = tmp;
  }
  return dummy.next;
}`
        }
      }
    ]
  },
  {
    id: 'stacks-queues',
    title: 'Stacks & Queues',
    description: 'Monotonic stacks, expression validation, and sliding window maximums.',
    problems: [
      {
        id: 'dsa-valid-parens',
        title: 'Valid Parentheses',
        difficulty: 'Easy',
        pattern: 'Stack Matching',
        companies: ['Amazon', 'TCS', 'Accenture', 'Google'],
        summary: 'Determine if an input string containing (), {}, [] has valid matching and nesting order.',
        brute: 'Repeatedly replace "()", "{}", "[]" until string stops shrinking.',
        optimal: 'Push opening brackets onto stack; on closing bracket verify top matches.',
        time: 'O(N)',
        space: 'O(N)',
        code: {
          python: `def is_valid(s):
    pairs = {')': '(', ']': '[', '}': '{'}
    st = []
    for ch in s:
        if ch in pairs:
            if not st or st.pop() != pairs[ch]: return False
        else:
            st.append(ch)
    return not st`,
          cpp: `bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') st.push(c);
        else {
            if (st.empty()) return false;
            if ((c==')'&&st.top()!='(')||(c==']'&&st.top()!='[')||(c=='}'&&st.top()!='{')) return false;
            st.pop();
        }
    }
    return st.empty();
}`,
          js: `function isValid(s) {
  const pairs = { ')': '(', ']': '[', '}': '{' }, st = [];
  for (const c of s) {
    if (pairs[c]) { if (st.pop() !== pairs[c]) return false; }
    else st.push(c);
  }
  return st.length === 0;
}`
        }
      },
      {
        id: 'dsa-next-greater',
        title: 'Next Greater Element / Daily Temperatures',
        difficulty: 'Medium',
        pattern: 'Monotonic Decreasing Stack',
        companies: ['Amazon', 'Flipkart', 'Microsoft'],
        summary: 'For each element, find how many days until a warmer temperature (or next larger value to the right).',
        brute: 'Scan right for each element in O(N²).',
        optimal: 'Maintain a monotonic decreasing stack of indices. Whenever current > stack top, pop and resolve top’s answer.',
        time: 'O(N)',
        space: 'O(N)',
        code: {
          python: `def daily_temperatures(temps):
    res = [0] * len(temps)
    st = []
    for i, t in enumerate(temps):
        while st and temps[st[-1]] < t:
            idx = st.pop()
            res[idx] = i - idx
        st.append(i)
    return res`,
          cpp: `vector<int> dailyTemperatures(vector<int>& t) {
    vector<int> res(t.size(), 0);
    stack<int> st;
    for (int i = 0; i < t.size(); ++i) {
        while (!st.empty() && t[st.top()] < t[i]) {
            res[st.top()] = i - st.top(); st.pop();
        }
        st.push(i);
    }
    return res;
}`,
          js: `function dailyTemperatures(t) {
  const res = Array(t.length).fill(0), st = [];
  for (let i = 0; i < t.length; i++) {
    while (st.length && t[st[st.length - 1]] < t[i]) {
      const idx = st.pop();
      res[idx] = i - idx;
    }
    st.push(i);
  }
  return res;
}`
        }
      },
      {
        id: 'dsa-largest-histogram',
        title: 'Largest Rectangle in Histogram',
        difficulty: 'Hard',
        pattern: 'Monotonic Increasing Stack',
        companies: ['Google', 'Amazon', 'Flipkart'],
        summary: 'Given bar heights of width 1, find the area of the largest rectangle in the histogram.',
        brute: 'Expand left & right from each bar in O(N²).',
        optimal: 'Use a monotonic increasing stack of indices (plus sentinel 0 height at end). Popping reveals the exact right & left smaller boundaries.',
        time: 'O(N)',
        space: 'O(N)',
        code: {
          python: `def largest_rectangle_area(heights):
    st, best = [], 0
    for i, h in enumerate(heights + [0]):
        while st and heights[st[-1]] >= h:
            height = heights[st.pop()]
            width = i if not st else i - st[-1] - 1
            best = max(best, height * width)
        st.append(i)
    return best`,
          cpp: `int largestRectangleArea(vector<int>& h) {
    stack<int> st; int best = 0; h.push_back(0);
    for (int i = 0; i < h.size(); ++i) {
        while (!st.empty() && h[st.top()] >= h[i]) {
            int ht = h[st.top()]; st.pop();
            int w = st.empty() ? i : i - st.top() - 1;
            best = max(best, ht * w);
        }
        st.push(i);
    }
    return best;
}`,
          js: `function largestRectangleArea(heights) {
  const st = [], h = [...heights, 0];
  let best = 0;
  for (let i = 0; i < h.length; i++) {
    while (st.length && h[st[st.length - 1]] >= h[i]) {
      const ht = h[st.pop()];
      const w = st.length ? i - st[st.length - 1] - 1 : i;
      best = Math.max(best, ht * w);
    }
    st.push(i);
  }
  return best;
}`
        }
      },
      {
        id: 'dsa-sliding-window-max',
        title: 'Sliding Window Maximum',
        difficulty: 'Hard',
        pattern: 'Monotonic Deque',
        companies: ['Google', 'Amazon', 'Microsoft'],
        summary: 'Return the maximum value in every contiguous sliding window of size k.',
        brute: 'Max scan per window in O(N·K) or Max-Heap in O(N log N).',
        optimal: 'Maintain a monotonic decreasing deque of indices; drop out-of-window front indices and smaller back elements.',
        time: 'O(N)',
        space: 'O(K)',
        code: {
          python: `from collections import deque
def max_sliding_window(nums, k):
    dq, res = deque(), []
    for i, x in enumerate(nums):
        if dq and dq[0] <= i - k: dq.popleft()
        while dq and nums[dq[-1]] <= x: dq.pop()
        dq.append(i)
        if i >= k - 1: res.append(nums[dq[0]])
    return res`,
          cpp: `vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    deque<int> dq; vector<int> res;
    for (int i = 0; i < nums.size(); ++i) {
        if (!dq.empty() && dq.front() <= i - k) dq.pop_front();
        while (!dq.empty() && nums[dq.back()] <= nums[i]) dq.pop_back();
        dq.push_back(i);
        if (i >= k - 1) res.push_back(nums[dq.front()]);
    }
    return res;
}`,
          js: `function maxSlidingWindow(nums, k) {
  const dq = [], res = [];
  for (let i = 0; i < nums.length; i++) {
    if (dq.length && dq[0] <= i - k) dq.shift();
    while (dq.length && nums[dq[dq.length - 1]] <= nums[i]) dq.pop();
    dq.push(i);
    if (i >= k - 1) res.push(nums[dq[0]]);
  }
  return res;
}`
        }
      }
    ]
  },
  {
    id: 'trees-bst',
    title: 'Trees & Binary Search Trees',
    description: 'DFS recursion, Level-order BFS, LCA, Diameter, and BST invariants.',
    problems: [
      {
        id: 'dsa-level-order',
        title: 'Binary Tree Level Order Traversal',
        difficulty: 'Medium',
        pattern: 'BFS Queue',
        companies: ['Amazon', 'Microsoft', 'Infosys'],
        summary: 'Return the level order traversal of a binary tree’s node values (left to right, level by level).',
        brute: 'Compute tree height and print nodes at each depth d.',
        optimal: 'Use a FIFO queue and snapshot len(queue) at the start of each level.',
        time: 'O(N)',
        space: 'O(N)',
        code: {
          python: `from collections import deque
def level_order(root):
    if not root: return []
    q, res = deque([root]), []
    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.val)
            if node.left: q.append(node.left)
            if node.right: q.append(node.right)
        res.append(level)
    return res`,
          cpp: `vector<vector<int>> levelOrder(TreeNode* root) {
    if (!root) return {};
    queue<TreeNode*> q; q.push(root);
    vector<vector<int>> res;
    while (!q.empty()) {
        int sz = q.size(); vector<int> lvl;
        while (sz--) {
            auto* n = q.front(); q.pop();
            lvl.push_back(n->val);
            if (n->left) q.push(n->left);
            if (n->right) q.push(n->right);
        }
        res.push_back(lvl);
    }
    return res;
}`,
          js: `function levelOrder(root) {
  if (!root) return [];
  const q = [root], res = [];
  while (q.length) {
    const sz = q.length, lvl = [];
    for (let i = 0; i < sz; i++) {
      const n = q.shift();
      lvl.push(n.val);
      if (n.left) q.push(n.left);
      if (n.right) q.push(n.right);
    }
    res.push(lvl);
  }
  return res;
}`
        }
      },
      {
        id: 'dsa-diameter-tree',
        title: 'Diameter of Binary Tree',
        difficulty: 'Easy',
        pattern: 'Bottom-Up Tree DFS',
        companies: ['Google', 'Amazon', 'Microsoft'],
        summary: 'Find the length (number of edges) of the longest path between any two nodes in a binary tree.',
        brute: 'Compute leftHeight + rightHeight at every node in O(N²).',
        optimal: 'Compute subtree height recursively and update global max(diameter, leftH + rightH) in one post-order traversal.',
        time: 'O(N)',
        space: 'O(H)',
        code: {
          python: `def diameter_of_binary_tree(root):
    ans = 0
    def height(node):
        nonlocal ans
        if not node: return 0
        lh, rh = height(node.left), height(node.right)
        ans = max(ans, lh + rh)
        return 1 + max(lh, rh)
    height(root)
    return ans`,
          cpp: `int dfs(TreeNode* n, int& ans) {
    if (!n) return 0;
    int l = dfs(n->left, ans), r = dfs(n->right, ans);
    ans = max(ans, l + r);
    return 1 + max(l, r);
}`,
          js: `function diameterOfBinaryTree(root) {
  let ans = 0;
  const h = (n) => {
    if (!n) return 0;
    const l = h(n.left), r = h(n.right);
    ans = Math.max(ans, l + r);
    return 1 + Math.max(l, r);
  };
  h(root);
  return ans;
}`
        }
      },
      {
        id: 'dsa-lca-bt',
        title: 'Lowest Common Ancestor (LCA) of Binary Tree',
        difficulty: 'Medium',
        pattern: 'Recursive Post-Order DFS',
        companies: ['Amazon', 'Microsoft', 'Google', 'Flipkart'],
        summary: 'Find the lowest common ancestor of two given nodes p and q in a binary tree.',
        brute: 'Store root-to-node paths for p and q and find the last common node.',
        optimal: 'Return node if node == p or q. Recurse left and right; if both return non-null, current node is the LCA.',
        time: 'O(N)',
        space: 'O(H)',
        code: {
          python: `def lowest_common_ancestor(root, p, q):
    if not root or root == p or root == q:
        return root
    left = lowest_common_ancestor(root.left, p, q)
    right = lowest_common_ancestor(root.right, p, q)
    if left and right: return root
    return left or right`,
          cpp: `TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    if (!root || root == p || root == q) return root;
    auto* l = lowestCommonAncestor(root->left, p, q);
    auto* r = lowestCommonAncestor(root->right, p, q);
    if (l && r) return root;
    return l ? l : r;
}`,
          js: `function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;
  const l = lowestCommonAncestor(root.left, p, q);
  const r = lowestCommonAncestor(root.right, p, q);
  return (l && r) ? root : (l || r);
}`
        }
      },
      {
        id: 'dsa-validate-bst',
        title: 'Validate Binary Search Tree',
        difficulty: 'Medium',
        pattern: 'Range Bounds DFS',
        companies: ['Amazon', 'Goldman Sachs', 'Microsoft'],
        summary: 'Determine if a binary tree is a valid Binary Search Tree.',
        brute: 'Check subtree min/max repeatedly in O(N²).',
        optimal: 'Pass valid (low, high) interval bounds down the recursion; left uses (low, val), right uses (val, high).',
        time: 'O(N)',
        space: 'O(H)',
        code: {
          python: `def is_valid_bst(root, lo=float('-inf'), hi=float('inf')):
    if not root: return True
    if not (lo < root.val < hi): return False
    return is_valid_bst(root.left, lo, root.val) and is_valid_bst(root.right, root.val, hi)`,
          cpp: `bool valid(TreeNode* n, long lo, long hi) {
    if (!n) return true;
    if (n->val <= lo || n->val >= hi) return false;
    return valid(n->left, lo, n->val) && valid(n->right, n->val, hi);
}`,
          js: `function isValidBST(root, lo = -Infinity, hi = Infinity) {
  if (!root) return true;
  if (root.val <= lo || root.val >= hi) return false;
  return isValidBST(root.left, lo, root.val) && isValidBST(root.right, root.val, hi);
}`
        }
      },
      {
        id: 'dsa-max-path-sum',
        title: 'Binary Tree Maximum Path Sum',
        difficulty: 'Hard',
        pattern: 'Tree DP',
        companies: ['Google', 'Amazon', 'Flipkart'],
        summary: 'Find the maximum path sum of any non-empty path in a binary tree (values can be negative).',
        brute: 'Check all node-to-node paths in O(N²).',
        optimal: 'At each node, clamp negative child contributions to 0. Update global best with left + right + val, and return val + max(left, right).',
        time: 'O(N)',
        space: 'O(H)',
        code: {
          python: `def max_path_sum(root):
    best = float('-inf')
    def dfs(node):
        nonlocal best
        if not node: return 0
        l = max(0, dfs(node.left))
        r = max(0, dfs(node.right))
        best = max(best, node.val + l + r)
        return node.val + max(l, r)
    dfs(root)
    return best`,
          cpp: `int dfs(TreeNode* n, int& best) {
    if (!n) return 0;
    int l = max(0, dfs(n->left, best)), r = max(0, dfs(n->right, best));
    best = max(best, n->val + l + r);
    return n->val + max(l, r);
}`,
          js: `function maxPathSum(root) {
  let best = -Infinity;
  const dfs = (n) => {
    if (!n) return 0;
    const l = Math.max(0, dfs(n.left)), r = Math.max(0, dfs(n.right));
    best = Math.max(best, n.val + l + r);
    return n.val + Math.max(l, r);
  };
  dfs(root);
  return best;
}`
        }
      }
    ]
  },
  {
    id: 'graphs',
    title: 'Graphs & Shortest Paths',
    description: 'Grid BFS/DFS, Topological Sort, Dijkstra, and Union-Find connectivity.',
    problems: [
      {
        id: 'dsa-num-islands',
        title: 'Number of Islands',
        difficulty: 'Medium',
        pattern: 'Grid DFS / BFS',
        companies: ['Amazon', 'Google', 'Microsoft', 'Flipkart'],
        summary: 'Count the number of connected land ("1") components in a 2D binary grid.',
        brute: 'Union-find over all grid cells.',
        optimal: 'Iterate cells; whenever "1" is found, increment count and flood-fill ("0") its 4-directional component via DFS/BFS.',
        time: 'O(R·C)',
        space: 'O(R·C)',
        code: {
          python: `def num_islands(grid):
    R, C = len(grid), len(grid[0])
    def dfs(r, c):
        if r < 0 or r >= R or c < 0 or c >= C or grid[r][c] != '1': return
        grid[r][c] = '0'
        dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1)
    ans = 0
    for r in range(R):
        for c in range(C):
            if grid[r][c] == '1':
                ans += 1
                dfs(r, c)
    return ans`,
          cpp: `void dfs(vector<vector<char>>& g, int r, int c) {
    if (r<0||r>=g.size()||c<0||c>=g[0].size()||g[r][c]!='1') return;
    g[r][c] = '0';
    dfs(g,r+1,c); dfs(g,r-1,c); dfs(g,r,c+1); dfs(g,r,c-1);
}`,
          js: `function numIslands(grid) {
  const R = grid.length, C = grid[0].length;
  const dfs = (r, c) => {
    if (r < 0 || r >= R || c < 0 || c >= C || grid[r][c] !== '1') return;
    grid[r][c] = '0';
    dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1);
  };
  let ans = 0;
  for (let r = 0; r < R; r++)
    for (let c = 0; c < C; c++)
      if (grid[r][c] === '1') { ans++; dfs(r, c); }
  return ans;
}`
        }
      },
      {
        id: 'dsa-course-schedule',
        title: 'Course Schedule (Cycle Detection / Topo Sort)',
        difficulty: 'Medium',
        pattern: 'Kahn’s Algorithm (BFS Topo Sort)',
        companies: ['Amazon', 'Google', 'Atlassian'],
        summary: 'Given numCourses and prerequisites [a, b], determine if it is possible to finish all courses.',
        brute: 'Run DFS cycle check from each node without memoization.',
        optimal: 'Compute in-degrees; push all 0-indegree nodes into queue, pop and decrement neighbor indegrees. Valid iff processed == numCourses.',
        time: 'O(V + E)',
        space: 'O(V + E)',
        code: {
          python: `from collections import deque
def can_finish(n, prereqs):
    adj = [[] for _ in range(n)]
    indeg = [0] * n
    for a, b in prereqs:
        adj[b].append(a)
        indeg[a] += 1
    q = deque(i for i in range(n) if indeg[i] == 0)
    done = 0
    while q:
        u = q.popleft()
        done += 1
        for v in adj[u]:
            indeg[v] -= 1
            if indeg[v] == 0: q.append(v)
    return done == n`,
          cpp: `bool canFinish(int n, vector<vector<int>>& pre) {
    vector<vector<int>> adj(n); vector<int> indeg(n, 0);
    for (auto& e : pre) { adj[e[1]].push_back(e[0]); indeg[e[0]]++; }
    queue<int> q;
    for (int i = 0; i < n; ++i) if (indeg[i] == 0) q.push(i);
    int done = 0;
    while (!q.empty()) {
        int u = q.front(); q.pop(); done++;
        for (int v : adj[u]) if (--indeg[v] == 0) q.push(v);
    }
    return done == n;
}`,
          js: `function canFinish(n, pre) {
  const adj = Array.from({ length: n }, () => []), indeg = Array(n).fill(0);
  for (const [a, b] of pre) { adj[b].push(a); indeg[a]++; }
  const q = [];
  for (let i = 0; i < n; i++) if (indeg[i] === 0) q.push(i);
  let done = 0;
  while (q.length) {
    const u = q.shift(); done++;
    for (const v of adj[u]) if (--indeg[v] === 0) q.push(v);
  }
  return done === n;
}`
        }
      },
      {
        id: 'dsa-rotting-oranges',
        title: 'Rotting Oranges',
        difficulty: 'Medium',
        pattern: 'Multi-Source BFS',
        companies: ['Amazon', 'Flipkart', 'Microsoft'],
        summary: 'Find minimum minutes until no fresh orange remains when every rotten orange rots adjacent fresh ones each minute.',
        brute: 'Simulate minute by minute scanning entire grid.',
        optimal: 'Enqueue all initially rotten oranges at t=0 and run level-by-level Multi-Source BFS.',
        time: 'O(R·C)',
        space: 'O(R·C)',
        code: {
          python: `from collections import deque
def oranges_rotting(grid):
    R, C = len(grid), len(grid[0])
    q, fresh = deque(), 0
    for r in range(R):
        for c in range(C):
            if grid[r][c] == 2: q.append((r, c))
            elif grid[r][c] == 1: fresh += 1
    mins = 0
    while q and fresh:
        mins += 1
        for _ in range(len(q)):
            r, c = q.popleft()
            for dr, dc in ((1,0),(-1,0),(0,1),(0,-1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < R and 0 <= nc < C and grid[nr][nc] == 1:
                    grid[nr][nc] = 2; fresh -= 1; q.append((nr, nc))
    return mins if fresh == 0 else -1`,
          cpp: `int orangesRotting(vector<vector<int>>& g) {
    int R = g.size(), C = g[0].size(), fresh = 0, mins = 0;
    queue<pair<int,int>> q;
    for(int r=0;r<R;r++) for(int c=0;c<C;c++)
        if(g[r][c]==2) q.push({r,c}); else if(g[r][c]==1) fresh++;
    int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
    while(!q.empty() && fresh) {
        mins++; int sz = q.size();
        while(sz--) {
            auto [r,c] = q.front(); q.pop();
            for(auto& d:dirs){
                int nr=r+d[0], nc=c+d[1];
                if(nr>=0&&nr<R&&nc>=0&&nc<C&&g[nr][nc]==1){g[nr][nc]=2; fresh--; q.push({nr,nc});}
            }
        }
    }
    return fresh == 0 ? mins : -1;
}`,
          js: `function orangesRotting(grid) {
  const R = grid.length, C = grid[0].length, q = [];
  let fresh = 0, mins = 0;
  for (let r = 0; r < R; r++)
    for (let c = 0; c < C; c++)
      if (grid[r][c] === 2) q.push([r, c]);
      else if (grid[r][c] === 1) fresh++;
  while (q.length && fresh) {
    mins++;
    for (let i = q.length; i > 0; i--) {
      const [r, c] = q.shift();
      for (const [dr, dc] of [[1,0],[-1,0],[0,1],[0,-1]]) {
        const nr = r + dr, nc = c + dc;
        if (nr>=0 && nr<R && nc>=0 && nc<C && grid[nr][nc] === 1) {
          grid[nr][nc] = 2; fresh--; q.push([nr, nc]);
        }
      }
    }
  }
  return fresh === 0 ? mins : -1;
}`
        }
      },
      {
        id: 'dsa-dijkstra-network',
        title: 'Network Delay Time (Dijkstra)',
        difficulty: 'Medium',
        pattern: 'Min-Heap Shortest Path',
        companies: ['Google', 'Amazon', 'Microsoft'],
        summary: 'Given weighted directed edges (u, v, w), find how long it takes for all N nodes to receive a signal sent from node k.',
        brute: 'Bellman-Ford in O(V·E).',
        optimal: 'Run Dijkstra from source k using a Min-Heap (dist, node) and skip stale heap entries.',
        time: 'O((V + E) log V)',
        space: 'O(V + E)',
        code: {
          python: `import heapq
def network_delay_time(times, n, k):
    adj = [[] for _ in range(n + 1)]
    for u, v, w in times: adj[u].append((v, w))
    dist = {k: 0}
    pq = [(0, k)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist.get(u, float('inf')): continue
        for v, w in adj[u]:
            if d + w < dist.get(v, float('inf')):
                dist[v] = d + w
                heapq.heappush(pq, (d + w, v))
    return max(dist.values()) if len(dist) == n else -1`,
          cpp: `int networkDelayTime(vector<vector<int>>& times, int n, int k) {
    vector<vector<pair<int,int>>> adj(n+1);
    for (auto& t : times) adj[t[0]].push_back({t[1], t[2]});
    vector<int> dist(n+1, INT_MAX); dist[k] = 0;
    priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
    pq.push({0, k});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (d > dist[u]) continue;
        for (auto [v, w] : adj[u])
            if (d + w < dist[v]) { dist[v] = d + w; pq.push({dist[v], v}); }
    }
    int mx = *max_element(dist.begin() + 1, dist.end());
    return mx == INT_MAX ? -1 : mx;
}`,
          js: `// Uses Min-Heap; concise priority queue logic shown in Python/C++ tabs.`
        }
      },
      {
        id: 'dsa-word-ladder',
        title: 'Word Ladder',
        difficulty: 'Hard',
        pattern: 'Shortest Path BFS',
        companies: ['Google', 'Amazon', 'Atlassian'],
        summary: 'Find the length of shortest transformation sequence from beginWord to endWord changing 1 letter at a time using wordList.',
        brute: 'Build full O(N²·L) pairwise graph then BFS.',
        optimal: 'Run BFS from beginWord; generate 26*L wildcard neighbors and check membership in O(1) wordSet, deleting visited words.',
        time: 'O(N · L²)',
        space: 'O(N · L)',
        code: {
          python: `from collections import deque
def ladder_length(begin, end, word_list):
    words = set(word_list)
    if end not in words: return 0
    q = deque([(begin, 1)])
    while q:
        w, steps = q.popleft()
        if w == end: return steps
        for i in range(len(w)):
            for c in 'abcdefghijklmnopqrstuvwxyz':
                nxt = w[:i] + c + w[i+1:]
                if nxt in words:
                    words.remove(nxt)
                    q.append((nxt, steps + 1))
    return 0`,
          cpp: `int ladderLength(string begin, string end, vector<string>& wl) {
    unordered_set<string> words(wl.begin(), wl.end());
    if (!words.count(end)) return 0;
    queue<pair<string,int>> q; q.push({begin, 1});
    while (!q.empty()) {
        auto [w, steps] = q.front(); q.pop();
        if (w == end) return steps;
        for (int i = 0; i < w.size(); ++i) {
            char orig = w[i];
            for (char c = 'a'; c <= 'z'; ++c) {
                w[i] = c;
                if (words.count(w)) { words.erase(w); q.push({w, steps + 1}); }
            }
            w[i] = orig;
        }
    }
    return 0;
}`,
          js: `function ladderLength(begin, end, wordList) {
  const words = new Set(wordList);
  if (!words.has(end)) return 0;
  const q = [[begin, 1]];
  while (q.length) {
    const [w, steps] = q.shift();
    if (w === end) return steps;
    for (let i = 0; i < w.length; i++) {
      for (let ch = 97; ch <= 122; ch++) {
        const nxt = w.slice(0, i) + String.fromCharCode(ch) + w.slice(i + 1);
        if (words.has(nxt)) { words.delete(nxt); q.push([nxt, steps + 1]); }
      }
    }
  }
  return 0;
}`
        }
      }
    ]
  },
  {
    id: 'dynamic-programming',
    title: 'Dynamic Programming',
    description: '1D/2D DP, Knapsack, LIS, LCS, and Edit Distance state transitions.',
    problems: [
      {
        id: 'dsa-house-robber',
        title: 'House Robber',
        difficulty: 'Medium',
        pattern: '1D Take / Skip DP',
        companies: ['Amazon', 'Google', 'Flipkart'],
        summary: 'Maximize money robbed from non-adjacent houses along a street.',
        brute: 'Recursion branching into rob(i+2) vs rob(i+1) in O(2^N).',
        optimal: 'Track only two rolling states: prev2 and prev1, updating cur = max(prev1, prev2 + num).',
        time: 'O(N)',
        space: 'O(1)',
        code: {
          python: `def rob(nums):
    prev2 = prev1 = 0
    for x in nums:
        prev2, prev1 = prev1, max(prev1, prev2 + x)
    return prev1`,
          cpp: `int rob(vector<int>& nums) {
    int p2 = 0, p1 = 0;
    for (int x : nums) { int cur = max(p1, p2 + x); p2 = p1; p1 = cur; }
    return p1;
}`,
          js: `function rob(nums) {
  let p2 = 0, p1 = 0;
  for (const x of nums) [p2, p1] = [p1, Math.max(p1, p2 + x)];
  return p1;
}`
        }
      },
      {
        id: 'dsa-coin-change',
        title: 'Coin Change (Minimum Coins)',
        difficulty: 'Medium',
        pattern: 'Unbounded Knapsack DP',
        companies: ['Amazon', 'Microsoft', 'Infosys SP'],
        summary: 'Compute the fewest number of coins needed to make up a given amount.',
        brute: 'Exponential recursion trying all coin combinations.',
        optimal: 'dp[a] = min coins to form amount a. Iterate amounts 1..amount and transition dp[a] = min(dp[a], 1 + dp[a - coin]).',
        time: 'O(Amount · Coins)',
        space: 'O(Amount)',
        code: {
          python: `def coin_change(coins, amount):
    dp = [amount + 1] * (amount + 1)
    dp[0] = 0
    for a in range(1, amount + 1):
        for c in coins:
            if c <= a:
                dp[a] = min(dp[a], 1 + dp[a - c])
    return dp[amount] if dp[amount] <= amount else -1`,
          cpp: `int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, amount + 1);
    dp[0] = 0;
    for (int a = 1; a <= amount; ++a)
        for (int c : coins)
            if (c <= a) dp[a] = min(dp[a], 1 + dp[a - c]);
    return dp[amount] > amount ? -1 : dp[amount];
}`,
          js: `function coinChange(coins, amount) {
  const dp = Array(amount + 1).fill(amount + 1);
  dp[0] = 0;
  for (let a = 1; a <= amount; a++)
    for (const c of coins)
      if (c <= a) dp[a] = Math.min(dp[a], 1 + dp[a - c]);
  return dp[amount] > amount ? -1 : dp[amount];
}`
        }
      },
      {
        id: 'dsa-lis',
        title: 'Longest Increasing Subsequence (LIS)',
        difficulty: 'Medium',
        pattern: 'Patience Sorting / Binary Search',
        companies: ['Google', 'Amazon', 'TCS Prime'],
        summary: 'Find the length of the longest strictly increasing subsequence.',
        brute: 'O(N²) DP checking all prior smaller elements.',
        optimal: 'Maintain `tails` array where tails[k] is the smallest possible tail of an increasing subsequence of length k+1; binary search replacement index.',
        time: 'O(N log N)',
        space: 'O(N)',
        code: {
          python: `import bisect
def length_of_lis(nums):
    tails = []
    for x in nums:
        idx = bisect.bisect_left(tails, x)
        if idx == len(tails): tails.append(x)
        else: tails[idx] = x
    return len(tails)`,
          cpp: `int lengthOfLIS(vector<int>& nums) {
    vector<int> tails;
    for (int x : nums) {
        auto it = lower_bound(tails.begin(), tails.end(), x);
        if (it == tails.end()) tails.push_back(x);
        else *it = x;
    }
    return tails.size();
}`,
          js: `function lengthOfLIS(nums) {
  const tails = [];
  for (const x of nums) {
    let l = 0, r = tails.length;
    while (l < r) {
      const m = (l + r) >> 1;
      if (tails[m] < x) l = m + 1; else r = m;
    }
    tails[l] = x;
  }
  return tails.length;
}`
        }
      },
      {
        id: 'dsa-lcs',
        title: 'Longest Common Subsequence (LCS)',
        difficulty: 'Medium',
        pattern: '2D String DP',
        companies: ['Amazon', 'Microsoft', 'Zoho'],
        summary: 'Return the length of the longest common subsequence between two strings text1 and text2.',
        brute: 'Generate all 2^N subsequences.',
        optimal: 'If s1[i]==s2[j], dp[i][j] = 1 + dp[i-1][j-1]; else max(dp[i-1][j], dp[i][j-1]).',
        time: 'O(M · N)',
        space: 'O(min(M, N))',
        code: {
          python: `def longest_common_subsequence(s1, s2):
    m, n = len(s1), len(s2)
    dp = [0] * (n + 1)
    for i in range(1, m + 1):
        prev = 0
        for j in range(1, n + 1):
            tmp = dp[j]
            dp[j] = 1 + prev if s1[i-1] == s2[j-1] else max(dp[j], dp[j-1])
            prev = tmp
    return dp[n]`,
          cpp: `int longestCommonSubsequence(string a, string b) {
    int m = a.size(), n = b.size();
    vector<int> dp(n + 1, 0);
    for (int i = 1; i <= m; ++i) {
        int prev = 0;
        for (int j = 1; j <= n; ++j) {
            int tmp = dp[j];
            dp[j] = (a[i-1] == b[j-1]) ? 1 + prev : max(dp[j], dp[j-1]);
            prev = tmp;
        }
    }
    return dp[n];
}`,
          js: `function longestCommonSubsequence(a, b) {
  const dp = Array(b.length + 1).fill(0);
  for (let i = 1; i <= a.length; i++) {
    let prev = 0;
    for (let j = 1; j <= b.length; j++) {
      const tmp = dp[j];
      dp[j] = a[i - 1] === b[j - 1] ? 1 + prev : Math.max(dp[j], dp[j - 1]);
      prev = tmp;
    }
  }
  return dp[b.length];
}`
        }
      },
      {
        id: 'dsa-edit-distance',
        title: 'Edit Distance (Levenshtein)',
        difficulty: 'Hard',
        pattern: '2D Transformation DP',
        companies: ['Google', 'Goldman Sachs', 'Microsoft'],
        summary: 'Minimum insert, delete, or replace operations to convert word1 into word2.',
        brute: 'Recursive branching across 3 edit operations.',
        optimal: 'dp[i][j] = dp[i-1][j-1] if chars match, else 1 + min(insert, delete, replace).',
        time: 'O(M · N)',
        space: 'O(M · N)',
        code: {
          python: `def min_distance(w1, w2):
    m, n = len(w1), len(w2)
    dp = [[0]*(n+1) for _ in range(m+1)]
    for i in range(m+1): dp[i][0] = i
    for j in range(n+1): dp[0][j] = j
    for i in range(1, m+1):
        for j in range(1, n+1):
            if w1[i-1] == w2[j-1]: dp[i][j] = dp[i-1][j-1]
            else: dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
    return dp[m][n]`,
          cpp: `int minDistance(string w1, string w2) {
    int m = w1.size(), n = w2.size();
    vector<vector<int>> dp(m+1, vector<int>(n+1));
    for(int i=0;i<=m;i++) dp[i][0]=i;
    for(int j=0;j<=n;j++) dp[0][j]=j;
    for(int i=1;i<=m;i++) for(int j=1;j<=n;j++)
        dp[i][j] = w1[i-1]==w2[j-1] ? dp[i-1][j-1] : 1+min({dp[i-1][j],dp[i][j-1],dp[i-1][j-1]});
    return dp[m][n];
}`,
          js: `function minDistance(w1, w2) {
  const m = w1.length, n = w2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = w1[i-1] === w2[j-1] ? dp[i-1][j-1] : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  return dp[m][n];
}`
        }
      }
    ]
  },
  {
    id: 'heaps-greedy-tries',
    title: 'Heaps, Tries & Greedy',
    description: 'Top-K streaming, Median from stream, Prefix Trees, and Greedy scheduling.',
    problems: [
      {
        id: 'dsa-kth-largest',
        title: 'Kth Largest Element in an Array',
        difficulty: 'Medium',
        pattern: 'Min-Heap of Size K',
        companies: ['Amazon', 'Flipkart', 'Microsoft'],
        summary: 'Find the kth largest element in an unsorted array.',
        brute: 'Sort array in O(N log N).',
        optimal: 'Maintain a Min-Heap of size k; top of heap after processing all elements is the kth largest (or QuickSelect O(N) average).',
        time: 'O(N log K)',
        space: 'O(K)',
        code: {
          python: `import heapq
def find_kth_largest(nums, k):
    heap = []
    for x in nums:
        heapq.heappush(heap, x)
        if len(heap) > k: heapq.heappop(heap)
    return heap[0]`,
          cpp: `int findKthLargest(vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> pq;
    for (int x : nums) { pq.push(x); if (pq.size() > k) pq.pop(); }
    return pq.top();
}`,
          js: `// QuickSelect or Min-Heap of size k.`
        }
      },
      {
        id: 'dsa-merge-k-lists',
        title: 'Merge K Sorted Lists',
        difficulty: 'Hard',
        pattern: 'Min-Heap / Divide & Conquer',
        companies: ['Google', 'Amazon', 'Atlassian'],
        summary: 'Merge k sorted linked lists into a single sorted linked list.',
        brute: 'Collect all N nodes, sort, and rebuild list in O(N log N).',
        optimal: 'Push the head of each non-empty list into a Min-Heap (val, idx, node), pop smallest, and push its `.next`.',
        time: 'O(N log K)',
        space: 'O(K)',
        code: {
          python: `import heapq
def merge_k_lists(lists):
    pq = []
    for i, node in enumerate(lists):
        if node: heapq.heappush(pq, (node.val, i, node))
    dummy = cur = ListNode()
    while pq:
        _, i, node = heapq.heappop(pq)
        cur.next = node; cur = cur.next
        if node.next: heapq.heappush(pq, (node.next.val, i, node.next))
    return dummy.next`,
          cpp: `// Push list heads into priority_queue with custom comparator > on node->val`,
          js: `// Divide and conquer pairs merge in O(N log K) time and O(1) space.`
        }
      },
      {
        id: 'dsa-implement-trie',
        title: 'Implement Trie (Prefix Tree)',
        difficulty: 'Medium',
        pattern: 'Trie Tree',
        companies: ['Google', 'Microsoft', 'Atlassian'],
        summary: 'Implement insert, search, and startsWith operations for a lowercase string dictionary.',
        brute: 'Scan list of strings on every prefix query.',
        optimal: 'Store character children maps per node with an `isEnd` boolean flag.',
        time: 'O(L) per op',
        space: 'O(Total Chars)',
        code: {
          python: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.end = False
class Trie:
    def __init__(self): self.root = TrieNode()
    def insert(self, word: str):
        cur = self.root
        for c in word: cur = cur.children.setdefault(c, TrieNode())
        cur.end = True
    def search(self, word: str) -> bool:
        cur = self.root
        for c in word:
            if c not in cur.children: return False
            cur = cur.children[c]
        return cur.end
    def startsWith(self, prefix: str) -> bool:
        cur = self.root
        for c in prefix:
            if c not in cur.children: return False
            cur = cur.children[c]
        return True`,
          cpp: `struct TrieNode { TrieNode* ch[26]{}; bool end = false; };`,
          js: `class Trie {
  constructor() { this.root = {}; }
  insert(word) {
    let cur = this.root;
    for (const c of word) cur = cur[c] ??= {};
    cur.end = true;
  }
  search(word) {
    let cur = this.root;
    for (const c of word) { if (!cur[c]) return false; cur = cur[c]; }
    return !!cur.end;
  }
}`
        }
      },
      {
        id: 'dsa-jump-game',
        title: 'Jump Game / Minimum Platforms',
        difficulty: 'Medium',
        pattern: 'Greedy Reachability',
        companies: ['Amazon', 'Flipkart', 'Zoho'],
        summary: 'Determine if you can reach the last index where nums[i] represents max jump length from index i.',
        brute: 'DP from right to left in O(N²).',
        optimal: 'Track the farthest reachable index `reach = max(reach, i + nums[i])`; return false immediately if i > reach.',
        time: 'O(N)',
        space: 'O(1)',
        code: {
          python: `def can_jump(nums):
    reach = 0
    for i, jump in enumerate(nums):
        if i > reach: return False
        reach = max(reach, i + jump)
    return True`,
          cpp: `bool canJump(vector<int>& nums) {
    int reach = 0;
    for (int i = 0; i < nums.size(); ++i) {
        if (i > reach) return false;
        reach = max(reach, i + nums[i]);
    }
    return true;
}`,
          js: `function canJump(nums) {
  let reach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > reach) return false;
    reach = Math.max(reach, i + nums[i]);
  }
  return true;
}`
        }
      }
    ]
  },
  {
    id: 'backtracking-bits',
    title: 'Backtracking, Bits & Math',
    description: 'Subsets, N-Queens, XOR tricks, and Modular Exponentiation.',
    problems: [
      {
        id: 'dsa-subsets',
        title: 'Subsets & Permutations',
        difficulty: 'Medium',
        pattern: 'Decision Tree Backtracking',
        companies: ['Amazon', 'Microsoft', 'Infosys'],
        summary: 'Generate all unique subsets (power set) of an integer array.',
        brute: 'Iterative bitmasking or cascading list copy.',
        optimal: 'DFS branching on include/exclude (or iterating start..n) and popping after recursion.',
        time: 'O(N · 2^N)',
        space: 'O(N) stack',
        code: {
          python: `def subsets(nums):
    res, path = [], []
    def dfs(i):
        if i == len(nums):
            res.append(path[:]); return
        path.append(nums[i]); dfs(i + 1)
        path.pop(); dfs(i + 1)
    dfs(0)
    return res`,
          cpp: `void dfs(int i, vector<int>& nums, vector<int>& path, vector<vector<int>>& res) {
    if (i == nums.size()) { res.push_back(path); return; }
    path.push_back(nums[i]); dfs(i + 1, nums, path, res);
    path.pop_back(); dfs(i + 1, nums, path, res);
}`,
          js: `function subsets(nums) {
  const res = [], path = [];
  const dfs = (i) => {
    if (i === nums.length) { res.push([...path]); return; }
    path.push(nums[i]); dfs(i + 1);
    path.pop(); dfs(i + 1);
  };
  dfs(0);
  return res;
}`
        }
      },
      {
        id: 'dsa-n-queens',
        title: 'N-Queens',
        difficulty: 'Hard',
        pattern: 'Constraint Backtracking',
        companies: ['Google', 'Zoho', 'Amazon'],
        summary: 'Place N queens on an N×N chessboard so no two queens attack each other.',
        brute: 'Generate all board placements and validate.',
        optimal: 'Place row by row tracking occupied `cols`, `diag1 (r - c)`, and `diag2 (r + c)` in O(1) sets.',
        time: 'O(N!)',
        space: 'O(N²)',
        code: {
          python: `def solve_n_queens(n):
    cols, d1, d2, res = set(), set(), set(), []
    board = [['.']*n for _ in range(n)]
    def bt(r):
        if r == n:
            res.append([''.join(row) for row in board]); return
        for c in range(n):
            if c in cols or (r-c) in d1 or (r+c) in d2: continue
            cols.add(c); d1.add(r-c); d2.add(r+c); board[r][c] = 'Q'
            bt(r + 1)
            cols.remove(c); d1.remove(r-c); d2.remove(r+c); board[r][c] = '.'
    bt(0)
    return res`,
          cpp: `// Track cols, r-c+n, r+c boolean arrays for O(1) conflict check.`,
          js: `// Track cols, d1 (r-c), d2 (r+c) Sets while placing row by row.`
        }
      },
      {
        id: 'dsa-single-number',
        title: 'Single Number (XOR Properties)',
        difficulty: 'Easy',
        pattern: 'Bit Manipulation',
        companies: ['TCS', 'Accenture', 'NVIDIA', 'Amazon'],
        summary: 'Every element appears twice except one. Find that single element in O(N) time and O(1) space.',
        brute: 'HashMap frequency count in O(N) space.',
        optimal: 'XOR all elements together; since x ^ x = 0 and x ^ 0 = x, duplicates cancel out.',
        time: 'O(N)',
        space: 'O(1)',
        code: {
          python: `def single_number(nums):
    ans = 0
    for x in nums: ans ^= x
    return ans`,
          cpp: `int singleNumber(vector<int>& nums) {
    int ans = 0; for (int x : nums) ans ^= x; return ans;
}`,
          js: `function singleNumber(nums) { return nums.reduce((a, b) => a ^ b, 0); }`
        }
      },
      {
        id: 'dsa-pow-xn',
        title: 'Binary Exponentiation (Pow(x, n))',
        difficulty: 'Medium',
        pattern: 'Divide & Conquer Math',
        companies: ['Goldman Sachs', 'Amazon', 'Microsoft'],
        summary: 'Compute x raised to the power n in O(log |n|) time.',
        brute: 'Multiply x by itself |n| times in O(N).',
        optimal: 'Square base x = x * x and halve exponent n >>= 1, multiplying into result whenever n is odd.',
        time: 'O(log |N|)',
        space: 'O(1)',
        code: {
          python: `def my_pow(x, n):
    if n < 0: x, n = 1 / x, -n
    res = 1.0
    while n:
        if n & 1: res *= x
        x *= x
        n >>= 1
    return res`,
          cpp: `double myPow(double x, long long n) {
    if (n < 0) { x = 1 / x; n = -n; }
    double res = 1.0;
    while (n) {
        if (n & 1) res *= x;
        x *= x; n >>= 1;
    }
    return res;
}`,
          js: `function myPow(x, n) {
  if (n < 0) { x = 1 / x; n = -n; }
  let res = 1;
  while (n > 0) {
    if (n % 2 === 1) res *= x;
    x *= x; n = Math.floor(n / 2);
  }
  return res;
}`
        }
      }
    ]
  }
];
