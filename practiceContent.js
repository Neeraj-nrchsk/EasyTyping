/* =========================================
   EASYTYPING V2
   PRACTICE SECTION CONTENT SYSTEM
   practiceContent.js
========================================= */


/* =========================================
   PRACTICE DATABASE
========================================= */

const PRACTICE_CONTENT = {


    /* =========================================
       WORD DATABASE
    ========================================= */

    words: {

        easy: [

            "apple","water","green","world","happy",
            "dream","smile","learn","focus","light",
            "table","chair","phone","music","future",
            "power","house","mouse","movie","school"

        ],

        medium: [

            "keyboard","accuracy","practice","reaction",
            "developer","internet","software","hardware",
            "creative","analysis","solution","training",
            "browser","platform","performance","tracking",
            "computer","learning","progress","monitor"

        ],

        hard: [

            "synchronization",
            "implementation",
            "architecture",
            "visualization",
            "communication",
            "optimization",
            "representation",
            "compatibility",
            "authentication",
            "documentation"

        ],

        expert: [

            "microarchitecture",
            "internationalization",
            "electromagnetism",
            "counterproductive",
            "hyperconnectivity",
            "multidisciplinary",
            "commercialization",
            "decentralization"

        ]

    },


    /* =========================================
       RANDOM MIX WORDS
    ========================================= */

    randomMix: [

        "keyboard",
        "future",
        "world",
        "optimization",
        "accuracy",
        "practice",
        "developer",
        "visualization",
        "happy",
        "focus",
        "technology",
        "performance",
        "reaction",
        "discipline",
        "motivation"

    ],


    /* =========================================
       QUOTES
    ========================================= */

    quotes: {

        motivational: [

            "Consistency creates mastery.",

            "Small improvements every day create massive long term growth.",

            "Practice daily and confidence will follow naturally.",

            "Discipline beats motivation in the long run."

        ],

        productivity: [

            "Focus on progress instead of perfection.",

            "Deep work produces meaningful results.",

            "Small actions repeated daily create success."

        ],

        technology: [

            "Software is changing the future of the world.",

            "Technology grows through creativity and innovation.",

            "Programming teaches problem solving and logic."

        ]

    },


    /* =========================================
       SENTENCES
    ========================================= */

    sentences: {

        easy: [

            "Typing every day improves speed and confidence.",

            "Practice makes a person better over time.",

            "The keyboard becomes easier with regular training."

        ],

        medium: [

            "Interactive typing systems provide engaging learning experiences.",

            "Professional developers spend many hours typing code daily."

        ],

        hard: [

            "Modern software platforms require scalable architecture and optimized performance.",

            "Visualization techniques improve analytical understanding efficiently."

        ]

    },


    /* =========================================
       PARAGRAPHS
    ========================================= */

    paragraphs: {

        easy: [

            `Typing is an essential digital skill.
            Daily practice improves typing speed and confidence.
            Proper finger placement helps users type naturally.`

        ],

        medium: [

            `Typing games and interactive systems motivate users to practice more consistently.
            Achievements, scores, and analytics create a competitive learning experience.`

        ],

        hard: [

            `Modern typing platforms use adaptive learning systems and intelligent analytics to personalize training experiences and improve long term typing performance across different skill levels.`

        ]

    },


    /* =========================================
       POEMS
    ========================================= */

    poems: [

        `Typing fast with steady hands,
        Practice daily and skill expands.`,

        `Across the silent keyboard sea,
        Fingers dance in harmony.`,

        `Every letter every line,
        Builds a skill through constant time.`

    ],


    /* =========================================
       PUNCTUATION PRACTICE
    ========================================= */

    punctuation: [

        "Hello, world!",

        "Can you type this correctly?",

        "Typing improves accuracy, speed, and focus.",

        "\"Practice daily,\" said the trainer.",

        "Wait... what happened here?!"

    ],


    /* =========================================
       SYMBOL PRACTICE
    ========================================= */

    symbols: [

        "!@#$%",
        "^&*()",
        "{}[]()",
        "&& || ===",
        "++ -- =>",
        "<html></html>",
        "function(){}"

    ],


    /* =========================================
       NUMBER PRACTICE
    ========================================= */

    numbers: {

        basic: [

            "12345",
            "67890",
            "11111",
            "22222"

        ],

        decimals: [

            "99.99",
            "10.25",
            "0.001",
            "45.78"

        ],

        currency: [

            "$19.99",
            "₹4999",
            "€120.50"

        ],

        dates: [

            "12/05/2026",
            "01-01-2027",
            "25/12/2025"

        ]

    },


    /* =========================================
       TIMED TESTS
    ========================================= */

    timedTests: [

        {
            duration: 15,
            label: "Quick Reflex"
        },

        {
            duration: 30,
            label: "Speed Test"
        },

        {
            duration: 60,
            label: "Standard Test"
        },

        {
            duration: 120,
            label: "Endurance Test"
        }

    ],


    /* =========================================
       PRACTICE MODES
    ========================================= */

    modes: [

        {
            id: "speed",
            title: "Speed Mode",
            focus: "Maximum WPM"
        },

        {
            id: "accuracy",
            title: "Accuracy Mode",
            focus: "Minimum mistakes"
        },

        {
            id: "endurance",
            title: "Endurance Mode",
            focus: "Long typing sessions"
        },

        {
            id: "focus",
            title: "Focus Mode",
            focus: "Distraction free typing"
        }

    ],


    /* =========================================
       ANALYTICS SUPPORT
    ========================================= */

    analytics: {

        speedTracking: true,
        accuracyTracking: true,
        weakKeyTracking: true,
        streakTracking: true,
        heatmapTracking: true,
        consistencyTracking: true

    }


};


/* =========================================
   PRACTICE ENGINE
========================================= */

const PRACTICE_ENGINE = {


    /* RANDOM WORD */

    getWord(level = "easy") {

        const words =
        PRACTICE_CONTENT.words[level];

        return words[
            Math.floor(
                Math.random()
                * words.length
            )
        ];

    },


    /* RANDOM QUOTE */

    getQuote(type = "motivational") {

        const quotes =
        PRACTICE_CONTENT.quotes[type];

        return quotes[
            Math.floor(
                Math.random()
                * quotes.length
            )
        ];

    },


    /* RANDOM SENTENCE */

    getSentence(level = "easy") {

        const sentences =
        PRACTICE_CONTENT.sentences[level];

        return sentences[
            Math.floor(
                Math.random()
                * sentences.length
            )
        ];

    },


    /* RANDOM PARAGRAPH */

    getParagraph(level = "easy") {

        const paragraphs =
        PRACTICE_CONTENT.paragraphs[level];

        return paragraphs[
            Math.floor(
                Math.random()
                * paragraphs.length
            )
        ];

    },


    /* RANDOM POEM */

    getPoem() {

        return PRACTICE_CONTENT.poems[
            Math.floor(
                Math.random()
                * PRACTICE_CONTENT.poems.length
            )
        ];

    },


    /* RANDOM SYMBOL */

    getSymbol() {

        return PRACTICE_CONTENT.symbols[
            Math.floor(
                Math.random()
                * PRACTICE_CONTENT.symbols.length
            )
        ];

    },


    /* RANDOM PUNCTUATION */

    getPunctuation() {

        return PRACTICE_CONTENT.punctuation[
            Math.floor(
                Math.random()
                * PRACTICE_CONTENT.punctuation.length
            )
        ];

    },


    /* RANDOM NUMBER */

    getNumber(type = "basic") {

        const numbers =
        PRACTICE_CONTENT.numbers[type];

        return numbers[
            Math.floor(
                Math.random()
                * numbers.length
            )
        ];

    },


    /* GENERATE RANDOM WORD TEST */

    generateWordTest(
        count = 25,
        difficulty = "easy"
    ) {

        let result = [];

        for(let i=0; i<count; i++){

            result.push(
                this.getWord(difficulty)
            );

        }

        return result.join(" ");

    },


    /* GENERATE MIX TEST */

    generateMixedTest(count = 30) {

        let result = [];

        for(let i=0; i<count; i++){

            const random =
            Math.random() * 100;

            if(random <= 70){

                result.push(
                    this.getWord("easy")
                );

            }

            else if(random <= 90){

                result.push(
                    this.getWord("medium")
                );

            }

            else{

                result.push(
                    this.getWord("hard")
                );

            }

        }

        return result.join(" ");

    },


    /* ADAPTIVE PRACTICE */

    getAdaptivePractice(accuracy = 100) {

        if(accuracy >= 95){

            return this.generateWordTest(
                25,
                "hard"
            );

        }

        if(accuracy >= 85){

            return this.generateWordTest(
                25,
                "medium"
            );

        }

        return this.generateWordTest(
            25,
            "easy"
        );

    },


    /* WEAK KEY DRILLS */

    generateWeakKeyDrill(keys = []) {

        let result = "";

        keys.forEach(key => {

            result +=
            `${key}${key}${key} `;

        });

        return result;

    },


    /* GENERATE CUSTOM TEST */

    generateCustomTest({
        words = true,
        numbers = false,
        symbols = false,
        punctuation = false
    }) {

        let result = [];

        for(let i=0; i<20; i++){

            if(words){

                result.push(
                    this.getWord("easy")
                );

            }

            if(numbers){

                result.push(
                    this.getNumber("basic")
                );

            }

            if(symbols){

                result.push(
                    this.getSymbol()
                );

            }

            if(punctuation){

                result.push(
                    this.getPunctuation()
                );

            }

        }

        return result.join(" ");

    }

};