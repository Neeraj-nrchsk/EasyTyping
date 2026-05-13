/* =========================================
   EASYTYPING V2
   ACCURACY RUSH ENGINE
   accuracyrush.js
========================================= */


/* =========================================
   WORD DATABASE
========================================= */

const WORDS = [

"precision",
"accuracy",
"focus",
"control",
"discipline",
"perfect",
"balance",
"advanced",
"stability",
"reaction",
"keyboard",
"reflex",
"quality",
"monitor",
"practice",
"timing",
"master",
"future",
"winner",
"success",
"system",
"smooth",
"correct",
"minimal"

];


/* =========================================
   ELEMENTS
========================================= */

const targetWord =
document.getElementById(
    "targetWord"
);

const liveTyping =
document.getElementById(
    "liveTyping"
);

const accuracyFill =
document.getElementById(
    "accuracyFill"
);

const scoreElement =
document.getElementById(
    "score"
);

const accuracyElement =
document.getElementById(
    "accuracy"
);

const streakElement =
document.getElementById(
    "streak"
);

const gradeElement =
document.getElementById(
    "grade"
);

const timerElement =
document.getElementById(
    "timer"
);

const wpmElement =
document.getElementById(
    "wpm"
);

const perfectWordsElement =
document.getElementById(
    "perfectWords"
);

const mistakesElement =
document.getElementById(
    "mistakes"
);

const earnedXPElement =
document.getElementById(
    "earnedXP"
);

const perfectPopup =
document.getElementById(
    "perfectPopup"
);

const mistakePopup =
document.getElementById(
    "mistakePopup"
);

const gradePopup =
document.getElementById(
    "gradePopup"
);

const gameOverOverlay =
document.getElementById(
    "gameOverOverlay"
);

const gameOverModal =
document.getElementById(
    "gameOverModal"
);

const finalScore =
document.getElementById(
    "finalScore"
);

const finalAccuracy =
document.getElementById(
    "finalAccuracy"
);

const finalGrade =
document.getElementById(
    "finalGrade"
);

const finalWPM =
document.getElementById(
    "finalWPM"
);

const pauseBtn =
document.getElementById(
    "pauseBtn"
);

const restartBtn =
document.getElementById(
    "restartBtn"
);

const playAgainBtn =
document.getElementById(
    "playAgainBtn"
);

const focusBtn =
document.getElementById(
    "focusBtn"
);


/* =========================================
   VARIABLES
========================================= */

let score = 0;

let accuracy = 100;

let streak = 0;

let timer = 60;

let typedText = "";

let currentWord = "";

let gameRunning = true;

let gamePaused = false;

let typedWords = 0;

let correctWords = 0;

let mistakes = 0;

let perfectWords = 0;

let xp = 0;

let timerInterval;


/* =========================================
   RANDOM WORD
========================================= */

function getRandomWord(){

    const randomIndex =
    Math.floor(
        Math.random()
        * WORDS.length
    );

    return WORDS[randomIndex];

}


/* =========================================
   GENERATE WORD
========================================= */

function generateWord(){

    currentWord =
    getRandomWord();

    targetWord.innerText =
    currentWord;

    typedText = "";

    updateTyping();

}


/* =========================================
   UPDATE TYPING
========================================= */

function updateTyping(){

    if(typedText === ""){

        liveTyping.innerText =
        "...";

        return;

    }

    liveTyping.innerText =
    typedText;

}


/* =========================================
   UPDATE HUD
========================================= */

function updateHUD(){

    scoreElement.innerText =
    score;

    streakElement.innerText =
    `x${streak}`;

    accuracyElement.innerText =
    `${accuracy}%`;

    perfectWordsElement.innerText =
    perfectWords;

    mistakesElement.innerText =
    mistakes;

    earnedXPElement.innerText =
    `+${xp}`;

    const wpm =
    Math.round(
        correctWords * 2.5
    );

    wpmElement.innerText =
    wpm;

    accuracyFill.style.width =
    `${accuracy}%`;

    updateGrade();

}


/* =========================================
   GRADE SYSTEM
========================================= */

function updateGrade(){

    let grade = "S";

    if(accuracy < 98){

        grade = "A";

    }

    if(accuracy < 94){

        grade = "B";

    }

    if(accuracy < 88){

        grade = "C";

    }

    if(accuracy < 80){

        grade = "D";

    }

    gradeElement.innerText =
    grade;

}


/* =========================================
   CHECK WORD
========================================= */

function checkWord(){

    if(
        typedText
        === currentWord
    ){

        typedWords++;

        correctWords++;

        perfectWords++;

        streak++;

        score +=
        150 + (streak * 10);

        xp += 14;

        showPerfectPopup();

        updateHUD();

        animateWord();

        generateWord();

    }

}


/* =========================================
   WRONG INPUT
========================================= */

function wrongInput(){

    mistakes++;

    streak = 0;

    accuracy =
    Math.max(
        0,
        accuracy - 2
    );

    score =
    Math.max(
        0,
        score - 40
    );

    showMistakePopup();

    updateHUD();

    shakeWord();

}


/* =========================================
   WORD ANIMATION
========================================= */

function animateWord(){

    targetWord.style.transform =
    "scale(1.08)";

    setTimeout(() => {

        targetWord.style.transform =
        "scale(1)";

    },180);

}


function shakeWord(){

    targetWord.style.transform =
    "translateX(8px)";

    setTimeout(() => {

        targetWord.style.transform =
        "translateX(-8px)";

    },60);

    setTimeout(() => {

        targetWord.style.transform =
        "translateX(0px)";

    },120);

}


/* =========================================
   POPUPS
========================================= */

function showPerfectPopup(){

    perfectPopup.classList.remove(
        "hidden"
    );

    setTimeout(() => {

        perfectPopup.classList.add(
            "hidden"
        );

    },700);

}


function showMistakePopup(){

    mistakePopup.classList.remove(
        "hidden"
    );

    setTimeout(() => {

        mistakePopup.classList.add(
            "hidden"
        );

    },700);

}


/* =========================================
   GRADE POPUP
========================================= */

function showGradePopup(){

    gradePopup.innerText =
    `${gradeElement.innerText} GRADE`;

    gradePopup.classList.remove(
        "hidden"
    );

    setTimeout(() => {

        gradePopup.classList.add(
            "hidden"
        );

    },1200);

}


/* =========================================
   TIMER
========================================= */

function startTimer(){

    clearInterval(
        timerInterval
    );

    timerInterval =
    setInterval(() => {

        if(
            gamePaused
            || !gameRunning
        ){

            return;

        }

        timer--;

        timerElement.innerText =
        timer;

        if(timer <= 0){

            finishGame();

        }

    },1000);

}


/* =========================================
   GAME OVER
========================================= */

function finishGame(){

    gameRunning = false;

    clearInterval(
        timerInterval
    );

    finalScore.innerText =
    score;

    finalAccuracy.innerText =
    `${accuracy}%`;

    finalGrade.innerText =
    gradeElement.innerText;

    finalWPM.innerText =
    wpmElement.innerText;

    gameOverOverlay.classList.remove(
        "hidden"
    );

    gameOverModal.classList.remove(
        "hidden"
    );

    saveGameData();

}


/* =========================================
   SAVE DATA
========================================= */

function saveGameData(){

    const history =
    JSON.parse(
        localStorage.getItem(
            "accuracyrush-history"
        )
    ) || [];

    history.push({

        score,
        accuracy,
        grade:
        gradeElement.innerText,

        wpm:
        wpmElement.innerText

    });

    localStorage.setItem(
        "accuracyrush-history",
        JSON.stringify(history)
    );

}


/* =========================================
   RESTART
========================================= */

function restartGame(){

    score = 0;

    accuracy = 100;

    streak = 0;

    timer = 60;

    typedText = "";

    typedWords = 0;

    correctWords = 0;

    mistakes = 0;

    perfectWords = 0;

    xp = 0;

    gameRunning = true;

    gamePaused = false;

    timerElement.innerText =
    timer;

    gameOverOverlay.classList.add(
        "hidden"
    );

    gameOverModal.classList.add(
        "hidden"
    );

    updateHUD();

    generateWord();

    startTimer();

}


/* =========================================
   KEYBOARD INPUT
========================================= */

window.addEventListener(
    "keydown",
    e => {

    if(
        !gameRunning
        || gamePaused
    ){

        return;

    }

    /* BACKSPACE */

    if(e.key === "Backspace"){

        typedText =
        typedText.slice(
            0,
            -1
        );

        updateTyping();

        return;

    }

    /* IGNORE SPACE */

    if(e.key === " "){

        return;

    }

    /* LETTERS */

    if(
        /^[a-zA-Z]$/.test(
            e.key
        )
    ){

        typedText +=
        e.key.toLowerCase();

        updateTyping();

        /* WRONG CHARACTER */

        if(
            !currentWord.startsWith(
                typedText
            )
        ){

            wrongInput();

            typedText = "";

            updateTyping();

            return;

        }

        checkWord();

    }

});


/* =========================================
   PAUSE
========================================= */

pauseBtn.addEventListener(
    "click",
    () => {

    gamePaused =
    !gamePaused;

    pauseBtn.innerText =
    gamePaused
    ?
    "Resume"
    :
    "Pause";

});


/* =========================================
   RESTART
========================================= */

restartBtn.addEventListener(
    "click",
    () => {

    restartGame();

});


/* =========================================
   PLAY AGAIN
========================================= */

playAgainBtn.addEventListener(
    "click",
    () => {

    restartGame();

});


/* =========================================
   FOCUS MODE
========================================= */

focusBtn.addEventListener(
    "click",
    () => {

    document.body.classList.toggle(
        "focus-mode"
    );

});


/* =========================================
   AUTO GRADE POPUP
========================================= */

setInterval(
    showGradePopup,
    12000
);


/* =========================================
   INITIALIZE
========================================= */

updateHUD();

generateWord();

startTimer();