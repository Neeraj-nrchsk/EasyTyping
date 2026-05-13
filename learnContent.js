/* =========================================
   EASYTYPING V2
   FINAL PROFESSIONAL COURSE SYSTEM
   learnContent.js
========================================= */

const LEARN_CONTENT = {

courseTitle:
"EasyTyping Professional Course",


/* =========================================
   COURSE SETTINGS
========================================= */

settings: {

    totalLessons:
    26,

    beginnerMode:
    true,

    adaptiveDifficulty:
    true,

    numbersOptional:
    true,

    symbolsOptional:
    true

},



/* =========================================
   COMPLETE COURSE LESSONS
========================================= */

lessons: [


/* =========================================
   LESSON 1
========================================= */

{
    id: 1,

    unlock:
    true,

    optional:
    false,

    title:
    "The Home Row",

    description:
    "Learn the main home row finger positions.",

    difficulty:
    "Beginner",

    focusKeys:
    ["A","S","D","F","J","K","L",";"],

    subLessons: [

        {
            id: "1.1",

            title:
            "Finger Position Basics",

            type:
            "intro",

            objective:
            "Learn proper finger placement.",

            duration:
            "3 min",

            sequences: [
                "asdf",
                "jkl;",
                "asdf jkl;",
                "aaa sss ddd fff",
                "jjj kkk lll ;;"
            ]
        },

        {
            id: "1.2",

            title:
            "Character Drill",

            type:
            "character",

            objective:
            "Practice home row keys.",

            duration:
            "5 min",

            sequences: [
                "asdf",
                "jkl;",
                "fjfj",
                "dkdk",
                "slsl",
                "ajaj",
                "fjdksla;"
            ]
        },

        {
            id: "1.3",

            title:
            "Word Drill",

            type:
            "words",

            objective:
            "Build small words.",

            duration:
            "5 min",

            sequences: [
                "dad",
                "fall",
                "sad",
                "lad",
                "glass",
                "ask",
                "all",
                "flask",
                "slash",
                "fad"
            ]
        },

        {
            id: "1.4",

            title:
            "Sentence Drill",

            type:
            "sentence",

            objective:
            "Type simple sentences.",

            duration:
            "5 min",

            sequences: [
                "dad asks all lads",
                "sad lads fall fast",
                "all flask lads ask",
                "glass falls all day"
            ]
        },

        {
            id: "1.5",

            title:
            "Paragraph Drill",

            type:
            "paragraph",

            objective:
            "Practice longer text.",

            duration:
            "5 min",

            sequences: [

`dad asks all lads to fall back.
all flask lads ask dad again.
sad lads fall and ask again.`

            ]
        }

    ]

},



/* =========================================
   LESSON 2
========================================= */

{
    id: 2,

    unlock:
    true,

    optional:
    false,

    title:
    "Keys E and I",

    description:
    "Learn E and I top row reach.",

    difficulty:
    "Beginner",

    focusKeys:
    ["E","I"],

    subLessons: [

        {
            id: "2.1",

            title:
            "Character Drill",

            type:
            "character",

            objective:
            "Practice E and I movement.",

            duration:
            "5 min",

            sequences: [
                "eee iii",
                "eiei",
                "didi",
                "kik lel",
                "ded did"
            ]
        },

        {
            id: "2.2",

            title:
            "Word Drill",

            type:
            "words",

            objective:
            "Build E and I words.",

            duration:
            "5 min",

            sequences: [
                "slide",
                "like",
                "idea",
                "file",
                "idle",
                "deal",
                "skill"
            ]
        },

        {
            id: "2.3",

            title:
            "Sentence Drill",

            type:
            "sentence",

            objective:
            "Practice rhythm.",

            duration:
            "5 min",

            sequences: [
                "skill and idea feel ideal",
                "slide like a skilled typist",
                "idle fingers fail typing"
            ]
        }

    ]

},



/* =========================================
   LESSON 3
========================================= */

{
    id: 3,

    unlock:
    true,

    optional:
    false,

    title:
    "Keys R and U",

    description:
    "Learn R and U movement.",

    difficulty:
    "Beginner",

    focusKeys:
    ["R","U"],

    subLessons: [

        {
            id: "3.1",

            title:
            "Character Drill",

            type:
            "character",

            objective:
            "Practice R and U.",

            duration:
            "5 min",

            sequences: [
                "rrr uuu",
                "ruru",
                "frfr",
                "juju",
                "ru ru ru"
            ]
        },

        {
            id: "3.2",

            title:
            "Word Drill",

            type:
            "words",

            objective:
            "Practice beginner words.",

            duration:
            "5 min",

            sequences: [
                "rule",
                "surf",
                "fur",
                "true",
                "usual",
                "user",
                "rural"
            ]
        }

    ]

},



/* =========================================
   LESSON 4
========================================= */

{
    id: 4,

    unlock:
    true,

    optional:
    false,

    title:
    "Keys T and O",

    description:
    "Practice T and O reach.",

    difficulty:
    "Beginner",

    focusKeys:
    ["T","O"],

    subLessons: [

        {
            id: "4.1",

            title:
            "Character Drill",

            type:
            "character",

            objective:
            "Practice T and O.",

            duration:
            "5 min",

            sequences: [
                "ttt ooo",
                "toto",
                "otot",
                "to to to"
            ]
        },

        {
            id: "4.2",

            title:
            "Word Drill",

            type:
            "words",

            objective:
            "Type T and O words.",

            duration:
            "5 min",

            sequences: [
                "tool",
                "roof",
                "foot",
                "root",
                "toot",
                "toolkit"
            ]
        }

    ]

},



/* =========================================
   LESSON 5
========================================= */

{
    id: 5,

    unlock:
    false,

    optional:
    false,

    title:
    "Keys G and H",

    description:
    "Learn center keyboard movement.",

    difficulty:
    "Beginner",

    focusKeys:
    ["G","H"],

    subLessons: [

        {
            id: "5.1",

            title:
            "Character Drill",

            type:
            "character",

            objective:
            "Practice G and H.",

            duration:
            "5 min",

            sequences: [
                "ggg hhh",
                "ghgh",
                "hghg",
                "gh gh gh"
            ]
        }

    ]

},



/* =========================================
   LESSON 6
========================================= */

{
    id: 6,

    unlock:
    false,

    optional:
    false,

    title:
    "Keys W and P",

    description:
    "Expand top row skills.",

    difficulty:
    "Beginner",

    focusKeys:
    ["W","P"],

    subLessons: [

        {
            id: "6.1",

            title:
            "Character Drill",

            type:
            "character",

            objective:
            "Practice W and P.",

            duration:
            "5 min",

            sequences: [
                "www ppp",
                "wpwp",
                "pw pw pw"
            ]
        }

    ]

},



/* =========================================
   LESSON 7
========================================= */

{
    id: 7,

    unlock:
    false,

    optional:
    false,

    title:
    "Keys V and M",

    description:
    "Bottom row typing practice.",

    difficulty:
    "Beginner",

    focusKeys:
    ["V","M"],

    subLessons: [

        {
            id: "7.1",

            title:
            "Character Drill",

            type:
            "character",

            objective:
            "Practice V and M.",

            duration:
            "5 min",

            sequences: [
                "vvv mmm",
                "vmvm",
                "mvmv"
            ]
        }

    ]

},



/* =========================================
   LESSON 8
========================================= */

{
    id: 8,

    unlock:
    false,

    optional:
    false,

    title:
    "Keys C and N",

    description:
    "Improve bottom row control.",

    difficulty:
    "Beginner",

    focusKeys:
    ["C","N"],

    subLessons: [

        {
            id: "8.1",

            title:
            "Character Drill",

            type:
            "character",

            objective:
            "Practice C and N.",

            duration:
            "5 min",

            sequences: [
                "ccc nnn",
                "cncn",
                "ncnc"
            ]
        }

    ]

},



/* =========================================
   LESSON 9
========================================= */

{
    id: 9,

    unlock:
    false,

    optional:
    false,

    title:
    "Keys Q and Y",

    description:
    "Advanced top row movement.",

    difficulty:
    "Intermediate",

    focusKeys:
    ["Q","Y"],

    subLessons: [

        {
            id: "9.1",

            title:
            "Character Drill",

            type:
            "character",

            objective:
            "Practice Q and Y.",

            duration:
            "5 min",

            sequences: [
                "qqq yyy",
                "qyqy",
                "yqyq"
            ]
        }

    ]

},



/* =========================================
   LESSON 10
========================================= */

{
    id: 10,

    unlock:
    false,

    optional:
    false,

    title:
    "Keys X and B",

    description:
    "Bottom row mastery.",

    difficulty:
    "Intermediate",

    focusKeys:
    ["X","B"],

    subLessons: [

        {
            id: "10.1",

            title:
            "Character Drill",

            type:
            "character",

            objective:
            "Practice X and B.",

            duration:
            "5 min",

            sequences: [
                "xxx bbb",
                "xbxb",
                "bxbx"
            ]
        }

    ]

},



/* =========================================
   LESSON 11
========================================= */

{
    id: 11,

    unlock:
    false,

    optional:
    false,

    title:
    "Comma and Period",

    description:
    "Learn punctuation rhythm.",

    difficulty:
    "Intermediate",

    focusKeys:
    [",","."],

    subLessons: [

        {
            id: "11.1",

            title:
            "Punctuation Drill",

            type:
            "sentence",

            objective:
            "Practice punctuation.",

            duration:
            "5 min",

            sequences: [
                "Typing is fun.",
                "Practice daily, improve fast.",
                "Speed and accuracy matter."
            ]
        }

    ]

},



/* =========================================
   LESSON 12
========================================= */

{
    id: 12,

    unlock:
    false,

    optional:
    false,

    title:
    "Capital Letters",

    description:
    "Shift key mastery.",

    difficulty:
    "Intermediate",

    focusKeys:
    ["SHIFT"],

    subLessons: [

        {
            id: "12.1",

            title:
            "Capital Practice",

            type:
            "sentence",

            objective:
            "Use Shift correctly.",

            duration:
            "5 min",

            sequences: [
                "Typing Improves Daily.",
                "Practice Makes Perfect.",
                "EasyTyping Builds Speed."
            ]
        }

    ]

},



/* =========================================
   LESSON 13-16
   NUMBERS
========================================= */

{
    id: 13,
    unlock: false,
    optional: true,
    title: "Numbers Row 1",
    description: "Optional numbers practice.",
    difficulty: "Optional",
    focusKeys: ["1","2","3","4","5"],
    subLessons: [
        {
            id: "13.1",
            title: "Numbers Drill",
            type: "character",
            objective: "Practice numbers.",
            duration: "5 min",
            sequences: [
                "12345",
                "111 222",
                "54321"
            ]
        }
    ]
},

{
    id: 14,
    unlock: false,
    optional: true,
    title: "Numbers Row 2",
    description: "Optional numbers practice.",
    difficulty: "Optional",
    focusKeys: ["6","7","8","9","0"],
    subLessons: [
        {
            id: "14.1",
            title: "Numbers Drill",
            type: "character",
            objective: "Practice numbers.",
            duration: "5 min",
            sequences: [
                "67890",
                "999 000",
                "09876"
            ]
        }
    ]
},

{
    id: 15,
    unlock: false,
    optional: true,
    title: "Symbols Practice",
    description: "Optional symbols practice.",
    difficulty: "Optional",
    focusKeys: ["@","#","$","%"],
    subLessons: [
        {
            id: "15.1",
            title: "Symbols Drill",
            type: "character",
            objective: "Practice symbols.",
            duration: "5 min",
            sequences: [
                "@@@ ###",
                "$$$ %%%",
                "@#$%"
            ]
        }
    ]
},

{
    id: 16,
    unlock: false,
    optional: true,
    title: "Mixed Numbers & Symbols",
    description: "Mixed keyboard training.",
    difficulty: "Optional",
    focusKeys: ["1","@","5","%"],
    subLessons: [
        {
            id: "16.1",
            title: "Mixed Drill",
            type: "character",
            objective: "Mixed practice.",
            duration: "5 min",
            sequences: [
                "1@5%",
                "@1%5",
                "55 @@"
            ]
        }
    ]
},



/* =========================================
   LESSON 17-20
   EASY TEXT
========================================= */

{
    id: 17,
    unlock: false,
    optional: false,
    title: "Easy Text",
    description: "Simple text typing.",
    difficulty: "Intermediate",
    focusKeys: [],
    subLessons: [
        {
            id: "17.1",
            title: "Easy Paragraph",
            type: "paragraph",
            objective: "Type easy text smoothly.",
            duration: "7 min",
            sequences: [

`Typing every day improves speed and confidence.
Good posture and rhythm help accuracy.`

            ]
        }
    ]
},

{
    id: 18,
    unlock: false,
    optional: false,
    title: "Easy Story",
    description: "Story typing practice.",
    difficulty: "Intermediate",
    focusKeys: [],
    subLessons: [
        {
            id: "18.1",
            title: "Story Practice",
            type: "paragraph",
            objective: "Improve flow.",
            duration: "7 min",
            sequences: [

`A young typist practiced every day.
Slowly the typing speed improved greatly.`

            ]
        }
    ]
},

{
    id: 19,
    unlock: false,
    optional: false,
    title: "Poem Practice",
    description: "Poem typing practice.",
    difficulty: "Intermediate",
    focusKeys: [],
    subLessons: [
        {
            id: "19.1",
            title: "Poem Drill",
            type: "paragraph",
            objective: "Practice rhythm typing.",
            duration: "7 min",
            sequences: [

`The quick wind softly blows,
Across the typing rows.`

            ]
        }
    ]
},

{
    id: 20,
    unlock: false,
    optional: false,
    title: "Medium Paragraphs",
    description: "Medium typing exercises.",
    difficulty: "Intermediate",
    focusKeys: [],
    subLessons: [
        {
            id: "20.1",
            title: "Medium Paragraph",
            type: "paragraph",
            objective: "Improve endurance.",
            duration: "8 min",
            sequences: [

`Typing consistently builds finger memory.
Accuracy and speed grow together over time.`

            ]
        }
    ]
},



/* =========================================
   LESSON 21-24
   ADVANCED
========================================= */

{
    id: 21,
    unlock: false,
    optional: false,
    title: "Advanced Text",
    description: "Advanced typing practice.",
    difficulty: "Advanced",
    focusKeys: [],
    subLessons: [
        {
            id: "21.1",
            title: "Advanced Drill",
            type: "paragraph",
            objective: "Improve speed.",
            duration: "10 min",
            sequences: [

`Professional typists maintain focus,
rhythm, and smooth finger coordination.`

            ]
        }
    ]
},

{
    id: 22,
    unlock: false,
    optional: false,
    title: "Hard Paragraph",
    description: "Long paragraph endurance.",
    difficulty: "Advanced",
    focusKeys: [],
    subLessons: [
        {
            id: "22.1",
            title: "Hard Paragraph",
            type: "paragraph",
            objective: "Endurance training.",
            duration: "10 min",
            sequences: [

`Typing long paragraphs trains endurance and precision.
The ability to remain accurate while typing quickly is essential.`

            ]
        }
    ]
},

{
    id: 23,
    unlock: false,
    optional: false,
    title: "Typing Endurance",
    description: "Long duration typing.",
    difficulty: "Advanced",
    focusKeys: [],
    subLessons: [
        {
            id: "23.1",
            title: "Endurance Session",
            type: "paragraph",
            objective: "Long typing practice.",
            duration: "12 min",
            sequences: [

`Consistent training develops strong typing habits.
Professional typists stay relaxed and focused.`

            ]
        }
    ]
},

{
    id: 24,
    unlock: false,
    optional: false,
    title: "Advanced Accuracy",
    description: "Accuracy focused training.",
    difficulty: "Advanced",
    focusKeys: [],
    subLessons: [
        {
            id: "24.1",
            title: "Accuracy Drill",
            type: "paragraph",
            objective: "Reduce mistakes.",
            duration: "10 min",
            sequences: [

`Typing accurately is more important than typing fast.
Precision always comes before speed.`

            ]
        }
    ]
},



/* =========================================
   LESSON 25
========================================= */

{
    id: 25,

    unlock:
    false,

    optional:
    false,

    title:
    "Final Typing Challenge",

    description:
    "Complete typing challenge.",

    difficulty:
    "Master",

    focusKeys:
    [],

    subLessons: [

        {
            id: "25.1",

            title:
            "Final Challenge",

            type:
            "paragraph",

            objective:
            "Test complete typing ability.",

            duration:
            "15 min",

            sequences: [

`Typing mastery comes from discipline,
practice, patience, and consistency.`

            ]
        }

    ]

},



/* =========================================
   LESSON 26
========================================= */

{
    id: 26,

    unlock:
    false,

    optional:
    false,

    title:
    "Typing Mastery",

    description:
    "Complete course mastery.",

    difficulty:
    "Master",

    focusKeys:
    [],

    subLessons: [

        {
            id: "26.1",

            title:
            "Mastery Test",

            type:
            "paragraph",

            objective:
            "Become a complete typist.",

            duration:
            "15 min",

            sequences: [

`You have completed the EasyTyping professional course.
Continue practicing daily to become even faster.`

            ]
        }

    ]

}

]

};