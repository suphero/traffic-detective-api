var Report = require('../models/report');
const helpers = require('../helpers');

function getUserReports(userId) {
    return Report.find({ userId }).sort( { timestamp: -1 } );
}

function getDetailTypes(language) {
    const detailTypes = helpers.getDetailTypes();
    var returnValues = [];
    detailTypes.forEach(dt => {
        returnValues.push({
            '_id': dt._id,
            'name': dt.localName[language],
            'icon': dt.icon
        });
    });
    return returnValues;
}

async function search (countryCode, plate) {
    plate = helpers.validateAndFormatPlate(countryCode, plate);
    const plateReports = await Report.find({plate, countryCode});
    // const validTypes = helpers.getDetailTypes().map(t => t.name);
    // const plateReportDetailArrays = plateReports.map(ps => ps.details);
    // let searchResult = {};
    // plateReportDetailArrays.forEach(detailArray => {
    //     detailArray.forEach(detailItem => {
    //         validTypes.forEach(validType => {
    //             if (detailItem === validType) {
    //                 searchResult[validType] = (searchResult[validType] || 0) + 1;
    //             }
    //         });
    //     });
    // });
    // return searchResult;
    return { numberOfReporters: plateReports.length, success: true}
};

async function createReport(entity, userId) {
    entity.countryCode = 'TR';
    entity.plate = helpers.validateAndFormatPlate(entity.countryCode, entity.plate);
    entity.details = validateDetails(entity.details);
    await Report.findOneAndDelete({ userId, plate: entity.plate, countryCode: entity.countryCode });
    const reportEntity = new Report({
        userId,
        plate: entity.plate,
        countryCode: entity.countryCode,
        details: entity.details
    });
    await reportEntity.save();
    return { success: true, message: "Success" };
};


function validateDetails(details) {
    if (details.length == 0) { throw new Error("En az 1 seçenek seçilmelidir.")};
    if (details.length > 3) { throw new Error('En fazla 3 seçenek seçilebilir.'); }
    details = [...new Set(details)];
    const validTypes = helpers.getDetailTypes().map(t => t._id);
    const invalidItems = details.filter(detail => !validTypes.includes(detail) );
    if (invalidItems.length > 0) { throw new Error(`İlgili seçenekler hatalı: ${invalidItems}.`)};
    return details;
}

async function deleteReport(_id, userId) {
    await Report.findOneAndDelete({ _id, userId });
    return { success: true, message: "Success" };
};

module.exports = {
    getUserReports,
    getDetailTypes,
    createReport,
    search,
    deleteReport
};