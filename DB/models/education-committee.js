const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const scientific_committees = new mongoose.Schema({
  name:{type:String,default:''},
  position: { type: String ,require:false },
  img: { type: String },
  role :{ type: String, default: "" },

});

module.exports = mongoose.model("scientific_committees", scientific_committees);
