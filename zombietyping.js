/* =========================================
   EASYTYPING V2
   ZOMBIE TYPING ENGINE
   zombietyping.js
========================================= */


/* =========================================
   WORD DATABASE
========================================= */

const ZOMBIE_WORDS = [

"brain",
"attack",
"danger",
"escape",
"weapon",
"survival",
"monster",
"infected",
"mutation",
"hunter",
"fighter",
"warning",
"zombie",
"shadow",
"battle",
"extreme",
"chaos",
"mission",
"future",
"control",
"rapid",
"nightmare",
"defense",
"reaction"

];


/* =========================================
   ELEMENTS
========================================= */

const zombieField =
document.getElementById(
    "zombieField"
);

const scoreElement =
document.getElementById(
    "score"
);

const livesElement =
document.getElementById(
    "lives"
);

const waveElement =
document.getElementById(
    "wave"
);

const comboElement =
document.getElementById(
    "combo"
);

const accuracyElement =
document.getElementById(
    "accuracy"
);

const zombiesLeftElement =
document.getElementById(
    "zombiesLeft"
);

const liveTyping =
document.getElementById(
    "liveTyping"
);

const killsElement =
document.getElementById(
    "kills"
);

const bestComboElement =
document.getElementById(
    "bestCombo"
);

const earnedXPElement =
document.getElementById(
    "earnedXP"
);

const wavePopup =
document.getElementById(
    "wavePopup"
);

const bossPopup =
document.getElementById(
    "bossPopup"
);

const comboPopup =
document.getElementById(
    "comboPopup"
);

const damagePopup =
document.getElementById(
    "damagePopup"
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

const finalKills =
document.getElementById(
    "finalKills"
);

const finalCombo =
document.getElementById(
    "finalCombo"
);

const finalWave =
document.getElementById(
    "finalWave"
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

let lives = 5;

let wave = 1;

let combo = 1;

let bestCombo = 1;

let accuracy = 100;

let kills = 0;

let xp = 0;

let typedText = "";

let zombies = [];

let totalTyped = 0;

let correctTyped = 0;

let gameRunning = true;

let gamePaused = false;

let zombieSpeed = 0.35;

let spawnInterval;

let animationFrame;


/* =========================================
   RANDOM WORD
========================================= */

function getRandomWord(){

    const randomIndex =
    Math.floor(
        Math.random()
        * ZOMBIE_WORDS.length
    );

    return ZOMBIE_WORDS[randomIndex];

}


/* =========================================
   CREATE ZOMBIE
========================================= */

function createZombie(isBoss = false){

    if(
        !gameRunning
        || gamePaused
    ){

        return;

    }

    const zombie =
    document.createElement(
        "div"
    );

    zombie.classList.add(
        "zombie"
    );

    if(isBoss){

        zombie.classList.add(
            "boss-zombie"
        );

    }

    const word =
    isBoss
    ?
    getRandomWord()
    + getRandomWord()
    :
    getRandomWord();

    zombie.dataset.word =
    word;

    zombie.dataset.matched =
    "false";

    zombie.innerHTML = `

        <div class="zombie-face">
            🧟
        </div>

        <div class="zombie-word">
            ${word}
        </div>

    `;

    const randomX =
    Math.random()
    * (
        window.innerWidth
        - 200
    );

    zombie.style.left =
    `${randomX}px`;

    zombie.style.top =
    "-140px";

    zombieField.appendChild(
        zombie
    );

    zombies.push(zombie);

    updateZombieCount();

}


/* =========================================
   MOVE ZOMBIES
========================================= */

function moveZombies(){

    zombies.forEach(
        (zombie,index) => {

        let topValue =
        parseFloat(
            zombie.style.top
        );

        topValue +=
        zombieSpeed;

        zombie.style.top =
        `${topValue}px`;

        /* PLAYER DAMAGE */

        if(
            topValue
            > window.innerHeight - 260
        ){

            zombie.remove();

            zombies.splice(
                index,
                1
            );

            takeDamage();

        }

    });

}


/* =========================================
   GAME LOOP
========================================= */

function gameLoop(){

    if(
        !gameRunning
    ){

        return;

    }

    if(!gamePaused){

        moveZombies();

    }

    animationFrame =
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

    livesElement.innerText =
    lives;

    waveElement.innerText =
    wave;

    comboElement.innerText =
    `x${combo}`;

    accuracyElement.innerText =
    `${accuracy}%`;

    killsElement.innerText =
    kills;

    bestComboElement.innerText =
    `x${bestCombo}`;

    earnedXPElement.innerText =
    `+${xp}`;

}


/* =========================================
   UPDATE ZOMBIE COUNT
========================================= */

function updateZombieCount(){

    zombiesLeftElement.innerText =
    zombies.length;

}


/* =========================================
   LIVE TYPING
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
   MATCH ZOMBIE
========================================= */

function checkZombieMatch(){

    let matched = false;

    zombies.forEach(
        (zombie,index) => {

        const zombieWord =
        zombie.dataset.word;

        if(
            typedText
            === zombieWord
        ){

            matched = true;

            correctTyped++;

            totalTyped++;

            kills++;

            score +=
            150 * combo;

            xp += 14;

            combo++;

            if(combo > bestCombo){

                bestCombo =
                combo;

            }

            createExplosion(
                zombie
            );

            zombie.remove();

            zombies.splice(
                index,
                1
            );

            typedText = "";

            updateTyping();

            updateAccuracy();

            updateHUD();

            updateZombieCount();

            showComboPopup();

            checkWave();

        }

    });

    if(!matched){

        highlightZombie();

    }

}


/* =========================================
   ACTIVE ZOMBIE
========================================= */

function highlightZombie(){

    zombies.forEach(
        zombie => {

        zombie.classList.remove(
            "active-zombie"
        );

        const zombieWord =
        zombie.dataset.word;

        if(
            zombieWord.startsWith(
                typedText
            )
        ){

            zombie.classList.add(
                "active-zombie"
            );

        }

    });

}


/* =========================================
   DAMAGE
========================================= */

function takeDamage(){

    lives--;

    combo = 1;

    updateZombieCount();

    updateHUD();

    showDamagePopup();

    screenShake();

    if(lives <= 0){

        finishGame();

    }

}


/* =========================================
   ACCURACY
========================================= */

function updateAccuracy(){

    accuracy =
    Math.round(
        (
            correctTyped
            / totalTyped
        ) * 100
    );

}


/* =========================================
   WAVE SYSTEM
========================================= */

function checkWave(){

    if(kills >= wave * 6){

        wave++;

        zombieSpeed += 0.06;

        showWavePopup();

        if(wave % 5 === 0){

            createBossWave();

        }

    }

}


/* =========================================
   BOSS WAVE
========================================= */

function createBossWave(){

    bossPopup.classList.remove(
        "hidden"
    );

    createZombie(true);

    setTimeout(() => {

        bossPopup.classList.add(
            "hidden"
        );

    },1800);

}


/* =========================================
   PARTICLE EXPLOSION
========================================= */

function createExplosion(zombie){

    zombie.style.transform =
    "scale(1.2)";

    zombie.style.opacity =
    "0";

}


/* =========================================
   POPUPS
========================================= */

function showWavePopup(){

    wavePopup.innerText =
    `WAVE ${wave}`;

    wavePopup.classList.remove(
        "hidden"
    );

    setTimeout(() => {

        wavePopup.classList.add(
            "hidden"
        );

    },1200);

}


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


function showDamagePopup(){

    damagePopup.classList.remove(
        "hidden"
    );

    setTimeout(() => {

        damagePopup.classList.add(
            "hidden"
        );

    },700);

}


/* =========================================
   SCREEN SHAKE
========================================= */

function screenShake(){

    zombieField.style.transform =
    "translateX(8px)";

    setTimeout(() => {

        zombieField.style.transform =
        "translateX(-8px)";

    },60);

    setTimeout(() => {

        zombieField.style.transform =
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
        animationFrame
    );

    finalScore.innerText =
    score;

    finalKills.innerText =
    kills;

    finalCombo.innerText =
    `x${bestCombo}`;

    finalWave.innerText =
    wave;

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
            "zombie-history"
        )
    ) || [];

    history.push({

        score,
        kills,
        wave,
        combo:
        bestCombo

    });

    localStorage.setItem(
        "zombie-history",
        JSON.stringify(history)
    );

}


/* =========================================
   RESTART
========================================= */

function restartGame(){

    score = 0;

    lives = 5;

    wave = 1;

    combo = 1;

    bestCombo = 1;

    accuracy = 100;

    kills = 0;

    xp = 0;

    typedText = "";

    totalTyped = 0;

    correctTyped = 0;

    zombieSpeed = 0.35;

    gameRunning = true;

    gamePaused = false;

    zombies.forEach(
        zombie => {

        zombie.remove();

    });

    zombies = [];

    updateTyping();

    updateHUD();

    updateZombieCount();

    gameOverOverlay.classList.add(
        "hidden"
    );

    gameOverModal.classList.add(
        "hidden"
    );

    restartSpawner();

    gameLoop();

}


/* =========================================
   SPAWNER
========================================= */

function restartSpawner(){

    clearInterval(
        spawnInterval
    );

    spawnInterval =
    setInterval(() => {

        createZombie();

    },1800);

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

        highlightZombie();

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

        totalTyped++;

        updateTyping();

        checkZombieMatch();

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

updateTyping();

restartSpawner();

gameLoop();