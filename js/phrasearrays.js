/* Mode of Presentation
- this includes self-presentation, presented with family, AV, AV(MICA), VicPol, AV/VicPol */

/* 
    Regarding the array data structure:
        ["headingName"] -- allow for grouping of "elementObj" e.g. "General Exam", "Cardiorespiratory"... this is also used as the main ID for the affected <div>
        ["headingText"] -- heading text (e.g. "General Examination:")
        [input type] = radio/button/dropdown/dualButton -> this inputs into the first argument of the main function functionCreateElements(*targetArray*, targetAppend)
        ["elementObj"]: -- this is a subarray of the different subelements to be created
            ["elementId]: the elementID", start with name (e.g. exam) -> then type of subheading (e.g. "general", "CVS", "Resp") -> then label (e.g. "appearsWell" or "HeartSounds")
            ["elementLabel"]: this is the associated text to be displayed with the interactive element
            ["elementText"]: this is the resultant value that is displayed in the textbox
    
*/

var arrModeArrival = [
    {
        "headingName": "modeArrival",
        "headingText": "Presents to ED via:",
        "inputType": "radio",
        "elementObj": [
            {
                "elementId": "modeArrivalSelf",
                "elementLabel": "Self-presented",
                "elementText": "Self-presented"
            },
            {
                "elementId": "modeArrivalFamily",
                "elementLabel": "Family",
                "elementText": "Brought in by family"
            },
            {
                "elementId": "modeArrivalAV",
                "elementLabel": "AV",
                "elementText": "BIBA"
            },
            {
                "elementId": "modeArrivalMICA",
                "elementLabel": "MICA",
                "elementText": "BIBA (MICA)"
            },
            {
                "elementId": "modeArrivalPolice",
                "elementLabel": "Police",
                "elementText": "BIB VicPol"
            },
            {
                "elementId": "modeArrivalAVPolice",
                "elementLabel": "AV/Vicpol",
                "elementText": "BIBA/VicPol"
            }
        ]
    }
];

var arrExamPhrases = [
    // General Examination 
    {
        "headingName": "examGeneral",
        "headingText": "General Examination:",
        "inputType": "radio",
        "elementObj": [
            {
                "elementId": "examGeneralAppearsWell",
                "elementLabel": "Appears well",
                "elementText": "Appears well"
            },
            {
                "elementId": "examGeneralAppearsUnwell",
                "elementLabel": "Appears unwell",
                "elementText": "Appears unwell"
            }
        ]
    },
    // Cardiorespiratory Examination
    {
        "headingName": "examCardioResp",
        "headingText": "Cardiorespiratory Examination:",
        "inputType": "button",
        "elementObj": [
            {
                "elementId": "examCardioResp",
                "elementText": "HS I+II - nil added"
            },
            {
                "elementId": "examCardioRespChestClear",
                "elementText": "Chest clear to auscultation"
            },
            {
                "elementId": "examTenderChestWall",
                "elementText": "Chest tender to palpation"
            }
        ]
    }
];

var arrHistoryPhrases = [
    {
        "headingName": "historyPhrases",
        "headingText": "History:",
        "inputType": "dualbutton",
        "elementObj": [
            {
                "elementId": "chestPain",
                "elementLabel": "chest pain",
                "elementText": "chest pain"
            },
            {
                "elementId": "abdominalPain",
                "elementLabel": "abdominal pain",
                "elementText": "abdominal pain"
            },
            {
                "elementId": "armPain",
                "elementLabel": "arm pain",
                "elementText": "arm pain"
            },
            {
                "elementId": "legPain",
                "elementLabel": "leg pain",
                "elementText": "leg pain"
            }
        ]
    }
];

var arrHxReview = [{
    "category": "history",
    "headingName": "ReviewOfSystems",
    "headingText": "Review of Systems:",
    "inputType": "dualbutton",
    "elements": [
        {
            "group": "cvs",
            "label": "syncope",
            "text": "syncope",
        },
        {
            "group": "cvs",
            "label": "presyncope",
            "text": "presyncope"
        },
        {
            "group": "resp",
            "label": "PND",
            "text": "paroxysmal nocturnal dyspnoea"
        },
        {
            "group": "cvs",
            "label": "chestpain",
            "text": "chest pain"
        },
        {
            "group": "cvs",
            "label": "palpitations",
            "text": "palpitations"
        },
        {
            "group": "resp",
            "label": "shortofbreath",
            "text": "shortness of breath"
        },
        {
            "group": "resp",
            "label": "cough",
            "text": "cough"
        },
        {
            "group": "GIT",
            "label": "nausea",
            "text": "nausea"
        }
    ]
}];