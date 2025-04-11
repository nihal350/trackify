require("dotenv").config();

const port = process.env.PORT || 3000;

const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.static("static"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const dbConnect = require("./config/database");
dbConnect();

const { isDriver,isAdmin } = require('./middlewares/auth')

let userRoute = require('./routes/user')
let adminRoute = require('./routes/admin')
let adminAuth = require('./routes/admin-auth')
let driverRoute = require('./routes/driver')
let driverAuth = require('./routes/driver-auth')


app.get('/',(req,res)=>{
  return res.render('home')
})

app.use('/admin',adminAuth)
app.use('/admin',isAdmin,adminRoute)
app.use('/driver',driverAuth)
app.use('/driver',isDriver,driverRoute)
app.use('/user',userRoute)

app.get('/error',(req,res)=>{
  return res.render('error')
})
app.listen(port, () => {
  console.log("app running on port ", port);
});
