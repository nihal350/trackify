const mongoose = require('mongoose')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const rSchema = new mongoose.Schema({
    id:String,
    busid:String,
    score:Number,
    text:String
})
module.exports=mongoose.model('Review',rSchema)