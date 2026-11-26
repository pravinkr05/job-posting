import { COMPANIES } from '../../data/companies.js';
import { JOBS } from '../../data/jobs.js';
import { esc, icon, difficultyBadgeClass } from '../components.js';

let compUiState = {
  query: '',
  category: 'ALL',
  selectedId: COMPANIES[0].id
};

export function renderCompanies(container, { params = {}, navigate }) {
  if (params.companyId && COMPANIES.some((c) => c.id === params.companyId)) {
    compUiState.selectedId = params.companyId;
  }

  const categories = ['ALL', ...new Set(COMPANIES.map((c) => c.category))];

  const filtered = COMPANIES.filter((c) => {
    if (compUiState.category !== 'ALL' && c.category !== compUiState.category) return false;
    if (compUiState.query.trim()) {
      const q = compUiState.query.toLowerCase();
      const hay = `${c.name} ${c.category} ${c.tagline} ${c.hiringMode}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  const active =
    filtered.find((c) => c.id === compUiState.selectedId) || filtered[0] || COMPANIES[0];
  compUiState.selectedId = active.id;

  const openRolesCount = JOBS.filter((j) => j.companyId === active.id).length;

  container.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="page-title">Companies Hiring Process</h1>
        <p class="page-subtitle">Detailed Exam Patterns, Topic-wise Syllabus, Eligibility Criteria, Selection Rounds &amp; CTC ranges.</p>
      </div>
    </div>

    <div class="filter-bar">
      <div class="filter-search">
        <span class="filter-search-icon">${icon('search')}</span>
        <input id="comp-search" class="input" type="search" placeholder="Filter companies (e.g. Google, TCS, Flipkart, Infosys)..." value="${esc(compUiState.query)}" />
      </div>
      <select id="comp-cat-filter" class="select filter-select" aria-label="Company Category">
        ${categories
          .map(
            (cat) =>
              `<option value="${esc(cat)}" ${compUiState.category === cat ? 'selected' : ''}>${cat === 'ALL' ? 'All Categories' : esc(cat)}</option>`
          )
          .join('')}
      </select>
    </div>

    <div class="prep-layout">
      <!-- Company Selector List -->
      <aside class="prep-sidebar">
        <div class="card" style="padding:12px;display:flex;flex-direction:column;gap:8px;">
          ${
            filtered.length === 0
              ? `<div style="padding:18px;text-align:center;color:var(--text-muted);">No companies matched.</div>`
              : filtered
                  .map(
                    (c) => `
                  <button class="topic-item ${c.id === active.id ? 'active' : ''}" data-select-company="${esc(c.id)}">
                    <div style="display:flex;align-items:center;gap:10px;">
                      <span class="company-avatar" style="width:34px;height:34px;border-radius:9px;font-size:13px;background:${esc(c.color)}">${esc(c.name.slice(0, 2).toUpperCase())}</span>
                      <div>
                        <div class="topic-item-title">${esc(c.name)}</div>
                        <div class="topic-item-sub">${esc(c.category)}</div>
                      </div>
                    </div>
                    <span class="badge ${difficultyBadgeClass(c.difficulty)}" style="font-size:10.5px;">${esc(c.difficulty)}</span>
                  </button>
                `
                  )
                  .join('')
          }
        </div>
      </aside>

      <!-- Company Blueprint Details -->
      <section class="card" style="padding:24px;display:flex;flex-direction:column;gap:22px;">
        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;align-items:flex-start;gap:14px;">
          <div style="display:flex;gap:14px;align-items:center;">
            <div class="company-avatar" style="width:52px;height:52px;font-size:19px;background:${esc(active.color)}">${esc(active.name.slice(0, 2).toUpperCase())}</div>
            <div>
              <div class="tag-list" style="margin-bottom:4px;">
                <span class="badge badge-accent">${esc(active.category)}</span>
                <span class="badge badge-neutral">${esc(active.hiringMode)}</span>
                <span class="badge ${difficultyBadgeClass(active.difficulty)}">${esc(active.difficulty)}</span>
              </div>
              <h2 style="font-size:24px;">${esc(active.name)} Hiring Blueprint</h2>
              <p style="color:var(--text-secondary);margin-top:4px;">${esc(active.tagline)}</p>
            </div>
          </div>

          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            ${
              openRolesCount > 0
                ? `<button class="btn btn-primary btn-sm" id="comp-view-jobs">View ${openRolesCount} Open Role${openRolesCount > 1 ? 's' : ''}</button>`
                : ''
            }
            <button class="btn btn-secondary btn-sm" id="comp-practice-dsa">${icon('code')} Practice DSA Sheet</button>
          </div>
        </div>

        <!-- Eligibility & Package Grid -->
        <div class="grid-2">
          <div class="note-block">
            <h4>Eligibility Criteria</h4>
            <ul style="color:var(--text-secondary);display:grid;gap:6px;font-size:13.5px;">
              <li><strong>CGPA / Percentage:</strong> ${esc(active.eligibility.cgpa)}</li>
              <li><strong>Backlogs Policy:</strong> ${esc(active.eligibility.backlogs)}</li>
              <li><strong>Eligible Branches:</strong> ${esc(active.eligibility.branches)}</li>
              <li><strong>Target Batches:</strong> ${esc(active.eligibility.gradYear)}</li>
            </ul>
          </div>
          <div class="note-block">
            <h4>Compensation &amp; Prep Focus</h4>
            <p style="font-size:15px;font-weight:700;color:var(--accent-text);margin-bottom:8px;">${esc(active.ctcRange)}</p>
            <ul style="color:var(--text-secondary);display:grid;gap:6px;font-size:13.5px;">
              ${active.tips.map((tip) => `<li>${esc(tip)}</li>`).join('')}
            </ul>
          </div>
        </div>

        <!-- Exam Pattern Table -->
        <div>
          <h3 style="font-size:17px;margin-bottom:10px;">Exam Pattern &amp; Rounds Breakdown</h3>
          <div class="pattern-table-wrap">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Section / Round</th>
                  <th>Questions / Format</th>
                  <th>Duration</th>
                  <th>Marking / Evaluation</th>
                  <th>Difficulty</th>
                </tr>
              </thead>
              <tbody>
                ${active.examPattern
                  .map(
                    (row) => `
                  <tr>
                    <td style="font-weight:600;">${esc(row.section)}</td>
                    <td>${esc(row.questions)}</td>
                    <td>${esc(row.duration)}</td>
                    <td style="color:var(--text-secondary);">${esc(row.marking)}</td>
                    <td><span class="badge ${difficultyBadgeClass(row.level)}">${esc(row.level)}</span></td>
                  </tr>
                `
                  )
                  .join('')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Selection Process Timeline -->
        <div>
          <h3 style="font-size:17px;margin-bottom:12px;">Selection Process Timeline</h3>
          <div class="timeline">
            ${active.rounds
              .map(
                (r) => `
              <div class="timeline-step">
                <div style="font-weight:700;margin-bottom:3px;">${esc(r.title)}</div>
                <div style="font-size:13.5px;color:var(--text-secondary);">${esc(r.desc)}</div>
              </div>
            `
              )
              .join('')}
          </div>
        </div>

        <!-- Syllabus -->
        <div>
          <h3 style="font-size:17px;margin-bottom:10px;">Detailed Syllabus</h3>
          <div class="grid-3">
            <div class="note-block">
              <h4>Aptitude &amp; Reasoning</h4>
              <ul style="color:var(--text-secondary);font-size:13px;display:grid;gap:5px;">
                ${active.syllabus.aptitude.map((s) => `<li>${esc(s)}</li>`).join('')}
              </ul>
            </div>
            <div class="note-block">
              <h4>DSA &amp; Coding</h4>
              <ul style="color:var(--text-secondary);font-size:13px;display:grid;gap:5px;">
                ${active.syllabus.dsa.map((s) => `<li>${esc(s)}</li>`).join('')}
              </ul>
            </div>
            <div class="note-block">
              <h4>Core CS &amp; Technical</h4>
              <ul style="color:var(--text-secondary);font-size:13px;display:grid;gap:5px;">
                ${active.syllabus.technical.map((s) => `<li>${esc(s)}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;

  const searchInput = container.querySelector('#comp-search');
  searchInput.addEventListener('input', (e) => {
    compUiState.query = e.target.value;
    const pos = e.target.selectionStart;
    renderCompanies(container, { navigate });
    const nextInput = container.querySelector('#comp-search');
    if (nextInput) {
      nextInput.focus();
      nextInput.setSelectionRange(pos, pos);
    }
  });

  container.querySelector('#comp-cat-filter').addEventListener('change', (e) => {
    compUiState.category = e.target.value;
    renderCompanies(container, { navigate });
  });

  container.querySelectorAll('[data-select-company]').forEach((btn) => {
    btn.addEventListener('click', () => {
      compUiState.selectedId = btn.getAttribute('data-select-company');
      renderCompanies(container, { navigate });
    });
  });

  const viewJobsBtn = container.querySelector('#comp-view-jobs');
  if (viewJobsBtn) {
    viewJobsBtn.addEventListener('click', () => {
      navigate('jobs', { companyFilter: active.name.split(' ')[0] });
    });
  }

  container.querySelector('#comp-practice-dsa').addEventListener('click', () => navigate('dsa'));
}
