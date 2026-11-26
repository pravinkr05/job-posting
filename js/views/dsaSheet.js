import { DSA_TOPICS } from '../../data/dsaSheet.js';
import { store } from '../store.js';
import {
  esc,
  icon,
  difficultyBadgeClass,
  openDrawer,
  renderCodeTabs,
  bindCodeTabs,
  showToast
} from '../components.js';

let dsaUiState = {
  query: '',
  difficulty: 'ALL',
  status: 'ALL', // ALL | SOLVED | UNSOLVED | REVISION
  collapsedTopics: {}
};

export function renderDsaSheet(container, { params = {} }) {
  const state = store.getState();

  const allProblems = DSA_TOPICS.flatMap((t) =>
    t.problems.map((p) => ({ ...p, topicTitle: t.title, topicId: t.id }))
  );

  const totalCount = allProblems.length;
  const solvedCount = allProblems.filter((p) => state.solvedDsa.includes(p.id)).length;
  const overallPct = totalCount ? Math.round((solvedCount / totalCount) * 100) : 0;

  const diffBreakdown = ['Easy', 'Medium', 'Hard'].map((diff) => {
    const items = allProblems.filter((p) => p.difficulty === diff);
    const done = items.filter((p) => state.solvedDsa.includes(p.id)).length;
    return { diff, total: items.length, done };
  });

  const filteredTopics = DSA_TOPICS.map((topic) => {
    const matchingProblems = topic.problems.filter((p) => {
      const isSolved = state.solvedDsa.includes(p.id);
      const isStarred = state.starredDsa.includes(p.id);
      if (dsaUiState.difficulty !== 'ALL' && p.difficulty !== dsaUiState.difficulty) return false;
      if (dsaUiState.status === 'SOLVED' && !isSolved) return false;
      if (dsaUiState.status === 'UNSOLVED' && isSolved) return false;
      if (dsaUiState.status === 'REVISION' && !isStarred) return false;

      if (dsaUiState.query.trim()) {
        const q = dsaUiState.query.toLowerCase();
        const hay = `${p.title} ${p.pattern} ${topic.title} ${p.companies.join(' ')}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    return { ...topic, matchingProblems };
  }).filter((t) => t.matchingProblems.length > 0);

  container.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="page-title">Topic-Wise DSA Sheet</h1>
        <p class="page-subtitle">Curated placement &amp; product-engineering sheet with brute-to-optimal intuition, complexity analysis, multi-language code, and personal notes.</p>
      </div>
      <button id="dsa-random-btn" class="btn btn-primary btn-sm">${icon('sparkles')} Pick Random Unsolved</button>
    </div>

    <!-- Progress Summary -->
    <section class="grid-4" style="margin-bottom:20px;">
      <div class="card stat-card">
        <div class="stat-top"><span>Overall Sheet Progress</span><span>${overallPct}%</span></div>
        <div class="stat-value">${solvedCount} <span style="font-size:16px;color:var(--text-muted);font-weight:600;">/ ${totalCount}</span></div>
        <div class="progress-track"><div class="progress-fill" style="width:${overallPct}%"></div></div>
      </div>
      ${diffBreakdown
        .map((d) => {
          const pct = d.total ? Math.round((d.done / d.total) * 100) : 0;
          return `
            <div class="card stat-card">
              <div class="stat-top">
                <span class="badge ${difficultyBadgeClass(d.diff)}">${d.diff}</span>
                <span>${pct}%</span>
              </div>
              <div class="stat-value">${d.done} <span style="font-size:16px;color:var(--text-muted);font-weight:600;">/ ${d.total}</span></div>
              <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
            </div>
          `;
        })
        .join('')}
    </section>

    <!-- Filter Bar -->
    <div class="filter-bar">
      <div class="filter-search">
        <span class="filter-search-icon">${icon('search')}</span>
        <input id="dsa-search" class="input" type="search" placeholder="Search problem, pattern, or company (e.g. LRU, Dijkstra, Amazon)..." value="${esc(dsaUiState.query)}" />
      </div>
      <select id="dsa-diff-filter" class="select filter-select" aria-label="Difficulty Filter">
        <option value="ALL" ${dsaUiState.difficulty === 'ALL' ? 'selected' : ''}>All Difficulties</option>
        <option value="Easy" ${dsaUiState.difficulty === 'Easy' ? 'selected' : ''}>Easy</option>
        <option value="Medium" ${dsaUiState.difficulty === 'Medium' ? 'selected' : ''}>Medium</option>
        <option value="Hard" ${dsaUiState.difficulty === 'Hard' ? 'selected' : ''}>Hard</option>
      </select>
      <select id="dsa-status-filter" class="select filter-select" aria-label="Status Filter">
        <option value="ALL" ${dsaUiState.status === 'ALL' ? 'selected' : ''}>All Problems</option>
        <option value="UNSOLVED" ${dsaUiState.status === 'UNSOLVED' ? 'selected' : ''}>Unsolved</option>
        <option value="SOLVED" ${dsaUiState.status === 'SOLVED' ? 'selected' : ''}>Solved</option>
        <option value="REVISION" ${dsaUiState.status === 'REVISION' ? 'selected' : ''}>Starred for Revision (${state.starredDsa.length})</option>
      </select>
    </div>

    <!-- Topic Accordions -->
    ${
      filteredTopics.length === 0
        ? `<div class="empty-state">
            <h3 style="margin-bottom:6px;">No problems match your filters</h3>
            <p>Reset your search or status filter to view the full DSA sheet.</p>
          </div>`
        : filteredTopics
            .map((topic, idx) => {
              const topicDone = topic.problems.filter((p) => state.solvedDsa.includes(p.id)).length;
              const topicPct = Math.round((topicDone / topic.problems.length) * 100);
              const isCollapsed = !!dsaUiState.collapsedTopics[topic.id];
              return `
                <div class="dsa-topic-card">
                  <button class="dsa-topic-header" data-toggle-topic="${esc(topic.id)}" aria-expanded="${!isCollapsed}">
                    <div>
                      <div style="font-size:16px;font-weight:700;">${idx + 1}. ${esc(topic.title)}</div>
                      <div style="font-size:12.5px;color:var(--text-muted);margin-top:2px;">${esc(topic.description)}</div>
                    </div>
                    <div class="dsa-topic-meta">
                      <div class="dsa-topic-progress">
                        <div style="display:flex;justify-content:space-between;font-size:12px;font-weight:600;margin-bottom:4px;">
                          <span>${topicDone}/${topic.problems.length}</span>
                          <span>${topicPct}%</span>
                        </div>
                        <div class="progress-track"><div class="progress-fill" style="width:${topicPct}%"></div></div>
                      </div>
                      <span style="transform:${isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)'};transition:transform 0.15s;">${icon('chevronDown')}</span>
                    </div>
                  </button>

                  <div class="${isCollapsed ? 'hidden' : ''}">
                    ${topic.matchingProblems
                      .map((p) => {
                        const solved = state.solvedDsa.includes(p.id);
                        const starred = state.starredDsa.includes(p.id);
                        const hasNote = !!(state.dsaNotes[p.id] && state.dsaNotes[p.id].trim());
                        return `
                          <div class="dsa-problem-row ${solved ? 'is-solved' : ''}">
                            <input
                              type="checkbox"
                              class="dsa-check"
                              data-dsa-check="${esc(p.id)}"
                              ${solved ? 'checked' : ''}
                              aria-label="Mark ${esc(p.title)} solved"
                            />
                            <div>
                              <div style="font-weight:600;cursor:pointer;" data-open-problem="${esc(p.id)}">${esc(p.title)}</div>
                              <div class="tag-list" style="margin-top:4px;">
                                ${p.companies.slice(0, 3).map((c) => `<span style="font-size:11px;color:var(--text-muted);">${esc(c)}</span>`).join(' · ')}
                              </div>
                            </div>
                            <div><span class="badge ${difficultyBadgeClass(p.difficulty)}">${esc(p.difficulty)}</span></div>
                            <div class="dsa-col-pattern"><span class="chip">${esc(p.pattern)}</span></div>
                            <div class="dsa-row-actions">
                              <button
                                type="button"
                                class="star-btn ${starred ? 'active' : ''}"
                                data-dsa-star="${esc(p.id)}"
                                title="${starred ? 'Remove revision star' : 'Mark for revision'}"
                              >${icon('star')}</button>
                              <button
                                type="button"
                                class="btn btn-secondary btn-sm"
                                data-open-problem="${esc(p.id)}"
                              >${hasNote ? `${icon('note')} Solution &amp; Note` : 'Solution &amp; Intuition'}</button>
                            </div>
                          </div>
                        `;
                      })
                      .join('')}
                  </div>
                </div>
              `;
            })
            .join('')
    }
  `;

  // Bind filters
  const searchInput = container.querySelector('#dsa-search');
  searchInput.addEventListener('input', (e) => {
    dsaUiState.query = e.target.value;
    const pos = e.target.selectionStart;
    renderDsaSheet(container, {});
    const nextInput = container.querySelector('#dsa-search');
    if (nextInput) {
      nextInput.focus();
      nextInput.setSelectionRange(pos, pos);
    }
  });

  container.querySelector('#dsa-diff-filter').addEventListener('change', (e) => {
    dsaUiState.difficulty = e.target.value;
    renderDsaSheet(container, {});
  });

  container.querySelector('#dsa-status-filter').addEventListener('change', (e) => {
    dsaUiState.status = e.target.value;
    renderDsaSheet(container, {});
  });

  container.querySelector('#dsa-random-btn').addEventListener('click', () => {
    const unsolved = allProblems.filter((p) => !store.getState().solvedDsa.includes(p.id));
    const pool = unsolved.length ? unsolved : allProblems;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    openProblemDrawer(pick, container);
  });

  // Topic collapse
  container.querySelectorAll('[data-toggle-topic]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-toggle-topic');
      dsaUiState.collapsedTopics[id] = !dsaUiState.collapsedTopics[id];
      renderDsaSheet(container, {});
    });
  });

  // Checkboxes & stars
  container.querySelectorAll('[data-dsa-check]').forEach((chk) => {
    chk.addEventListener('change', () => {
      const id = chk.getAttribute('data-dsa-check');
      const solved = store.toggleDsaSolved(id);
      showToast(solved ? 'Marked as solved!' : 'Marked as unsolved');
      renderDsaSheet(container, {});
    });
  });

  container.querySelectorAll('[data-dsa-star]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-dsa-star');
      const starred = store.toggleDsaStar(id);
      showToast(starred ? 'Flagged for revision' : 'Removed revision flag');
      renderDsaSheet(container, {});
    });
  });

  container.querySelectorAll('[data-open-problem]').forEach((el) => {
    el.addEventListener('click', () => {
      const id = el.getAttribute('data-open-problem');
      const problem = allProblems.find((p) => p.id === id);
      if (problem) openProblemDrawer(problem, container);
    });
  });

  if (params.problemId) {
    const target = allProblems.find((p) => p.id === params.problemId);
    if (target) openProblemDrawer(target, container);
  }
}

function openProblemDrawer(problem, container) {
  const state = store.getState();
  const isSolved = state.solvedDsa.includes(problem.id);
  const existingNote = state.dsaNotes[problem.id] || '';

  openDrawer({
    eyebrow: `${problem.topicTitle} · ${problem.pattern}`,
    title: problem.title,
    bodyHtml: `
      <div class="tag-list">
        <span class="badge ${difficultyBadgeClass(problem.difficulty)}">${esc(problem.difficulty)}</span>
        <span class="badge badge-accent">Time: ${esc(problem.time)}</span>
        <span class="badge badge-neutral">Space: ${esc(problem.space)}</span>
        ${problem.companies.map((c) => `<span class="chip">${esc(c)}</span>`).join('')}
      </div>

      <div class="note-block">
        <h4>Problem Statement</h4>
        <p style="color:var(--text-secondary);">${esc(problem.summary)}</p>
      </div>

      <div class="grid-2">
        <div class="note-block">
          <h4>Brute Force Baseline</h4>
          <p style="font-size:13.5px;color:var(--text-secondary);">${esc(problem.brute)}</p>
        </div>
        <div class="note-block" style="border-color:var(--accent);">
          <h4>Optimal Intuition</h4>
          <p style="font-size:13.5px;color:var(--text-secondary);">${esc(problem.optimal)}</p>
        </div>
      </div>

      <div>
        <h4 style="margin-bottom:10px;">Reference Implementations</h4>
        ${renderCodeTabs(problem.code, problem.id)}
      </div>

      <div class="divider"></div>

      <div>
        <label class="form-label" for="dsa-note-input">Your Personal Revision Notes</label>
        <textarea id="dsa-note-input" class="textarea" placeholder="Write edge cases, pitfalls, or dry-run insights to remember before interviews...">${esc(existingNote)}</textarea>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-top:10px;gap:10px;flex-wrap:wrap;">
          <button type="button" id="drawer-toggle-solved" class="btn btn-sm ${isSolved ? 'btn-success' : 'btn-secondary'}">
            ${isSolved ? `${icon('check')} Solved` : 'Mark Problem Solved'}
          </button>
          <button type="button" id="drawer-save-note" class="btn btn-primary btn-sm">Save Note</button>
        </div>
      </div>
    `,
    onMount: (bodyEl) => {
      bindCodeTabs(bodyEl, problem.code);

      bodyEl.querySelector('#drawer-save-note').addEventListener('click', () => {
        const val = bodyEl.querySelector('#dsa-note-input').value;
        store.saveDsaNote(problem.id, val);
        showToast('Revision note saved');
        renderDsaSheet(container, {});
      });

      bodyEl.querySelector('#drawer-toggle-solved').addEventListener('click', () => {
        const solved = store.toggleDsaSolved(problem.id);
        showToast(solved ? 'Marked as solved!' : 'Marked as unsolved');
        renderDsaSheet(container, {});
        openProblemDrawer(problem, container);
      });
    }
  });
}
