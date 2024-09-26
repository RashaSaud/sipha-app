

process.noDeprecation = true;
const express = require("express");
const app = express();

const User = require('./DB/models/users')
require("./DB/db");
app.use(express.json());




const logInRoute  = require("./routers/routes/login_route");
const workshopRoute = require('./routers/routes/workshop_routes')
app.use(logInRoute);


app.use(workshopRoute)




app.listen(8080,()=>{
    console.log("server is running");
})