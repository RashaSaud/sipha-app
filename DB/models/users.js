const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const user_model = new mongoose.Schema({
  email: { type: String },
  imageURL:{type:String,default:''},
  cv_fields:{type:Object},
  password: { type: String ,require:false },
  first_name: { type: String },
  last_name: { type: String },
  otp :{ type: String, default: "" },
  phone_number:{type:String ,unique:false,default:false},
  

});

module.exports = mongoose.model("user_model", user_model);
 