const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const busSchema = new mongoose.Schema({
    id:String,
    busNo:String,
    regNo:String,
    driver:String,
    phone:String,
    otp:String,
    routeName:String,
    location:{
        lat:{
            type:String,
            default:'11.2195'
        },
        lon:{
  
            type:String,
            default:'75.8999'
            
        }
    },
    routeid:String,
    ongoingTrip:{
        type:Boolean,
        default:false
    },
    route:[
        {
            id:String,
            location:String,
            lat:String,
            lon:String,
            visited:{
                type:Boolean,
                default:false
            }
        }
    ],
    score:{
        type:Number,
        default:0
    }
})



//create and return jwt_token
busSchema.methods.getJwtToken = function(){
    return jwt.sign(
        {    
            id:this.id,
            
        },
        process.env.JWT_SECRET,
        {expiresIn:'8h'}
    )
}   
module.exports=mongoose.model('Bus',busSchema)