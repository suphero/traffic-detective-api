var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReportSchema = new Schema({
  countryCode: {type: String, required: true},
  plate: {type: String, required: true},
  userId: {type: String, required: true},
  details: {type: Array, required: true},
  timestamp: {type: Date, default: Date.now}
});

// Export the model
module.exports = mongoose.model('report', ReportSchema);
