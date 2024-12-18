
require('dotenv').config()


const mongoose = require("mongoose");
 


mongoose.connect('mongodb+srv://SIPHATEAM:yej2jNnxKzsB3jRc@siphadb.ddprq.mongodb.net/?retryWrites=true&w=majority&appName=SIPHADB',{


}).then(
  () => {
    
    console.log("DB connected");
  },
  (err) => {
    console.log(err);
  } 
);
