const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const agenadModel = new mongoose.Schema({
 AgendaDayDetails:[
    {
        DayNumber:{ type: Number ,default:null},
        agendaDate:{type:String},
        Regestration:{type:String},
        OpeningCeremony:{type:String},
        PrayerBreak:{type:String},
        sesstionNumber:{type:String}


    },
  
 ],
 sessionName:{type:String},
 sessionSpeakers: {type:[{}]},
 sessionPanelDiscussion: {type:String}, 
 sessionTime:{type:String},
 sessionCaseStudy:{type:String},
 sessionCaseStudyTime:{type:String}, 


});


module.exports = mongoose.model("agenadModel", agenadModel);
