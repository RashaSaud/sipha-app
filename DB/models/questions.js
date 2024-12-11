const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const questions_model = new mongoose.Schema({
 
  whoisAsk: {type: mongoose.Schema.Types.ObjectId, ref:'user_model'},
  question :{ type: String, default: "" },
  workshop: {type: mongoose.Schema.Types.ObjectId, ref:'workshops_model'},
});

module.exports = mongoose.model("questions_model", questions_model);
