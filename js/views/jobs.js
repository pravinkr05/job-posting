import { JOBS } from '../../data/jobs.js';
import { COMPANIES } from '../../data/companies.js';
import { store } from '../store.js';
import { esc, icon, openDrawer, openModal, closeModal, showToast } from '../components.js';

let jobUiState = {
  tab: 'all', // all | saved | applied
  query: '',
  type: 'ALL',
  workMode: 'ALL',
  sort: 'recent'
};

export function renderJobs(container, { params = {}, navigate }) {
  if (params.companyFilter) {
    jobUiState.query = params.companyFilter;
    jobUiState.tab = 'all';
  }

  const state = store.getState();

  const filtered = JOBS.filter((job) => {
    if (jobUiState.tab === 'saved' && !state.savedJobs.includes(job.id)) return false;
    if (jobUiState.tab === 'applied' && !state.appliedJobs[job.id]) return false;
    if (jobUiState.type !== 'ALL' && job.type !== jobUiState.type) return false;
    if (jobUiState.workMode !== 'ALL' && job.workMode !== jobUiState.workMode) return false;

    if (jobUiState.query.trim()) {
      const q = jobUiState.query.toLowerCase();
      const hay = `${job.title} ${job.companyName} ${job.location} ${job.skills.join(' ')}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  }).sort((a, b) => {
    if (jobUiState.sort === 'salary') return b.salaryLPA - a.salaryLPA;
    return a.postedDaysAgo - b.postedDaysAgo;
  });

  const appliedCount = Object.keys(state.appliedJobs).length;

  container.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="page-title">Job Portal</h1>
        <p class="page-subtitle">Curated campus, new-grad, and early-career engineering roles with direct links to company hiring patterns.</p>
      </div>
      <div class="tabs-bar" style="margin-bottom:0;">
        <button class="tab-btn ${jobUiState.tab === 'all' ? 'active' : ''}" data-job-tab="all">All Roles (${JOBS.length})</button>
        <button class="tab-btn ${jobUiState.tab === 'saved' ? 'active' : ''}" data-job-tab="saved">Saved (${state.savedJobs.length})</button>
        <button class="tab-btn ${jobUiState.tab === 'applied' ? 'active' : ''}" data-job-tab="applied">Applied (${appliedCount})</button>
      </div>
    </div>

    <div class="filter-bar">
      <div class="filter-search">
        <span class="filter-search-icon">${icon('search')}</span>
        <input id="job-search" class="input" type="search" placeholder="Search role, company, skill (e.g. Google, Java, Remote)..." value="${esc(jobUiState.query)}" />
      </div>
      <select id="job-type-filter" class="select filter-select" aria-label="Job Type">
        <option value="ALL" ${jobUiState.type === 'ALL' ? 'selected' : ''}>All Job Types</option>
        <option value="Full-Time" ${jobUiState.type === 'Full-Time' ? 'selected' : ''}>Full-Time</option>
        <option value="Internship" ${jobUiState.type === 'Internship' ? 'selected' : ''}>Internship</option>
      </select>
      <select id="job-mode-filter" class="select filter-select" aria-label="Work Mode">
        <option value="ALL" ${jobUiState.workMode === 'ALL' ? 'selected' : ''}>All Work Modes</option>
        <option value="Hybrid" ${jobUiState.workMode === 'Hybrid' ? 'selected' : ''}>Hybrid</option>
        <option value="Remote" ${jobUiState.workMode === 'Remote' ? 'selected' : ''}>Remote</option>
        <option value="On-Site" ${jobUiState.workMode === 'On-Site' ? 'selected' : ''}>On-Site</option>
      </select>
      <select id="job-sort" class="select filter-select" aria-label="Sort Jobs">
        <option value="recent" ${jobUiState.sort === 'recent' ? 'selected' : ''}>Newest First</option>
        <option value="salary" ${jobUiState.sort === 'salary' ? 'selected' : ''}>Highest CTC</option>
      </select>
      ${
        jobUiState.query || jobUiState.type !== 'ALL' || jobUiState.workMode !== 'ALL'
          ? `<button id="job-clear-filters" class="btn btn-ghost btn-sm">Clear</button>`
          : ''
      }
    </div>

    ${
      filtered.length === 0
        ? `<div class="empty-state">
            <h3 style="margin-bottom:6px;">No matching roles found</h3>
            <p>Try adjusting your search keywords or switching tabs.</p>
          </div>`
        : `<div class="grid-3">
            ${filtered
              .map((job) => {
                const isSaved = state.savedJobs.includes(job.id);
                const application = state.appliedJobs[job.id];
                const initials = job.companyName.slice(0, 2).toUpperCase();
                return `
                  <article class="card card-interactive job-card" data-job-card="${esc(job.id)}">
                    <div class="job-card-head">
                      <div style="display:flex;gap:12px;align-items:center;">
                        <div class="company-avatar" style="background:${esc(job.companyColor)}">${esc(initials)}</div>
                        <div>
                          <div style="font-size:13px;font-weight:600;color:var(--text-secondary);">${esc(job.companyName)}</div>
                          <h3 style="font-size:15.5px;margin-top:2px;">${esc(job.title)}</h3>
                        </div>
                      </div>
                      <button class="icon-btn" data-save-job="${esc(job.id)}" title="${isSaved ? 'Remove bookmark' : 'Save job'}" style="${isSaved ? 'color:var(--accent-text);border-color:var(--accent);background:var(--accent-soft);' : ''}">
                        ${icon('bookmark')}
                      </button>
                    </div>

                    <div class="job-meta-row">
                      <span class="job-meta-item">${icon('mapPin')} ${esc(job.location)}</span>
                      <span class="badge badge-neutral">${esc(job.workMode)}</span>
                      <span class="badge badge-accent">${esc(job.type)}</span>
                    </div>

                    <p style="font-size:13.5px;color:var(--text-secondary);">${esc(job.summary)}</p>

                    <div class="tag-list">
                      ${job.skills.slice(0, 4).map((s) => `<span class="chip">${esc(s)}</span>`).join('')}
                    </div>

                    <div class="job-card-foot">
                      <div>
                        <div style="font-weight:700;font-size:14.5px;">${esc(job.salaryDisplay)}</div>
                        <div style="font-size:11.5px;color:var(--text-muted);">Posted ${job.postedDaysAgo}d ago · Apply by ${esc(job.deadline)}</div>
                      </div>
                      <div style="display:flex;gap:6px;">
                        <button class="btn btn-secondary btn-sm" data-view-job="${esc(job.id)}">Details</button>
                        ${
                          application
                            ? `<span class="badge badge-success">${icon('check')} Applied</span>`
                            : `<button class="btn btn-primary btn-sm" data-apply-job="${esc(job.id)}">Apply</button>`
                        }
                      </div>
                    </div>
                  </article>
                `;
              })
              .join('')}
          </div>`
    }
  `;

  // Bind Tabs & Filters
  container.querySelectorAll('[data-job-tab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      jobUiState.tab = btn.getAttribute('data-job-tab');
      renderJobs(container, { navigate });
    });
  });

  const searchInput = container.querySelector('#job-search');
  searchInput.addEventListener('input', (e) => {
    jobUiState.query = e.target.value;
    const pos = e.target.selectionStart;
    renderJobs(container, { navigate });
    const nextInput = container.querySelector('#job-search');
    if (nextInput) {
      nextInput.focus();
      nextInput.setSelectionRange(pos, pos);
    }
  });

  container.querySelector('#job-type-filter').addEventListener('change', (e) => {
    jobUiState.type = e.target.value;
    renderJobs(container, { navigate });
  });
  container.querySelector('#job-mode-filter').addEventListener('change', (e) => {
    jobUiState.workMode = e.target.value;
    renderJobs(container, { navigate });
  });
  container.querySelector('#job-sort').addEventListener('change', (e) => {
    jobUiState.sort = e.target.value;
    renderJobs(container, { navigate });
  });

  const clearBtn = container.querySelector('#job-clear-filters');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      jobUiState.query = '';
      jobUiState.type = 'ALL';
      jobUiState.workMode = 'ALL';
      renderJobs(container, { navigate });
    });
  }

  // Card actions
  container.querySelectorAll('[data-save-job]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-save-job');
      const saved = store.toggleSaveJob(id);
      showToast(saved ? 'Job saved to your bookmarks' : 'Removed from saved jobs');
      renderJobs(container, { navigate });
    });
  });

  container.querySelectorAll('[data-view-job]').forEach((btn) => {
    btn.addEventListener('click', () => {
      openJobDrawer(btn.getAttribute('data-view-job'), container, navigate);
    });
  });

  container.querySelectorAll('[data-apply-job]').forEach((btn) => {
    btn.addEventListener('click', () => {
      openApplyModal(btn.getAttribute('data-apply-job'), container, navigate);
    });
  });

  if (params.jobId) {
    openJobDrawer(params.jobId, container, navigate);
  }
}

function openJobDrawer(jobId, container, navigate) {
  const job = JOBS.find((j) => j.id === jobId);
  if (!job) return;
  const state = store.getState();
  const application = state.appliedJobs[job.id];
  const companyObj = COMPANIES.find((c) => c.id === job.companyId);

  openDrawer({
    eyebrow: `${job.companyName} · ${job.type} · ${job.workMode}`,
    title: job.title,
    bodyHtml: `
      <div class="tag-list">
        <span class="badge badge-accent">${esc(job.salaryDisplay)}</span>
        <span class="badge badge-neutral">${esc(job.location)}</span>
        <span class="badge badge-neutral">Exp: ${esc(job.experience)}</span>
        <span class="badge badge-warning">Deadline: ${esc(job.deadline)}</span>
      </div>

      ${
        application
          ? `<div class="note-block" style="border-color:var(--success);background:var(--success-soft);">
              <strong style="color:var(--success);">Application Submitted on ${esc(application.date)}</strong>
              <div style="font-size:13px;margin-top:4px;">Applicant: ${esc(application.name)} (${esc(application.email)})</div>
            </div>`
          : ''
      }

      <div>
        <h4 style="margin-bottom:6px;">Role Summary</h4>
        <p style="color:var(--text-secondary);">${esc(job.summary)}</p>
      </div>

      <div>
        <h4 style="margin-bottom:6px;">Key Responsibilities</h4>
        <ul style="color:var(--text-secondary);display:grid;gap:6px;">
          ${job.responsibilities.map((r) => `<li>${esc(r)}</li>`).join('')}
        </ul>
      </div>

      <div>
        <h4 style="margin-bottom:6px;">Requirements</h4>
        <ul style="color:var(--text-secondary);display:grid;gap:6px;">
          ${job.requirements.map((r) => `<li>${esc(r)}</li>`).join('')}
        </ul>
      </div>

      <div>
        <h4 style="margin-bottom:8px;">Skills &amp; Perks</h4>
        <div class="tag-list" style="margin-bottom:10px;">
          ${job.skills.map((s) => `<span class="chip">${esc(s)}</span>`).join('')}
        </div>
        <div class="tag-list">
          ${job.perks.map((p) => `<span class="badge badge-info">${esc(p)}</span>`).join('')}
        </div>
      </div>

      <div class="divider"></div>

      <div style="display:flex;flex-wrap:wrap;gap:10px;">
        ${
          application
            ? `<button class="btn btn-success" disabled>${icon('check')} Already Applied</button>`
            : `<button class="btn btn-primary" id="drawer-apply-btn">Apply for this Role</button>`
        }
        ${
          companyObj
            ? `<button class="btn btn-secondary" id="drawer-company-btn">${icon('building')} View ${esc(companyObj.name)} Hiring Pattern</button>`
            : ''
        }
        <button class="btn btn-secondary" id="drawer-dsa-btn">${icon('code')} Practice DSA Sheet</button>
      </div>
    `,
    onMount: (bodyEl) => {
      const applyBtn = bodyEl.querySelector('#drawer-apply-btn');
      if (applyBtn) {
        applyBtn.addEventListener('click', () => openApplyModal(job.id, container, navigate));
      }
      const compBtn = bodyEl.querySelector('#drawer-company-btn');
      if (compBtn && companyObj) {
        compBtn.addEventListener('click', () => {
          document.getElementById('drawer-backdrop').classList.add('hidden');
          navigate('companies', { companyId: companyObj.id });
        });
      }
      const dsaBtn = bodyEl.querySelector('#drawer-dsa-btn');
      if (dsaBtn) {
        dsaBtn.addEventListener('click', () => {
          document.getElementById('drawer-backdrop').classList.add('hidden');
          navigate('dsa');
        });
      }
    }
  });
}

function openApplyModal(jobId, container, navigate) {
  const job = JOBS.find((j) => j.id === jobId);
  if (!job) return;

  openModal({
    title: `Apply — ${job.companyName}`,
    bodyHtml: `
      <p style="color:var(--text-secondary);margin-bottom:14px;">Applying for <strong>${esc(job.title)}</strong> (${esc(job.location)})</p>
      <form id="apply-job-form">
        <div class="form-group">
          <label class="form-label" for="apply-name">Full Name</label>
          <input id="apply-name" class="input" required placeholder="e.g. Aarav Sharma" />
        </div>
        <div class="form-group">
          <label class="form-label" for="apply-email">Email Address</label>
          <input id="apply-email" class="input" type="email" required placeholder="aarav@university.edu" />
        </div>
        <div class="form-group">
          <label class="form-label" for="apply-resume">Resume / Portfolio Link (or filename)</label>
          <input id="apply-resume" class="input" required placeholder="https://drive.google.com/... or resume_2026.pdf" />
        </div>
        <div class="form-group">
          <label class="form-label" for="apply-note">Why are you a strong fit? (Optional)</label>
          <textarea id="apply-note" class="textarea" placeholder="Highlight relevant DSA/projects or internship experience..."></textarea>
        </div>
        <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:16px;">
          <button type="button" class="btn btn-secondary" id="apply-cancel-btn">Cancel</button>
          <button type="submit" class="btn btn-primary">Submit Application</button>
        </div>
      </form>
    `,
    onMount: (bodyEl) => {
      bodyEl.querySelector('#apply-cancel-btn').addEventListener('click', closeModal);
      bodyEl.querySelector('#apply-job-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = bodyEl.querySelector('#apply-name').value.trim();
        const email = bodyEl.querySelector('#apply-email').value.trim();
        const resumeUrl = bodyEl.querySelector('#apply-resume').value.trim();
        const note = bodyEl.querySelector('#apply-note').value.trim();
        store.applyToJob(job.id, { name, email, resumeUrl, note });
        closeModal();
        document.getElementById('drawer-backdrop').classList.add('hidden');
        showToast(`Application submitted to ${job.companyName}!`);
        renderJobs(container, { navigate });
      });
    }
  });
}
