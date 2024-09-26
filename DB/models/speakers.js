const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const speakers_model = new mongoose.Schema({
  email: { type: String },
  name:{type:String,default:''},
  position: { type: String ,require:false },
  img: { type: String },
  experience :{ type: String, default: "" },
  workshops: {type: mongoose.Schema.Types.ObjectId, ref:'workshops_model'},
});

module.exports = mongoose.model("speakers_model", speakers_model);
