
require('dotenv').config()


const mongoose = require("mongoose");



mongoose.connect(process.env.mongodb_url,{


}).then(
  () => {
    
    console.log("DB connected");
  },
  (err) => {
    console.log(err);
  }
);