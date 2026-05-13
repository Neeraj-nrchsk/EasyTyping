/* =========================
   EASYTYPING V2
   ANALYTICS ENGINE
========================= */


/* =========================
   ELEMENTS
========================= */

const filterButtons =
document.querySelectorAll(
    ".filter-btn"
);

const analyticsBars =
document.querySelectorAll(
    ".analytics-bar"
);

const heatBoxes =
document.querySelectorAll(
    ".heat-box"
);

const goalFill =
document.querySelector(
    ".goal-fill"
);

const weakKeyContainer =
document.querySelector(
    ".weak-keys-list"
);

const achievementContainer =
document.querySelector(
    ".achievement-list"
);

const aiReport =
document.querySelector(
    ".analytics-ai-card p"
);


/* =========================
   STORAGE DATA
========================= */

let practiceData = [];

let learnData = [];

let weakKeys = {

f: 12,
j: 9,
r: 6

};

let achievements = [

"⚡ 40 WPM",
"🎯 Accuracy Pro",
"🔥 Streak Master"

];


/* =========================
   LOAD STORAGE
========================= */

function loadAnalyticsData(){

    const practice =
    localStorage.getItem(
        "easytyping-practice"
    );

    const learn =
    localStorage.getItem(
        "easytyping-analytics"
    );

    if(practice){

        practiceData =
        JSON.parse(practice);

    }

    if(learn){

        learnData =
        JSON.parse(learn);

    }

}


/* =========================
   FILTER SYSTEM
========================= */

filterButtons.forEach(
    button => {

    button.addEventListener(
        "click",
        () => {

        filterButtons.forEach(
            btn => {

            btn.classList.remove(
                "active-filter"
            );

        });

        button.classList.add(
            "active-filter"
        );

        updateGraph();

    });

});


/* =========================
   GRAPH
========================= */

function updateGraph(){

    analyticsBars.forEach(
        bar => {

        const randomHeight =
        Math.floor(
            Math.random() * 90
        ) + 10;

        bar.style.height =
        `${randomHeight}%`;

    });

}


/* =========================
   HEATMAP
========================= */

function updateHeatmap(){

    heatBoxes.forEach(
        box => {

        box.classList.remove(
            "active-heat"
        );

    });

    const activeCount = 3;

    for(let i = 0; i < activeCount; i++){

        const random =
        Math.floor(
            Math.random()
            * heatBoxes.length
        );

        heatBoxes[random]
        .classList.add(
            "active-heat"
        );

    }

}


/* =========================
   WEAK KEYS
========================= */

function renderWeakKeys(){

    weakKeyContainer.innerHTML = "";

    Object.keys(weakKeys)
    .forEach(key => {

        const div =
        document.createElement(
            "div"
        );

        div.classList.add(
            "weak-key"
        );

        div.innerText =
        key;

        weakKeyContainer
        .appendChild(div);

    });

}


/* =========================
   ACHIEVEMENTS
========================= */

function renderAchievements(){

    achievementContainer.innerHTML = "";

    achievements.forEach(
        achievement => {

        const div =
        document.createElement(
            "div"
        );

        div.classList.add(
            "achievement-item"
        );

        div.innerText =
        achievement;

        achievementContainer
        .appendChild(div);

    });

}


/* =========================
   GOAL SYSTEM
========================= */

function updateGoalProgress(){

    const percent = 76;

    goalFill.style.width =
    `${percent}%`;

}


/* =========================
   AI REPORT
========================= */

function generateAIReport(){

    const reports = [

    "Your typing speed improved by 18% this week.",

    "Practice punctuation mode to improve consistency.",

    "Your accuracy is excellent on home row lessons.",

    "You should practice weak-key exercises daily."

    ];

    const random =
    Math.floor(
        Math.random()
        * reports.length
    );

    aiReport.innerText =
    reports[random];

}


/* =========================
   PERFORMANCE SUMMARY
========================= */

function calculatePerformance(){

    let totalWPM = 0;

    let sessions = 0;

    practiceData.forEach(
        session => {

        totalWPM +=
        Number(session.wpm);

        sessions++;

    });

    if(sessions > 0){

        const average =
        Math.round(
            totalWPM / sessions
        );

        console.log(
            `Average WPM :
            ${average}`
        );

    }

}


/* =========================
   AUTO REFRESH GRAPH
========================= */

setInterval(() => {

    updateGraph();

}, 4000);


/* =========================
   INITIALIZE
========================= */

loadAnalyticsData();

updateGraph();

updateHeatmap();

renderWeakKeys();

renderAchievements();

updateGoalProgress();

generateAIReport();

calculatePerformance();