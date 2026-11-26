import { JOBS } from '../data/jobs.js';
import { COMPANIES } from '../data/companies.js';
import { PREP_TRACKS } from '../data/prep.js';
import { DSA_TOPICS } from '../data/dsaSheet.js';
import { store } from './store.js';
import {
  hydrateIcons,
  icon,
  esc,
  closeDrawer,
  openModal,
  closeModal
} from './components.js';
import { renderDashboard } from './views/dashboard.js';
import { renderJobs } from './views/jobs.js';
import { renderPrep } from './views/prep.js';
import { renderCompanies } from './views/companies.js';
import { renderDsaSheet } from './views/dsaSheet.js';

const ROUTES = {
  dashboard: renderDashboard,
  jobs: renderJobs,
  prep: renderPrep,
  companies: renderCompanies,
  dsa: renderDsaSheet
};

let currentRoute = 'dashboard';

function updateHeaderStats() {
  const state = store.getState();
  const totalDsa = DSA_TOPICS.reduce((acc, t) => acc + t.problems.length, 0);
  const solvedCount = DSA_TOPICS.flatMap((t) => t.problems).filter((p) =>
    state.solvedDsa.includes(p.id)
  ).length;
  const pill = document.getElementById('header-dsa-count');
  if (pill) pill.textContent = `${solvedCount}/${totalDsa} DSA`;
}

function updateThemeButton() {
  const theme = store.getState().theme;
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.innerHTML = theme === 'dark' ? icon('sun') : icon('moon');
  }
}

export function navigate(route, params = {}) {
  const target = ROUTES[route] ? route : 'dashboard';
  currentRoute = target;
  if (window.location.hash !== `#${target}`) {
    history.replaceState(null, '', `#${target}`);
  }

  document.querySelectorAll('.nav-link').forEach((el) => {
    el.classList.toggle('active', el.getAttribute('data-route') === target);
  });

  const mobileNav = document.getElementById('mobile-nav');
  if (mobileNav) mobileNav.classList.add('hidden');

  const mainEl = document.getElementById('main-content');
  ROUTES[target](mainEl, { params, navigate });
  hydrateIcons(mainEl);
  updateHeaderStats();
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function openGlobalSearch() {
  openModal({
    title: 'Quick Search — Jobs, Companies, Prep & DSA',
    bodyHtml: `
      <input id="global-q" class="input" type="search" placeholder="Type to search across everything (e.g. Google, Dynamic Programming, OS, TCS)..." autofocus />
      <div id="global-results" style="margin-top:14px;display:flex;flex-direction:column;gap:8px;max-height:52vh;overflow-y:auto;"></div>
    `,
    onMount: (bodyEl) => {
      const input = bodyEl.querySelector('#global-q');
      const resultsEl = bodyEl.querySelector('#global-results');

      const renderMatches = (qRaw) => {
        const q = qRaw.trim().toLowerCase();
        const matches = [];

        JOBS.forEach((j) => {
          if (!q || `${j.title} ${j.companyName} ${j.skills.join(' ')}`.toLowerCase().includes(q)) {
            matches.push({
              kind: 'Job',
              title: `${j.title} — ${j.companyName}`,
              sub: `${j.location} · ${j.salaryDisplay}`,
              action: () => navigate('jobs', { jobId: j.id })
            });
          }
        });

        COMPANIES.forEach((c) => {
          if (!q || `${c.name} ${c.category}`.toLowerCase().includes(q)) {
            matches.push({
              kind: 'Hiring Process',
              title: `${c.name} Blueprint`,
              sub: `${c.ctcRange} · ${c.examPattern.length} rounds`,
              action: () => navigate('companies', { companyId: c.id })
            });
          }
        });

        Object.values(PREP_TRACKS).forEach((track) => {
          track.topics.forEach((t) => {
            if (!q || `${t.title} ${track.label} ${t.tag}`.toLowerCase().includes(q)) {
              matches.push({
                kind: track.label,
                title: t.title,
                sub: `${track.label} · ${t.readTime}`,
                action: () => navigate('prep', { track: track.id })
              });
            }
          });
        });

        DSA_TOPICS.forEach((topic) => {
          topic.problems.forEach((p) => {
            if (!q || `${p.title} ${p.pattern} ${topic.title}`.toLowerCase().includes(q)) {
              matches.push({
                kind: 'DSA Sheet',
                title: p.title,
                sub: `${topic.title} · ${p.difficulty} · ${p.pattern}`,
                action: () => navigate('dsa', { problemId: p.id })
              });
            }
          });
        });

        const top = matches.slice(0, 14);
        resultsEl.innerHTML = top.length
          ? top
              .map(
                (m, idx) => `
              <button type="button" class="topic-item" data-gs-idx="${idx}">
                <div>
                  <div class="topic-item-title">${esc(m.title)}</div>
                  <div class="topic-item-sub">${esc(m.sub)}</div>
                </div>
                <span class="badge badge-neutral">${esc(m.kind)}</span>
              </button>
            `
              )
              .join('')
          : `<div style="padding:20px;text-align:center;color:var(--text-muted);">No matching items found.</div>`;

        resultsEl.querySelectorAll('[data-gs-idx]').forEach((btn) => {
          btn.addEventListener('click', () => {
            const item = top[Number(btn.getAttribute('data-gs-idx'))];
            closeModal();
            item.action();
          });
        });
      };

      renderMatches('');
      input.focus();
      input.addEventListener('input', (e) => renderMatches(e.target.value));
    }
  });
}

function initApp() {
  hydrateIcons(document);
  updateThemeButton();
  updateHeaderStats();

  store.subscribe(() => {
    updateHeaderStats();
  });

  // Navigation clicks
  document.querySelectorAll('[data-route]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      navigate(el.getAttribute('data-route'));
    });
  });

  document.getElementById('header-progress-pill').addEventListener('click', () => navigate('dsa'));
  document.getElementById('theme-toggle').addEventListener('click', () => {
    store.toggleTheme();
    updateThemeButton();
  });

  document.getElementById('mobile-menu-btn').addEventListener('click', () => {
    document.getElementById('mobile-nav').classList.toggle('hidden');
  });

  document.getElementById('global-search-btn').addEventListener('click', openGlobalSearch);

  // Drawer & Modal close controls
  document.getElementById('drawer-close').addEventListener('click', closeDrawer);
  document.getElementById('drawer-backdrop').addEventListener('click', (e) => {
    if (e.target.id === 'drawer-backdrop') closeDrawer();
  });

  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-backdrop').addEventListener('click', (e) => {
    if (e.target.id === 'modal-backdrop') closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDrawer();
      closeModal();
    }
    if (
      (e.key === '/' || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) &&
      !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)
    ) {
      e.preventDefault();
      openGlobalSearch();
    }
  });

  const hashRoute = window.location.hash.replace('#', '');
  navigate(ROUTES[hashRoute] ? hashRoute : 'dashboard');

  window.addEventListener('hashchange', () => {
    const next = window.location.hash.replace('#', '');
    if (ROUTES[next] && next !== currentRoute) {
      navigate(next);
    }
  });
}

document.addEventListener('DOMContentLoaded', initApp);
