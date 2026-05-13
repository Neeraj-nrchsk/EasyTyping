// ── DATA ──
const LESSONS_PREVIEW = [
  { id:1, title:"The Home Row",     unlocked: true  },
  { id:2, title:"Keys E and I",     unlocked: false },
  { id:3, title:"Keys R and U",     unlocked: false },
  { id:4, title:"Keys T and O",     unlocked: false },
  { id:5, title:"Capital & Period", unlocked: false },
  { id:6, title:"Keys C and Comma", unlocked: false },
  { id:7, title:"Keys G H and '",   unlocked: false },
  { id:8, title:"Keys V N and ?",   unlocked: false },
];

const LESSON_TEXT = "asdf jkl; asdf jkl; aaa sss ddd fff jjj kkk lll ;;";

// ── STATE ──
let currentIndex  = 0;
let mistakes      = 0;
let totalTyped    = 0;
let correctTyped  = 0;
let isCompleted   = false;
let typingStarted = false;
let totalSeconds  = 240;
let timerInterval = null;

// ── ELEMENTS ──
const hiddenInput   = document.getElementById('hidden-input');
const timerEl       = document.getElementById('timer');
const xpEl          = document.getElementById('xp-amount');
const trainerCard   = document.getElementById('trainer-card');
const typingPreview = document.getElementById('typing-preview');
const practiceGrid  = document.getElementById('practice-grid');
const nextBtn       = document.getElementById('next-btn');
const cancelBtn     = document.getElementById('cancel-btn');
const allKeys       = document.querySelectorAll('.key[data-key]');

// ── BUILD LESSON LIST ──
function buildLessonList(){
  const list = document.getElementById('lessons-list');
  list.innerHTML = '';
  LESSONS_PREVIEW.forEach(l => {
    const div = document.createElement('div');
    div.className = 'lesson-item' + (l.id === 1 ? ' active' : '');
    div.innerHTML = `
      <div class="lesson-num">${l.id}</div>
      <div class="lesson-name">${l.title}</div>
      <div class="lesson-icon">${l.unlocked ? '›' : '🔒'}</div>
    `;
    list.appendChild(div);
  });
}
buildLessonList();

// ── BUILD PRACTICE GRID ──
function buildPracticeGrid(){
  practiceGrid.innerHTML = '';
  const rows = [
    ['a','j','j','a','space'],
    ['a','k','k','a','space'],
  ];
  rows.forEach((row, ri) => {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'practice-row';
    row.forEach((k, ki) => {
      if(k === 'space'){
        const sp = document.createElement('div');
        sp.className = 'pspace';
        sp.textContent = 'Space';
        rowDiv.appendChild(sp);
      } else {
        const kd = document.createElement('div');
        kd.className = 'pkey' + (ri === 0 && ki === 0 ? ' active-pkey' : '');
        kd.textContent = k;
        rowDiv.appendChild(kd);
      }
    });
    practiceGrid.appendChild(rowDiv);
  });
}
buildPracticeGrid();

// ── BUILD BARS CHART ──
function buildBars(){
  const chart = document.getElementById('bars-chart');
  chart.innerHTML = '';
  const heights = [15,22,30,38,42,50,58,65,72,80,88,100];
  heights.forEach((h, i) => {
    const bar = document.createElement('div');
    bar.className = 'bar' + (i === heights.length - 1 ? ' bar-active' : '');
    bar.style.height = h + '%';
    chart.appendChild(bar);
  });
}
buildBars();

// ── RENDER TYPING TEXT ──
function renderText(){
  typingPreview.innerHTML = '';
  LESSON_TEXT.split('').forEach((ch, i) => {
    const span = document.createElement('span');
    span.textContent = ch;
    if(i < currentIndex) span.className = 'correct-char';
    if(i === currentIndex) span.className = 'active-char';
    typingPreview.appendChild(span);
  });
}
renderText();

// ── TIMER ──
function startTimer(){
  if(typingStarted) return;
  typingStarted = true;
  timerInterval = setInterval(() => {
    totalSeconds--;
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    timerEl.textContent = m + ':' + (s < 10 ? '0' : '') + s;
    if(totalSeconds <= 0){
      clearInterval(timerInterval);
      finishLesson();
    }
  }, 1000);
}

// ── KEYBOARD HIGHLIGHT ──
function highlightKey(key){
  allKeys.forEach(k => k.classList.remove('active-key'));
  const upper = key.toUpperCase();
  allKeys.forEach(k => {
    if(k.dataset.key === upper) k.classList.add('active-key');
  });
  const spaceKey = document.getElementById('space-key');
  if(key === ' '){
    spaceKey.style.boxShadow = '0 0 0 2px white, 0 0 20px rgba(255,255,255,0.3)';
  } else {
    spaceKey.style.boxShadow = '';
  }
}

// ── FINISH ──
function finishLesson(){
  if(isCompleted) return;
  isCompleted = true;
  clearInterval(timerInterval);
  setTimeout(() => alert('🎉 Lesson Completed!'), 200);
}

// ── MAIN TYPING ──
hiddenInput.addEventListener('keydown', e => {
  startTimer();
  if(isCompleted) return;
  if(e.key === 'Shift' || e.key === 'CapsLock') return;
  if(e.key === 'Tab'){ e.preventDefault(); return; }

  const expected = LESSON_TEXT[currentIndex];
  const pressed  = e.key;

  highlightKey(pressed);

  if(pressed === 'Backspace'){
    e.preventDefault();
    if(currentIndex > 0) currentIndex--;
    renderText();
    return;
  }

  totalTyped++;

  if(pressed === expected){
    correctTyped++;
    currentIndex++;
  } else {
    mistakes++;
    trainerCard.classList.add('shake');
    navigator.vibrate && navigator.vibrate(60);
    setTimeout(() => trainerCard.classList.remove('shake'), 150);
  }

  renderText();

  if(currentIndex >= LESSON_TEXT.length) finishLesson();
});

hiddenInput.addEventListener('keyup', () => {
  allKeys.forEach(k => k.classList.remove('active-key'));
  document.getElementById('space-key').style.boxShadow = '';
});

// ── FOCUS ──
document.addEventListener('click',     () => hiddenInput.focus());
document.addEventListener('mousemove', () => hiddenInput.focus());
window.addEventListener('load',        () => hiddenInput.focus());
window.addEventListener('focus',       () => hiddenInput.focus());

// ── CANCEL ──
cancelBtn.addEventListener('click', () => {
  currentIndex = 0; mistakes = 0; totalTyped = 0; correctTyped = 0;
  isCompleted = false; typingStarted = false;
  clearInterval(timerInterval);
  totalSeconds = 240;
  timerEl.textContent = '04:00';
  renderText();
  hiddenInput.value = '';
  hiddenInput.focus();
});

// ── NEXT ──
nextBtn.addEventListener('click', () => alert('Next Lesson Loading...'));

// ── THEME ──
document.getElementById('theme-btn').addEventListener('click', function(){
  document.body.classList.toggle('light');
  this.textContent = document.body.classList.contains('light') ? '🌙' : '☀';
});

hiddenInput.focus();