import { JOBS } from '../../data/jobs.js';
import { COMPANIES } from '../../data/companies.js';
import { PREP_TRACKS } from '../../data/prep.js';
import { DSA_TOPICS } from '../../data/dsaSheet.js';
import { store } from '../store.js';
import { esc, icon, difficultyBadgeClass } from '../components.js';

export function renderDashboard(container, { navigate }) {
  const state = store.getState();
  const allProblems = DSA_TOPICS.flatMap((t) => t.problems.map((p) => ({ ...p, topicTitle: t.title })));
  const totalDsa = allProblems.length;
  const solvedCount = allProblems.filter((p) => state.solvedDsa.includes(p.id)).length;
  const dsaPct = totalDsa ? Math.round((solvedCount / totalDsa) * 100) : 0;

  const allPrepTopics = Object.values(PREP_TRACKS).flatMap((t) => t.topics);
  const completedPrepCount = allPrepTopics.filter((t) => state.completedPrep.includes(t.id)).length;
  const prepPct = allPrepTopics.length ? Math.round((completedPrepCount / allPrepTopics.length) * 100) : 0;

  const appliedCount = Object.keys(state.appliedJobs).length;
  const savedCount = state.savedJobs.length;
  const readiness = Math.round(dsaPct * 0.55 + prepPct * 0.35 + Math.min(appliedCount * 5, 10));

  const nextUnsolved = allProblems.find((p) => !state.solvedDsa.includes(p.id)) || allProblems[0];
  const featuredJobs = JOBS.slice(0, 3);
  const featuredCompanies = COMPANIES.slice(0, 4);

  container.innerHTML = `
    <section class="hero-banner">
      <div class="hero-content">
        <div class="hero-eyebrow">${icon('sparkles')} Placement &amp; Engineering Career Studio</div>
        <h1>Prepare smarter, crack top interviews, and land your next role.</h1>
        <p>
          Explore curated software roles, master Aptitude, DSA, CS Core &amp; HR rounds, inspect real company exam blueprints, and track your topic-wise DSA Sheet progress in one unified workspace.
        </p>
        <div class="hero-actions">
          <button class="btn btn-primary" data-go="dsa">${icon('code')} Open DSA Sheet</button>
          <button class="btn btn-secondary" data-go="jobs" style="background:rgba(255,255,255,0.12);color:#fff;border-color:rgba(255,255,255,0.22);">${icon('briefcase')} Browse ${JOBS.length} Jobs</button>
          <button class="btn btn-secondary" data-go="companies" style="background:rgba(255,255,255,0.08);color:#fff;border-color:rgba(255,255,255,0.18);">${icon('building')} Company Patterns</button>
        </div>
      </div>

      <div class="hero-readiness">
        <div style="font-size:12px;color:#a5b4fc;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;">Placement Readiness</div>
        <div style="font-size:36px;font-weight:800;margin:4px 0;">${readiness}%</div>
        <div class="progress-track" style="background:rgba(255,255,255,0.16);margin-bottom:10px;">
          <div class="progress-fill" style="width:${readiness}%"></div>
        </div>
        <div style="font-size:12.5px;color:#cbd5e1;">
          ${solvedCount}/${totalDsa} DSA solved · ${completedPrepCount}/${allPrepTopics.length} prep modules
        </div>
      </div>
    </section>

    <!-- Key Metrics -->
    <section class="grid-4" style="margin-bottom:24px;">
      <div class="card stat-card">
        <div class="stat-top"><span>Topic-Wise DSA Sheet</span>${icon('code')}</div>
        <div class="stat-value">${solvedCount} <span style="font-size:16px;color:var(--text-muted);font-weight:600;">/ ${totalDsa}</span></div>
        <div class="progress-track"><div class="progress-fill" style="width:${dsaPct}%"></div></div>
        <div class="stat-meta">${state.starredDsa.length} marked for revision</div>
      </div>

      <div class="card stat-card">
        <div class="stat-top"><span>Prep Modules Completed</span>${icon('book')}</div>
        <div class="stat-value">${completedPrepCount} <span style="font-size:16px;color:var(--text-muted);font-weight:600;">/ ${allPrepTopics.length}</span></div>
        <div class="progress-track"><div class="progress-fill" style="width:${prepPct}%"></div></div>
        <div class="stat-meta">Aptitude, DSA, Technical &amp; HR</div>
      </div>

      <div class="card stat-card">
        <div class="stat-top"><span>Active Job Pipeline</span>${icon('briefcase')}</div>
        <div class="stat-value">${appliedCount} <span style="font-size:15px;color:var(--text-muted);font-weight:600;">applied</span></div>
        <div class="stat-meta">${savedCount} saved · ${JOBS.length} total open roles</div>
      </div>

      <div class="card stat-card">
        <div class="stat-top"><span>Company Blueprints</span>${icon('building')}</div>
        <div class="stat-value">${COMPANIES.length}</div>
        <div class="stat-meta">Exam patterns, syllabus &amp; eligibility</div>
      </div>
    </section>

    <!-- Daily Recommended Problem + Topic Progress -->
    <section class="grid-2" style="margin-bottom:24px;">
      <div class="card" style="display:flex;flex-direction:column;gap:14px;">
        <div style="display:flex;align-items:center;justify-content:space-between;">
          <span class="badge badge-accent">${icon('sparkles')} Recommended Next Problem</span>
          <span class="badge ${difficultyBadgeClass(nextUnsolved.difficulty)}">${esc(nextUnsolved.difficulty)}</span>
        </div>
        <div>
          <h3 style="font-size:19px;">${esc(nextUnsolved.title)}</h3>
          <p style="color:var(--text-secondary);margin-top:6px;">${esc(nextUnsolved.summary)}</p>
        </div>
        <div class="tag-list">
          <span class="chip">${esc(nextUnsolved.topicTitle)}</span>
          <span class="chip">${esc(nextUnsolved.pattern)}</span>
          ${nextUnsolved.companies.slice(0, 3).map((c) => `<span class="chip">${esc(c)}</span>`).join('')}
        </div>
        <div style="margin-top:auto;display:flex;gap:10px;">
          <button class="btn btn-primary btn-sm" id="dash-open-problem">Solve &amp; View Intuition</button>
          <button class="btn btn-secondary btn-sm" data-go="dsa">Full DSA Sheet</button>
        </div>
      </div>

      <div class="card">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
          <h3 style="font-size:17px;">DSA Topic Progress</h3>
          <button class="btn btn-ghost btn-sm" data-go="dsa">View all</button>
        </div>
        <div style="display:flex;flex-direction:column;gap:11px;">
          ${DSA_TOPICS.slice(0, 6)
            .map((topic) => {
              const done = topic.problems.filter((p) => state.solvedDsa.includes(p.id)).length;
              const pct = Math.round((done / topic.problems.length) * 100);
              return `
                <div>
                  <div style="display:flex;justify-content:space-between;font-size:13px;margin-bottom:4px;">
                    <span style="font-weight:600;">${esc(topic.title)}</span>
                    <span style="color:var(--text-muted);">${done}/${topic.problems.length}</span>
                  </div>
                  <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
                </div>
              `;
            })
            .join('')}
        </div>
      </div>
    </section>

    <!-- Prep Tracks Quick Cards -->
    <section style="margin-bottom:26px;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
        <h2 style="font-size:19px;">Preparation Tracks</h2>
        <button class="btn btn-ghost btn-sm" data-go="prep">Open Prep Hub →</button>
      </div>
      <div class="grid-4">
        ${Object.values(PREP_TRACKS)
          .map((track) => {
            const done = track.topics.filter((t) => state.completedPrep.includes(t.id)).length;
            return `
              <div class="card card-interactive" data-prep-track="${esc(track.id)}" style="cursor:pointer;">
                <span class="badge badge-accent" style="margin-bottom:10px;">${track.topics.length} Modules</span>
                <h3 style="font-size:16px;margin-bottom:6px;">${esc(track.label)}</h3>
                <p style="font-size:13px;color:var(--text-secondary);margin-bottom:12px;">${esc(track.subtitle)}</p>
                <div style="font-size:12px;font-weight:600;color:var(--accent-text);">${done}/${track.topics.length} completed →</div>
              </div>
            `;
          })
          .join('')}
      </div>
    </section>

    <!-- Latest Jobs + Featured Company Hiring -->
    <section class="grid-2">
      <div class="card">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
          <h3 style="font-size:17px;">Latest Openings</h3>
          <button class="btn btn-ghost btn-sm" data-go="jobs">All Jobs →</button>
        </div>
        <div style="display:flex;flex-direction:column;gap:12px;">
          ${featuredJobs
            .map(
              (job) => `
              <div class="note-block" style="display:flex;align-items:center;justify-content:space-between;gap:12px;cursor:pointer;" data-dash-job="${esc(job.id)}">
                <div>
                  <div style="font-weight:700;font-size:14px;">${esc(job.title)}</div>
                  <div style="font-size:12.5px;color:var(--text-secondary);">${esc(job.companyName)} · ${esc(job.location)} · ${esc(job.salaryDisplay)}</div>
                </div>
                <span class="badge badge-neutral">${esc(job.type)}</span>
              </div>
            `
            )
            .join('')}
        </div>
      </div>

      <div class="card">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
          <h3 style="font-size:17px;">Top Company Hiring Blueprints</h3>
          <button class="btn btn-ghost btn-sm" data-go="companies">Explore all →</button>
        </div>
        <div style="display:flex;flex-direction:column;gap:12px;">
          ${featuredCompanies
            .map(
              (comp) => `
              <div class="note-block" style="display:flex;align-items:center;justify-content:space-between;gap:12px;cursor:pointer;" data-dash-company="${esc(comp.id)}">
                <div>
                  <div style="font-weight:700;font-size:14px;">${esc(comp.name)} <span style="font-weight:500;color:var(--text-muted);">(${esc(comp.category)})</span></div>
                  <div style="font-size:12.5px;color:var(--text-secondary);">${esc(comp.ctcRange)} · ${comp.examPattern.length} Stages</div>
                </div>
                <span class="badge ${difficultyBadgeClass(comp.difficulty)}">${esc(comp.difficulty)}</span>
              </div>
            `
            )
            .join('')}
        </div>
      </div>
    </section>
  `;

  container.querySelectorAll('[data-go]').forEach((btn) => {
    btn.addEventListener('click', () => navigate(btn.getAttribute('data-go')));
  });

  container.querySelectorAll('[data-prep-track]').forEach((card) => {
    card.addEventListener('click', () => {
      navigate('prep', { track: card.getAttribute('data-prep-track') });
    });
  });

  container.querySelectorAll('[data-dash-job]').forEach((el) => {
    el.addEventListener('click', () => {
      navigate('jobs', { jobId: el.getAttribute('data-dash-job') });
    });
  });

  container.querySelectorAll('[data-dash-company]').forEach((el) => {
    el.addEventListener('click', () => {
      navigate('companies', { companyId: el.getAttribute('data-dash-company') });
    });
  });

  const openProbBtn = container.querySelector('#dash-open-problem');
  if (openProbBtn) {
    openProbBtn.addEventListener('click', () => {
      navigate('dsa', { problemId: nextUnsolved.id });
    });
  }
}
