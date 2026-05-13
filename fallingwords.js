/* =========================================
   EASYTYPING V2
   FALLING WORDS ENGINE
   fallingwords.js
========================================= */


/* =========================================
   WORD DATABASE
========================================= */

const WORDS = [

"speed",
"typing",
"future",
"keyboard",
"practice",
"gaming",
"combo",
"accuracy",
"focus",
"reaction",
"javascript",
"performance",
"challenge",
"advanced",
"survival",
"extreme",
"winner",
"mission",
"reflex",
"battle",
"monster",
"victory",
"system",
"learning",
"rapid",
"energy"

];


/* =========================================
   ELEMENTS
========================================= */

const gameField =
document.getElementById(
    "gameField"
);

const scoreElement =
document.getElementById(
    "score"
);

const comboElement =
document.getElementById(
    "combo"
);

const livesElement =
document.getElementById(
    "lives"
);

const levelElement =
document.getElementById(
    "level"
);

const wpmElement =
document.getElementById(
    "wpm"
);

const accuracyElement =
document.getElementById(
    "accuracy"
);

const liveTypingElement =
document.getElementById(
    "liveTyping"
);

const bestComboElement =
document.getElementById(
    "bestCombo"
);

const earnedXPElement =
document.getElementById(
    "earnedXP"
);

const comboPopup =
document.getElementById(
    "comboPopup"
);

const levelPopup =
document.getElementById(
    "levelPopup"
);

const bossWarning =
document.getElementById(
    "bossWarning"
);

const particleContainer =
document.getElementById(
    "particleContainer"
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

const finalBestCombo =
document.getElementById(
    "finalBestCombo"
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
   GAME VARIABLES
========================================= */

let score = 0;

let combo = 1;

let bestCombo = 1;

let lives = 5;

let level = 1;

let xp = 0;

let typedText = "";

let correctWords = 0;

let typedWords = 0;

let gameRunning = true;

let gamePaused = false;

let fallingWords = [];

let spawnRate = 1800;

let wordSpeed = 1.1;

let gameLoopFrame;

let spawnInterval;


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
   SPAWN WORD
========================================= */

function spawnWord(){

    if(
        !gameRunning
        || gamePaused
    ){

        return;

    }

    const word =
    document.createElement(
        "div"
    );

    word.classList.add(
        "falling-word"
    );

    const randomWord =
    getRandomWord();

    word.innerText =
    randomWord;

    word.dataset.word =
    randomWord;

    word.dataset.matched =
    "false";

    const randomLeft =
    Math.random() * 82;

    word.style.left =
    `${randomLeft}%`;

    word.style.top =
    "-60px";

    gameField.appendChild(
        word
    );

    fallingWords.push(word);

}


/* =========================================
   MOVE WORDS
========================================= */

function moveWords(){

    fallingWords.forEach(
        (word,index) => {

        let topValue =
        parseFloat(
            word.style.top
        );

        topValue +=
        wordSpeed;

        word.style.top =
        `${topValue}px`;

        /* MISSED */

        if(topValue > window.innerHeight - 220){

            word.remove();

            fallingWords.splice(
                index,
                1
            );

            loseLife();

        }

    });

}


/* =========================================
   GAME LOOP
========================================= */

function gameLoop(){

    if(
        !gameRunning
        || gamePaused
    ){

        gameLoopFrame =
        requestAnimationFrame(
            gameLoop
        );

        return;

    }

    moveWords();

    gameLoopFrame =
    requestAnimationFrame(
        gameLoop
    );

}


/* =========================================
   UPDATE HUD
========================================= */

function updateHUD(){

    scoreElement.innerText =
    score;

    comboElement.innerText =
    `x${combo}`;

    livesElement.innerText =
    lives;

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

function matchWord(){

    let matched = false;

    fallingWords.forEach(
        (word,index) => {

        const wordText =
        word.dataset.word;

        if(
            typedText
            === wordText
        ){

            matched = true;

            typedWords++;

            correctWords++;

            score +=
            100 * combo;

            xp += 10;

            combo++;

            if(combo > bestCombo){

                bestCombo =
                combo;

            }

            word.remove();

            fallingWords.splice(
                index,
                1
            );

            typedText = "";

            updateLiveTyping();

            updateHUD();

            createParticles();

            showComboPopup();

            checkLevelUp();

        }

    });

    if(!matched){

        highlightActiveWords();

    }

}


/* =========================================
   ACTIVE WORD HIGHLIGHT
========================================= */

function highlightActiveWords(){

    fallingWords.forEach(
        word => {

        word.classList.remove(
            "active-word"
        );

        const wordText =
        word.dataset.word;

        if(
            wordText.startsWith(
                typedText
            )
        ){

            word.classList.add(
                "active-word"
            );

        }

    });

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

        updateLiveTyping();

        highlightActiveWords();

        return;

    }

    /* SPACE IGNORE */

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

        updateLiveTyping();

        matchWord();

    }

});


/* =========================================
   LIVE TYPING
========================================= */

function updateLiveTyping(){

    if(typedText === ""){

        liveTypingElement.innerText =
        "...";

        return;

    }

    liveTypingElement.innerText =
    typedText;

}


/* =========================================
   LIFE SYSTEM
========================================= */

function loseLife(){

    lives--;

    combo = 1;

    updateHUD();

    screenShake();

    if(lives <= 0){

        finishGame();

    }

}


/* =========================================
   LEVEL SYSTEM
========================================= */

function checkLevelUp(){

    if(score >= level * 1000){

        level++;

        wordSpeed += 0.18;

        if(spawnRate > 700){

            spawnRate -= 120;

        }

        restartSpawner();

        showLevelPopup();

    }

}


/* =========================================
   PARTICLES
========================================= */

function createParticles(){

    for(let i = 0; i < 10; i++){

        const particle =
        document.createElement(
            "div"
        );

        particle.classList.add(
            "particle"
        );

        particle.style.left =
        `${Math.random() * 100}%`;

        particle.style.top =
        `${Math.random() * 100}%`;

        particleContainer.appendChild(
            particle
        );

        setTimeout(() => {

            particle.remove();

        },1000);

    }

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
   SCREEN SHAKE
========================================= */

function screenShake(){

    gameField.style.transform =
    "translateX(8px)";

    setTimeout(() => {

        gameField.style.transform =
        "translateX(-8px)";

    },60);

    setTimeout(() => {

        gameField.style.transform =
        "translateX(0px)";

    },120);

}


/* =========================================
   GAME OVER
========================================= */

function finishGame(){

    gameRunning = false;

    clearInterval(
        spawnInterval
    );

    cancelAnimationFrame(
        gameLoopFrame
    );

    finalScore.innerText =
    score;

    finalBestCombo.innerText =
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
            "fallingwords-history"
        )
    ) || [];

    history.push({

        score,
        combo:
        bestCombo,

        accuracy:
        accuracyElement.innerText,

        level

    });

    localStorage.setItem(
        "fallingwords-history",
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

    lives = 5;

    level = 1;

    xp = 0;

    typedText = "";

    correctWords = 0;

    typedWords = 0;

    spawnRate = 1800;

    wordSpeed = 1.1;

    gameRunning = true;

    gamePaused = false;

    fallingWords.forEach(
        word => {

        word.remove();

    });

    fallingWords = [];

    updateLiveTyping();

    updateHUD();

    gameOverOverlay.classList.add(
        "hidden"
    );

    gameOverModal.classList.add(
        "hidden"
    );

    restartSpawner();

}


/* =========================================
   SPAWNER
========================================= */

function restartSpawner(){

    clearInterval(
        spawnInterval
    );

    spawnInterval =
    setInterval(
        spawnWord,
        spawnRate
    );

}


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
   RESTART BUTTON
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
   BOSS ROUND
========================================= */

function bossRound(){

    if(level < 5){

        return;

    }

    bossWarning.classList.remove(
        "hidden"
    );

    setTimeout(() => {

        bossWarning.classList.add(
            "hidden"
        );

    },1500);

}


/* =========================================
   AUTO BOSS CHECK
========================================= */

setInterval(
    bossRound,
    20000
);


/* =========================================
   INITIALIZE
========================================= */

updateHUD();

updateLiveTyping();

restartSpawner();

gameLoop();