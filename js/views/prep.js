import { PREP_TRACKS } from '../../data/prep.js';
import { store } from '../store.js';
import { esc, icon, showToast } from '../components.js';

let prepUiState = {
  trackId: 'aptitude',
  topicId: null,
  mode: 'notes' // notes | practice
};

export function renderPrep(container, { params = {}, navigate }) {
  if (params.track && PREP_TRACKS[params.track]) {
    prepUiState.trackId = params.track;
    prepUiState.topicId = PREP_TRACKS[params.track].topics[0].id;
    prepUiState.mode = 'notes';
  }

  const track = PREP_TRACKS[prepUiState.trackId] || PREP_TRACKS.aptitude;
  const activeTopic =
    track.topics.find((t) => t.id === prepUiState.topicId) || track.topics[0];
  prepUiState.topicId = activeTopic.id;

  const state = store.getState();
  const isCompleted = state.completedPrep.includes(activeTopic.id);

  container.innerHTML = `
    <div class="page-header">
      <div>
        <h1 class="page-title">Preparation Hub</h1>
        <p class="page-subtitle">Structured Notes and Practice Problems across Aptitude, DSA Concepts, Technical CS Core, and HR Interviews.</p>
      </div>
      <button class="btn btn-secondary btn-sm" id="prep-goto-dsa">${icon('code')} Go to Topic-Wise DSA Sheet →</button>
    </div>

    <!-- 4 Prep Tracks Tabs -->
    <div class="tabs-bar">
      ${Object.values(PREP_TRACKS)
        .map((t) => {
          const doneCount = t.topics.filter((x) => state.completedPrep.includes(x.id)).length;
          return `
            <button class="tab-btn ${t.id === track.id ? 'active' : ''}" data-track-tab="${esc(t.id)}">
              ${esc(t.label)}
              <span class="badge badge-neutral" style="font-size:11px;">${doneCount}/${t.topics.length}</span>
            </button>
          `;
        })
        .join('')}
    </div>

    <div class="prep-layout">
      <!-- Topic Sidebar -->
      <aside class="prep-sidebar">
        <div class="card" style="padding:14px;">
          <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;color:var(--text-muted);margin-bottom:10px;">
            ${esc(track.label)} Modules
          </div>
          <div style="display:flex;flex-direction:column;gap:8px;">
            ${track.topics
              .map((topic) => {
                const done = state.completedPrep.includes(topic.id);
                const qCount = topic.quiz ? topic.quiz.length : (topic.hrPrompts ? topic.hrPrompts.length : 0);
                return `
                  <button class="topic-item ${topic.id === activeTopic.id ? 'active' : ''}" data-topic-id="${esc(topic.id)}">
                    <div>
                      <div class="topic-item-title">${esc(topic.title)}</div>
                      <div class="topic-item-sub">${esc(topic.tag)} · ${qCount} practice items</div>
                    </div>
                    ${
                      done
                        ? `<span class="badge badge-success" title="Completed">${icon('check')}</span>`
                        : `<span style="font-size:11px;color:var(--text-muted);">${esc(topic.readTime)}</span>`
                    }
                  </button>
                `;
              })
              .join('')}
          </div>
        </div>
      </aside>

      <!-- Main Notes & Practice Panel -->
      <section class="card" style="padding:24px;">
        <div style="display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:space-between;gap:14px;margin-bottom:18px;">
          <div>
            <div class="tag-list" style="margin-bottom:8px;">
              <span class="badge badge-accent">${esc(track.label)}</span>
              <span class="badge badge-neutral">${esc(activeTopic.tag)}</span>
              <span class="badge badge-neutral">${esc(activeTopic.readTime)}</span>
            </div>
            <h2 style="font-size:22px;">${esc(activeTopic.title)}</h2>
          </div>

          <div style="display:flex;gap:8px;align-items:center;">
            <button id="toggle-prep-done" class="btn btn-sm ${isCompleted ? 'btn-success' : 'btn-secondary'}">
              ${isCompleted ? `${icon('check')} Completed` : 'Mark as Complete'}
            </button>
          </div>
        </div>

        <div class="tabs-bar">
          <button class="tab-btn ${prepUiState.mode === 'notes' ? 'active' : ''}" data-prep-mode="notes">
            ${icon('book')} Study Notes &amp; Formulas
          </button>
          <button class="tab-btn ${prepUiState.mode === 'practice' ? 'active' : ''}" data-prep-mode="practice">
            ${icon('sparkles')} Practice Problems
          </button>
        </div>

        ${
          prepUiState.mode === 'notes'
            ? renderNotesPanel(activeTopic)
            : renderPracticePanel(activeTopic, state)
        }
      </section>
    </div>
  `;

  // Bind Navigation & Track Tabs
  container.querySelector('#prep-goto-dsa').addEventListener('click', () => navigate('dsa'));

  container.querySelectorAll('[data-track-tab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const nextTrack = btn.getAttribute('data-track-tab');
      prepUiState.trackId = nextTrack;
      prepUiState.topicId = PREP_TRACKS[nextTrack].topics[0].id;
      prepUiState.mode = 'notes';
      renderPrep(container, { navigate });
    });
  });

  container.querySelectorAll('[data-topic-id]').forEach((btn) => {
    btn.addEventListener('click', () => {
      prepUiState.topicId = btn.getAttribute('data-topic-id');
      renderPrep(container, { navigate });
    });
  });

  container.querySelectorAll('[data-prep-mode]').forEach((btn) => {
    btn.addEventListener('click', () => {
      prepUiState.mode = btn.getAttribute('data-prep-mode');
      renderPrep(container, { navigate });
    });
  });

  container.querySelector('#toggle-prep-done').addEventListener('click', () => {
    const done = store.togglePrepComplete(activeTopic.id);
    showToast(done ? `Marked "${activeTopic.title}" complete` : 'Module marked incomplete');
    renderPrep(container, { navigate });
  });

  // Bind Practice Quiz Interactions
  container.querySelectorAll('[data-quiz-opt]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const qId = btn.getAttribute('data-quiz-qid');
      const selected = Number(btn.getAttribute('data-quiz-opt'));
      const correct = Number(btn.getAttribute('data-quiz-correct'));
      store.recordQuizAnswer(qId, selected, selected === correct);
      renderPrep(container, { navigate });
    });
  });

  const resetQuizBtn = container.querySelector('#reset-topic-quiz');
  if (resetQuizBtn && activeTopic.quiz) {
    resetQuizBtn.addEventListener('click', () => {
      store.resetQuizQuestions(activeTopic.quiz.map((q) => q.id));
      showToast('Quiz reset — try again!');
      renderPrep(container, { navigate });
    });
  }

  // Bind HR Self-Practice Drafts
  container.querySelectorAll('[data-save-hr]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const promptId = btn.getAttribute('data-save-hr');
      const textarea = container.querySelector(`#hr-draft-${promptId}`);
      if (textarea) {
        store.saveHrDraft(promptId, textarea.value);
        showToast('Your STAR response draft was saved locally');
      }
    });
  });

  const copyCodeBtn = container.querySelector('#prep-copy-snippet');
  if (copyCodeBtn && activeTopic.codeSnippet) {
    copyCodeBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(activeTopic.codeSnippet.code);
        showToast('Copied code snippet');
      } catch {
        showToast('Unable to copy automatically');
      }
    });
  }
}

function renderNotesPanel(topic) {
  return `
    <div class="notes-section">
      ${topic.notes
        .map(
          (note) => `
          <div class="note-block">
            <h4>${esc(note.heading)}</h4>
            <p style="color:var(--text-secondary);">${esc(note.body)}</p>
            ${note.formula ? `<pre class="formula-box">${esc(note.formula)}</pre>` : ''}
          </div>
        `
        )
        .join('')}

      ${
        topic.codeSnippet
          ? `
          <div class="code-box">
            <div class="code-box-header">
              <span>${esc(topic.codeSnippet.title)}</span>
              <button type="button" id="prep-copy-snippet" class="btn btn-ghost btn-sm" style="color:#cbd5e1;padding:2px 8px;">Copy</button>
            </div>
            <pre><code>${esc(topic.codeSnippet.code)}</code></pre>
          </div>
        `
          : ''
      }
    </div>
  `;
}

function renderPracticePanel(topic, state) {
  if (topic.quiz && topic.quiz.length) {
    const answered = topic.quiz.filter((q) => state.quizAnswers[q.id]);
    const correctCount = answered.filter((q) => state.quizAnswers[q.id].isCorrect).length;

    return `
      <div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:10px;">
          <div style="font-size:13.5px;color:var(--text-secondary);">
            Score: <strong>${correctCount} / ${topic.quiz.length}</strong> answered correctly (${answered.length} attempted)
          </div>
          ${
            answered.length
              ? `<button id="reset-topic-quiz" class="btn btn-secondary btn-sm">Reset Quiz</button>`
              : ''
          }
        </div>

        ${topic.quiz
          .map((q, idx) => {
            const record = state.quizAnswers[q.id];
            return `
              <div class="quiz-card">
                <div style="font-weight:700;margin-bottom:10px;">Q${idx + 1}. ${esc(q.question)}</div>
                <div class="quiz-options">
                  ${q.options
                    .map((opt, optIdx) => {
                      let cls = 'quiz-option';
                      if (record) {
                        if (optIdx === q.correctIndex) cls += ' correct';
                        else if (optIdx === record.selected) cls += ' wrong';
                      }
                      return `
                        <button
                          type="button"
                          class="${cls}"
                          data-quiz-qid="${esc(q.id)}"
                          data-quiz-opt="${optIdx}"
                          data-quiz-correct="${q.correctIndex}"
                          ${record ? 'disabled' : ''}
                        >
                          <span style="font-weight:700;min-width:20px;">${String.fromCharCode(65 + optIdx)}.</span>
                          <span>${esc(opt)}</span>
                        </button>
                      `;
                    })
                    .join('')}
                </div>
                ${
                  record
                    ? `<div class="quiz-explanation">
                        <strong>${record.isCorrect ? 'Correct!' : 'Explanation:'}</strong> ${esc(q.explanation)}
                      </div>`
                    : ''
                }
              </div>
            `;
          })
          .join('')}
      </div>
    `;
  }

  if (topic.hrPrompts && topic.hrPrompts.length) {
    return `
      <div style="display:flex;flex-direction:column;gap:16px;">
        ${topic.hrPrompts
          .map((item, idx) => {
            const draft = state.hrDrafts[item.id] || '';
            return `
              <div class="quiz-card" style="margin-bottom:0;">
                <h4 style="font-size:16px;margin-bottom:10px;">Prompt ${idx + 1}: "${esc(item.question)}"</h4>
                <div class="grid-2" style="margin-bottom:12px;">
                  <div class="note-block" style="background:var(--success-soft);border-color:color-mix(in srgb, var(--success) 30%, transparent);">
                    <strong style="color:var(--success);font-size:12.5px;">WHAT MAKES IT STRONG</strong>
                    <p style="font-size:13px;margin-top:4px;">${esc(item.strongTip)}</p>
                  </div>
                  <div class="note-block" style="background:var(--danger-soft);border-color:color-mix(in srgb, var(--danger) 30%, transparent);">
                    <strong style="color:var(--danger);font-size:12.5px;">RED FLAGS TO AVOID</strong>
                    <p style="font-size:13px;margin-top:4px;">${esc(item.avoidTip)}</p>
                  </div>
                </div>
                <label class="form-label" for="hr-draft-${esc(item.id)}">Your STAR / Practice Draft</label>
                <textarea id="hr-draft-${esc(item.id)}" class="textarea" placeholder="Write your Situation, Task, Action, and measurable Result...">${esc(draft)}</textarea>
                <div style="display:flex;justify-content:flex-end;margin-top:8px;">
                  <button type="button" class="btn btn-primary btn-sm" data-save-hr="${esc(item.id)}">Save Draft</button>
                </div>
              </div>
            `;
          })
          .join('')}
      </div>
    `;
  }

  return `<div class="empty-state">No practice items in this module yet.</div>`;
}
