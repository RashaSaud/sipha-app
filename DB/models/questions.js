const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const questions_model = new mongoose.Schema({
 
  whoisAsk: {type: mongoose.Schema.Types.ObjectId, ref:'user_model'},
  question :{ type: String, default: "" },
  agenda: {type: mongoose.Schema.Types.ObjectId, ref:'agenadModel'},
});

module.exports = mongoose.model("questions_model", questions_model);
