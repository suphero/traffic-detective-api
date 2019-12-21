const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const TURKEY_PLATE_REGEX = /^(0[1-9]|[1-7][0-9]|8[01])(([A-PR-VYZ])(\d{4,5})|([A-PR-VYZ]{2})(\d{3,4})|([A-PR-VYZ]{3})(\d{2,3}))$/;

function validateEmail(email) {
    var isValid = EMAIL_REGEX.test(String(email).toLowerCase());
    return isValid;
}

function validateAndFormatPlate(countryCode, plate) {
    var formattedPlate = plate.replace(/\s+/g, "").toUpperCase();
    const regex = getPlateRegexByCountryCode(countryCode);
    if (formattedPlate.match(regex) == null) {
        throw new Error("Plaka formatı hatalı.");
    }
    return formattedPlate;
}

function getPlateRegexByCountryCode(countryCode) {
    if (countryCode == "TR") {
        return TURKEY_PLATE_REGEX;
    } else {
        throw new Error("Ülke kodu hatalı.");
    }
}

function getDetailTypes() {
    return [{
            "_id": DetailTypeEnum.HORN,
            "icon": "/images/1_HORN.jpg",
            "localName": {
                "TR": "Korna",
                "EN": "Horn"
            }
        }, {
            "_id": DetailTypeEnum.FAST,
            "icon": "/images/2_FAST.jpg",
            "localName": {
                "TR": "Hızlı",
                "EN": "Fast"
            }
        }, {
            "_id": DetailTypeEnum.TRAFFIC_LIGHTS,
            "icon": "/images/3_TRAFFIC_LIGHTS.jpg",
            "localName": {
                "TR": "Işık İhlali",
                "EN": "Lights Violation"
            }
        }, {
            "_id": DetailTypeEnum.CROSSWALK,
            "icon": "/images/4_CROSSWALK.jpg",
            "localName": {
                "TR": "Yaya Geçidi",
                "EN": "Crosswalk"
            }
        }, {
            "_id": DetailTypeEnum.PARK,
            "icon": "/images/5_PARK.jpg",
            "localName": {
                "TR": "Hatalı Park",
                "EN": "Faulty Park"
            }
        }, {
            "_id": DetailTypeEnum.WRONG_WAY,
            "icon": "/images/6_WRONG_WAY.jpg",
            "localName": {
                "TR": "Ters Yön",
                "EN": "Wrong Way"
            }
        }, {
            "_id": DetailTypeEnum.ACCIDENT,
            "icon": "/images/7_ACCIDENT.jpg",
            "localName": {
                "TR": "Kaza",
                "EN": "Accident"
            }
        }, {
            "_id": DetailTypeEnum.NEGLECTED,
            "localName": {
                "TR": "Bakımsız",
                "EN": "Neglected"
            }
        }, {
            "_id": DetailTypeEnum.MULTIPLE_LANES,
            "localName": {
                "TR": "Şerit İhlali",
                "EN": "Multiple Lanes"
            }
        }, {
            "_id": DetailTypeEnum.HOGGING_LEFT_LANE,
            "localName": {
                "TR": "Sol Şerit İşgali",
                "EN": "Hogging Left Lane"
            }
        }, {
            "_id": DetailTypeEnum.HIGH_BEAM,
            "localName": {
                "TR": "Hatalı Far Kullanımı",
                "EN": "High Beam"
            }
        }, {
            "_id": DetailTypeEnum.FOLLOWING_DISTANCE,
            "localName": {
                "TR": "Takip Mesafesi",
                "EN": "Following Distance"
            }
        }, {
            "_id": DetailTypeEnum.LANE_CHANGE,
            "localName": {
                "TR": "Şerit Değiştirme İhlali",
                "EN": "Lane Change Violation"
            }
        },
    ];
}

function scorePassword(password) {
    var score = 0;
    if (!password)
        return score;

    // award every unique letter until 5 repetitions
    var letters = new Object();
    for (var i=0; i<password.length; i++) {
        letters[password[i]] = (letters[password[i]] || 0) + 1;
        score += 5.0 / letters[password[i]];
    }

    // bonus points for mixing it up
    var variations = {
        digits: /\d/.test(password),
        lower: /[a-z]/.test(password),
        upper: /[A-Z]/.test(password),
        nonWords: /\W/.test(password),
    }

    variationCount = 0;
    for (var check in variations) {
        variationCount += (variations[check] == true) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;

    return parseInt(score);
}

const DetailTypeEnum = Object.freeze({
    HORN: 1,
    FAST: 2,
    TRAFFIC_LIGHTS: 3,
    CROSSWALK: 4,
    PARK: 5,
    WRONG_WAY: 6,
    ACCIDENT: 7,
    NEGLECTED: 8,
    MULTIPLE_LANES: 9,
    HOGGING_LEFT_LANE: 10,
    HIGH_BEAM: 11,
    FOLLOWING_DISTANCE: 12,
    LANE_CHANGE: 13,
});

module.exports = {
    validateEmail,
    validateAndFormatPlate,
    getDetailTypes,
    scorePassword,
    DetailTypeEnum
}