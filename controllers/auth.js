const Admin = require('../models/Admin')
const Bus = require('../models/Bus')
const axios = require('axios')

const adminCookie=require('../utils/adminCookie')
const driverCookie=require('../utils/driverCookie')


exports.getAdminLogin = (req,res)=>{
    return res.render('admin/login',{msg:''})
}

exports.adminLogin = async(req,res)=>{
    try{
        //create admin account
        // await Admin.create({
        //     id:`A${Date.now()}`,
        //     username:'admin',
        //     password:'123',
        //     isAdmin:true
        // })
        let {username,password}=req.body
        
        if(!username || !password){
            return res.render('admin/login',{msg:"Enter username and password"})
        }
        const user =  await Admin.findOne({username:username}).select("+password")
        if(!user){
            return res.render('admin/login',{msg:"Incorrect Username or Password"})
        }
        const isPasswordCorrect = await  user.isValidatedPassword(password)
        if(!isPasswordCorrect){
            return res.render('admin/login',{msg:"Incorrect Username or Password"})
        }
        adminCookie(user,res)
    }catch(e){
        console.log(e)
        return res.redirect('/')
    }
}

exports.adminLogout = (req,res)=>{
    res.cookie('admintoken',null,{
        expires: new Date(Date.now()),
        httpOnly:true
    })
    res.redirect('/admin/login')
}



//driver
exports.sendDriverOtp = async(req,res)=>{
    let otp = ''
    try{
        let {phone}=req.query
        let user=await Bus.findOne({phone:phone})
        
        let digits = '0123456789'; 

        for (let i = 0; i < 4; i++ ) { 
            otp += digits[Math.floor(Math.random() * 10)]; 
        } 
        if(user){
            user.otp=otp
            await user.save()
        }else{
            return res.status(404).json({success:false,msg:'invalid user'})
            
        }
        await axios.get(`https://www.fast2sms.com/dev/bulkV2?authorization=${process.env.SMS_KEY}&variables_values=${otp}&route=otp&numbers=${phone}&flash=0`)
        return res.status(200).json({success:true,otp:otp,msg:''})
    }catch(e){
        console.log(e)
        return res.json({success:false,otp:otp,msg:'Message Limit reached for this number, try after some time'})
    }
}

exports.getDriverLogin = (req,res)=>{
    return res.render('driver/login',{msg:''})
}
exports.driverLogin = async(req,res)=>{
    try{

        let {phone,otp}=req.body
        
        if(!phone || !otp){
            return res.render('driver/login',{msg:"Enter Phone And OTP"})
        }
        const user =  await Bus.findOne({phone:phone})
        if(!user){
            return res.render('driver/login',{msg:"Invalid Phone Number"})
        }
        
        if(!(user.otp == otp)){
            return res.render('driver/login',{msg:"Invalid OTP"})
        }
        driverCookie(user,res)
    }catch(e){
        console.log(e)
        return res.redirect('/driver')
    }
}
exports.driverLogout = (req,res)=>{
    res.cookie('drivertoken',null,{
        expires: new Date(Date.now()),
        httpOnly:true
    })
    res.redirect('/driver/login')
}