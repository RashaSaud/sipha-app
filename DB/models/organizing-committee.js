const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const organizing_committees = new mongoose.Schema({
  name:{type:String,default:''},
  position: { type: String ,require:false },
  img: { type: String },

});

module.exports = mongoose.model("organizing_committees", organizing_committees);
