/* =========================
   EASYTYPING V2
   PROFILE ENGINE
========================= */


/* =========================
   ELEMENTS
========================= */

const settingsButtons =
document.querySelectorAll(
    ".settings-buttons button"
);

const profileBars =
document.querySelectorAll(
    ".profile-bar"
);

const goalFill =
document.querySelector(
    ".goal-fill"
);

const achievementBoxes =
document.querySelectorAll(
    ".achievement-box"
);

const historyItems =
document.querySelectorAll(
    ".history-item"
);

const aiCard =
document.querySelector(
    ".profile-ai-card p"
);


/* =========================
   USER DATA
========================= */

let userData = {

    name: "Neeraj",

    level: 4,

    xp: 420,

    streak: 7,

    bestWPM: 42,

    averageAccuracy: 96,

    completedLessons: 18,

    practiceSessions: 124

};


/* =========================
   LOAD STORAGE
========================= */

function loadProfileData(){

    const progress =
    localStorage.getItem(
        "easytyping-progress"
    );

    if(progress){

        const data =
        JSON.parse(progress);

        userData.level =
        data.level || 4;

        userData.xp =
        data.xp || 420;

        userData.streak =
        data.streak || 7;

    }

}


/* =========================
   SETTINGS SYSTEM
========================= */

settingsButtons.forEach(
    button => {

    button.addEventListener(
        "click",
        () => {

        const text =
        button.innerText;

        /* FOCUS */

        if(
            text.includes(
                "Focus"
            )
        ){

            document.body
            .classList.toggle(
                "focus-mode"
            );

        }

        /* SOUND */

        if(
            text.includes(
                "Sound"
            )
        ){

            const current =
            localStorage.getItem(
                "easytyping-sound"
            );

            if(current === "off"){

                localStorage.setItem(
                    "easytyping-sound",
                    "on"
                );

            }

            else{

                localStorage.setItem(
                    "easytyping-sound",
                    "off"
                );

            }

        }

        /* DARK KEYBOARD */

        if(
            text.includes(
                "Dark"
            )
        ){

            document.body
            .classList.toggle(
                "dark-keyboard"
            );

        }

        /* RESET */

        if(
            text.includes(
                "Reset"
            )
        ){

            const confirmReset =
            confirm(
                "Reset all EasyTyping progress?"
            );

            if(confirmReset){

                localStorage.clear();

                location.reload();

            }

        }

    });

});


/* =========================
   GRAPH SYSTEM
========================= */

function animateGraph(){

    profileBars.forEach(
        bar => {

        const random =
        Math.floor(
            Math.random() * 90
        ) + 10;

        bar.style.height =
        `${random}%`;

    });

}


/* =========================
   GOAL SYSTEM
========================= */

function updateGoals(){

    const percent = 80;

    goalFill.style.width =
    `${percent}%`;

}


/* =========================
   AI REPORT
========================= */

function updateAIReport(){

    const reports = [

    "Your typing consistency improved this week.",

    "Practice punctuation mode for better balance.",

    "You are improving accuracy steadily.",

    "Your weak-key performance has improved."

    ];

    const random =
    Math.floor(
        Math.random()
        * reports.length
    );

    aiCard.innerText =
    reports[random];

}


/* =========================
   ACHIEVEMENT EFFECTS
========================= */

achievementBoxes.forEach(
    box => {

    box.addEventListener(
        "mouseenter",
        () => {

        box.style.transform =
        "scale(1.04)";

    });

    box.addEventListener(
        "mouseleave",
        () => {

        box.style.transform =
        "scale(1)";

    });

});


/* =========================
   HISTORY EFFECTS
========================= */

historyItems.forEach(
    item => {

    item.addEventListener(
        "mouseenter",
        () => {

        item.style.transform =
        "translateX(6px)";

    });

    item.addEventListener(
        "mouseleave",
        () => {

        item.style.transform =
        "translateX(0px)";

    });

});


/* =========================
   AUTO GRAPH UPDATE
========================= */

setInterval(() => {

    animateGraph();

}, 4000);


/* =========================
   INITIALIZE
========================= */

loadProfileData();

updateGoals();

updateAIReport();

animateGraph();