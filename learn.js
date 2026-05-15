// ========================================
// learn.js – Full 26‑Lesson Course Engine
// Version 2.0
// ========================================

import { UserData } from '../userData.js';
import { checkAllAchievements } from '../achievements.js';
import { LEARN_CONTENT } from './learnContent.js';

// ----- DOM Elements -----
const lessonTitle = document.getElementById('lesson-num-label');
const subLessonTitle = document.getElementById('sub-lesson-title');
const objective = document.getElementById('objective');
const typingPreview = document.getElementById('typing-preview');
const hiddenInput = document.getElementById('hidden-input');
const progressArc = document.getElementById('progress-arc');
const circleText = document.getElementById('circle-text');
const lessonList = document.getElementById('lessons-list');
const xpAmount = document.getElementById('xp-amount');
const nextBtn = document.getElementById('next-btn');
const cancelBtn = document.getElementById('cancel-btn');
const timerEl = document.getElementById('timer');

// ----- State -----
let currentLessonId = 1;
let currentSubLessonId = '1.1';
let currentSequenceIndex = 0;
let typedChars = '';
let isCompleted = false;
let totalSeconds = 240;
let timerInterval = null;
let typingStarted = false;

// ----- Load a Lesson -----
function loadLesson(lessonId, subLessonId) {
    const lesson = LEARN_CONTENT.lessons.find(l => l.id === lessonId);
    if (!lesson) return;
    const subLesson = lesson.subLessons.find(s => s.id === subLessonId);
    if (!subLesson) return;

    // Check if unlocked
    if (!UserData.unlockedLessons.includes(lessonId)) {
        alert('This lesson is locked. Complete previous lessons first.');
        return;
    }

    // Update UI
    lessonTitle.textContent = `Lesson ${lessonId}.${subLessonId}`;
    subLessonTitle.textContent = subLesson.title;
    objective.textContent = subLesson.objective;

    // Reset state
    currentSequenceIndex = 0;
    typedChars = '';
    isCompleted = false;
    hiddenInput.value = '';
    typingStarted = false;
    clearInterval(timerInterval);
    totalSeconds = 240;
    timerEl.textContent = '04:00';

    // Display first sequence
    displaySequence(subLesson.sequences[0]);
    updateProgress();
    updateLessonList();
    updateStats();
    hiddenInput.focus();
}

// ----- Display a Sequence -----
function displaySequence(seq) {
    typingPreview.innerHTML = '';
    seq.split('').forEach((ch, i) => {
        const span = document.createElement('span');
        span.textContent = ch;
        span.dataset.index = i;
        span.className = i === 0 ? 'active-char' : '';
        typingPreview.appendChild(span);
    });
}

// ----- Update Progress Bar -----
function updateProgress() {
    const total = typingPreview.children.length;
    const done = typedChars.length;
    const percent = Math.round((done / total) * 100);
    const circumference = 238.76;
    const offset = circumference - (percent / 100) * circumference;
    progressArc.style.strokeDashoffset = offset;
}

// ----- Update Stats -----
function updateStats() {
    const totalLessons = LEARN_CONTENT.lessons.length;
    const completed = UserData.completedLessons.length;
    circleText.textContent = Math.round((completed / totalLessons) * 100) + '%';
    xpAmount.textContent = UserData.xp;
}

// ----- Build Lesson List -----
function updateLessonList() {
    lessonList.innerHTML = '';
    LEARN_CONTENT.lessons.forEach(lesson => {
        const div = document.createElement('div');
        const isActive = lesson.id === currentLessonId;
        const unlocked = UserData.unlockedLessons.includes(lesson.id);
        div.className = 'lesson-item' + (isActive ? ' active' : '');
        div.innerHTML = `
            <div class="lesson-num">${lesson.id}</div>
            <div class="lesson-name">${lesson.title}</div>
            <div class="lesson-icon">${unlocked ? '›' : '🔒'}</div>
        `;
        div.addEventListener('click', () => {
            if (!unlocked) return;
            const firstSub = lesson.subLessons[0];
            if (firstSub) {
                currentLessonId = lesson.id;
                currentSubLessonId = firstSub.id;
                loadLesson(currentLessonId, currentSubLessonId);
            }
        });
        lessonList.appendChild(div);
    });
}

// ----- Move to Next Sub‑Lesson -----
function moveToNextSubLesson() {
    const lesson = LEARN_CONTENT.lessons.find(l => l.id === currentLessonId);
    const subLessons = lesson.subLessons;
    const currentIdx = subLessons.findIndex(s => s.id === currentSubLessonId);

    if (currentIdx < subLessons.length - 1) {
        currentSubLessonId = subLessons[currentIdx + 1].id;
        loadLesson(currentLessonId, currentSubLessonId);
    } else {
        // All sub‑lessons done → unlock next lesson
        UserData.unlockLesson(currentLessonId + 1);
        isCompleted = true;
        alert('🎉 Lesson completed!');
        checkAllAchievements();
        updateStats();
    }
}

// ----- Timer -----
function startTimer() {
    if (typingStarted) return;
    typingStarted = true;
    timerInterval = setInterval(() => {
        totalSeconds--;
        const m = Math.floor(totalSeconds / 60);
        const s = totalSeconds % 60;
        timerEl.textContent = m + ':' + (s < 10 ? '0' : '') + s;
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            alert('⏰ Time is up! Try again.');
            resetLesson();
        }
    }, 1000);
}

// ----- Reset Lesson -----
function resetLesson() {
    typedChars = '';
    hiddenInput.value = '';
    typingStarted = false;
    clearInterval(timerInterval);
    totalSeconds = 240;
    timerEl.textContent = '04:00';
    const lesson = LEARN_CONTENT.lessons.find(l => l.id === currentLessonId);
    const subLesson = lesson.subLessons.find(s => s.id === currentSubLessonId);
    displaySequence(subLesson.sequences[0]);
    updateProgress();
    hiddenInput.focus();
}

// ----- Typing Input Handler -----
hiddenInput.addEventListener('input', () => {
    startTimer();
    if (isCompleted) return;

    const value = hiddenInput.value;
    const currentSeq = typingPreview.innerText;
    const maxLen = currentSeq.length;

    if (value.length > maxLen) {
        // Sequence completed
        UserData.completeSubLesson(currentLessonId, currentSubLessonId);
        moveToNextSubLesson();
        return;
    }

    typedChars = value;
    updateProgress();

    const spans = typingPreview.querySelectorAll('span');
    spans.forEach((span, i) => {
        span.className = '';
        if (i < typedChars.length) {
            if (span.textContent === typedChars[i]) {
                span.classList.add('correct-char');
            } else {
                span.classList.add('wrong-char');
            }
        } else if (i === typedChars.length) {
            span.classList.add('active-char');
        }
    });
});

// ----- Navigation -----
nextBtn.addEventListener('click', () => {
    const lesson = LEARN_CONTENT.lessons.find(l => l.id === currentLessonId);
    const subLessons = lesson.subLessons;
    const idx = subLessons.findIndex(s => s.id === currentSubLessonId);
    if (idx < subLessons.length - 1) {
        currentSubLessonId = subLessons[idx + 1].id;
        loadLesson(currentLessonId, currentSubLessonId);
    } else {
        alert('Last sub‑lesson of this lesson.');
    }
});

cancelBtn.addEventListener('click', resetLesson);

// ----- Auto‑focus -----
document.addEventListener('click', () => hiddenInput.focus());
window.addEventListener('load', () => hiddenInput.focus());

// ----- Load Initial Lesson -----
loadLesson(1, '1.1');

const menuToggle = document.querySelector(".menu-toggle");

const sidebar = document.querySelector(".left-sidebar");

menuToggle.addEventListener("click", () => {

  sidebar.classList.toggle("active");

});