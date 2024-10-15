
const express = require("express");
const workshopRoute = express.Router();

const {new_workshop,get_workshops,get_one_workshop} = require('../controller/workshop_controller')
const {add_agenda,getAgenda,getOneAgenda} = require('../controller/agend-conriller')

workshopRoute.post("/create-workshop",new_workshop); 
workshopRoute.get("/get-workshops",get_workshops)
workshopRoute.get("/get-one-workshop/:id",get_one_workshop)
workshopRoute.post('/add-agenda',add_agenda)
workshopRoute.get('/get-agenda',getAgenda)
workshopRoute.get('/get-agenda/:id',getOneAgenda)



module.exports = workshopRoute;