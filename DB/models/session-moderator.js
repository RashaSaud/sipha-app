const mongoose = require("mongoose");


const sessionsmoderators = new mongoose.Schema({
  email: { type: String },
  name:{type:String,default:''},
  phoneNumber: { type: String ,require:'' },
  linkedinAcc:{type:String},
  isModerator:{type:Boolean,default:false}

});

module.exports = mongoose.model("sessionsmoderators", sessionsmoderators);
