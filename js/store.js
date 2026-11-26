const STORAGE_KEY = 'prephire_state_v1';

const defaultState = {
  theme: 'light',
  savedJobs: ['job-google-swe-ng', 'job-atlassian-swe'],
  appliedJobs: {}, // { [jobId]: { date, name, email, resumeUrl, note, status } }
  solvedDsa: ['dsa-two-sum', 'dsa-valid-parens', 'dsa-reverse-ll'],
  starredDsa: ['dsa-lru-cache', 'dsa-trapping-rain'],
  dsaNotes: {}, // { [problemId]: string }
  completedPrep: ['apt-percent-profit'],
  quizAnswers: {}, // { [questionId]: { selected, isCorrect } }
  hrDrafts: {} // { [promptId]: string }
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(defaultState);
    const parsed = JSON.parse(raw);
    return {
      ...structuredClone(defaultState),
      ...parsed,
      appliedJobs: parsed.appliedJobs || {},
      dsaNotes: parsed.dsaNotes || {},
      quizAnswers: parsed.quizAnswers || {},
      hrDrafts: parsed.hrDrafts || {}
    };
  } catch {
    return structuredClone(defaultState);
  }
}

let state = loadState();
const listeners = new Set();

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore storage quota failures gracefully
  }
  listeners.forEach((fn) => fn(state));
}

export const store = {
  getState() {
    return state;
  },
  subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  },
  setTheme(theme) {
    state = { ...state, theme };
    document.documentElement.setAttribute('data-theme', theme);
    persist();
  },
  toggleTheme() {
    this.setTheme(state.theme === 'dark' ? 'light' : 'dark');
  },
  toggleSaveJob(jobId) {
    const exists = state.savedJobs.includes(jobId);
    const savedJobs = exists
      ? state.savedJobs.filter((id) => id !== jobId)
      : [...state.savedJobs, jobId];
    state = { ...state, savedJobs };
    persist();
    return !exists;
  },
  applyToJob(jobId, payload) {
    state = {
      ...state,
      appliedJobs: {
        ...state.appliedJobs,
        [jobId]: {
          ...payload,
          date: new Date().toISOString().slice(0, 10),
          status: 'Application Submitted'
        }
      }
    };
    persist();
  },
  toggleDsaSolved(problemId) {
    const exists = state.solvedDsa.includes(problemId);
    const solvedDsa = exists
      ? state.solvedDsa.filter((id) => id !== problemId)
      : [...state.solvedDsa, problemId];
    state = { ...state, solvedDsa };
    persist();
    return !exists;
  },
  toggleDsaStar(problemId) {
    const exists = state.starredDsa.includes(problemId);
    const starredDsa = exists
      ? state.starredDsa.filter((id) => id !== problemId)
      : [...state.starredDsa, problemId];
    state = { ...state, starredDsa };
    persist();
    return !exists;
  },
  saveDsaNote(problemId, note) {
    state = {
      ...state,
      dsaNotes: { ...state.dsaNotes, [problemId]: note }
    };
    persist();
  },
  togglePrepComplete(topicId) {
    const exists = state.completedPrep.includes(topicId);
    const completedPrep = exists
      ? state.completedPrep.filter((id) => id !== topicId)
      : [...state.completedPrep, topicId];
    state = { ...state, completedPrep };
    persist();
    return !exists;
  },
  recordQuizAnswer(questionId, selected, isCorrect) {
    state = {
      ...state,
      quizAnswers: {
        ...state.quizAnswers,
        [questionId]: { selected, isCorrect }
      }
    };
    persist();
  },
  resetQuizQuestions(questionIds) {
    const next = { ...state.quizAnswers };
    questionIds.forEach((id) => delete next[id]);
    state = { ...state, quizAnswers: next };
    persist();
  },
  saveHrDraft(promptId, text) {
    state = {
      ...state,
      hrDrafts: { ...state.hrDrafts, [promptId]: text }
    };
    persist();
  }
};
