/* =========================================
   EASYTYPING V2
   SPEED BURST ENGINE
   speedburst.js
========================================= */


/* =========================================
   WORD DATABASE
========================================= */

const WORDS = [

"speed",
"burst",
"rapid",
"future",
"combo",
"typing",
"winner",
"focus",
"extreme",
"accuracy",
"reaction",
"energy",
"battle",
"storm",
"power",
"system",
"arcade",
"monster",
"victory",
"ultra",
"reflex",
"gaming",
"challenge",
"advanced"

];


/* =========================================
   ELEMENTS
========================================= */

const mainWord =
document.getElementById(
    "mainWord"
);

const liveTyping =
document.getElementById(
    "liveTyping"
);

const scoreElement =
document.getElementById(
    "score"
);

const comboElement =
document.getElementById(
    "combo"
);

const timerElement =
document.getElementById(
    "timer"
);

const wpmElement =
document.getElementById(
    "wpm"
);

const accuracyElement =
document.getElementById(
    "accuracy"
);

const levelElement =
document.getElementById(
    "level"
);

const bestComboElement =
document.getElementById(
    "bestCombo"
);

const earnedXPElement =
document.getElementById(
    "earnedXP"
);

const reactionSpeedElement =
document.getElementById(
    "reactionSpeed"
);

const comboPopup =
document.getElementById(
    "comboPopup"
);

const perfectPopup =
document.getElementById(
    "perfectPopup"
);

const levelPopup =
document.getElementById(
    "levelPopup"
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

const finalCombo =
document.getElementById(
    "finalCombo"
);

const finalWPM =
document.getElementById(
    "finalWPM"
);

const finalAccuracy =
document.getElementById(
    "finalAccuracy"
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

let combo = 1;

let bestCombo = 1;

let xp = 0;

let level = 1;

let timer = 60;

let typedText = "";

let currentWord = "";

let gameRunning = true;

let gamePaused = false;

let typedWords = 0;

let correctWords = 0;

let reactionStart = 0;

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

    mainWord.innerText =
    currentWord;

    typedText = "";

    updateTyping();

    reactionStart =
    Date.now();

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

    comboElement.innerText =
    `x${combo}`;

    levelElement.innerText =
    level;

    bestComboElement.innerText =
    `x${bestCombo}`;

    earnedXPElement.innerText =
    `+${xp}`;

    const accuracy =
    typedWords > 0
    ?
    Math.round(
        (
            correctWords
            / typedWords
        ) * 100
    )
    :
    100;

    accuracyElement.innerText =
    `${accuracy}%`;

    const wpm =
    Math.round(
        correctWords * 2.5
    );

    wpmElement.innerText =
    wpm;

}


/* =========================================
   MATCH WORD
========================================= */

function checkWord(){

    if(
        typedText
        === currentWord
    ){

        typedWords++;

        correctWords++;

        score +=
        120 * combo;

        xp += 12;

        combo++;

        if(combo > bestCombo){

            bestCombo =
            combo;

        }

        showComboPopup();

        showPerfectPopup();

        calculateReaction();

        checkLevelUp();

        updateHUD();

        animateWord();

        generateWord();

    }

}


/* =========================================
   REACTION SPEED
========================================= */

function calculateReaction(){

    const reaction =
    Date.now()
    - reactionStart;

    reactionSpeedElement.innerText =
    `${reaction}ms`;

}


/* =========================================
   LEVEL SYSTEM
========================================= */

function checkLevelUp(){

    if(score >= level * 1200){

        level++;

        showLevelPopup();

    }

}


/* =========================================
   WORD ANIMATION
========================================= */

function animateWord(){

    mainWord.style.transform =
    "scale(1.15)";

    setTimeout(() => {

        mainWord.style.transform =
        "scale(1)";

    },180);

}


/* =========================================
   POPUPS
========================================= */

function showComboPopup(){

    if(combo < 3){

        return;

    }

    comboPopup.innerText =
    `COMBO x${combo}`;

    comboPopup.classList.remove(
        "hidden"
    );

    setTimeout(() => {

        comboPopup.classList.add(
            "hidden"
        );

    },800);

}


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


function showLevelPopup(){

    levelPopup.classList.remove(
        "hidden"
    );

    setTimeout(() => {

        levelPopup.classList.add(
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

    finalCombo.innerText =
    `x${bestCombo}`;

    finalWPM.innerText =
    wpmElement.innerText;

    finalAccuracy.innerText =
    accuracyElement.innerText;

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
            "speedburst-history"
        )
    ) || [];

    history.push({

        score,
        combo:
        bestCombo,

        level,
        accuracy:
        accuracyElement.innerText

    });

    localStorage.setItem(
        "speedburst-history",
        JSON.stringify(history)
    );

}


/* =========================================
   RESTART
========================================= */

function restartGame(){

    score = 0;

    combo = 1;

    bestCombo = 1;

    xp = 0;

    level = 1;

    timer = 60;

    typedText = "";

    typedWords = 0;

    correctWords = 0;

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
   INITIALIZE
========================================= */

updateHUD();

generateWord();

startTimer();