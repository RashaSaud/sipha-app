const mongoose = require("mongoose");
// mongoose.set("strictQuery", false);

const workshops_model = new mongoose.Schema({
  workshopName: { type: String },
  workshopDate: { type: String },
  workshopObjective: { type: [String] },
  targetAudience:{type:[String]},
  workshopArea: { type: String },
  workshopTime: {type:String},
  whichDay:{type:Number},
  speakers: {type: mongoose.Schema.Types.ObjectId, ref:'speakers_model'},
});

module.exports = mongoose.model("workshops_model", workshops_model);
