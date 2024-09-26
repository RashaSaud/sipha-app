const mongoose = require("mongoose");
// mongoose.set("strictQuery", false);

const activites_model = new mongoose.Schema({
  activiteName: { type: String },
  activiteBreif: { type: String },
  usersWantToRegister: [{type: mongoose.Schema.Types.ObjectId, ref:'user_model'}],
});

module.exports = mongoose.model("activites_model", activites_model);
