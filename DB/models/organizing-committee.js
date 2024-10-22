const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const organizing_committees = new mongoose.Schema({
  img: { type: String },

});

module.exports = mongoose.model("organizing_committees", organizing_committees);
