

process.noDeprecation = true;
const express = require("express");
const app = express();
const cors = require('cors');

const User = require('./DB/models/users')
require("./DB/db");
app.use(express.json());
app.use(cors());




const logInRoute  = require("./routers/routes/login_route");
const workshopRoute = require('./routers/routes/workshop_routes')
const orgRoute = require('./routers/routes/organizing-route')
app.use(logInRoute);


app.use(workshopRoute)
app.use(orgRoute)


app.listen(8080,()=>{
    console.log("server is running");
})