// =========================
// Theme Toggle
// =========================

const themeBtn = document.getElementById("theme-btn");

if(themeBtn){

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("light-theme");

        if(document.body.classList.contains("light-theme")){

            themeBtn.textContent = "☀️";

        }

        else{

            themeBtn.textContent = "🌙";

        }

    });

}



// =========================
// Sound Toggle
// =========================

const soundBtn = document.getElementById("sound-btn");

let soundEnabled = true;

if(soundBtn){

    soundBtn.addEventListener("click", () => {

        soundEnabled = !soundEnabled;

        if(soundEnabled){

            soundBtn.textContent = "🔊";

        }

        else{

            soundBtn.textContent = "🔇";

        }

    });

}



// =========================
// Roadmap Navigation
// =========================

const roadmapDays =
    document.querySelectorAll(".roadmap-day");

roadmapDays.forEach((dayBtn, index) => {

    dayBtn.addEventListener("click", () => {

        // Locked Day Check

        if(dayBtn.classList.contains("locked-roadmap-day")){

            return;

        }

        // Remove Active State

        roadmapDays.forEach(btn => {

            btn.classList.remove(
                "active-roadmap-day"
            );

        });

        // Add Active State

        dayBtn.classList.add(
            "active-roadmap-day"
        );

        // Redirect To Learn Page

        window.location.href =
            `learn.html?day=${index + 1}`;

    });

});



// =========================
// Demo Dashboard Data
// =========================

const streakCount =
    document.getElementById("streak-count");

const xpCount =
    document.getElementById("xp-count");

const levelCount =
    document.getElementById("level-count");

const bestWpm =
    document.getElementById("best-wpm");

const completedCount =
    document.getElementById("completed-count");

if(streakCount){

    streakCount.textContent = "7 Days";

}

if(xpCount){

    xpCount.textContent = "420 XP";

}

if(levelCount){

    levelCount.textContent = "Level 4";

}

if(bestWpm){

    bestWpm.textContent = "38";

}

if(completedCount){

    completedCount.textContent = "12";

}