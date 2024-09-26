
const express = require("express");
const workshopRoute = express.Router();

const {new_workshop,get_workshops,get_one_workshop} = require('../controller/workshop_controller')

workshopRoute.post("/create-workshop",new_workshop); 
workshopRoute.get("/get-workshops",get_workshops)
workshopRoute.get("/get-one-workshop/:id",get_one_workshop)



module.exports = workshopRoute;