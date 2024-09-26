const express = require("express");
const loginRoute = express.Router();

const {login ,fetchUserData,addSpeakers,add_Scientific_committee,getAll,getAllUsers,getOneUser,getOneScientific,verification_otp} = require('../controller/login_controller')

loginRoute.post("/login",login); 
loginRoute.post("/fetchData",fetchUserData); 
loginRoute.post("/add-speaker",addSpeakers); 

loginRoute.post("/add",add_Scientific_committee); 
loginRoute.get('/all-scientific_committees',getAll)
loginRoute.get('/get-all-users',getAllUsers)

loginRoute.get('/get-one-user/:id',getOneUser)
loginRoute.get('/one-scientific_committee/:id',getOneScientific)
loginRoute.post('/OTP-verification/:email',verification_otp)

module.exports = loginRoute; 