/* =========================
   EASYTYPING V2
   PRACTICE ENGINE
========================= */


/* =========================
   WORD DATABASE
========================= */

const wordSets = {

words: [
"speed",
"typing",
"keyboard",
"lesson",
"practice",
"focus",
"accuracy",
"performance",
"coding",
"future",
"javascript",
"monitor",
"challenge",
"improve",
"gaming"
],

numbers: [
"123",
"456",
"789",
"2026",
"404",
"8080",
"100",
"999"
],

punctuation: [
"hello,",
"world!",
"typing.",
"focus?",
"speed:",
"easytyping;",
"\"practice\""
],

mixed: [
"speed123",
"hello!",
"future2026",
"code.",
"typing?",
"easytyping123"
]

};


/* =========================
   ELEMENTS
========================= */

const practiceText =
document.querySelector(
    ".practice-text"
);

const practiceInput =
document.querySelector(
    ".practice-input"
);

const wpmElement =
document.getElementById(
    "practice-wpm"
);

const accuracyElement =
document.getElementById(
    "practice-accuracy"
);

const timerElement =
document.getElementById(
    "practice-timer"
);

const modeButtons =
document.querySelectorAll(
    ".mode-btn"
);

const durationButtons =
document.querySelectorAll(
    ".duration-btn"
);

const restartBtn =
document.querySelector(
    ".restart-practice-btn"
);

const focusBtn =
document.querySelector(
    ".focus-btn"
);

const soundBtn =
document.querySelector(
    ".sound-btn"
);

const resultOverlay =
document.querySelector(
    ".practice-result-overlay"
);

const resultModal =
document.querySelector(
    ".practice-result-modal"
);

const retryBtn =
document.querySelector(
    ".retry-btn"
);

const continueBtn =
document.querySelector(
    ".continue-btn"
);


/* =========================
   VARIABLES
========================= */

let currentMode = "words";

let currentDuration = 30;

let timer = currentDuration;

let timerStarted = false;

let timerInterval = null;

let currentIndex = 0;

let totalTyped = 0;

let correctTyped = 0;

let mistakes = 0;

let practiceTextData = "";

let soundEnabled = true;

let weakKeys = {};

let practiceHistory = [];


/* =========================
   GENERATE TEXT
========================= */

function generatePracticeText(){

    let words =
    wordSets[currentMode];

    let text = "";

    for(let i = 0; i < 40; i++){

        const random =
        Math.floor(
            Math.random()
            * words.length
        );

        text +=
        words[random] + " ";

    }

    practiceTextData = text.trim();

}


/* =========================
   RENDER TEXT
========================= */

function renderPracticeText(){

    practiceText.innerHTML = "";

    practiceTextData
    .split("")
    .forEach((char,index) => {

        const span =
        document.createElement(
            "span"
        );

        span.innerText = char;

        if(index < currentIndex){

            span.classList.add(
                "correct-char"
            );

        }

        else if(
            index === currentIndex
        ){

            span.classList.add(
                "active-char"
            );

        }

        practiceText.appendChild(
            span
        );

    });

}


/* =========================
   TIMER
========================= */

function startTimer(){

    if(timerStarted){

        return;

    }

    timerStarted = true;

    clearInterval(timerInterval);

    timerInterval = setInterval(() => {

        timer--;

        timerElement.innerText =
        timer;

        if(timer <= 0){

            clearInterval(
                timerInterval
            );

            finishPractice();

        }

    },1000);

}


/* =========================
   STATS
========================= */

function updateStats(){

    const elapsedMinutes =
    (currentDuration - timer)
    / 60;

    let wpm = 0;

    if(elapsedMinutes > 0){

        wpm = Math.round(
            (correctTyped / 5)
            / elapsedMinutes
        );

    }

    let accuracy = 100;

    if(totalTyped > 0){

        accuracy = Math.round(
            (
                correctTyped
                / totalTyped
            ) * 100
        );

    }

    wpmElement.innerText =
    wpm;

    accuracyElement.innerText =
    `${accuracy}%`;

}


/* =========================
   WEAK KEYS
========================= */

function trackWeakKey(key){

    if(!weakKeys[key]){

        weakKeys[key] = 0;

    }

    weakKeys[key]++;

}


/* =========================
   FINISH PRACTICE
========================= */

function finishPractice(){

    resultOverlay.classList.remove(
        "hidden"
    );

    resultModal.classList.remove(
        "hidden"
    );

    savePracticeAnalytics();

}


/* =========================
   SAVE ANALYTICS
========================= */

function savePracticeAnalytics(){

    const data = {

        mode:
        currentMode,

        wpm:
        wpmElement.innerText,

        accuracy:
        accuracyElement.innerText,

        mistakes:
        mistakes,

        date:
        new Date()
        .toLocaleDateString()

    };

    practiceHistory.push(data);

    localStorage.setItem(
        "easytyping-practice",
        JSON.stringify(
            practiceHistory
        )
    );

}


/* =========================
   RESET
========================= */

function resetPractice(){

    clearInterval(timerInterval);

    timer =
    currentDuration;

    timerElement.innerText =
    timer;

    currentIndex = 0;

    totalTyped = 0;

    correctTyped = 0;

    mistakes = 0;

    timerStarted = false;

    practiceInput.value = "";

    resultOverlay.classList.add(
        "hidden"
    );

    resultModal.classList.add(
        "hidden"
    );

    generatePracticeText();

    renderPracticeText();

    updateStats();

    focusInput();

}


/* =========================
   FOCUS
========================= */

function focusInput(){

    practiceInput.focus();

}


/* =========================
   TYPING ENGINE
========================= */

practiceInput.addEventListener(
    "keydown",
    (e) => {

    if(!timerStarted){

        startTimer();

    }

    if(e.key === "Backspace"){

        e.preventDefault();

        if(currentIndex > 0){

            currentIndex--;

            renderPracticeText();

        }

        return;

    }

    if(e.key.length > 1){

        return;

    }

    totalTyped++;

    const expected =
    practiceTextData[currentIndex];

    if(e.key === expected){

        currentIndex++;

        correctTyped++;

    }

    else{

        mistakes++;

        trackWeakKey(e.key);

    }

    renderPracticeText();

    updateStats();

});


/* =========================
   MODES
========================= */

modeButtons.forEach(
    button => {

    button.addEventListener(
        "click",
        () => {

        modeButtons.forEach(
            btn => {

            btn.classList.remove(
                "active-mode"
            );

        });

        button.classList.add(
            "active-mode"
        );

        currentMode =
        button.innerText
        .toLowerCase();

        resetPractice();

    });

});


/* =========================
   DURATIONS
========================= */

durationButtons.forEach(
    button => {

    button.addEventListener(
        "click",
        () => {

        durationButtons.forEach(
            btn => {

            btn.classList.remove(
                "active-duration"
            );

        });

        button.classList.add(
            "active-duration"
        );

        currentDuration =
        Number(
            button.innerText
            .replace("s","")
        );

        resetPractice();

    });

});


/* =========================
   CONTROLS
========================= */

restartBtn.addEventListener(
    "click",
    () => {

    resetPractice();

});


focusBtn.addEventListener(
    "click",
    () => {

    document.body
    .classList.toggle(
        "focus-mode"
    );

});


soundBtn.addEventListener(
    "click",
    () => {

    soundEnabled =
    !soundEnabled;

});


/* =========================
   RESULT BUTTONS
========================= */

retryBtn.addEventListener(
    "click",
    () => {

    resetPractice();

});


continueBtn.addEventListener(
    "click",
    () => {

    resultOverlay.classList.add(
        "hidden"
    );

    resultModal.classList.add(
        "hidden"
    );

});


/* =========================
   AUTO FOCUS
========================= */

document.addEventListener(
    "click",
    () => {

    focusInput();

});


/* =========================
   LOAD STORAGE
========================= */

function loadPracticeData(){

    const saved =
    localStorage.getItem(
        "easytyping-practice"
    );

    if(saved){

        practiceHistory =
        JSON.parse(saved);

    }

}


/* =========================
   INITIALIZE
========================= */

loadPracticeData();

resetPractice();