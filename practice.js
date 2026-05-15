// ========================================
// practice.js – Rich Practice Engine
// Version 2.0
// ========================================

import { UserData } from '../userData.js';
import { checkAllAchievements } from '../achievements.js';
import { PRACTICE_ENGINE } from './practiceContent.js';

// ----- DOM Elements -----
const practiceText = document.querySelector('.practice-text');
const practiceInput = document.querySelector('.practice-input');
const wpmElement = document.getElementById('practice-wpm');
const accuracyElement = document.getElementById('practice-accuracy');
const timerElement = document.getElementById('practice-timer');
const modeButtons = document.querySelectorAll('.mode-btn');
const durationButtons = document.querySelectorAll('.duration-btn');
const restartBtn = document.querySelector('.restart-practice-btn');
const focusBtn = document.querySelector('.focus-btn');
const resultOverlay = document.querySelector('.practice-result-overlay');
const resultModal = document.querySelector('.practice-result-modal');
const resultWpm = document.querySelector('#result-wpm');
const resultAccuracy = document.querySelector('#result-accuracy');
const resultXp = document.querySelector('#result-xp');
const retryBtn = document.querySelector('.retry-btn');
const continueBtn = document.querySelector('.continue-btn');

// ----- State -----
let currentMode = 'words';
let currentDuration = 30;
let timer = currentDuration;
let timerInterval = null;
let typedChars = '';
let totalChars = 0;
let correctChars = 0;
let mistakes = 0;
let isActive = false;
let weakKeys = {};

// ----- Generate Practice Text -----
function generateText() {
    let text = '';
    switch (currentMode) {
        case 'words':
            text = PRACTICE_ENGINE.generateWordTest(30, 'medium');
            break;
        case 'numbers':
            text = PRACTICE_ENGINE.generateCustomTest({ numbers: true });
            break;
        case 'punctuation':
            text = PRACTICE_ENGINE.generateCustomTest({ punctuation: true });
            break;
        case 'mixed':
            text = PRACTICE_ENGINE.generateMixedTest(30);
            break;
        default:
            text = PRACTICE_ENGINE.generateWordTest(30, 'easy');
    }
    practiceText.innerHTML = '';
    text.split('').forEach((ch, i) => {
        const span = document.createElement('span');
        span.textContent = ch;
        span.dataset.index = i;
        span.className = i === 0 ? 'active-char' : '';
        practiceText.appendChild(span);
    });
}

// ----- Update Stats -----
function updateStats() {
    const elapsed = (currentDuration - timer) / 60;
    const wpm = elapsed > 0 ? Math.round((correctChars / 5) / elapsed) : 0;
    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;
    wpmElement.textContent = wpm;
    accuracyElement.textContent = accuracy + '%';
}

// ----- Timer -----
function startTimer() {
    if (isActive) return;
    isActive = true;
    timerInterval = setInterval(() => {
        timer--;
        timerElement.textContent = timer;
        if (timer <= 0) finishPractice();
    }, 1000);
}

// ----- Finish Practice -----
function finishPractice() {
    clearInterval(timerInterval);
    isActive = false;

    const elapsed = (currentDuration - timer) / 60;
    const wpm = elapsed > 0 ? Math.round((correctChars / 5) / elapsed) : 0;
    const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;
    const xp = Math.round(wpm / 2) + 5;

    // Record practice session
    UserData.recordPractice({
        mode: currentMode,
        duration: currentDuration,
        wpm: wpm,
        accuracy: accuracy,
        mistakes: mistakes,
        weakKeys: weakKeys
    });
    UserData.addXP(xp);
    checkAllAchievements();

    // Show result modal
    resultWpm.textContent = wpm;
    resultAccuracy.textContent = accuracy + '%';
    resultXp.textContent = '+' + xp;
    resultModal.classList.remove('hidden');
    resultOverlay.classList.remove('hidden');
}

// ----- Reset Practice -----
function resetPractice() {
    clearInterval(timerInterval);
    isActive = false;
    timer = currentDuration;
    timerElement.textContent = timer;
    typedChars = '';
    totalChars = 0;
    correctChars = 0;
    mistakes = 0;
    weakKeys = {};
    practiceInput.value = '';
    generateText();
    wpmElement.textContent = '0';
    accuracyElement.textContent = '100%';
    resultModal.classList.add('hidden');
    resultOverlay.classList.add('hidden');
    practiceInput.focus();
}

// ----- Typing Input Handler -----
practiceInput.addEventListener('input', () => {
    if (!isActive) startTimer();

    const value = practiceInput.value;
    const targetText = practiceText.innerText;
    typedChars = value;
    totalChars = value.length;

    const spans = practiceText.querySelectorAll('span');
    spans.forEach((span, i) => {
        span.className = '';
        if (i < value.length) {
            if (span.textContent === value[i]) {
                span.classList.add('correct-char');
                correctChars++;
            } else {
                span.classList.add('wrong-char');
                mistakes++;
                const key = value[i].toLowerCase();
                weakKeys[key] = (weakKeys[key] || 0) + 1;
            }
        } else if (i === value.length) {
            span.classList.add('active-char');
        }
    });

    updateStats();

    // Auto‑complete if full text typed
    if (value.length >= targetText.length) {
        finishPractice();
    }
});

// ----- Mode Selection -----
modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        modeButtons.forEach(b => b.classList.remove('active-mode'));
        btn.classList.add('active-mode');
        currentMode = btn.textContent.toLowerCase();
        resetPractice();
    });
});

// ----- Duration Selection -----
durationButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        durationButtons.forEach(b => b.classList.remove('active-duration'));
        btn.classList.add('active-duration');
        currentDuration = parseInt(btn.textContent.replace('s', ''));
        resetPractice();
    });
});

// ----- Controls -----
restartBtn.addEventListener('click', resetPractice);
focusBtn.addEventListener('click', () => document.body.classList.toggle('focus-mode'));

// ----- Result Modal Buttons -----
retryBtn.addEventListener('click', resetPractice);
continueBtn.addEventListener('click', () => {
    resultModal.classList.add('hidden');
    resultOverlay.classList.add('hidden');
});

// ----- Auto‑focus -----
document.addEventListener('click', () => practiceInput.focus());
window.addEventListener('load', () => practiceInput.focus());

// ----- Initialize -----
resetPractice();