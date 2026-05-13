/* =========================================
   EASYTYPING V2
   KEY HUNTER ENGINE
   keyhunter.js
========================================= */


/* =========================================
   KEY DATABASE
========================================= */

const KEYS = [

"A","S","D","F","J","K","L",

"Q","W","E","R","U","I","O","P",

"Z","X","C","V","B","N","M"

];


/* =========================================
   ELEMENTS
========================================= */

const targetKey =
document.getElementById(
    "targetKey"
);

const lastInput =
document.getElementById(
    "lastInput"
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

const accuracyElement =
document.getElementById(
    "accuracy"
);

const reflexElement =
document.getElementById(
    "reflex"
);

const levelElement =
document.getElementById(
    "level"
);

const bestComboElement =
document.getElementById(
    "bestCombo"
);

const perfectHitsElement =
document.getElementById(
    "perfectHits"
);

const earnedXPElement =
document.getElementById(
    "earnedXP"
);

const comboPopup =
document.getElementById(
    "comboPopup"
);

const perfectPopup =
document.getElementById(
    "perfectPopup"
);

const missPopup =
document.getElementById(
    "missPopup"
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

const finalAccuracy =
document.getElementById(
    "finalAccuracy"
);

const finalReflex =
document.getElementById(
    "finalReflex"
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

let timer = 60;

let accuracy = 100;

let level = 1;

let xp = 0;

let perfectHits = 0;

let totalHits = 0;

let correctHits = 0;

let currentKey = "";

let reactionStart = 0;

let averageReflex = 0;

let reflexTimes = [];

let gameRunning = true;

let gamePaused = false;

let timerInterval;


/* =========================================
   RANDOM KEY
========================================= */

function getRandomKey(){

    const randomIndex =
    Math.floor(
        Math.random()
        * KEYS.length
    );

    return KEYS[randomIndex];

}


/* =========================================
   GENERATE TARGET KEY
========================================= */

function generateKey(){

    currentKey =
    getRandomKey();

    targetKey.innerText =
    currentKey;

    reactionStart =
    Date.now();

}


/* =========================================
   UPDATE HUD
========================================= */

function updateHUD(){

    scoreElement.innerText =
    score;

    comboElement.innerText =
    `x${combo}`;

    accuracyElement.innerText =
    `${accuracy}%`;

    levelElement.innerText =
    level;

    bestComboElement.innerText =
    `x${bestCombo}`;

    perfectHitsElement.innerText =
    perfectHits;

    earnedXPElement.innerText =
    `+${xp}`;

}


/* =========================================
   CALCULATE REFLEX
========================================= */

function calculateReflex(){

    const reflex =
    Date.now()
    - reactionStart;

    reflexTimes.push(
        reflex
    );

    const total =
    reflexTimes.reduce(
        (a,b) => a + b,
        0
    );

    averageReflex =
    Math.round(
        total
        / reflexTimes.length
    );

    reflexElement.innerText =
    `${averageReflex}ms`;

}


/* =========================================
   CORRECT HIT
========================================= */

function correctHit(){

    totalHits++;

    correctHits++;

    perfectHits++;

    combo++;

    score +=
    100 * combo;

    xp += 10;

    if(combo > bestCombo){

        bestCombo =
        combo;

    }

    calculateReflex();

    updateAccuracy();

    checkLevelUp();

    updateHUD();

    animateTarget();

    showPerfectPopup();

    showComboPopup();

    generateKey();

}


/* =========================================
   WRONG HIT
========================================= */

function wrongHit(){

    totalHits++;

    combo = 1;

    accuracy =
    Math.max(
        0,
        accuracy - 2
    );

    score =
    Math.max(
        0,
        score - 30
    );

    updateHUD();

    shakeTarget();

    showMissPopup();

}


/* =========================================
   ACCURACY
========================================= */

function updateAccuracy(){

    accuracy =
    Math.round(
        (
            correctHits
            / totalHits
        ) * 100
    );

}


/* =========================================
   LEVEL SYSTEM
========================================= */

function checkLevelUp(){

    if(score >= level * 1200){

        level++;

        updateHUD();

    }

}


/* =========================================
   TARGET ANIMATIONS
========================================= */

function animateTarget(){

    targetKey.style.transform =
    "scale(1.12)";

    setTimeout(() => {

        targetKey.style.transform =
        "scale(1)";

    },180);

}


function shakeTarget(){

    targetKey.style.transform =
    "translateX(8px)";

    setTimeout(() => {

        targetKey.style.transform =
        "translateX(-8px)";

    },60);

    setTimeout(() => {

        targetKey.style.transform =
        "translateX(0px)";

    },120);

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

    },700);

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


function showMissPopup(){

    missPopup.classList.remove(
        "hidden"
    );

    setTimeout(() => {

        missPopup.classList.add(
            "hidden"
        );

    },700);

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

    finalAccuracy.innerText =
    `${accuracy}%`;

    finalReflex.innerText =
    `${averageReflex}ms`;

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
            "keyhunter-history"
        )
    ) || [];

    history.push({

        score,
        combo:
        bestCombo,

        accuracy,
        reflex:
        averageReflex

    });

    localStorage.setItem(
        "keyhunter-history",
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

    timer = 60;

    accuracy = 100;

    level = 1;

    xp = 0;

    perfectHits = 0;

    totalHits = 0;

    correctHits = 0;

    averageReflex = 0;

    reflexTimes = [];

    gameRunning = true;

    gamePaused = false;

    timerElement.innerText =
    timer;

    reflexElement.innerText =
    "0ms";

    gameOverOverlay.classList.add(
        "hidden"
    );

    gameOverModal.classList.add(
        "hidden"
    );

    updateHUD();

    generateKey();

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

    const pressedKey =
    e.key.toUpperCase();

    if(
        !/^[A-Z]$/.test(
            pressedKey
        )
    ){

        return;

    }

    lastInput.innerText =
    pressedKey;

    if(
        pressedKey
        === currentKey
    ){

        correctHit();

    }
    else{

        wrongHit();

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

generateKey();

startTimer();