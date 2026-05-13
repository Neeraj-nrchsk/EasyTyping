/* =========================================
   EASYTYPING V2
   GAMES SECTION CONTENT SYSTEM
   gamesContent.js
========================================= */


/* =========================================
   GAMES DATABASE
========================================= */

const GAMES_CONTENT = {


    /* =========================================
       FALLING WORDS GAME
    ========================================= */

    fallingWords: {

        easy: [

            "apple",
            "water",
            "focus",
            "green",
            "light",
            "dream",
            "smile",
            "table",
            "mouse",
            "power"

        ],

        medium: [

            "keyboard",
            "accuracy",
            "reaction",
            "training",
            "internet",
            "creative",
            "platform",
            "progress",
            "monitor",
            "browser"

        ],

        hard: [

            "synchronization",
            "implementation",
            "visualization",
            "architecture",
            "optimization",
            "authentication"

        ],

        speedMultiplier: {

            easy: 1,
            medium: 1.5,
            hard: 2

        }

    },


    /* =========================================
       SPEED BURST GAME
    ========================================= */

    speedBurst: {

        words: [

            "fast",
            "rapid",
            "speed",
            "boost",
            "flash",
            "storm",
            "quick",
            "hyper",
            "focus",
            "turbo",
            "velocity",
            "motion",
            "reflex",
            "instant",
            "charge",
            "winner",
            "rocket",
            "ultra",
            "impact",
            "timing"

        ],

        comboSystem: {

            combo2: 2,
            combo5: 5,
            combo10: 10,
            combo20: 20

        },

        reactionLevels: [

            {
                level: 1,
                speed: 2000
            },

            {
                level: 2,
                speed: 1600
            },

            {
                level: 3,
                speed: 1200
            },

            {
                level: 4,
                speed: 900
            }

        ]

    },


    /* =========================================
       ACCURACY RUSH GAME
    ========================================= */

    accuracyRush: {

        easy: [

            "focus",
            "steady",
            "typing",
            "perfect",
            "smooth",
            "clean"

        ],

        medium: [

            "accuracy",
            "reaction",
            "training",
            "keyboard",
            "learning"

        ],

        hard: [

            "professionalism",
            "communication",
            "optimization",
            "representation"

        ],

        grading: {

            S: 98,
            A: 90,
            B: 80,
            C: 70,
            D: 60

        }

    },


    /* =========================================
       KEY HUNTER GAME
    ========================================= */

    keyHunter: {

        keys: [

            "a","s","d","f",
            "j","k","l",";",
            "q","w","e","r",
            "u","i","o","p",
            "z","x","c","v",
            "b","n","m"

        ],

        specialChallenges: [

            "asdf",
            "jkl;",
            "qwer",
            "zxcv",
            "bnm"

        ],

        reactionTargets: [

            {
                level: 1,
                time: 2000
            },

            {
                level: 2,
                time: 1500
            },

            {
                level: 3,
                time: 1000
            }

        ]

    },


    /* =========================================
       ZOMBIE TYPING GAME
    ========================================= */

    zombieTyping: {

        normalWords: [

            "zombie",
            "danger",
            "escape",
            "monster",
            "hunter",
            "battle",
            "weapon",
            "survival",
            "attack",
            "shadow",
            "mission",
            "chaos",
            "infected",
            "mutation",
            "nightmare"

        ],

        bossWords: [

            "apocalypse",
            "destruction",
            "elimination",
            "catastrophe",
            "contamination",
            "transformation",
            "underground",
            "radioactive"

        ],

        waves: [

            {
                wave: 1,
                speed: 0.5,
                zombies: 5
            },

            {
                wave: 2,
                speed: 0.7,
                zombies: 8
            },

            {
                wave: 3,
                speed: 1,
                zombies: 10
            },

            {
                wave: 4,
                speed: 1.3,
                zombies: 12
            },

            {
                wave: 5,
                speed: 1.6,
                zombies: 1,
                boss: true
            }

        ],

        rewards: {

            zombieKillXP: 15,
            bossKillXP: 100,
            waveXP: 200

        }

    },


    /* =========================================
       NUMBER CHALLENGES
    ========================================= */

    numberChallenges: [

        "12345",
        "67890",
        "2025",
        "786786",
        "102938",
        "564738",
        "998877",
        "456789"

    ],


    /* =========================================
       SYMBOL CHALLENGES
    ========================================= */

    symbolChallenges: [

        "!@#$%",
        "^&*()",
        "{}[]()",
        "&&||===",
        "++--=>",
        "<html></html>"

    ],


    /* =========================================
       COMBO REWARDS
    ========================================= */

    comboRewards: [

        {
            combo: 5,
            xp: 50
        },

        {
            combo: 10,
            xp: 120
        },

        {
            combo: 20,
            xp: 300
        },

        {
            combo: 50,
            xp: 1000
        }

    ],


    /* =========================================
       ACHIEVEMENTS
    ========================================= */

    achievements: [

        {
            id: "first_blood",
            title: "First Blood",
            description: "Kill your first zombie"
        },

        {
            id: "speed_demon",
            title: "Speed Demon",
            description: "Reach 100+ WPM"
        },

        {
            id: "combo_master",
            title: "Combo Master",
            description: "Reach x50 combo"
        },

        {
            id: "accuracy_king",
            title: "Accuracy King",
            description: "Maintain 98% accuracy"
        }

    ],


    /* =========================================
       ANALYTICS SUPPORT
    ========================================= */

    analytics: {

        comboTracking: true,
        reactionTracking: true,
        waveTracking: true,
        accuracyTracking: true,
        scoreTracking: true,
        killTracking: true

    }


};


/* =========================================
   GAMES ENGINE
========================================= */

const GAMES_ENGINE = {


    /* RANDOM FALLING WORD */

    getFallingWord(level = "easy") {

        const words =
        GAMES_CONTENT.fallingWords[level];

        return words[
            Math.floor(
                Math.random()
                * words.length
            )
        ];

    },


    /* RANDOM SPEED WORD */

    getSpeedWord() {

        const words =
        GAMES_CONTENT.speedBurst.words;

        return words[
            Math.floor(
                Math.random()
                * words.length
            )
        ];

    },


    /* RANDOM ACCURACY WORD */

    getAccuracyWord(level = "easy") {

        const words =
        GAMES_CONTENT.accuracyRush[level];

        return words[
            Math.floor(
                Math.random()
                * words.length
            )
        ];

    },


    /* RANDOM KEY */

    getRandomKey() {

        const keys =
        GAMES_CONTENT.keyHunter.keys;

        return keys[
            Math.floor(
                Math.random()
                * keys.length
            )
        ];

    },


    /* RANDOM ZOMBIE WORD */

    getZombieWord(type = "normal") {

        const words =

        type === "boss"

        ?

        GAMES_CONTENT
        .zombieTyping
        .bossWords

        :

        GAMES_CONTENT
        .zombieTyping
        .normalWords;

        return words[
            Math.floor(
                Math.random()
                * words.length
            )
        ];

    },


    /* RANDOM NUMBER CHALLENGE */

    getNumberChallenge() {

        const numbers =
        GAMES_CONTENT.numberChallenges;

        return numbers[
            Math.floor(
                Math.random()
                * numbers.length
            )
        ];

    },


    /* RANDOM SYMBOL CHALLENGE */

    getSymbolChallenge() {

        const symbols =
        GAMES_CONTENT.symbolChallenges;

        return symbols[
            Math.floor(
                Math.random()
                * symbols.length
            )
        ];

    },


    /* GET COMBO REWARD */

    getComboReward(combo) {

        let reward = 0;

        GAMES_CONTENT.comboRewards.forEach(item => {

            if(combo >= item.combo){

                reward = item.xp;

            }

        });

        return reward;

    },


    /* GET WAVE DATA */

    getWaveData(wave) {

        return GAMES_CONTENT
        .zombieTyping
        .waves[wave - 1];

    },


    /* GET GRADE */

    getAccuracyGrade(accuracy) {

        const grading =
        GAMES_CONTENT
        .accuracyRush
        .grading;

        if(accuracy >= grading.S){

            return "S";

        }

        if(accuracy >= grading.A){

            return "A";

        }

        if(accuracy >= grading.B){

            return "B";

        }

        if(accuracy >= grading.C){

            return "C";

        }

        return "D";

    }

};