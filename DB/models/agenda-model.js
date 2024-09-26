const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const agenadModel = new mongoose.Schema({
 AgendaDayDetails:[
    {
        DayNumber:{ type: Number ,default:null},
        Regestration:{type:String},
        OpeningCeremony:{type:String},
        PrayerBreak:{type:String}


    },
  
 ],
 sessionName:{type:String},
 sessionSpeakers: [{type: mongoose.Schema.Types.ObjectId, ref:'speakers_model'}],
 sessionPanelDiscussion: {type:String},
 sessionTime:{type:String},
 sessionCaseStudy:{type:String},
 sessionCaseStudyTime:{type:String},


});

module.exports = mongoose.model("agenadModel", agenadModel);
